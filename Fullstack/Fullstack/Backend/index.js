const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const cors = require('cors');
const { verifyToken, verifyAdmin ,verifyUser,verifyRole } = require('./verifyToken'); 
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'taskdemo',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Admin Login function 
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
  
    const query = `SELECT * FROM admin WHERE adminEmail = ?`;
    db.query(query, [email], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database query error' });
      }
      if (result.length > 0) {
        const admin = result[0];
  
        // Compare plain text password
        if (password === admin.password) {  // No bcrypt comparison
          const token = jwt.sign({ adminId: admin.id, role: 'admin' }, 'secret_key', { expiresIn: '1h' });
          res.json({ token });
        } else {
          res.status(400).json({ message: 'Invalid credentials' });
        }
      } else {
        res.status(400).json({ message: 'No admin found' });
      }
    });
  });
  
// User Login
app.post('/api/user/login', (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM user WHERE email = ?`;
  db.query(query, [email], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const user = result[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign({ userId: user.id, role: 'user' }, 'secret_key', { expiresIn: '1h' });
          res.json({ token });
        } else {
          res.status(400).json({ message: 'Invalid credentials' });
        }
      });
    } else {
      res.status(400).json({ message: 'No user found' });
    }
  });
});

// User Registration
app.post('/api/user/register', (req, res) => {
  const { userId, username, email, password, mobileNumber, city } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) throw err;

    const query = `INSERT INTO user (userId, username, email, password, mobileNumber, city) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [userId, username, email, hashedPassword, mobileNumber, city], (err, result) => {
      if (err) {
        res.status(400).json({ message: 'Error registering user' });
      } else {
        res.json({ success: true });
      }
    });
  });
});


  

  app.get('/admin/user-details/:userId', verifyToken, verifyAdmin, verifyRole('admin'), (req, res) => {
    const { userId } = req.params;
    const sql = `SELECT * FROM user WHERE userId = ?`;
  
    db.query(sql, [userId], (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).send('User not found');
      }
      res.json(results[0]);
    });
  });
  
 
  app.get('/user/profile', verifyToken, verifyUser, verifyRole('user'), (req, res) => {
    const sql = `SELECT * FROM user WHERE userId = ?`;
  
    db.query(sql, [req.user.id], (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).send('User not found');
      }
      res.json(results[0]);
    });
  });
  
  // // User Route to Update Own Profile
  // app.put('/user/profile', verifyToken, verifyUser, (req, res) => {
  //   const { username, mobileNumber, city } = req.body;
  //   const sql = `UPDATE user SET username = ?, mobileNumber = ?, city = ? WHERE userId = ?`;
  
  //   db.query(sql, [username, mobileNumber, city, req.user.id], (err, results) => {
  //     if (err) return res.status(500).send('Error updating profile');
  //     res.send('Profile updated successfully');
  //   });
  // });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
