import React from 'react';
import Header from './Header';
import Footer from './Footer';
import LeftNavbar from './LeftNavbar';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <LeftNavbar />
        <div className="content">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
