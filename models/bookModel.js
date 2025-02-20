const mongoose = require('mongoose');




const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, unique: true, required: true },
  availableCopies: { type: Number, required: true, default: 1 },
  quantity: { type: Number, required: true },
  price: { type: String, required: true },
  publisher: { type: String, required: true },
  description: { type: String, required: true },
  dateReceived: { type: String, required: true },
  cover: { type: String, required: true },
  borrowedCount: { type: Number, default: 0 }, 
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;