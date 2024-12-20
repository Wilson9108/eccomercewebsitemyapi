import React, { useState, useEffect } from 'react';

function UserProfile() {
    const [userData, setUserData] = useState("");
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const getData = async () => {
        const token = localStorage.getItem('token'); 

        if (!token) {
          setError('No token found');
          setLoading(false);
          return;
        }
        
        const response = await fetch('http://localhost:5000/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        }); 
        let result=await response.json()
        console.log(result)
        setUserData(result.user)
            alert(result.message)
  };
  

  useEffect(()=>
{
    getData()
},[])
    console.log(userData)
    return (
        <div>
            <h1>Hi Welcome to your profile</h1>

                <div>
                    <h2>Profile Information:</h2>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                  
                </div>
          
        </div>
    );
}

export default UserProfile;
