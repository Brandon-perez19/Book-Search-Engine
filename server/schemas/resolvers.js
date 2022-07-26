// import user model
const { User} = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express')

const resolvers = {
    Query: {
        //get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('savedBooks')
        },
        // get a single user by either their id or their username
        user: async (parents, { user = null, params }) => {
            const foundUser = await User.findOne({
                $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
            })
                .select('-__v -password')
                .populate('savedBooks')

            if (!foundUser) {
                throw new AuthenticationError('Cannot find a user with this id!');
            }

            return foundUser;
        },

        me: async (parents, args, context) => {
            if (context.user){
                const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')
                .populate('savedBooks')

                return userData
            }

            throw new AuthenticationError('Not logged in')
        }
    },
    Mutation: {
        // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
        createUser: async (parent, args) => {
            const user = await User.create(args);

            if (!user) {
                throw new AuthenticationError('Something is wrong!');
            }

            const token = signToken(user);
            return { token, user };
        },
        // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
        // {body} is destructured req.body
        login: async (parent, {username, email, password }) => {
            const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
            if (!user) {
                throw new AuthenticationError({ message: "Can't find this user" });
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Wrong password!');
            }

            const token = signToken(user);
            return { token, user };
        },
        // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
        // user comes from `req.user` created in the auth middleware function
        saveBook: async (parent, { user, body }) => {
            console.log(user);
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $addToSet: { savedBooks: body } },
                    { new: true, runValidators: true }
                );

                return updatedUser;
            } catch (err) {
                console.log(err);
                throw new AuthenticationError('You need to be logged in!');
            }
        },
        // remove a book from `savedBooks`
        deleteBook: async (parent, { user, params }) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: params.bookId } } },
                { new: true }
            );
            if (!updatedUser) {
                throw new AuthenticationError("Couldn't find user with this id!");
            }
            return updatedUser;
        }
    }
}

module.exports = resolvers