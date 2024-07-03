const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  coverImage: { type: String, required: true },
  quantity: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model('Book', BookSchema);
