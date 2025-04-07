import {useState,useEffect} from 'react'
import { useParams,Link,useNavigate } from 'react-router-dom'
import style from '../cssFiles/userupdate.module.css'
export default function UserUpdate(){
    let {userid}=useParams()
    let navigate = useNavigate()
    console.log(userid)
    const [fullname,setFullName]=useState("")
    console.log(fullname)
    const [email,setEmail]=useState("")
    const [mobilenumber,setMobileNumber]=useState("")
    const [state,setState]=useState("")
    const [nameError,setNameError]=useState("")
    const [emailError,setEmailError]=useState("")
    const [mobileError,setMobileError]=useState("")
    const [stateError,setStateError]=useState("")


    const fetchDataWithId= async()=>{
        let response = await fetch(`http://localhost:2025/api/users/${userid}`)
        let data =await response.json()
             setFullName(data[0].user_name)
            setEmail(data[0].user_email)
            setMobileNumber(data[0].user_mobile)
            setState(data[0].user_state)
    }
    useEffect(()=>{
        fetchDataWithId()
    },[])

    
    const handleUpdate= async(e)=>{
        e.preventDefault()
        let isError = false;
        if(fullname===""){
              setNameError("Name Cannot Be Empty")
              isError = true;                
        }else{
            setNameError("")
        }if(email===""){
            setEmailError("Email Cannot Be Empty")
            isError = true
            
        }else{
            setEmailError("")
        }if(mobilenumber===""){
            setMobileError("Mobile Number Cannot Be Empty")
            isError = true
            
        }else{
            setMobileError("")
        }if(state===""){
            setStateError("State Cannot Be Empty")
            isError = true
        }else{
            setStateError("")
        }       
        if(isError){
            console.log(isError)
            return 
        }else{
        
        let response = await fetch(`http://localhost:2025/userupdate/${userid}`,{
            method:"put",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({fullname,email,mobilenumber,state})
        })
        console.log(response)
        console.log(response.status)
        if(response.status===200){
            navigate("/userdata")
        }
        }
    
    }


    return(
        <>
        <div className={`${style.updateFormContainer}`}>
            <div className={`${style.updateFormBox}`}>
        <form onSubmit={handleUpdate} className={`${style.updateForm}`}>
            <div className={`${style.inputGroup}`}>
            <h1 className={`${style.formTitle}`}>Update</h1>
            <div className={`${style.inputBox}`}>
            <input placeholder="Full Name" value={fullname} onChange={(e)=>setFullName(e.target.value)}></input>
            <small className={`${style.errorMessage}`}>{nameError}</small>
            </div>
            <div className={`${style.inputBox}`}>
            <input placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <small className={`${style.errorMessage}`}>{emailError}</small>
            </div>
            <div className={`${style.inputBox}`}>
            <input placeholder='MobileNumber' value={mobilenumber} onChange={(e)=>setMobileNumber(e.target.value)}></input>
            <small className={`${style.errorMessage}`}>{mobileError}</small>
            </div>
            <div className={`${style.inputBox}`}>
            <input placeholder="State" value={state} onChange={(e)=>setState(e.target.value)}></input>
            <small className={`${style.errorMessage}`}>{stateError}</small>
            </div>
            <div className={`${style.buttonBox}`}>
            <input value="update" className={`${style.updateBtn}`} type="submit"></input>
            </div>
            </div>
        </form>
        </div>
        </div>
        </>
    )
}