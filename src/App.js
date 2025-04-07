import {useContext} from 'react'
import './App.css';
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Homepage from './Components/Homepage'
import Footer from './Components/Footer'
import AboutUs from './Components/AboutUs'
import ContactUs from './Components/ContactUs'
import Men from './Components/Men'
import Women from './Components/Women'
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import AddToCart from './Components/AddToCart'
import ProductsDisplay from './Components/ProductsDisplay'
import Notfound  from './cssFiles/NotFound';
import Mobiles from './Components/Mobiles'
import  Laptop from './Components/Laptop'
import PaymentMode from './Components/PaymentMode'
import AdminSignin from './Components/Admin/AdminSignin'
import AdminSignup from './Components/Admin/AdminSignup'
import UserData from './Components/UserData'
import UserUpdate from './Components/UserUpdate'
import ProductsInsert from './Components/Products/ProductsInsert'
import Category from './Components/Products/Category'
import ProductsData from './Components/Products/ProductsData'
import  UserProfile from './Components/UserProfile'
import Adminprofile from './Components/Admin/Adminprofile'
import {myContext} from './Components/Config'

const token = localStorage.getItem('token')
console.log(token)

// console.log("hey app.js")


function App() {
  // const navigate = useNavigate()
//   function handleLogOut(){
//     localStorage.removeItem("token")
//     localStorage.removeItem("userrole")
//     navigate('/signin')
// }
  return (  
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Homepage><ProductsDisplay/></Homepage>}></Route>
      <Route path="/AboutUs" element={<AboutUs/>}></Route>
      <Route path="/ContactUs" element={<ContactUs/>}></Route>
      <Route path="/Men" element={<Men/>}></Route>
      <Route path='/Women' element={<Women/>}></Route>
      <Route path="/Signup" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/cart" element={<AddToCart/>}></Route>
      <Route path="/AllProducts" element={<ProductsDisplay/>}></Route>
      <Route path="/mobiles" element={<Mobiles/>}></Route>
      <Route path="/laptops" element={<Laptop/>}></Route>
      <Route path="/paymentmode" element={<PaymentMode/>}></Route>
      <Route path="/adminsignin" element={<AdminSignin/>}></Route>
      <Route path="/adminsignup" element={<AdminSignup/>}></Route>
      <Route path="/userdata" element={<UserData/>}></Route>
      <Route path="/productsinsert" element={<ProductsInsert/>}></Route>
      <Route path="/userupdate/:userid" element={<UserUpdate/>}></Route>
      <Route path="/category" element={<Category/>}></Route>
      <Route path="/productsdata" element={<ProductsData/>}></Route>
      <Route path='/userprofile' element={<UserProfile />}></Route>
      <Route path='/adminprofile' element={<Adminprofile/>}></Route>
      <Route path="*"element={<Notfound/>}></Route>
    </Routes>
    <Footer/>
    </BrowserRouter>

    </>
  );
}

export default App;
