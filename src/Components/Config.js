import {useState,createContext,useEffect} from 'react'


import App from '../App'
export const myContext = createContext();
export default function Config(){
    const [cartData,setCartData]=useState([])
    const [fetchProductData,setFetchProductData]=useState([])
    const [indianCurrency,setIndianCurrency]=useState([])
    const [fullTitle , setFullTitle]=useState("")
    const [categoryData,setCategoryData]=useState([])

// fakestoreapiproductsfetching    
    
    async function fetchData(){
        let response = await fetch("http://localhost:2025/productsData")
        let data = await response.json()
        setFetchProductData(data)
    }
    // console.log(fetchProductData)
    async function fetchCategoryData(){
        let response = await fetch("http://localhost:2025/categoryData")
        let data = await response.json()
        // console.log(data)
        setCategoryData(data)
    }
    console.log(categoryData)
    
    useEffect(()=>{
    fetchData()
    fetchCategoryData()

},[])



// console.log(fetchProductData.map(item=>item.image))s


const ratingArray = new Array(5).fill(0)
// console.log(ratingArray)

//handletitle
function handleTitle(id){
    setFullTitle(fullTitle===id?"":id)
}

// indianCurrency
useEffect(()=>{
let currencyObj =[{INR:84.07}]
let obj  = currencyObj.map(item=>item.INR)
console.log(obj)
setIndianCurrency(obj)    
},[])


// getcartData
    function getData(product){
        console.log(cartData)
        console.log(Array.isArray(product))
        let findindex =cartData.findIndex((item)=>item.id===product.id)
        console.log(findindex)
        if(findindex===-1){
        setCartData([...cartData,product])
        }else{
            incrementQuantity(product)
        }
    }

// incrementQuantityfromcart
    function incrementQuantity(product){
        console.log(product.quantity)
        let copy =  cartData.slice() 
        console.log(copy)
        const cartDataQuantity =cartData.findIndex(item=>item.id === product.id)
        if(product.quantity>1 || product.quantity<=1){
        copy[cartDataQuantity].quantity+=1
        // console.log(`id: ${copy[cartDataQuantity].id} , Quantity : ${copy[cartDataQuantity].quantity}`)
        setCartData(copy)
        }
    }
    // console.log(cartData)

// decrementQuantityfromcart    
    function decrementQuantity(product){
        let copy = cartData.slice()
        const cartDataQuantity = cartData.findIndex(item=>item.id === product.id)
        if(copy[cartDataQuantity].quantity>1){
        copy[cartDataQuantity].quantity-=1
        // console.log(`id : ${copy[cartDataQuantity].id}  Quantity: ${copy[cartDataQuantity].quantity} `)
        }
        setCartData(copy)
    }

// removeproductfromcart
    function removeProduct(product){
        console.log(product.id)
        let remove = cartData.filter(item =>item.id!==product.id)
        setCartData(remove)
    }

//totalquantityCalculate
    function totalQuantityCalculate(){
        // console.log(cartData)
        let copy = cartData
        // console.log(copy)
        let calculate = copy.reduce((acc,curr)=>acc+curr.price * curr.quantity,0)
        // console.log(Math.round(calculate))
        return Math.round(calculate)
    }
    totalQuantityCalculate()

    // console.log(cartData)
    return(
        <>
        <myContext.Provider value={{categoryData,fetchData,getData,fetchProductData,cartData,ratingArray,incrementQuantity,decrementQuantity,removeProduct,totalQuantityCalculate,indianCurrency,handleTitle,fullTitle}}>
            <App/>
        </myContext.Provider>
        </>
    )
}