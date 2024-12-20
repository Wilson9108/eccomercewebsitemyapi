import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Get role from localStorage

  const handleLogout = () => {
    // Clear the token and role from localStorage when logging out
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login'); // Navigate back to the login page
  };

  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>

       
        {role === 'admin' && (
          <>
            <li><a href="/admin-dashboard">Admin Dashboard</a></li>
            <li><a href="/admin-settings">Admin Settings</a></li> 
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}

        {role === 'user' && (
          <>
            <li><a href="/user-dashboard">User Dashboard</a></li>
            <li><a href="/user-profile">User Profile</a></li> 
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}

    
        {!role && (
          <>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </>
        )}

       
      </ul>
    </nav>
  );
};

export default Navbar;
