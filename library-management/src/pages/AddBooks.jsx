import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import './AddBooksPage.css';

const AddBooksPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
    coverImage: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'coverImage') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title) errors.title = 'Book title is required';
    if (!formData.author) errors.author = 'Author name is required';
    if (!formData.genre) errors.genre = 'Genre is required';
    if (!formData.publicationDate) errors.publicationDate = 'Publication date is required';
    if (!formData.coverImage) errors.coverImage = 'Cover image is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const formDataWithFile = new FormData();
      formDataWithFile.append('title', formData.title);
      formDataWithFile.append('author', formData.author);
      formDataWithFile.append('genre', formData.genre);
      formDataWithFile.append('publicationDate', formData.publicationDate);
      formDataWithFile.append('coverImage', formData.coverImage);

      try {
        const response = await axios.post('http://localhost:5000/api/books', formDataWithFile, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('Book added:', response.data);

        setFormData({
          title: '',
          author: '',
          genre: '',
          publicationDate: '',
          coverImage: null,
        });
        setFormErrors({});
        setSuccessMessage('Book added successfully!');
      } catch (error) {
        console.error('There was an error adding the book!', error);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <Layout>
      <div className="add-book-container">
        <h1>Add a New Book</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Book Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {formErrors.title && <span className="error">{formErrors.title}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
            {formErrors.author && <span className="error">{formErrors.author}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            />
            {formErrors.genre && <span className="error">{formErrors.genre}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="publicationDate">Publication Date</label>
            <input
              type="date"
              id="publicationDate"
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleChange}
            />
            {formErrors.publicationDate && <span className="error">{formErrors.publicationDate}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="coverImage">Cover Image</label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              accept="image/*"
              onChange={handleChange}
            />
            {formErrors.coverImage && <span className="error">{formErrors.coverImage}</span>}
          </div>
          <button type="submit">Add Book</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </div>
    </Layout>
  );
};

export default AddBooksPage;
