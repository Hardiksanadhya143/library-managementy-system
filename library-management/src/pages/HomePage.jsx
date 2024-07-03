import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import './HomePage.css';

const HomePage = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalIssuedBooks, setTotalIssuedBooks] = useState(0);

  const fetchTotals = async () => {
    try {
      const [studentsResponse, booksResponse, issuedBooksResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/total-students'),
        axios.get('http://localhost:5000/api/total-books'),
        axios.get('http://localhost:5000/api/total-issued-books')
      ]);

      setTotalStudents(studentsResponse.data.total);
      setTotalBooks(booksResponse.data.total);
      setTotalIssuedBooks(issuedBooksResponse.data.total);
    } catch (error) {
      console.error('Error fetching totals:', error);
    }
  };

  useEffect(() => {
    fetchTotals();
  }, []);

  // Define functions to update totals after adding a student, book, or issuing a book
  const handleAddStudent = async (newStudent) => {
    try {
      await axios.post('http://localhost:5000/api/students', newStudent);
      fetchTotals();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleAddBook = async (newBook) => {
    try {
      await axios.post('http://localhost:5000/api/books', newBook);
      fetchTotals();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleIssueBook = async (issuedBook) => {
    try {
      await axios.post('http://localhost:5000/api/issuedbooks/issue', issuedBook);
      fetchTotals();
    } catch (error) {
      console.error('Error issuing book:', error);
    }
  };

  return (
    <Layout>
      <div className="home-page">
        <div className="card">
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
        </div>
        <div className="card">
          <h3>Total Books</h3>
          <p>{totalBooks}</p>
        </div>
        <div className="card">
          <h3>Total Issued Books</h3>
          <p>{totalIssuedBooks}</p>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
