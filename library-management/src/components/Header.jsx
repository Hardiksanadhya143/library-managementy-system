import React from 'react';
import { Link,  } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
        <li><Link to="/home" exact="true" activeClassName="active">Home</Link></li>
          <li><Link to="/logout" exact="true" activeClassName="active">Log Out</Link></li>
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
