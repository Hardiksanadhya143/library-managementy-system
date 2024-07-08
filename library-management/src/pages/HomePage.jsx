import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import './HomePage.css';

const HomePage = () => {
  const [totalStudents, setTotalStudents] = useState("");
  const [totalBooks, setTotalBooks] = useState("");
  const [totalIssuedBooks, setTotalIssuedBooks] = useState("");

  useEffect(() => {
    fetchStudentcount();
    fetchBookcount();
    fetchIssuedBookcount();
  }, []);

  const fetchStudentcount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students/total-students');
      setTotalStudents(response.data.totalStudents);
    } catch (error) {
      console.error("Error fetching total students:", error);
    }
  };

  const fetchBookcount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/total-books');
      setTotalBooks(response.data.totalBooks);
    } catch (error) {
      console.error("Error fetching total books:", error);
    }
  };

  const fetchIssuedBookcount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/issuedbooks/total-issued-books');
      console.log("Total Issued Books Response:", response.data);
      setTotalIssuedBooks(response.data.totalIssuedBooks);
    } catch (error) {
      console.error("Error fetching total issued books:", error);
    }
  };

  return (
    <Layout>
      <div className="home-page">
        <div className="card">
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
          <img src="s.png" alt="Students" className="icon"/>
        </div>
        <div className="card">
          <h3>Total Books</h3>
          <p>{totalBooks}</p>
          <img src="ss.png" alt="Books" className="icon"/>
        </div>
        <div className="card">
          <h3>Total Issued Books</h3>
          <p>{totalIssuedBooks}</p>
          <img src="sss.png" alt="Issued Books" className="icon"/>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
