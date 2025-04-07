import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
export default function Adminprofile(){
    const navigate = useNavigate()
    const [adminDetails,setAdminDetails]=useState("")
    let admintoken = localStorage.getItem("admintoken")

    async function verifyToken(){
       
        console.log("admintoken from  admin profile",admintoken)
        let response = await fetch("http://localhost:2025/adminprofile",{
            method:"GET",
            headers:{
                'authorization':`Bearer ${admintoken}`,
                'content-type':'application/json',
            },
        })
        console.log(response)
        let data = await response.json()
        console.log("data from admin profile", data[0].admin_email)
        let adminrole = data.role
        localStorage.setItem("adminrole",adminrole)
    }

    useEffect(()=>{
        if(!admintoken){
            navigate("/adminsignin")
        }
        verifyToken()
    },[admintoken])


    return(
        <>
        </>
    )
}