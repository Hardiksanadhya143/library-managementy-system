import React from 'react';
import { NavLink } from 'react-router-dom';
import './LeftNavbar.css';

const LeftNavbar = () => {
  return (
    <nav className="left-navbar">
      <ul>
        <li><NavLink to="/student-registration" activeClassName="active">Student Registration</NavLink></li>
        <li><NavLink to="/view-students" activeClassName="active">View Students</NavLink></li>
        <li><NavLink to="/add-books" activeClassName="active">Add Books</NavLink></li>
        <li><NavLink to="/view-books" activeClassName="active">View Books</NavLink></li>
        <li><NavLink to="/issued-books" activeClassName="active">Issued Books</NavLink></li>
      </ul>
    </nav>
  );
};

export default LeftNavbar;
