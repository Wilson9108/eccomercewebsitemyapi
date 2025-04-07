import React from 'react';
import {useState,useEffect,useContext} from 'react'
import style from '../cssFiles/Homepage.module.css'
import {Link} from 'react-router-dom'
import {myContext} from './Config'
export default function Homepage(){
    const {fetchProductData,getData,indianCurrency,fullTitle,handleTitle,ratingArray} = useContext(myContext)
    const limitedProductsShow = fetchProductData.slice(0,12)
    // const topRated= fetchProductData.filter(item=>item.rating.rate>3)
    // console.log(ratingArray)
    return(
        <>
        <div className={`${style.homeContainer}`}>
            <div className={`${style.headerImgCon}`}>
                <div className={`${style.headerContent}`}>
                <h1 className={`${style.headerOne}`}>Raining Offers For Hot</h1>
                <h1 className={`${style.headerTwo}`}>Summer !</h1>
                <p className={`${style.headerThree}`}>25% Off On All Products</p>
                <div className={`${style.btnContainer}`}>
                <Link to="" className={`${style.shopNowBtn}`}>SHOP NOW</Link>
                <Link to="" className={`${style.findMoreBtn}`}>FIND MORE</Link>
                </div>
                </div>
                <div className={`${style.headerImg}`}>
                </div>
            </div>
            <div className={`${style.cardContainer}`}>
                <div className={`${style.cardOne}`}>
                    <div className={`${style.cardContent}`}>
                    <h2>20% Off On Tank Tops</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adispicing elit. Proin ac dictum.</p>
                    <Link to="" className={`${style.cardBtn}`}>SHOP NOW</Link>
                    </div>
                </div>
                <div className={`${style.cardTwo}`}>
                    <div className={`${style.cardContent}`}>
                    <h2>Latest Eyewear For You</h2>
                    <p>Lorem ipsum dolor sit amet,consectetturn adipiscing elit. Proin ac dictum.</p>
                    <Link to="" className={`${style.cardBtn}`}>SHOP NOW</Link>
                    </div>
                </div>
                <div className={`${style.cardThree}`}>
                    <div className={`${style.cardContent}`}>
                    <h2>Lets's Lorem Suit Up Lorem!</h2>
                    <p>Lorem ipsum dolor sit amet, consecteturn adipiscing elit. Proin ac dicturm.</p>
                    <Link to="" className={`${style.cardBtn}`}>CHECK OUT</Link>
                    </div>
                </div>
            </div>

 {/* dispaly products section------------------- */}

        
 <div className={`${style.productsContainer}`}>
                <div className={`${style.productsTitleCon}`}>
                    <h1>All Products</h1>
                </div>
                <div className={`${style.productsCards}`}>
                    
                {limitedProductsShow.map(products=>(
                    <div className={`${style.productBox}`} key={products.id}>
                    <img src={`http://localhost:2025/uploads/${products.image}`} alt="products" className={`${style.cardImg}`}></img>
                    <div className={`${style.cardBody}`}>
                        <h5>{ products.title!==null? products.title.slice(0,20):products.title} {products.title!=null? <span onClick= {()=>handleTitle(products.id)}>{fullTitle===products.id ?products.title.slice():<Link className="text-primary text-decoration-none">....more</Link>}</span>:""}</h5>
                        <code>{products.category}</code>
                        <p><code className="mx-1"><del>${products.price}</del></code> {Math.round(products.price)}/-</p>
                        {/* {ratingArray.map((value,index)=>(
                            <span style={{color:products.rating.rate>index?"rgb(246, 228, 41)":"",fontSize:"22px",display:"inline-block",margin:"0px 0px 10px 0px"}}>&#128970;</span>
                        ))} */}
                        <br></br>
                       
                    <Link to="/cart"className={`${style.AddToCartBtn}`} onClick={()=>getData({...products,quantity:1})}>Add to Cart</Link>
                    </div>
                    </div>
                 ))}
               
                 </div>
                 <div className={`${style.productsViewMore}`}>
                 <Link to="allproducts">ViewMore</Link>
                 </div>
                 </div>

{/* //LimterOffer section--------------------------- */}

            <div className={`${style.limitedOfferContainer}`}>
               <div className={`${style.offerImage}`}></div> 
               <div className={`${style.offerContent}`}>
                <p className="mb-4 ">Limited Time Offer</p>
                <h3 className="mb-3">Special Edition</h3>
                <small className="mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</small>
                <h4 className="mt-3">Buy This T-shirt At 20% Discount, Use Code OFF20</h4>
                <div className="mt-5">
                <Link to="" className={`${style.offerShopNowBtn}`} >SHOP NOW</Link>
                </div>
               </div>
            </div>
            <div className={`${style.conclusionCards}`}>
                <div className={`${style.endingCard}`}>
                <i class="fa-solid fa-earth-americas fa-2xl"></i>
                    <h3>Worldwide Shipping</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit</p>
                </div>
                <div className={`${style.endingCard}`}>
                <i class="fa-solid fa-thumbtack fa-2xl fs-1"></i>
                    <h3>Best Quality</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit</p>
                </div>
                <div className={`${style.endingCard}`}>
                <i class="fa-solid fa-tags fa-2xl"></i>
                    <h3>Best Offers</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit</p>
                </div>
                <div className={`${style.endingCard}`}>
                <i class="fa-solid fa-lock fa-2xl"></i>
                    <h3>Secure Payments</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit</p>
                </div>
            </div>
          

        </div>

        </>
    )
}