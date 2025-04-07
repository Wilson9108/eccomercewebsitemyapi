import style from '../cssFiles/contactus.module.css'
// import style from '../cssFiles/nofound.module.css'
export default function ContactUs(){
    return(
        <>
        <div className={`${style.ContactUsContainer}`}>
            <div className={`${style.HeaderContainer}`}>
                <div className={`${style.headerImg}`}></div>
                <div className={`${style.headerContent}`}>
                    <h1>Contact Us</h1>
                </div>
            </div>
            <div className={`${style.queriesContainer}`}>
                <div className={`${style.queriesHeaderContainer}`}>
                <h6 className="text-center queriesHeaderOne">Have any queries?</h6>
                <h1 className="text-center queriesHeaderTwo">We're here to help.</h1>
                </div>
                <div className={`${style.queriesCardsContainer}`}>
                    <div className={`${style.queriesCardOne}`}>
                        <h1>Sales</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus</p>
                        <p className="text-primary"><b>1882547125</b></p>
                    </div>
                    <div className={`${style.queriesCardTwo}`}>
                        <h1>Complaints</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus</p>
                        <p className="text-primary"><b>1800251478</b></p>
                    </div>
                    <div className={`${style.queriesCardThree}`}>
                        <h1>Returns</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus</p>
                        <p className="text-primary"><b>return@gmail.com</b></p>
                    </div>
                    <div className={`${style.queriesCardFour}`}>
                        <h1>Marketing</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus</p>
                        <p className="text-primary"><b>1880025544</b></p>
                    </div>
                </div>
            </div>
            <div className={`${style.complaintForm}`}>
                <div className={`${style.formContent}`}>
                    <h6>SEND US A MESSAGE!</h6>
                    <h3>We Respond To You With In 24Hours</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className={`${style.form}`}>
                    <form className={`${style.contactUsForm}`}>
                        <input type="text" placeholder='NAME' style={{margin:"0px 0px 0px 0px"}}></input>
                        <input type="text" placeholder='SUBJECT'></input>
                        <input type="text" placeholder='EMAIL'></input>
                        <textarea type="text" placeholder='MESSAGE'></textarea>
                        <button>SEND MESSAGE</button>
                    </form>
                </div>
            </div>

        </div>

        </>
    )
}