const bookSchema = require("../models/Book")

const resolvers = {
    Query: {
        books: async () => {
            return bookSchema.find().sort({ createdAt: -1 })
        }
    }
}