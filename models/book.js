const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title : { type: String, require: true },
    author: String,
    price: Number,
    introduction: String,
    img_url: String,
    down_url: String,
    created_at: { type: Date, default : Date.now },
    update_at: { type: Date, default: Date.now }
})

const Book = module.exports = mongoose.model('Book', bookSchema)