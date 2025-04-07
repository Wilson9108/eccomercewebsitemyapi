import {useState,useEffect,useContext} from 'react'
import style from '../cssFiles/products.module.css'
import {Link,useNavigate} from 'react-router-dom'
import { myContext } from './Config'
const ProductsDisplay = () => {
  const navigate = useNavigate()
  const [cartDetails,setCartDetails]=useState([])
  const {getData,fetchProductData,indianCurrency,fullTitle,handleTitle,ratingArray,cartData}=useContext(myContext)
  console.log(cartData)
  // for(let i=0; i<fetchProductData.length-1; i++){
  //   let random = Math.floor(Math.random()*(i+1));
  //   [fetchProductData[i],fetchProductData[random]]=[fetchProductData[random],fetchProductData[i]]
  // }

  // async function getCartDetails(products){
  //     console.log("cartdetails : ", products)
  //       setCartDetails([products])
  // }

  async function handleAddToCart(products){
    console.log("products in handle add to cart " , products)
    await setCartDetails(products)
    //  getData(products)
    await cartData.map(item=> console.log(item))
    navigate('/cart')
  }


  return (
    <>
                  <div className={`${style.productsContainer}`}>
                <div className={`${style.productsTitleCon}  `}>
                    <h1> <Link to="/allproducts" >All Products </Link></h1> 
                    <h1> <Link to="/men" className="mx-5">Men</Link></h1>
                    <h1><Link to="/women">Women</Link></h1>
                    <h1><Link to="/mobiles">Mobiles</Link></h1>
                    <h1><Link to="/laptops">Laptops</Link></h1>
                </div>
                <div className={`${style.productsCards}`}>
                {fetchProductData.map(products=>{
                  // console.log(products)
                   return  <div className={`${style.productBox}`} key={products.id}>
                    <img src= {`http://localhost:2025/uploads/${products.image}`} className={`${style.cardImg}`}></img>
                    <div className={`${style.cardBody}`}>
                     <h5>{products.title.slice(0,20)}<span onClick={()=>handleTitle(products.id)}>{fullTitle===products.id? products.title.slice() : <Link className="text-primary text-decoration-none">....more</Link>}</span></h5>
                        <code>{products.category}</code>
                        <p><code className="mx-1"><del>${products.price}</del></code>  {Math.round(products.price)}/-</p>
                        {/* {ratingArray.map((value,index)=>(
                        <span style={{color:products.rating.rate>index?"rgb(246, 228, 41)":""}} className={`${style.starRating}`}>&#128970;</span>
                        ))} */}
                         {/* <span>{products.rating.rate}</span> */}
                        <br></br>
                    <Link className={`${style.AddToCartBtn}`} onClick={(e)=>{getData({...products,quantity:1});handleAddToCart({...products,quantity:1})}}>Add to Cart</Link>
                    </div>
                    </div>
})}
                 </div>
                 <div className={`${style.productsViewMore}`}>
                 <Link to="/allproducts">ViewMore</Link>
                 </div>
    </div>
    </>
  )
}

export default ProductsDisplay