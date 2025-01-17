const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Book = require('../models/book');
const IssuedBook = require('../models/IssuedBook');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

//total book issued
router.get('/total-books', async (req, res) => {
  try {
    const count = await Book.countDocuments();
    res.json({ totalBooks: count });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
// POST a new book
router.post('/', upload.single('coverImage'), async (req, res) => {
  try {
    const { title, author, genre, publicationDate } = req.body;
    const coverImage = req.file ? req.file.filename : null;

    const newBook = new Book({
      title,
      author,
      genre,
      publicationDate,
      coverImage
    });

    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add book', error });
  }
});

router.get('/trending', async (req, res) => {
  try {
    // This is a simple example. You can define what makes a book "trending"
    const trendingBooks = await Book.find().sort({ issueCount: -1 }).limit(10); // Sort by issueCount and limit to 10 books
    res.json({ trendingBooks });
  } catch (error) {
    console.error("Error fetching trending books:", error);
    res.status(500).json({ message: "Error fetching trending books" });
  }
});

// Example Node.js/Express endpoint for horror books

router.get('/education', async (req, res) => {
  try {
    const educationBooks = await Book.find({ genre: 'Education' }).exec();
    res.json({ educationBooks });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching education books', error });
  }
});

// Example route to fetch horror books
router.get('/horror', async (req, res) => {
  try {
    const horrorBooks = await Book.find({ genre: 'Horror' }).exec();
    res.json({ horrorBooks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch horror books' });
  }
});

// In books.js (backend route file)
router.get('/adventure', async (req, res) => {
  try {
    const adventureBooks = await Book.find({ genre: 'Adventure' }).exec();
    res.json({adventureBooks});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch adventure books' });
  }
});


router.get('/devotional', async (req, res) => {
  try {
    const devotionalBooks = await Book.find({ genre: 'Devotional' }).exec();
    res.json({ devotionalBooks });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching devotional books', error });
  }
});


router.post('/issue', async (req, res) => {
  const { bookId, studentId, issueDate, returnDate } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (book.quantity <= 0) {
      return res.status(400).json({ message: 'Book is not available' });
    }
    book.quantity -= 1;
    await book.save();

    const IssuedBook = require('../models/IssuedBook');
    const issuedBook = new IssuedBook({
      book: bookId,
      student: studentId,
      issueDate,
      returnDate
    });
    await issuedBook.save();
    res.status(201).json(issuedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Return book route
router.post('/return', async (req, res) => {
  const { bookId, issuedBookId } = req.body;

  try {
    // Increment the book quantity
    await Book.findByIdAndUpdate(bookId, { $inc: { quantity: 1 } });

    // Remove the issued book record
    await IssuedBook.findByIdAndDelete(issuedBookId);

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error returning the book', error });
  }
});


// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books', error });
  }
});

// DELETE a book
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete book', error });
  }
});

// Increment book quantity
router.post('/:id/increment', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { $inc: { quantity: 1 } },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error incrementing book quantity:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Decrement book quantity
router.post('/:id/decrement', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (book.quantity > 0) {
      book.quantity -= 1;
      await book.save();
    }
    res.json(book);
  } catch (error) {
    console.error('Error decrementing book quantity:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
