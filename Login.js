import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom' 
function Login() {

    let [Emailid, setEmailid] = useState("");
    let [password, setpassword] = useState("");
    const navigate = useNavigate();
    let formSubmitHandler = async (e) => {
        e.preventDefault()
        let response = await fetch(`http://localhost:5000/userLogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({  Emailid, password }),
        });
        let result=await response.json()
        const token = result.token;
        console.log(token)
        // Store the JWT token in localStorage
        localStorage.setItem('token', token);
        navigate('/uprofile')
        alert(result.message)
      
        setEmailid("")
        setpassword("")
    }
  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <input type="email"  value={Emailid} onChange={(e) => { setEmailid(e.target.value) }} placeholder='Email ID'></input>
        <br></br>
        <input type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} placeholder='password'></input>
        <br></br>
        <input type="submit"></input>
      </form>
    
    </div>
  )
}

export default Login
