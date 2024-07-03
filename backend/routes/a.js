const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Book = require('../models/book');
const IssuedBook = require('../models/IssuedBook');

// GET total number of students
router.get('/total-students', async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    res.status(200).json({ total: totalStudents });
  } catch (error) {
    console.error('Error fetching total students:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET total number of books
router.get('/total-books', async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    res.status(200).json({ total: totalBooks });
  } catch (error) {
    console.error('Error fetching total books:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET total number of issued books
router.get('/total-issued-books', async (req, res) => {
  try {
    const totalIssuedBooks = await IssuedBook.countDocuments();
    res.status(200).json({ total: totalIssuedBooks });
  } catch (error) {
    console.error('Error fetching total issued books:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
