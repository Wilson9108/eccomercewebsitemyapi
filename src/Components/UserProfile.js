import {useContext, useEffect,useState } from 'react'
import style from '../cssFiles/userprofile.module.css'
import {Link,useNavigate} from 'react-router-dom'

import { myContext } from './Config'

export default function UserProfile(){
  
    let navigate = useNavigate()
    let usertoken = localStorage.getItem('usertoken')
    console.log("token form userprofile" , usertoken)
    function handleLogOut (){
        localStorage.removeItem('usertoken')
        localStorage.removeItem("userrole")
        // navigate("/signin")
    }

    useEffect(()=>{
        if(!usertoken){
            navigate("/signin")
        }

    },[usertoken])
    const [userDetails,setUserDetails]=useState("")
    async function verifytoken(){
        let usertoken = localStorage.getItem('usertoken')
        console.log(usertoken)
        if(!usertoken){
            console.log("no token")
            navigate("/signin")
        }

        let response = await fetch("http://localhost:2025/userprofile",{
            method:"get",
            headers:{
                'Authorization':`Bearer ${usertoken}`,
                'Content-Type':'application/json'
            }
           
        })
        console.log(`response in userprofile ${response.status}`)
        console.log(response)
        let data   = await response.json()
        console.log(data.role)
        localStorage.setItem('userrole',data.role)
        setUserDetails(data)
        if(response.status===404){
            navigate("/signin")
            return
        }
      
    }
    useEffect(()=>{
        verifytoken()

    },[])
    console.log(userDetails)
    
    return(
        <>
        <div className={style.profileContainer}>
        <div className={style.profilebox}>
        <div className={style.profileSection}>
        <h1 className={style.profileHeading}>Profile</h1>
        <div className={style.profileImg}>
            <div className={style.img}></div>
        </div>
        <h1>{userDetails.role}</h1>
        <h1 className={`text-light mt-3 ${style.name}`}><span className={`${style.arrowmark}`}>⇝</span>{userDetails.user_name}<span className={style.arrowmarkone}>⇝</span></h1>
        <p className={`text-light mt-2 ${style.mobile}`}><span className={`${style.arrowmark}`}>⇝</span>{userDetails.user_mobile}<span className={`${style.arrowmarkone}`}>⇝</span></p>
        <p className={`text-light ${style.state}`}><span className={`${style.arrowmark}`}>⇝</span>{userDetails.user_state}<span className={`${style.arrowmarkone}`}>⇝</span></p>
        </div>
        </div>

        <div className={style.myorderContainer}>
            <h1 className={style.myorderstitle}>My Orders</h1>
            <div className={style.iconsContainer}>
            <div className={style.icons}>
                <div>
            <i class="fa-solid fa-wallet fa-2xl" style={{color: "#74C0FC"}}></i>
            <p>Payments</p>
            </div>
            </div>
            <div className={style.icons}>
                <div>
            <i class="fa-solid fa-truck fa-2xl" style={{color: "#FFD43B"}}></i>
            <p>Delivered</p>
            </div>
            </div>
            <div className={style.icons}>
                <div>
            <i class="fa-solid fa-box fa-2xl" style={{color: '#abb4c4'}}></i>
            <p>Orders</p>
            </div>
            </div>
            <div className={style.icons}>
                <div>
            <i class="fa-solid fa-headset fa-2xl" style={{color: "#919cb1"}}></i>
            <p>Customer Care</p>
            </div>
            </div>
            <div className={style.icons}>
            <div>
            <i class="fa-solid fa-heart fa-2xl" style={{color: "#ff0505"}}></i>
            <p>Wishlist</p>
            </div>
            </div>
            </div>
        </div>

        <div className={`${style.conclusion}`}>
        <Link className={`${style.editProfile} text-center text-light  mb-5 d-block text-decoration-none`}> <i class="fa-solid fa-user "></i>{'\u00a0'} Edit Profile{'\u00a0'} <i class="fa-solid fa-chevron-right "></i></Link>
        
        <Link className={`${style.address} text-center text-light mb-3 d-block text-decoration-none`}> <i class="fa-regular fa-address-book"></i> {'\u00a0'} Address {'\u00a0'}<i class="fa-solid fa-chevron-right"></i></Link>
        
        </div>
        <hr></hr>
        <div className={style.logoutContainer}>
        <Link to="" className={`${style.logout} text-center p-4 text-light d-block text-decoration-none`} onClick={()=>handleLogOut()} > <i class="fa-solid fa-right-from-bracket"></i> {'\u00a0'} Logout</Link >
        </div>
        </div>
       
        </>
    )
}