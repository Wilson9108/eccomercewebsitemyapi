import {useState} from 'react'
import style from "../cssFiles/signin.module.css"
import {Link,useNavigate} from 'react-router-dom'
console.log({useState})
console.log(Array.isArray(useState))
export default function Signin(){
    const navigate = useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [emailError,setEmailError]=useState("")
    const [passwordError,setPasswordError]=useState("")
    const [text,setText]=useState("password")

    const handleForm = async(e)=>{
        e.preventDefault()
        try{
            if(email==="" ){
                // return alert("Email is Empty")
             setEmailError("Email Cannot Be Empty")
             return ;
            }else{
                setEmailError("")
            }if(password===""){
                return setPasswordError("Password Cannot Be Empty")
            }else{
                setPasswordError("")
            }
        let response  = await fetch("http://localhost:2025/usersignin",{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify({email,password})
        })
        console.log(response)
        console.log(response.status)
        let data = await response.json()
        if(response.status===400){
            // alert("Email You Entered Does Not Exist")
          return   setEmailError(data.error)
        }else{
            setEmailError("")
        }if(response.status===200){
            console.log("token from usersignin.js " , data)
            console.log(data.usertoken)
             localStorage.setItem('usertoken',data.usertoken)
            navigate("/userprofile")
            return 
        }if(response.status===204){
           return  setPasswordError("Password Cannot Be Empty")
        } if (response.status===401){
            // alert("Incorrect Password")
           return  setPasswordError("Incorrect Password")
        }
    }catch(err){
        console.log(err)
    }
    }

    function  handlePasswordIcon(){
        let eyeIcon = document.querySelector(".eyeIconI")
        console.log(eyeIcon)
        if(text==="text"){
            eyeIcon.classList.remove('fa-eye')
            eyeIcon.classList.add('fa-eye-slash')
            setText("password")
            
        }else{
            eyeIcon.classList.remove('fa-eye-slash')
            eyeIcon.classList.add("fa-eye")
            setText("text")
        }
    }
    
    return(
        <>
        <div className={`${style.formContainer}`}>
           <div className={`${style.formBox}`}>
            <form id={`${style.form}`} onSubmit={handleForm}>
                <div className="position-relative">
            <h1 className={`${style.formTitle}`}>Signin</h1>
            </div>
                <div className={`${style.inputGroup}`}>
                    <div className={`${style.inputBox}`}>
                        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value.trim())} className={`${style.field}`} placeholder="Email" autoComplete="off"></input>
                        <small className={`${style.errorMessage}`}>{emailError}</small>
                    </div>
                    <div className={`${style.inputBox}`}>
                        <input type={text} value={password} placeholder="password" onChange={(e)=>setPassword(e.target.value.trim())} className={`${style.field}`}  autoComplete="off"></input>
                        <div className={style.eyeIcon}>
                        <i className="fa-solid fa-eye-slash fa-lg eyeIconI" onClick={()=>handlePasswordIcon()} ></i>
                        </div>
                        <small className={`${style.errorMessage}`}>{passwordError}</small>
                    </div>
                    <div className={`${style.forgetBox}`}>
                        <Link>Forget Password ? </Link>
                    </div>
                    <div className={`${style.buttonBox}`}>
                        <button>Sign in</button>
                    </div>
                </div>

            </form>   
            <div className={`${style.accountExist}`}>
            <p>Don't Have An Account ? <Link to="/signup"> Sign Up </Link></p>
            </div>
            <div className={`${style.socialLinksContainer}`}>
                <p>Or With</p>
                <a href="https://www.google.co.in/"><i class="fa-brands fa-google"></i></a>
               <a href="https://www.facebook.com/"> <i class="fa-brands fa-facebook"></i></a>
               <a href="https://www.instagram.com/"> <i class="fa-brands fa-instagram"></i></a>
            </div>
            </div>

        </div>
        </>
    )
}