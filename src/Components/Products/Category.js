import {useState} from 'react'
import { Link} from 'react-router-dom'
import style from './category.module.css'

export default function Category(){
    const [category,setCategory]=useState("")
    const [categoryError,setCategoryError]=useState("")

    async function handleForm(e){

        e.preventDefault()
        if(category===""){
            setCategoryError("Please Enter Category")
            return
        }else{
            setCategoryError("")
        }
        let response = await fetch('http://localhost:2025/categoryinsert',{
            method:'post',
            headers:{'Content-Type':'application/json'}
            ,body:JSON.stringify({category})
        })
        let data = await response.json()
        console.log(data.message)
        if(response.status===200){
        alert("Category Inserted Successfully")
        }
        if(response.status===409){
            setCategoryError(data.message)
        }
        setCategory("")
    }

    return(
        <>
        <div className={style.formContainer}>
        <form onSubmit={handleForm}>
            <div className={style.inputBox}>
            <input type="text" className={style.categoryInput} value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Category"/>
            <input type="submit" className={style.addBtn} value="Add"/>
            <small className={style.errorMessage}>{categoryError}</small>
            <p className={style.addproducts}><Link to="/productsinsert">add Products ?</Link></p>
            </div>
           
        </form>
        </div>

        </>
    )
}