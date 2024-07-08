import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import './HomePage.css';
import TrendingBooks from '../components/TrendingBooks';

const StatCard = ({ title, count, icon }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{count}</p>
    <img src={icon} alt={title} className="icon"/>
  </div>
);

const HomePage = () => {
  const [totalStudents, setTotalStudents] = useState(null);
  const [totalBooks, setTotalBooks] = useState(null);
  const [totalIssuedBooks, setTotalIssuedBooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const [studentsResponse, booksResponse, issuedBooksResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/students/total-students'),
        axios.get('http://localhost:5000/api/books/total-books'),
        axios.get('http://localhost:5000/api/issuedbooks/total-issued-books'),
      ]);
      setTotalStudents(studentsResponse.data.totalStudents);
      setTotalBooks(booksResponse.data.totalBooks);
      setTotalIssuedBooks(issuedBooksResponse.data.totalIssuedBooks);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      <div className="home-page">
        <StatCard title="Total Students" count={totalStudents} icon="s.png" />
        <StatCard title="Total Books" count={totalBooks} icon="ss.png" />
        <StatCard title="Total Issued Books" count={totalIssuedBooks} icon="sss.png" />
      </div>
      <TrendingBooks />
    </Layout>
  );
};

export default HomePage;
