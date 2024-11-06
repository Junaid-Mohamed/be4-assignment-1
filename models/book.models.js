const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String, 
        required: true
    },
    publishedYear: {
        type: Number, 
        required: true
    },
    genre: [{
        type: String,
        enum: ['Fiction', 'Non-Fiction', 'Mystery', 'Thriller', 'Science Fiction', 'Fantasy', 'Romance', 'Historical', 'Biography','Business', 'Self-help', 'Other']
    }],
    language: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: 'United States'
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    summary: {
        type: String
    },
    coverImgUrl: {
        type: String
    }
}, {timestamps: true})

/**
* By default, Mongoose pluralizes the model name to form the collection name.
* You can override this behavior by explicitly specifying a collection name when defining the model.
const Book = mongoose.model('Book', bookSchema,'customNameHere');
 
*/
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;