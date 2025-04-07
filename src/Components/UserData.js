import  {useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import style from  '../cssFiles/userdata.module.css'

export default function UserData(){
  const navigate  = useNavigate()
    const [fetchData,setFetchData]=useState([])
    const [updateValues,setUpdateValues]=useState({
      fullname:"",
      email:"",
      mobilenumber:"",
      state:""
    })
    console.log(updateValues)
    const [fullNameError,setFullNameError] =  useState("")
    const [emailError,setEmailError]=useState("")
    const [mobileNumberError,setMobileNumberError]=useState("")
    const [stateError,setStateError]=useState("")

    const[getUserData,setGetUserData]=useState(null)
    const [getId,setGetId]=useState("")

    async function userData(){
        let response = await fetch("http://localhost:2025/api/users")
        let data = await response.json()
        setFetchData(data)
      }
      useEffect(()=>{
        userData()
      },[])

//handle get id
      const handleGetId=(id)=>{
        setGetId(id)
        console.log("id from handle get id" + id)
      }

//handle delete
    const handleDelete = async(id)=>{
        try{
        console.log("id from handledelete " + id)
        let response = await fetch(`http://localhost:2025/userdelete/${id}`,{
            method:"delete"
        })
        let data = response.json()
        console.log(data)
        if(response.ok){
         userData()
         console.log("deleted successfully")
         toast.success(id + " user deleted successfully",{
            autoClose:2000,
            style:{
                backgroundColor:'rgb(230, 189, 139)',
                color:"white",
                boxShadow:"0px 0px 10px white"
            }
         })
        }
    }catch(err){
        console.log("error : " + err)
    }
    }

    //update
    
    function getAndSetUserDataForUpdate(data){
      console.log(data)
      setGetUserData(data.user_id)
      setUpdateValues({fullname:data.user_name,email:data.user_email,mobilenumber:data.user_mobile,state:data.user_state})
    }
    function handleCancel(){
      setGetUserData(null)
    }

    const updateInputHandler=(e)=>{
      let {name,value}=e.target
      setUpdateValues((prevValues)=>{
        console.log(prevValues)
       return {...prevValues,
        [name]:value
       }
        
      })
    }

    async function handleUpdate(){
      if(updateValues.fullname===""){
        setFullNameError("Fullname Cannot Be Empty")
        return
      }else{
        setFullNameError("")
      }
      if(updateValues.email===""){
        setEmailError("Email Cannot Be Empty")
        return
      }else{
        setEmailError("")
      }if(updateValues.mobilenumber===""){
        setMobileNumberError("MobileNumber Cannot Be Empty")
        return
      }else{
        setMobileNumberError("")
      }if(updateValues.state===""){
        setStateError("State Cannot Be Empty")
        return
      }else{
        setStateError("")
      }
      let response = await fetch(`http://localhost:2025/userupdate/${getUserData}`,{
        method:"put",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({updateValues})
      })
      console.log(response)
      let data =  await response.json()
      console.log("data" + JSON.stringify(data))
      toast.success(`user Update Successfully ${getUserData}`,{
        autoClose:2000,
        style:{
          backgroundColor:"rgb(230, 189, 139)",
          color:"white",
          boxShadow:"0px 0px 10px black"
        }
      })
      userData()
      setTimeout(()=>{
        setGetUserData(null)
      },500)
    }

    return(
        <>
        <div className={`${style.tableContainer}`}>
       
        <table>
          
            <thead>
            <h3 className={style.tableTitle}>User Data</h3>
            <tr className={style.userDataTableRow}>    
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>State</th>
            <th colSpan={2}>Actions</th>
            </tr>
            </thead>
        {fetchData.map(item=>(
            <tbody key={item.user_id} onClick={()=>handleGetId(item.user_id)}>
           <tr className={style.userDataTableRowOne}>
            <td>{item.user_id===getUserData?<div><input type="text" name="fullname" onChange={updateInputHandler} value={updateValues.fullname} className="name"></input><small className={style.errorMessage}>{fullNameError}</small></div>:(item.user_name)}</td>
            <td>{item.user_id===getUserData?<div><input type="text" name="email"  onChange={updateInputHandler} value={updateValues.email}></input><small className={style.errorMessage}>{emailError}</small></div>:(item.user_email)}</td>
            <td>{item.user_id===getUserData?<div><input type="text" name="mobilenumber" onChange={updateInputHandler} value={updateValues.mobilenumber}></input><small className={style.errorMessage}>{mobileNumberError}</small></div>:(item.user_mobile)}</td>
            <td>{item.user_id===getUserData?<div><input type="text" name="state" onChange={updateInputHandler} value={updateValues.state}></input><small className={style.errorMessage}>{stateError}</small></div>:(item.user_state)}</td>
            {/* <td><Link to={`/userupdate/${item.user_id}`} className={`${style.updateBtn}`}>Update</Link></td> */}
            {item.user_id===getUserData?<td><button className={`${style.saveBtn} btn btn-primary`} onClick={()=>handleUpdate()}>save</button> <button className={`${style.cancelBtn} btn btn-danger`} onClick={()=>handleCancel()}>cancel</button></td> : <td><button  className={`${style.updateBtn}`} onClick={()=>getAndSetUserDataForUpdate(item)}>Update</button></td>}
            {/* <td><button className={`${style.deleteBtn}`} onClick={()=>handleDelete(item.user_id)}>Delete</button></td> */}
            <td><button type="button"  className={`${style.deleteBtn}`} data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button></td>
            
           </tr>
           </tbody>
        ))}
</table>
</div>



<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">{getId}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Are You Sure You Want to Delete</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
        <button type="submit" class="btn btn-danger"  data-bs-dismiss="modal"  onClick={()=>handleDelete(getId)} >YES</button>
      </div>
    </div>
  </div>
</div>

        
        </>
    )
}