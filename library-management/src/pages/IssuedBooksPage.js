import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import Layout from '../components/Layout';
import './IssuedBooksPage.css';
import Modal from '../components/Modal';

const IssuedBooksPage = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isReturning, setIsReturning] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/issuedbooks');
        setIssuedBooks(response.data);
        setFilteredBooks(response.data); // Initialize filtered books with all issued books
      } catch (error) {
        console.error('Error fetching issued books:', error);
      }
    };

    fetchIssuedBooks();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterBooks(e.target.value);
  };

  // Function to filter books based on student ID
  const filterBooks = (term) => {
    if (!term) {
      setFilteredBooks(issuedBooks); // Reset to show all books when search term is empty
    } else {
      const filtered = issuedBooks.filter((book) =>
        book.student && book.student.studentId.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
  };

  const handleReturnBook = async () => {
    if (!selectedBook || isReturning) return;

    setIsReturning(true);

    try {
      await axios.post('http://localhost:5000/api/books/return', {
        bookId: selectedBook.book._id,
        issuedBookId: selectedBook._id,
      });

      // Update the issued books list after return
      const updatedBooks = issuedBooks.filter((book) => book._id !== selectedBook._id);
      setIssuedBooks(updatedBooks);
      filterBooks(searchTerm); // Reapply filter if search term is active
      closeModal();
      navigate(0); // Refresh the page
    } catch (error) {
      console.error('Error returning the book:', error);
    } finally {
      setIsReturning(false);
    }
  };

  return (
    <Layout>
      <div className="issued-books-page">
        <h2>Issued Books</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Student ID..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Book Name</th>
              <th>Issue Date</th>
              <th>Return Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((issuedBook) => {
              // Check if student and book data exists
              if (!issuedBook.student || !issuedBook.book) {
                return null; // Skip rendering this row
              }
              return (
                <tr key={issuedBook._id}>
                  <td>{issuedBook.student.studentId}</td>
                  <td>{issuedBook.student.studentName}</td>
                  <td>{issuedBook.book.title}</td>
                  <td>{new Date(issuedBook.issueDate).toLocaleDateString()}</td>
                  <td>{new Date(issuedBook.returnDate).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => openModal(issuedBook)}>Return</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleReturnBook}
        title="Confirm Return"
        message="Are you sure you want to return this book?"
      />
    </Layout>
  );
};

export default IssuedBooksPage;
