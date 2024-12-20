const db = require('./db')
const express = require('express')
const multer = require('multer')
const bodyparser = require('body-parser')
const cors = require('cors');
const app = express()
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')



app.use(cors());
app.use(bodyparser.json());

const JWT_SECRET="dosomething" 






app.post('/userLogin', (req, res) => {
  let { Emailid, password } = req.body

  let sqlQuery = "select * from register where emaiild=?";
  db.query(sqlQuery, [Emailid], (err, result) => {
    if (err) console.log(err)
    if (result.length == 0)return res.json({ message: "Usernot Found" })
    let userDetails = result[0]
    bcrypt.compare(password, userDetails.password, (err, isMatch) => {
      if (err) console.log(err)
      if (!isMatch) return res.json({ message: "Invalid Password" })

        const payload={userid:userDetails.userid,userName:userDetails.username}
        const token=jwt.sign(payload,JWT_SECRET,{expiresIn:'300s'})

    

  
  console.log(token)
      res.json({
        message: 'Login successful',
        token: token,
      });
    })
  })
})
function verifyToken(req,res,next)
{
  const token=req.headers['authorization']?.split(' ')[1]
  console.log("token",token)
    jwt.verify(token,JWT_SECRET,(err,decoded)=>
    {
        console.log("decoded",decoded)
        req.user=decoded;
        next()
    })
}

app.get('/profile',verifyToken,(req,res)=>{
  const userId= req.user.userid;
  console.log("userId",userId)
})


db.commit()
app.listen(5000, () => {
  console.log(`Server running on http://localhost:5000`);
});
