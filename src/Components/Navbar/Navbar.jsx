import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "flowbite";
import "./Navbar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { UserContext } from './../../Context/UsersContext';
import { useEffect } from "react";



export default function Navbar() {
  let navegate=useNavigate();
  let {UserLogin,setUserLogin}=useContext(UserContext)
  const [menuOpen, setMenuOpen] = useState(false);
function Signout(){
  localStorage.removeItem('token')
  setUserLogin(null);
  navegate("/Login")



 
  

  
}


  return (
    <>

      <nav className="border-gray-200  py-3 fixed top-0 left-0 right-0 bg-slate-300 shadow-md flex items-center justify-between z-50">
        
        {/* Left Side (Logo + Name) */}
        <div className="flex items-center">
          <Link to="" className="flex items-center">
            <img src={logo} alt="Logo" className="h-10" />
            
          </Link>
        </div>

      
        <div className="hidden md:flex space-x-6">
          {UserLogin!=null ? <span className="space-x-6">
<Link to="/" className="text-gray-700 ">Home</Link>
          <Link to="/cart" className="text-gray-700 ">Cart</Link>
          <Link to="/products" className="text-gray-700 ">Products</Link>
          <Link to="/Categorise" className="text-gray-700 ">Categories</Link>
          <Link to="/brands" className="text-gray-700 ">Brands</Link>
   </span> :null }
  
          
       
          <span className="space-x-6">
            {UserLogin!=null ?    <Link to="/login" className="text-red-600 " onClick={Signout}>Sign Out</Link>:
                <span className="space-x-6">
                <Link to="/login" className="text-blue-600 ">Login</Link>
                <Link to="/register" className="text-blue-600 ">Register</Link> 
                </span>
               }
          </span>
      
       
        </div>

        {/* Right - Social Media Icons (Always Visible) */}
        <div className=" md:flex space-x-4">
          <Link to="#"><i className="fa-brands fa-facebook text-gray-700 "></i></Link>
          <Link to="#"><i className="fa-brands fa-instagram text-gray-700 hover:text-pink-600"></i></Link>
          <Link to="#"><i className="fa-brands fa-tiktok text-gray-700 hover:text-black"></i></Link>
          <Link to="#"><i className="fa-brands fa-twitter text-gray-700 hover:text-blue-400"></i></Link>
          <div className="hidden lg:block space-x-4">

          <Link to="#"><i className="fa-brands fa-linkedin text-gray-700 hover:text-blue-700"></i></Link>
          <Link to="#"><i className="fa-brands fa-youtube  text-gray-700 hover:text-red-600"></i></Link>
          </div>
          
        </div>

        {/* Small & Medium Screens - Dropdown Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
          >
            ☰
          </button>

          {menuOpen && (
            <div className="absolute top-16 right-2 w-auto bg-white border rounded-lg shadow-lg z-50 flex flex-wrap">
             
                {UserLogin!=null ?    <div className="  w-auto bg-white border rounded-lg shadow-lg z-50 flex flex-wrap">

<Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</Link>
              <Link to="/cart" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Cart</Link>
              <Link to="/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Products</Link>
              <Link to="/Categorise" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Categories</Link>
              <Link to="/brands" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Brands</Link>
              <Link to="/login" className="block px-4 py-2 text-red-600 hover:bg-gray-100" onClick={Signout}>Sign Out</Link>
             </div> :<div> <Link to="/login" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Login</Link>
             <Link to="/register" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Register</Link></div>}
          
             
            
             
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
