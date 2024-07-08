// models/IssuedBook.js

const mongoose = require('mongoose');

const issuedBookSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  isIssued: { type: Boolean, default: true },    
  returnDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('IssuedBook', issuedBookSchema);
