import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import './HomePage.css';

const HomePage = () => {
  const [totalStudents, setTotalStudents] = useState("");
  const [totalBooks, setTotalBooks] = useState("");
  const [totalIssuedBooks, setTotalIssuedBooks] = useState(0);

 


  useEffect(() => {
//    fetchTotals();
    fetchStudentcount(); 
    fetchBookcount();
  }, []);

  const fetchStudentcount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students/total-students');
      setTotalStudents(response.data.totalStudents);
    } catch (error) {
    }
  };

  
  const fetchBookcount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/total-books');
      setTotalBooks(response.data.totalBooks);
    } catch (error) {
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
