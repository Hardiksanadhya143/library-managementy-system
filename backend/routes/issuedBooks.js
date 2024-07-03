const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Student = require('../models/student');
const IssuedBook = require('../models/IssuedBook');

// Issue a book to a student
router.post('/issue', async (req, res) => {
  const { bookId, studentId, issueDate, returnDate } = req.body;

  try {
    const book = await Book.findById(bookId);
    const student = await Student.findById(studentId);

    if (!book || !student) {
      return res.status(404).send('Book or student not found');
    }

    if (book.quantity <= 0) {
      return res.status(400).send('No copies available');
    }

    book.quantity -= 1;
    await book.save();

    const issuedBook = new IssuedBook({
      book: book._id,
      student: student._id,
      issueDate: new Date(issueDate),
      returnDate: new Date(returnDate)
    });

    await issuedBook.save();

    res.status(200).send('Book issued successfully');
  } catch (error) {
    console.error('Error issuing book:', error);
    res.status(500).send('Internal server error');
  }
});

// Get all issued books
router.get('/', async (req, res) => {
  try {
    const issuedBooks = await IssuedBook.find().populate('book').populate('student');
    res.json(issuedBooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get the number of books issued by each student






module.exports = router;
