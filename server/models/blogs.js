const mongoose = require("mongoose")
const { Schema } = mongoose

// CREATE SCHEMA
const blogSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// WRAPPING SCHEMA INTO A MODEL
module.exports = mongoose.model('Blog', blogSchema)
// EXPORTING MODEL