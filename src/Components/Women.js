import {useContext} from 'react'
import style from '../cssFiles/products.module.css'
import {Link} from 'react-router-dom'
import {myContext} from './Config'
export default function Women() {
    const {getData,fetchProductData,indianCurrency,fullTitle,handleTitle,ratingArray} = useContext(myContext)
    const showWomenClothing = fetchProductData.filter(item=>item.category=== "women's clothing")

//   for(let i=0; i<showWomenClothing.length-1; i++){
//         let random = Math.floor(Math.random()*(i+1));
//       [showWomenClothing[i],showWomenClothing[random]]=[showWomenClothing[random],showWomenClothing[i]]
//    }
let spanStyle={
    color:"red",
    padding:"0px 5px",
    fontSize:"10px",
    display:"inline-block",
    backgroundColor:"red",
    margin:"0px 0px 20px 0px",
    color:"white",
    borderRadius:"3px"
}
    return (
        <>
            <div className={`${style.productsContainer}`}>
                <div className={`${style.productsTitleCon}`}>
                <h1> <Link to="/allproducts" >All Products </Link></h1> 
                    <h1> <Link to="/men" className="mx-5">Men</Link></h1>
                    <h1><Link to="/women">Women</Link></h1>
                    <h1><Link to="/mobiles">Mobiles</Link></h1>
                    <h1><Link to="/laptops">Laptops</Link></h1>
                </div>
                <div className={`${style.productsCards}`}>
                    {showWomenClothing.map(products => (
                        <div className={`${style.productBox}`} key={products.id}>
                            <img src={`http://localhost:2025/uploads/${products.image}`} className={`${style.cardImg}`}></img>
                            <div className={`${style.cardBody}`}>
                                <h5>{products.title.slice(0,20)} <span onClick={()=>handleTitle(products.id)}>{fullTitle===products.id? products.title.slice(): <Link className="text-primary text-decoration-none ">....more</Link>}</span> </h5>
                                <code>{products.category}</code>
                                <p><code className="mx-1"><del>${products.price}</del></code> {Math.round(products.price* indianCurrency)}</p>
                                {/* <span  style={spanStyle}>{products.rating.rate}{'\u00A0'}&#128970;</span> */}
                                {/* {ratingArray.map((value,index)=>(
                                <span style={{color:products.rating.rate>index?"rgb(246, 228, 41)":""}} className={`${style.starRating}`}>&#128970;</span>
                            ))} */}
                                <br></br>
                                <Link to="/cart" className={`${style.AddToCartBtn}`} onClick={() => getData({ ...products, quantity: 1 })}>Add to Cart</Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`${style.productsViewMore}`}>
                    <Link to="/women">ViewMore</Link>
                </div>
            </div>
        </>
    )
}