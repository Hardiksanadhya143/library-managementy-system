// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import StudentRegistrationPage from './pages/StudentRegistrationPage';
import ViewStudentsPage from './pages/ViewStudentsPage';
import AddBooksPage from './pages/AddBooks';
import ViewBooksPage from './pages/ViewBooksPage';
import IssuedBooksPage from './pages/IssuedBooksPage';
import Logout from './pages/Logout';


import AuthPage from './pages/AuthPage';
import './App.css';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
       
        <Route path="/issued-books" Component={IssuedBooksPage} />
     
   
        <Route path="/student-registration" element={<StudentRegistrationPage />} />
        <Route path="/view-students" element={<ViewStudentsPage />} />
        <Route path="/add-books" element={<AddBooksPage />} />
        <Route path="/view-books" element={<ViewBooksPage />} />
        <Route path="/logout" element={<Logout />} />
       
      </Routes>
    </Router>
  );
};

export default App;
