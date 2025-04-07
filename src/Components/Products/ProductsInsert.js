import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import style from './productsinsert.module.css'

export default function  ProductsInsert(){
    const [imageData,setImageData]=useState(null)
    const [title , setTitle] = useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState("")
    const [category,setCategory]=useState([])
    const [selectCategory,setSelectCategory]=useState("")
    const [titleError,setTitleError]=useState("")
    const [descriptionError,setDescriptionError]=useState("")
    const [priceError,setPriceError]=useState("")
    const [selectCategoryError,setSelectCategoryError]=useState("")
    const [imageDataError,setImageDataError]=useState("")

    async function categoryData(){
        let response = await fetch("http://localhost:2025/categoryData")
        let data = await response.json()
        console.log(data)
        setCategory(data)

    }
    useEffect(()=>{
        categoryData()
    },[])
    let id = category.map(data=>data.cid)
    console.log(id)
    
    function imageHandler(e){
        console.log(e)
        console.log(e.target.files[0])
        setImageData(e.target.files)
    }
    // console.log(imageData)
   async function formHandler(e){
        e.preventDefault()
        if(title ===""){
           setTitleError("Please Enter Title")
            return
        }else{
            setTitleError("")
        }
        if(description ===""){
            setDescriptionError("please enter Description")
            return
        }else{
            setDescriptionError("")
        }if(price===""){
            setPriceError("Please Enter Price")
            return
        }else{
            setPriceError("")
        }if(selectCategory ===""){
            setSelectCategoryError("please select category")
            return
        }else{
            setSelectCategoryError("")
        }
        if(imageData===null ){
            setImageDataError("Choose The File")
            return
        }else{
            setImageDataError("")
        }

        let formData = new FormData()
        console.log(formData)
        console.log(imageData)
       formData.append('image',imageData[0])
       formData.append('title',title)
       formData.append('description',description)
       formData.append('price',price)
       formData.append('category',selectCategory)
        console.log(typeof formData)
        let response = await fetch('http://localhost:2025/uploadFile',{
            method:'post',
            body:formData
        })
        
        console.log(response)
        let result  = await response.json()
        console.log(result)
        alert("products Data inserted successfully")
        setImageData("")
        setTitle("")
        setDescription("")
        setPrice("")
        setSelectCategory("")
        setImageData("")
    }

    
    return(
        <>
        <div className={`${style.formContainer}`}>
        <div className={`${style.formBox}`}>
        <form onSubmit={formHandler} >
            <h1 className={`${style.formTitle}`}>Products Insert</h1>
            <div className={`${style.inputBox}`}>
         <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Product Title'/>   
         <small className={style.errorMessage}>{titleError}</small>
         </div>
         <div className={`${style.inputBox}`}>
         <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Product Description'/>
         <small className={style.errorMessage}>{descriptionError}</small>
         </div>
         <div className={`${style.inputBox}`}>
         <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Product Price"/>
         <small className={style.errorMessage}>{priceError}</small>
         </div>
         <div className={`${style.inputBox}`}>
         <select value={selectCategory} onChange={(e)=>setSelectCategory(e.target.value)}>
         <option value="">select Category</option>
         {category.map(data=>(
                 <option value={data.cid} key={data.cid}>{data.category}</option>
                ))}
         </select>
         <small className={style.errorMessage}>{selectCategoryError}</small>
         </div>
         <div className={`${style.inputBox}`}>
        <input type="file" onChange={imageHandler}/>
        <small className={style.errorMessage}>{imageDataError}</small>
        </div>
        <div className={style.category}>
        <p><Link to="/category">Add Category?</Link></p>
        </div>
        <div className={`${style.inputBox}`}>
        <button type="submit" className={style.addBtn} >Add</button>
        </div>
        </form>

        </div>
        </div>
        </>
    )
}