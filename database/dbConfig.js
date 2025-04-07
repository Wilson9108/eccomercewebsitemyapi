const mysql = require("mysql2")


let db = mysql.createConnection({
    port:3306,
    host:"localhost",
    user:"root",
    password:"root123",
    database:"eccomerce"
})

db.connect((err,res)=>{

    err?console.log("Failed"):console.log("Database connected successfully")
    
}
)


module.exports=db