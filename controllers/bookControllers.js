const Book = require('../models/bookModel');


const addBook = async (req, res) => {
  try {
    const { title, author, isbn, quantity, price, publisher, dateReceived, description, cover } = req.body;
    
    const newBook = new Book({ 
      title, 
      author, 
      isbn, 
      quantity, 
      availableCopies: quantity, 
      price, 
      publisher, 
      dateReceived, 
      description, 
      cover 
    });
    console.log(newBook);

    await newBook.save();

    res.status(201).json({
      success: true,
      message: 'Book added successfully',
      data: newBook
    });

  } catch (error) {
    console.error("Error adding book:", error); 
    res.status(400).json({
      success: false,
      message: 'Could not add book',
      error: error.message
    });
  }
};


const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send({
      success: true,
      message: 'Books retrieved successfully',
      data: books
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Could not retrieve books',
      error
    });
  }
};

const getFilteredBook = async (req, res) => {
  try {
    const { title, author, borrowedCount } = req.query;
    let filter = {};

    if (title) {
      filter.title = { $regex: title, $options: 'i' }; 
    }
    if (author) {
      filter.author = { $regex: author, $options: 'i' };
    }
    if (borrowedCount) {
      filter.borrowedCount = { $gte: Number(borrowedCount) }; 
    }

    const books = await Book.find(filter);
    res.status(200).send({
      success: true,
      message: 'Filtered Books retrieved successfully',
      data: books
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addBook, getBooks, getFilteredBook };