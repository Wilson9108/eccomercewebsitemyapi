import {useContext,useState,useEffect} from 'react'
import {myContext} from '../Config'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import style from './productsData.module.css'

export default function ProductsData(){
    const navigate = useNavigate()
    const [getProductId,setGetProductId] = useState(null)
    const [getDeleteId,setDeleteId]=useState("")
    const [values,setValues]=useState({
        title:"",
        description:"",
        price:"",
        category:""
    })
    const [titleError,setTitleError]=useState("")
    const [descriptionError,setDescriptionError]=useState("")
    const [priceError,setPriceError]=useState("")

    let {fetchProductData,fetchData,categoryData}=useContext(myContext)
    // fetchProductData.map(item=>{ 
    //         console.log(item.category)
     
    // })


//products update section
    const handleProductsData=(data)=>{
        console.log(data)
        setGetProductId(data.id)
        setValues({...values,title:data.title,description:data.description,category:data.cid,price:data.price})
    }
    const handleInputChange=(e)=>{
        console.log(e)
        let {name,value}=e.target
        console.log(name, value)
        setValues((curValues)=>{
            return {
                ...curValues,
                [name]:value

            }
        })
    }
    const updateProductsData= async()=>{
        if(values.title===""){
            setTitleError("Title Cannot Be Empty")
            return
        }else{
            setTitleError("")
        }if(values.description===""){
            setDescriptionError("Description Cannot Be Empty")
            return
        }else{
            setDescriptionError("")
        }if(values.price===""){
            setPriceError("Price Cannot Be Empty")
            return
        }else{
            setPriceError("")
        }
        
        let response = await fetch(`http://localhost:2025/updateproductsdata/${getProductId}`,{
            method:"put",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({values})
        })
        console.log(response)
        toast.success("updated successfully",{
            autoClose:2000
        })
         fetchData()
         setTimeout(()=>{
            setGetProductId(null)

         },500)
         
        
    }
    //delete products Data

    const handleDeleteGetId=(id)=>{
        setDeleteId(id)
    }

    const deleteProductData= async(id)=>{
        let response = await fetch(`http://localhost:2025/deleteproductsdata/${id}`,{
            method:"delete"
        })
        toast.success("Deleted Successfully",{
            autoClose:2000
        })
        fetchData()


    }

    return(
        <>
       
        <div className={style.productsTableContainer}>
           
            <table>
            <h3 className={style.productsTitle}>Products Table</h3>
                <tr className={style.thContainer}>
                    <th>Title</th>
                    <th>Description</th>
                    <th>category</th>
                    <th>price</th>
                    <th colSpan={2}>Actions</th>
                </tr>
                {fetchProductData.map(products=>(
                <tr className={style.tdContainer}>
                        <td>{getProductId===products.id? <div> <input name='title' value={values.title} type="text" placeholder='Title' onChange={handleInputChange}/> <small className={style.errorMessage}>{titleError}</small> </div>: products.title!==null?  products.title.slice(0,25):""}</td>
                        <td>{getProductId===products.id?<div> <input name='description' value={values.description} type='text' placeholder='Description' onChange={handleInputChange}/> <small className={style.errorMessage}>{descriptionError}</small></div> : products.description!==null?products.description.slice(0,25):""}</td>
                        <td>{getProductId===products.id?

                         <select name='category'  onChange={handleInputChange}>
                            <option value={products.cid} >{products.category}</option>
                            {categoryData.map((category)=>(
                                <option value={category.cid}>{category.category}</option>))}
                         </select>

                         :<span value={products.cid}>{products.category}</span>}</td>
                        <td>{getProductId===products.id?<div> <input name='price' value={values.price} type='text' placeholder='Price' onChange={handleInputChange}/><small className={style.errorMessage}>{priceError}</small> </div>: products.price}</td>
                        <td>{products.id===getProductId?<><button className={style.saveBtn} onClick={updateProductsData}>Save</button><button onClick={()=>setGetProductId(null)} className={style.cancelBtn}>cancel</button></>:<button className={style.updateBtn}  onClick={()=>handleProductsData(products)}>Update</button>}</td>
                        <td><button className={style.deleteBtn} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>handleDeleteGetId(products.id)}>Delete</button></td>
                </tr>
                 ))}
            </table>
        </div>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">{getDeleteId}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Are Your Sure You Want To Delete ?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=>deleteProductData(getDeleteId)}>Yes</button>
      </div>
    </div>
  </div>
</div>

        </>
    )
}