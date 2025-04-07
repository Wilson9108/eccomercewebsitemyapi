import {useState,useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
// import style from '../cssFiles/products.module.css'
import cartstyle from '../cssFiles/addtocart.module.css'
import { myContext } from './Config'
export default function AddToCart(){
    const [fullTitle,setFullTitle]=useState("")
    const navigate  = useNavigate()
    const {cartData,incrementQuantity,decrementQuantity,removeProduct,totalQuantityCalculate,indianCurrency} =useContext(myContext)

    cartData.forEach(item=>{
        console.log("cart data " , item)
    })

    const handleClick=()=>{
        navigate("/allproducts")
    }
    
    console.log('before functions fulltitle' , fullTitle)
    const  handleTitle=(id)=>{
        setFullTitle(fullTitle===id?"":id)
        console.log(fullTitle)
    }

    return(
        <>
        {cartData.length>0 &&
         <div className={`${cartstyle.productsTitleCon}`}>
             <h1>My Cart</h1>
         </div>
} 
        {cartData.length>0 &&
         <>
         <div className={`${cartstyle.productsContainer}`}>
            <div className={`${cartstyle.productsCardsContainer}`}>
                    <div className={`${cartstyle.productsCards}`}>
                        {cartData.map(product => (
                            <div className={`${cartstyle.productBox}`} key={product.id}>
                                <div className="d-flex justify-content-center align-items-center">
                                    <img src={`http://localhost:2025/uploads/${product.image}`} className={`${cartstyle.cardImg}`}></img>
                                </div>
                                <div className={`${cartstyle.cardBody}`}>
                                    <h5>{product.title.slice(0,40)} <span onClick={()=>handleTitle(product.id)}>{fullTitle===product.id?product.title.slice():<Link className='text-decoration-none text-primary'>...more</Link>}</span> </h5>
                                    <code>{product.category}</code>
                                    <p><code><del>${product.price}</del></code> {Math.round(product.price * product.quantity) }/-</p>
                                    {/* <p>Qty : {product.quantity}</p> */}
                                    <div className={`${cartstyle.quantityHandleBtn}`}>
                                        <Link to="" className={`${cartstyle.incrementBtn}`} onClick={() => incrementQuantity(product)}><span>+</span></Link><span className={`${cartstyle.quantityHandleBtnBorder}`}> Qty : {product.quantity}</span>
                                        <Link to="" onClick={() => decrementQuantity(product)} className={`${cartstyle.decrementBtn}`}><span>-</span></Link>
                                    </div>
                                    <div className={`${cartstyle.btnContainer}`}>
                                        <Link to="" className={`${cartstyle.wishlistBtn}`}>Add To WishList</Link>
                                        <span className={`${cartstyle.border}`}></span>
                                        <Link to="" className={`${cartstyle.removeBtn}`} onClick={() => removeProduct(product)}> <i class="fa-solid fa-trash" style={{ color: "#f51000" }}></i> Remove</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className={`${cartstyle.placeOrderContainer}`}>
                            <p>{totalQuantityCalculate()}/-</p>
                            <Link to="/paymentmode">Place Order</Link>
                            
                        </div>
                        </div>

                    </div>
                    {cartData.length>0 &&
                    <div className={`${cartstyle.productsTotalAmountBox}`}>
                        <h3 className={`${cartstyle.totalAmountHeading}`}>Price Details</h3>
                        <div className={`${cartstyle.priceBox}`}>
                            <span>Price({cartData.length})</span>
                            <span>{totalQuantityCalculate()}/-</span>
                        </div>
                        <div className={`${cartstyle.discountBox}`}>
                            <span>Discount</span>
                            <code>-$20</code>
                        </div>
                        <div className={`${cartstyle.deliveryChargesBox}`}>
                            <span>Delivery Charges</span>
                            <span><del>$120</del> Free</span>
                        </div>
                        <div className={`${cartstyle.totalAmountBox}`}>
                            <h4>Total Amount</h4>
                            <h4>{totalQuantityCalculate()}/-</h4>
                        </div>
                    </div>
}
                </div>
                {cartData.length>0 &&     
                <div className={`${cartstyle.productsViewMore}`}>
                        <Link to="/allproducts">Shop More</Link>
                    </div>
}
                    </>


        
}
        {cartData.length<=0 &&
    <div className={`${cartstyle.cartEmptyContainer}`}>
        <div className={`${cartstyle.cartEmptyIconContainer}`}>
        <i class="fa-solid fa-cart-arrow-down fa-bounce fa-2xl"></i>
       
        </div>
        <h3>Your Cart Is Empty !</h3>
        <div className={`${cartstyle.productsViewMore} mt-5`}>
                 <Link to="/allproducts">Shop Now</Link>
                 </div>
        
    </div>
}
    </>
    )
}