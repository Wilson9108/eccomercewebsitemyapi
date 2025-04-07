import {useState,useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import style from '../cssFiles/Signup.module.css'
export default function Signup(){
    const navigate = useNavigate()
    const [fullName,setFullName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword] = useState("")
    const[confirmPassword,setConfirmPassword]=useState("")
    const [mobileNumber,setMobileNumber]=useState("")
    const [state,setState]=useState("")
    const [nameError,setNameError]=useState("")
    const [emailError,setEmailError]=useState("")
    const [passwordError,setPasswordError]=useState("")
    const [confirmPasswordError,setConfirmPasswordError]=useState("")
    const [mobileError,setMobileError]=useState("")
    const [stateError,setStateError]=useState("")
    const [text,setText]=useState("password")
    const [confirmText,setConfirmText]=useState("password")

    const handleForm= async (e)=>{
        e.preventDefault()
        try{
        // if(fullName==="" && email===""&& password===""&& confirmPassword==="" &&  mobileNumber==="" && state===""){
        //     setNameError("Name Cannot Be Empty")
        //     setPasswordError("Password Cannot Be Empty")
        //     setConfirmPasswordError("Confirm Password Cannot Be Empty")
        //     setEmailError("Email Cannot Be Empty")
        //     setMobileError("Mobile Number Cannot Be Empty")
        //     setStateError("State Cannot Be Empty")
        //     return 
        // }
        if(fullName===""){
            setNameError("Name Cannot Be Empty")
            return 
        } else{
            setNameError("") 
        }
        if(email===""){
            setEmailError(()=>"Email Cannot Be Empty")
            return
        }
        else{
            setEmailError("")
        } 
        if(password ===""){
            return setPasswordError("Password Cannot Be Empty")
        }else{
            setPasswordError("")

        } if(confirmPassword ===""){
            return setConfirmPasswordError("Confirm Password Cannot Be Empty")
        }else  if(password!==confirmPassword){
           return  setConfirmPasswordError("password and Confirm Password Should Be Same")
        }else{
            setConfirmPasswordError("")
        } if(mobileNumber ===""){
            return setMobileError("Mobile Number Cannot Be Empty")
        }else{
            setMobileError("")
        } if(state ===""){
            return setStateError("State Cannot Be Empty")
        }else{
            setStateError("")
        }
        let response = await fetch("http://localhost:2025/usersignup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({fullName,email,password,mobileNumber,state})
    })
    let data = await response.json()
    console.log(data)
    console.log(response.status)
    if(response.status===409){
        // alert("Email Already Exist")
        setEmailError(data.error)
        // setFullName("")
        // setEmail("")
        // setMobileNumber("")
        // setState("")
        return 
    }
    if(response.status===200){
    navigate("/signin")
   }
}catch(err){
    console.log("error" + err)
}}

function handlePasswordIcon(){
    let eyeIcon  = document.querySelector(".eyeIconI")
    console.log(eyeIcon)
    if(text === "text"){
        eyeIcon.classList.add("fa-eye-slash")
        eyeIcon.classList.remove("fa-eye")
        setText("password")
    }else{
        eyeIcon.classList.add("fa-eye")
        eyeIcon.classList.remove('fa-eye-slash')
        setText("text")
    }
}
function handleConfirmPasswordIcon(){
    let eyeIcon =document.querySelector(".eyeIconTwo")
    console.log(eyeIcon)
    if(confirmText==="text"){
        eyeIcon.classList.add("fa-eye-slash")
        eyeIcon.classList.remove("fa-eye")
     
        setConfirmText("password")
    }else{
        eyeIcon.classList.remove("fa-eye-slash")
        eyeIcon.classList.add("fa-eye")
        setConfirmText("text")
    }
}

    return (
        <>
        <div className={`${style.formContainer}`}>
            <div className={`${style.formBox}`}>
                <form onSubmit={handleForm} className={`${style.form}`}>
                {/* <div className={`${style.inputGroup}`}> */}
                <div className="position-relative text-align-center">
                <h1 className={`${style.formTitle}`}>signup</h1>
                </div>
                    <div className={`${style.inputBox}`}>
                        <div className={`${style.inputMinBox}`}>
                        <input type="text" onChange={(e)=>setFullName(e.target.value.trim())} value={fullName}  className={`${style.signupField}`} placeholder='Full Name'></input>
                        <small className={`${style.errorMessage}`}>{nameError}</small>
                        </div>
                    {/* </div>
                    <div className={`${style.inputBox}`}> */}
                    <div className={`${style.inputMinBox}`}>
                        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value.trim())} className={`${style.signupField}`}  placeholder='Email'></input>
                        <small className={`${style.errorMessage}`}>{emailError}</small>
                        </div>
                       
                    </div>
                    <div className={`${style.inputBox}`}>
                    <div className={`${style.inputMinBox} position-relative`}>
                        <input type={text} value={password} onChange={(e)=>setPassword(e.target.value.trim())} className={`${style.signupField}`} placeholder="Password"></input>
                        <small className={`${style.errorMessage}`}>{passwordError}</small>
                        <div className={style.eyeIcon}>
                             <i className="fa-solid fa-eye-slash fa-lg eyeIconI" onClick={()=>handlePasswordIcon()}></i>
                        </div>
                        </div>
                        <div className={`${style.inputMinBox} position-relative`}>
                        <input type={confirmText} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value.trim())} className={`${style.signupField}`} placeholder="Confirm Password"></input>
                        <small className={`${style.errorMessage}`}>{confirmPasswordError}</small>
                        <div className={style.eyeIconTwo}>
                            <i className="fa-solid fa-eye-slash fa-lg eyeIconTwo" onClick={()=>handleConfirmPasswordIcon()}></i>
                        </div>
                        </div>
                    </div>
                    <div className={`${style.inputBox}`}>
                    <div className={`${style.inputMinBox}`}>
                        <input type="text" value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value.trim())} name="mobilenumber" className={`${style.signupField}`} placeholder='Mobile Number'></input>
                        <small className={`${style.errorMessage}`}>{mobileError}</small>
                        </div>
                    {/* </div>
                    <div className={`${style.inputBox}`}> */}
                        <div className={`${style.inputMinBox}`}>
                        <input type="text" value={state} onChange={(e)=>setState(e.target.value.trim())} className={`${style.signupField}`} name="state"  placeholder='State'></input>
                        <small className={`${style.errorMessage}`}>{stateError}</small>
                        </div>
                    </div>
                    <div className={`${style.haveAnAccount}`}>
                        <small>I Am Already Member ? </small>{'\u00A0'}<Link to="/signin">Signin</Link>
                    </div>
                    <div className={`${style.buttonBox}`}>
                        <button className={`${style.signupField}`}>Sign up</button>
                    </div>
                {/* </div> */}
                </form>
            </div>

        </div>
        </>
    )

}