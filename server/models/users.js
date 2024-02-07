const mongoose = require("mongoose")
// const bcrypt = require('bcrypt');
const { Schema } = mongoose

// CREATE SCHEMA
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// WRAPPING SCHEMA INTO A MODEL
module.exports = mongoose.model('User', userSchema)
// EXPORTING MODEL
