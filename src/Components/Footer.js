import {useState} from 'react'
import {Link} from 'react-router-dom'
import style from '../cssFiles/footer.module.css'

export default function Footer(){
    const {subscribe,setSubscribe}= useState("")
    return(
        <>
        <footer>
        <h3 className={`${style.footerHeading}`}>SALE UP TO 70% OFF FOR ALL CLOTHES & FASHION ITEMS, ON ALL BRANDS</h3>
        <div className={`${style.footerCards}`}>
            <div className={`${style.footerCardOne}`}>
                <h1>Ws</h1>
                <h5>The best look anytime, anywhere</h5>
            </div>
            <div className={`${style.footerCardTwo}`}>
                <h1>Women</h1>
                <p>Women Jeans</p>
                <p>Tops and Shirts</p>
                <p>Women Jackets</p>
                <p>Heels and Flats</p>
                <p>Women Accessories</p>
            </div>
            <div className={`${style.footerCardThree}`}>
                <h1>Men</h1>
                <p>Men Jeans</p>
                <p>Men Shirts</p>
                <p>Men Shoes</p>
                <p>Men Accessories</p>
                <p>Men Jackets</p>
            </div>
            <div className={`${style.footerCardFour}`}>
                {/* <h6>Subscribe</h6> */}
                <form>
                    <input type="text" value={subscribe} placeholder="Your Email" style={{margin:"0px 0px 10px -22px"}}></input>
                    <button type="submit" to="/" className={`${style.subscribeBtn}`}>SUBSCRIBE</button>
                </form>
            </div>
        </div>
        <div className={`${style.conclusionFooter}`}>
            <p>Copyright © 2024 Brandstore. Powered by Brandstore.</p>
            <div className={`${style.iconsContainer}`}>
            <i class="fa-brands fa-facebook-f fa-xl"></i>
            <i class="fa-brands fa-twitter fa-xl"></i>
            <i class="fa-brands fa-instagram fa-xl"></i>
            <i class="fa-brands fa-google fa-xl"></i>
            <i class="fa-brands fa-youtube fa-xl"></i>
            </div>
        </div>
        </footer>
        </>
    )

}