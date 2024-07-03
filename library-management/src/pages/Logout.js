// src/pages/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch('/api/logout', {
          method: 'POST',
          credentials: 'include', // Include cookies in the request
        });
        navigate('/'); // Redirect to the login/signup page
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    logout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
