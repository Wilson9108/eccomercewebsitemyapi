import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './Components/Adminlogin';
import UserLogin from './Components/UserLogin';
import AdminDashboard from './Components/AdminDashbaord';
import UserDashboard from './Components/UserDashboard';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Hookexample from './Hookexample';
import TextInput from './Refs';
function App() {
  return (
    <>
   
   <Router>
   <Navbar />
     <Routes>
     <Route path="/ecom-admin" element={<AdminLogin />} />
      <Route path="/login" element={<UserLogin />} />
     <Route path="/register" element={<Register />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
       <Route path="/user-dashboard" element={<UserDashboard />} />
       <Route path="/" element={<Home />} />
     </Routes>
   </Router>
  </>
  );
}

export default App;
