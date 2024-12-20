
const jwt = require("jsonwebtoken")
// console.log(jwt)
const jwt_secret_key = "12secret34"


function verifyToken(req,res,next){
    ("hey verify token started")
    console.log(req.headers['authorization']?.split(" ")[1])
    let token = req.headers['authorization']?.split(" ")[1]

    if(!token){
        console.log("no token")
        return 
    }
    jwt.verify(token,jwt_secret_key,(err,decoded)=>{
        if(err){
            return  res.status(404).send("invalid verifytoken")
           
        }
        console.log("decoded from verifytoken " , decoded)
        req.user = decoded
        next()
    })
    

}


module.exports=({verifyToken})

console.log("heloo")