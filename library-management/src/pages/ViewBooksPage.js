import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import StudentDetailsSidePanel from './StudentDetailsSidePanel';
import './style.css';

const ViewBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [error, setError] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    // Filter books based on search term
    if (searchTerm.trim() === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [books, searchTerm]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('There was an error fetching the books!', error);
    }
  };

  const handleDeleteClick = (bookId) => {
    setSelectedBookId(bookId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${selectedBookId}`);
      setBooks(books.filter((book) => book._id !== selectedBookId));
      setFilteredBooks(filteredBooks.filter((book) => book._id !== selectedBookId));
      setIsModalOpen(false);
    } catch (error) {
      console.error('There was an error deleting the book!', error);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedBookId(null);
  };

  const handleIssueClick = (book) => {
    setCurrentBook(book);
    setIsSidePanelOpen(true);
  };

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/students/${studentId}`);
      setStudentDetails(response.data);
      setError('');
    } catch (error) {
      setError('Student not found. Please check the student ID.');
      setStudentDetails(null);
    }
  };

  const handleInputChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleIssueDateChange = (e) => {
    setIssueDate(e.target.value);
  };

  const handleReturnDateChange = (e) => {
    setReturnDate(e.target.value);
  };

  const handleSidePanelClose = () => {
    setIsSidePanelOpen(false);
    setStudentId('');
    setStudentDetails(null);
    setError('');
  };

  const handleIncrement = async (bookId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/books/${bookId}/increment`);
      setBooks(books.map(book => book._id === bookId ? response.data : book));
    } catch (error) {
      console.error('There was an error incrementing the book quantity!', error);
    }
  };

  const handleDecrement = async (bookId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/books/${bookId}/decrement`);
      setBooks(books.map(book => book._id === bookId ? response.data : book));
    } catch (error) {
      console.error('There was an error decrementing the book quantity!', error);
    }
  };

  const handleIssueBook = async () => {
    try {
      await axios.post(`http://localhost:5000/api/issuedbooks/issue`, {
        bookId: currentBook._id,
        studentId,
        issueDate,
        returnDate
      });
      setIsSidePanelOpen(false);
      setStudentId('');
      setStudentDetails(null);
      setError('');
      setIssueDate('');
      setReturnDate('');
      fetchBooks();
    } catch (error) {
      console.error('There was an error issuing the book!', error);
    }
  };

  return (
    <Layout>
      <div className="view-books-container">
        <h1>View Books</h1>
        <input
          type="text"
          placeholder="Search by book name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul>
          {filteredBooks.map((book) => (
            <li key={book._id}>
              <img src={`http://localhost:5000/uploads/${book.coverImage}`} alt={book.title} />
              <div>
                <h2>{book.title}</h2>
                <p>{book.author}</p>
                <p>{book.genre}</p>
                <p>{new Date(book.publicationDate).toDateString()}</p>
                <div className="quantity-control">
                  <button onClick={() => handleDecrement(book._id)}>-</button>
                  <span>{book.quantity}</span>
                  <button onClick={() => handleIncrement(book._id)}>+</button>
                </div>
                <button onClick={() => handleDeleteClick(book._id)}>Delete</button>
                <button className="issue-button" onClick={() => handleIssueClick(book)}>Issue</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm delete"
        message="Are you sure you want to delete this book?"
      />
      {isSidePanelOpen && (
        <div className={`student-details-side-panel ${isSidePanelOpen ? 'open' : ''}`}>
          <button className="close-button" onClick={handleSidePanelClose}>X</button>
          <h2>Issue Book: {currentBook.title}</h2>
          <div className="form-group">
            <label htmlFor="studentId">Enter Student ID</label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={studentId}
              onChange={handleInputChange}
            />
            <button onClick={fetchStudentDetails}>Fetch Details</button>
            {error && <p className="error">{error}</p>}
          </div>
          {studentDetails && (
            <>
              <StudentDetailsSidePanel
                studentDetails={{ ...studentDetails, book: currentBook }} // Pass both student and book details
                onClose={handleSidePanelClose}
                onIssue={fetchBooks}
              />
              <div className="form-group">
                <label htmlFor="issueDate">Issue Date</label>
                <input
                  type="date"
                  id="issueDate"
                  name="issueDate"
                  value={issueDate}
                  onChange={handleIssueDateChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="returnDate">Return Date</label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  value={returnDate}
                  onChange={handleReturnDateChange}
                />
              </div>
              <button onClick={handleIssueBook}>Issue Book</button>
            </>
          )}
        </div>
      )}
    </Layout>
  );
};

export default ViewBooksPage;
