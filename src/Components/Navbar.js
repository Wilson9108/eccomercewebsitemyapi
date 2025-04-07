import {useContext,useState,useEffect} from 'react'
import {Link, Navigate, useNavigate}  from 'react-router-dom'
import style from '../cssFiles/Navbar.module.css'
import {myContext} from './Config'
export default function Navbar(){
  const navigate = useNavigate()
  const {cartData,fetchProductData} = useContext(myContext)
  const [adminrole,setAdminrole]=useState("")
  const [admintoken, setAdminToken] = useState("")
  const [quantity,setQuantity]=useState({})
  console.log("admin role from navbar " , adminrole)
  console.log("admin token from navbar " , admintoken)

// console.log(cartData)

const userrole = localStorage.getItem('userrole')
console.log("userrole from navbar.js",userrole)

useEffect(()=>{
  const arole = localStorage.getItem("adminrole")
  const  atoken = localStorage.getItem('admintoken')
  setAdminToken(atoken)
  setAdminrole(arole)

  // if(atoken){
  //   navigate("/")
  // }

},[navigate])

const redirect  = userrole? "/userprofile":"/signin"

function  handleAdminLogOut(){
  localStorage.removeItem("admintoken")
  localStorage.removeItem("adminrole")
  setAdminToken(null)
  setAdminrole(null)
  navigate("/")
}

let calculate =   cartData.reduce((acc,curr)=>acc+curr.quantity,0)
console.log(calculate)



  // console.log(fetchProductData)
  const [searchProducts,setSearchProducts]=useState("")
  console.log(searchProducts)
  console.log(searchProducts.length)
  let searchedProducts = fetchProductData.filter(item=>item.category===searchProducts)
  console.log(searchedProducts)
  // console.log(Array.isArray(cartData))
  // console.log("cartData Length " + cartData.length)
    return(
        <>
        <nav className={`navbar navbar-expand-lg position-sticky top-0 ${style.audiowideRegular}`}>
  <div className="container-fluid ">
    <div className="position-relative"><span className={`${style.navbarBrandOne}`}>Ws</span>
    <Link className={`navbar-brand  ${style.navbarBrandTwo}`} to="/" >Wilson</Link>
    </div>
    <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon text-light"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
        <li className="navitem">
          <Link className="nav-link active text-light text-center mt-2" aria-current="page" to="allproducts">EVERYTHING</Link>
        </li>
        {/* <li className="navitem">
            <Link className="nav-link text-light mt-2" to="/adminsignin">ADMIN</Link>
        </li> */}
        {adminrole &&
        <>
        {/* <li className="navitem">
            <Link className="nav-link text-light mt-2" to="/userdata">USER DATA</Link>
        </li>
        <li className='navitem'>
          <Link className='nav-link text-light mt-2' to="/productsdata">PRODUCTS DATA</Link>
        </li>
        <li className="navitem">
          <Link className='nav-link text-light mt-2' to="/productsinsert">PRODUCTS INSERT</Link>
        </li> */}
        <li className="nav-item dropdown text-light mt-2 mx-2" >
          <Link className="nav-link dropdown-toggle text-light" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ALLDATA
          </Link>
          <ul className="dropdown-menu" style={{backgroundColor:"rgb(128, 83, 28)"}}> 
            <li><Link className="dropdown-item  text-light" style={{backgroundColor:"rgb(128, 83, 28)"}} to="/userdata">USER DATA</Link></li>
            <hr></hr>
            <li><Link className="dropdown-item text-light" to="/productsdata" style={{backgroundColor:"rgb(128, 83, 28)"}}>PRODUCTS DATA</Link></li>
          </ul>
        </li>
            <li className='navitem text-light mt-2'><Link className="dropdown-item mt-2 text-light" to="/productsinsert">PRODUCTS INSERT</Link></li>

        </>

}
        {/* <li className="nav-item">
          <Link className="nav-link text-light" to="Men">MEN</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light " aria-disabled="true" to="Women">WOMEN</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="mobiles">MOBILES</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="electronics">ELECTRONICS</Link>
        </li> */}
              <form className="d-flex mx-2" role="search">
        <input className="me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearchProducts(e.target.value.trim())}/>
        <button className="btn btn-warning" type="button">Search</button>
      </form>

      </ul>


      <ul className="navbar-nav ultag  mb-2 mb-lg-0">
        <li className="navitem">
          <Link className="nav-link text-light " aria-current="page" to="/">HOME</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link text-light " aria-current="page" to="AboutUs">ABOUT US</Link>
        </li>
        <li className="navitem">
            <Link className="nav-link text-light" to="ContactUs">CONTACT US</Link>
        </li>
        {!adminrole &&
         <>
        <li className="navitem">
            <Link className="nav-link" to="cart"><i className="fa-solid fa-cart-shopping fa-xl text-light"></i><span><sup className=" bg-warning rounded-circle text-dark p-2">{cartData.length}</sup></span></Link>
        </li>


        <li className="navitem">
          <Link className="nav-link" to={redirect}><i class="fa-solid fa-user fa-xl text-light"></i></Link>
        </li>
       </>
        }
        {adminrole &&
        <li className='navitem'>
          <Link className=" btn btn-primary mx-4" onClick={()=>handleAdminLogOut()} > logout {'\u00a0'} <i class="fa-solid fa-person-walking-dashed-line-arrow-right fa-xl"></i> </Link>
           </li>
}
      </ul>
    </div>
  </div>
</nav>
        </>
    )
}