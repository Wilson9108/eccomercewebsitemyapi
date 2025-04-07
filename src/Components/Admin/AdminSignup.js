import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import style from './admin.module.css'

export default function  AdminSignup (){
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
            return;
        }else{
            setEmailError("")
        }if(adminPassword===""){
            setPasswordError("Password Cannot Be Empty")
            return
        }else{
            setPasswordError("")
        }
        try{
        let response = await fetch("http://localhost:2025/admin/signup",{
            method:"post",
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify({adminEmail,adminPassword})
        })
        console.log(response.status)
        if(response.status===409){
            // alert("Email already Exist")
            setEmailError("Email Already Exist")
        }
        if(response.status===200){
            // alert("Admin Login Successfully")
            navigate("/adminsignin")
        }if(response.status===500){
            alert("somthing went wrong")
        }
    }catch(err){
        console.log("error in handlAdminform " + err)
    }}

    function  handlePasswordIcon(){
        let eyeIcon = document.querySelector(".eyeIconI")
        if(text==="text"){
            eyeIcon.classList.add("fa-eye-slash")
            eyeIcon.classList.remove("fa-eye")
            setText("password")
            
        }else{
            eyeIcon.classList.add("fa-eye")
            eyeIcon.classList.remove("fa-eye-slash")
            setText("text")
        }
    }

    return(
        <>
         <div className={`${style.formContainer}`}>
            <div className={`${style.formBox}`}>
                <form onSubmit={handleAdminForm}>
                    <h1 className={`${style.formTitle}`}>Admin Signup</h1>
                    <div className={`${style.inputGroup}`}>
                        <div className={`${style.inputBox}`}>
                            <input type="text" value={adminEmail} onChange={(e)=>setAdminEmail(e.target.value.trim())} className={style.field} placeholder="Email"></input>
                            <small className={`${style.errorMessage}`}>{emailError}</small>
                        </div>
                        <div className={`${style.inputBox}`}>
                            <input value={adminPassword} onChange={(e)=>setAdminPassword(e.target.value.trim())} type={text} className={style.field} placeholder='Password'></input>
                            <div className={style.eyeIcon}>
                        <i class="fa-solid fa-eye-slash fa-lg eyeIconI" onClick={()=>handlePasswordIcon()} ></i>
                        </div>
                            <small className={`${style.errorMessage}`}>{passwordError}</small>
                        </div>
                        <div className={`${style.inputBox}`}>
                            <input type="submit" className={style.btnField} value="submit"></input>
                        </div>
                        <div className={`${style.accountExist}`}>
                        <Link to ="/adminsignin">signin</Link>
                        </div>
                    </div>
                </form>
            </div>

        </div>
        </>
    )
}