const db = require("./database/dbConfig")
const {verifyToken} = require("./verifytoken/verifyToken")
const express = require("express")
const session = require("express-session")
const fs = require('fs')
const path = require("path")
const cors = require("cors")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// console.log(jwt)
const jwt_secret_key = "12secret34"


const multer  = require("multer")

const port = 2025;
let app = express()
app.use(cors())
app.use(express.json())
const uploadFolder  = path.join(__dirname,'uploads')
// console.log(uploadFolder)


app.get('/productsData',(req,res)=>{
    db.query("select * from products as p inner join category as c on p.cid=c.cid",(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
        }
    })
})
app.get('/categoryData',(req,res)=>{

    db.query("select * from category",(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
        }
    })
})


const  storage = multer.diskStorage({
    destination:function(req,file,cb){
        // console.log(req)
        // console.log(file)
        cb(null,uploadFolder)
    },
    filename:function(req,file,cb){
        const datetime=new Date().toISOString().replace(/:/g,'_')
        // console.log(datetime)
        const extension = path.extname(file.originalname)
        // console.log('extension ' + extension)
        const filename = `wilson_${datetime}${extension}`
        // console.log('filename ' + filename)
        cb(null,filename)
    }
})

// console.log(typeof storage)
const upload = multer({storage})

console.log(upload)

app.get('/uploads/:filename',(req,res)=>{
    const {filename}=req.params
    // console.log("filename " ,  filename)
    const filepath = path.join(__dirname,'uploads',filename)
    // console.log(filepath)
    res.sendFile(filepath)
})



app.post('/uploadFile',upload.single('image'),(req,res)=>{
    let {title,description,price,category} = req.body
    console.log( req.body)
    console.log("req.file " + req.file)
    const filepath = req.file.filename
    console.log(" filepath  " + filepath)
    const query = 'insert into products (title,description,price,cid,image) values(?,?,?,?,?)'
    db.query(query,[title,description,price,category,filepath],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
            res.send({message:"inserted successfully"})
        }
    })
})

app.post('/categoryinsert',(req,res)=>{
    let {category}=req.body
    console.log(category)

    db.query("select * from category where category=?",[category],(err,result)=>{
        if(result.length>0){
            console.log(result,"category already exist")
            return res.status(409).send({message:`${category} already exist`})
        }
        
   
    db.query("insert into category (category) values(?)",[category],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
            res.status(200).json({message:'category inserted successfully'})
        }
    })
})
})


app.get('/api/users',(req,res)=>{
    db.query("select * from user",(err,result)=>{
        if(err){
            console.log(err)
            return res.status(404).send("error in fetching users")
        }else{
            // console.log(result)
            return res.json(result)
        }
    })
})

app.get('/api/users/:id',(req,res)=>{
    let {id}=req.params
    db.query("select * from user where user_id =?",[id],(err,result)=>{
        if(err){
            console.log(err)
        }else{
           return res.json(result)
        }
    })
})


app.post('/usersignup',(req,res)=>{
    let {fullName,email,password,mobileNumber,state}=req.body
    const insertQuery = "INSERT INTO USER (USER_NAME,USER_EMAIL,password,USER_MOBILE,USER_STATE) VALUES(?,?,?,?,?)"
    const emailExist = "select * from user where user_email =?"
    db.query(emailExist,[email],(emailerr,emailresult)=>{
        if(emailerr){return res.status(500).json({error:"error in emailexist in usersignup"})}
        console.log(emailresult.length)
        if(emailresult.length>0){
            return res.status(409).json({error: `${email} already Exist`})     
        }else{
        bcrypt.hash(password,10,(err,hash)=>{
            if(err){
                console.log("error in hash")
              return console.log(err)
            }
    db.query(insertQuery,[fullName,email,hash,mobileNumber,state],(err,result)=>{
        if(err){
            console.log("something went wrong in insert user signup")
        }if(result.affectedRows>0){
          return res.status(200).json({success:"user inserted Successfully"})
        }
    }) 
})}
})

})
app.post("/usersignin",(req,res)=>{
    let {email,password} =  req.body
    const signinQuery = "select * from user where user_email =?"
    db.query(signinQuery,[email],(err,result)=>{
        console.log(result)
        if(err){
            return console.log("error in user signin query")
        }console.log(result.length)
        if(result.length>0){
            console.log(result)
            let userDetails = result[0]
            bcrypt.compare(password,result[0].password,(err,isMatch)=>{
                if(err){
                    return console.log("error  hash comparing in user sigin")
                }if(password===""){
                    return res.status(204).send()
                }
                if(isMatch){
                    let payload = {userId:userDetails.user_id,role:"user"}
                    let usertoken = jwt.sign(payload,jwt_secret_key,{expiresIn:"100s"})
                    console.log("usertoken" , usertoken)

                return res.status(200).send({success:"login successfully",usertoken:usertoken})
                }else{
                    console.log("incorrect password")
                    return res.status(401).send({error:"incorrect  password"})
                }
            })
        }else{
            console.log("email not exist")
           return  res.status(400).send({error:`${email} is Not Exist`})
        }
    })
})

