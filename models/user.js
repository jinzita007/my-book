const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    created_at: { 
        type: Date,
        default: Date.now
    },
})

const User = module.exports = mongoose.model('User', userSchema)