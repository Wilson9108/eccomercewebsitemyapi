import {useContext} from 'react'
import style from '../cssFiles/paymentmode.module.css'
import {Link} from 'react-router-dom'
import {myContext} from './Config'
export default function PaymentMode(){
    let {totalQuantityCalculate,cartData} = useContext(myContext)
    return (
        <>
        {/* <h1>PaymentMode</h1> */}
        <div className={`${style.paymentModeContainer}`}>
            <div className={`${style.paymentModeBox}`}>
                <div className={`${style.orderSummary}`}>
                    <h5>Amount Payable</h5>
                    <h6>Price ({cartData.length})</h6>
                    <h4>{totalQuantityCalculate()}/-</h4>
                </div>
                <div className={`${style.deliveryContainer}`}>
                    <h6>Deliver To</h6>
                    <Link to="">Click To Edit</Link>
                </div>
                <p className="fs-6 mt-3">Payment Options</p>
                <div className={`${style.paymentOptionsContainer}`}>
                    <div className={`${style.paymentOptionsBox}`}>
                        <div className={`${style.paymentBox}`}>
                        <p>Pay Via UPI <br></br><small>Paytm , PhonePe , Gpay</small></p>
                        <p className={`${style.price} `}>{totalQuantityCalculate()}/-{'\u00A0'}{'\u00A0'}{'\u00A0'}   <i class="fa-solid fa-chevron-down "></i></p>

                        </div>
                    </div>
                    <div className={`${style.paymentOptionsBox}`}>
                        <div className={`${style.paymentBox}`}>
                            <p>Pay Via Card <br></br><small>Visa , MasterCard , Rupay</small></p>
                            <p  className={`${style.price}`}>{totalQuantityCalculate()}/- {'\u00A0'}{'\u00A0'}{'\u00A0'}  <i class="fa-solid fa-chevron-down "></i></p>

                        </div>
                    </div>
                    <div className={`${style.paymentOptionsBox}`}>
                        <div className={`${style.paymentBox}`}>
                            <p>Pay Via Wallets <br></br> <small>PhonePe , Amazon , Paytm</small></p>
                            <p  className={`${style.price}`}>{totalQuantityCalculate()}/- {'\u00A0'}{'\u00A0'}{'\u00A0'}   <i class="fa-solid fa-chevron-down"></i></p>

                        </div>
                    </div>
                    <div className={`${style.paymentOptionsBox}`}>
                        <div className={`${style.paymentBox}`}>
                            <p>Cash on Delievery <br></br> <small>Additional Fee Charged For Delievery</small></p>
                            <p  className={`${style.price}`}>{totalQuantityCalculate()}/- {'\u00A0'}{'\u00A0'}{'\u00A0'}   <i class="fa-solid fa-chevron-down "></i></p>

                        </div>
                    </div>
                    <div className={`${style.paymentOptionsBox}`}>
                        <div className={`${style.paymentBox}`}>
                            <p className="mt-3">Pay Via NetBanking</p>
                            <p className={`${style.price}`}>{totalQuantityCalculate()}/-{'\u00A0'}{'\u00A0'}{'\u00A0'}  <i class="fa-solid fa-chevron-down"></i></p>
                        </div>
                    </div>
                    <div className={`${style.cancelBtnContainer}`}>
                    <Link to="/cart">Cancel</Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}