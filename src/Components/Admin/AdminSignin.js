import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import style from './admin.module.css'


export default function AdminSignin(){
    const navigate = useNavigate()
    const [adminEmail,setAdminEmail]=useState("")
    const [adminPassword,setAdminPassword]=useState("")
    const [emailError,setEmailError]=useState("")
    const [passwordError,setPasswordError]=useState("")
    const [text,setText]=useState("password")
    async function handleAdminForm(e){
        e.preventDefault()
        if(adminEmail===""){
            setEmailError("Email Cannot Be Empty")
            return
        }else{
            setEmailError("")
        }if(adminPassword===""){
            setPasswordError("Password Cannot Be Empty")
            return 
        }else{
            setPasswordError("")
        }
       
        console.log({adminEmail,adminPassword})
        try{
       let response = await fetch("http://localhost:2025/admin/signin",{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({adminEmail,adminPassword})
       })
       console.log(response)
       let data = await response.json()
       console.log(`data in admin signin ${data.token}`)
       let admintoken = data.admintoken
       if(response.status===404){
        // alert("Email is not exist")
        setEmailError("Email Is Not Exist")
       }
       if(response.status===200){
       localStorage.setItem("admintoken",admintoken)
       console.log(localStorage.getItem('admin'))
        navigate("/adminprofile")
       } if(response.status===401){
        console.log("incorrect password")
        // alert("Incorrect password")
        setPasswordError("Incorrect Password")
       }
    }catch(err){
        console.log("error in catch admin" + err)
    }


    } 
    function  handlePasswordIcon(){
        let eyeIcon = document.querySelector(".eyeIconI")
        console.log(eyeIcon)
        if(text==="text"){
            eyeIcon.classList.remove('fa-eye')
            eyeIcon.classList.add('fa-eye-slash')
            // eyeIcon.classList.toggle("fa-eye")
            setText("password")
            
        }else{
            eyeIcon.classList.remove('fa-eye-slash')
            eyeIcon.classList.add('fa-eye')
        //    eyeIcon.classList.toggle("fa-eye")
            setText("text")
        }
    }
    
    return(
        <>
        <div className={`${style.formContainer}`}>
            <div className={`${style.formBox}`}>
                <form onSubmit={handleAdminForm}>
                    <h1 className={`${style.formTitle}`}>Admin Signin</h1>
                    <div className={`${style.inputGroup}`}>
                        <div className={`${style.inputBox}`}>
                            <input type="text" value={adminEmail} onChange={(e)=>setAdminEmail(e.target.value.trim())} className={style.field} placeholder="Email"></input>
                            <small className={`${style.errorMessage}`}>{emailError}</small>
                        </div>
                        <div className={`${style.inputBox}`}>
                            <input type={text} value={adminPassword} onChange={(e)=>setAdminPassword(e.target.value.trim())}  className={style.field} placeholder='Password'></input>
                            <div className={style.eyeIcon}>
                        <i class="fa-solid fa-eye-slash fa-lg eyeIconI" onClick={()=>handlePasswordIcon()} ></i>
                        </div>
                            <small className={`${style.errorMessage}`}>{passwordError}</small>
                        </div>
                        <div className={`${style.inputBox}`}>
                            <input type="submit" className={style.btnField} value="submit"></input>
                        </div>
                        <div className={`${style.accountExist}`}>
                         <Link to ="/adminsignup">signup</Link>
                        </div>
                    </div>
                </form>
            </div>

        </div>

        </>
    )
}