// function verifytoken(req,res,next){
//     console.log("req",req)
//     // console.log(req.headers['authorization'].split(' ')[1])
//     let token = req.headers['authorization'].split(' ')[1]
//     console.log("token from verify token ", token)
//     if(token){
//     jwt.verify(token,jwt_secret_key,(err,decoded)=>{
//         if(err){
//             console.log(err)
//             return 
//         }else{
//             console.log("decoded" , decoded)
//             req.user = decoded
//         }
//     })
// }else{
//     console.log("no token")
//     return;
// }
//     next()
// }

app.get('/userprofile',verifyToken,(req,res)=>{
    console.log("/userprofile",req.user)
    if(req.user){
    let {userId} = req.user
    console.log("userId from " , userId)
  db.query("select * from user where user_id=?",[userId],(err,result)=>{
    console.log(result)
    if(err){
        console.log(err)
        return
    }else{
        console.log("hey " , {...result[0],role:req.user.role})
        // let userDetails = {result:result[0],role:req.user.role}
        // console.log(userDetails)
        res.send({...result[0],role:req.user.role})
    }
})
    }else{
        console.log("user not found ")
        res.status(404).send({message:"user not found"})
    }
    
})


app.put('/userupdate/:userid',(req,res)=>{
    let {fullname,email,mobilenumber,state}=req.body.updateValues
    let {userid}=req.params
    console.log({userid})
    console.log(req.body.updateValues.fullname)
    console.log("id params update" + userid)
    let updateQuery = "update user set user_name = ?,user_email=?,user_mobile=?,user_state=? where user_id =?"
    db.query(updateQuery,[fullname,email,mobilenumber,state,userid],(err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).send({error:"Internal Server Error in userupdate"})
        }else{
            console.log(result)
            return res.send(result)
            // return res.status(200).send({success:"updated successfully"})
        }
    })
})

app.delete('/userdelete/:id',(req,res)=>{
    const {id}=req.params
    console.log("delete req params "  + id)
    let deleteQuery ="delete from user where user_id =?"
    db.query(deleteQuery,[id],(err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).send({error:"error in userdelete"})
        }else{
            return res.send({success:"user Deleted Successfully"})
        }
    })
})


//admin
app.post('/admin/signup',(req,res)=>{
    try{
    let {adminEmail,adminPassword}=req.body
    console.log(req.body)
    let adminInsertQuery = "insert into admin (admin_email,admin_password) values(?,?)"
    let emailExist = "select * from admin where admin_email=?"
  
    db.query(emailExist,[adminEmail],(emailErr,exist)=>{
        if(emailErr){return console.log("error" + emailErr)}
        console.log(exist)
        if(exist.length>0){
            return res.status(409).json({error:"Email already Exist"})
        }else{
            bcrypt.hash(adminPassword,10,(hasherr,hash)=>{
                if(hasherr){return console.log("hasherr in admin signup  ")}
                db.query(adminInsertQuery,[adminEmail,hash],(err,result)=>{
                    if(err){return console.log("something went wrong admin signup"+ err)}
                    if(result.affectedRows>0){
                        return res.status(200).json({success:"Admin data inserted successfully"})
                    }
                })
            })
        }
    })
}catch(err){
    console.log("error in admin signup  " + err)
}
})



app.post('/admin/signin',(req,res)=>{
    let {adminEmail,adminPassword}=req.body
     db.query("select * from admin where admin_email=?",[adminEmail],(emailerr,emailExist)=>{
        if(emailerr){return res.status(500).json({error:"error in admin signin"})}
        console.log(emailExist.length)
        if(emailExist.length>0){
            let adminDetails = emailExist[0]
            console.log(`admin details ${JSON.stringify(adminDetails)}`)
            bcrypt.compare(adminPassword,emailExist[0].admin_password,(hasherr,isMatch)=>{
                if(hasherr){return res.status(500).json({error:"error in chekcing hash password in admin signin"})}
                console.log(isMatch)
                if(isMatch){
                    console.log(isMatch)
                    let payload = {adminId:adminDetails.admin_id , adminEmail:adminDetails.admin_email,role:"admin"}
                    let admintoken = jwt.sign(payload,jwt_secret_key,{expiresIn:"1000s"})
                   return res.status(200).json({success:"admin login successfully",admintoken:admintoken})
                }else{
                    return res.status(401).send({error:"incorrect password"})
                }
            })    
        }else{
            res.status(404).json({error:"Admin Email is not Exist"})
        }
     })
})

app.get('/adminprofile',verifyToken,(req,res)=>{
    console.log("req.body from adminprofile", req.user)
    let {adminId}= req.user
    console.log(`admin id ${adminId}`)
    db.query("select * from admin where admin_id =?",[adminId],(err,result)=>{
        
        if(err){
            return res.status(500).send({message:"Issue in adminpofile"})
        }
        res.status(200).send({...result,role:req.user.role})
    })

})


//products crud

app.put('/updateproductsdata/:id',(req,res)=>{
    let {id}=req.params
    console.log(id)
    let {title,description,price,category}=req.body.values
    console.log(req.body)
    let updateQuery="update products set title=?,description=?,price=?,cid=? where id=?"
    db.query(updateQuery,[title,description,price,category,id],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
            res.send({message:"updated successfully"})

        }
    })

})

app.delete('/deleteproductsdata/:id',(req,res)=>{
    let {id}=req.params
    console.log(id)
    db.query("delete from products where id =?",[id],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
            res.send({message:"Products Data Deleted Successfully"})
        }
    })
})





app.listen(port,(err)=>{
    err?console.log("error"):console.log(port)
})