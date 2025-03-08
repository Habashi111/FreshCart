import React, { useContext, useEffect, useState } from "react";
import "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  const {  isLoading, isError, error,updateProductCart,fetchProductCart,removeProsuct } = useContext(CartContext);
const [getCart, setSetCart] = useState(null)
useEffect(()=>{

  getProduct()

},[])
  if (isLoading) {
    return (
      <div className="lds-roller mt-40">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  if (isError) {
    return <div>{error}</div>;
  }
  async function updateProduct(id, count) {
    let res = await updateProductCart(id, count);
    if(count==0){
    await  DeleteProduct(id)
      

    }
    else{
     if (res.data.status === "success") {
      toast.success("Product updated successfully");
      setSetCart(res.data.data)
    } else {
      toast.error("Something went wrong");
    }  
    }
   
  }
 async function DeleteProduct(id){
   let res=await removeProsuct(id)
   if(res.data.status==="success"){
    toast.success("Product deleted successfully")
    setSetCart(res.data.data)
  }else{
    toast.error("Something went wrong")
  }
  }
  
  
 async function getProduct(){
  let res= await fetchProductCart()
console.log(res.data.data);
setSetCart(res.data.data)

  }
 
  
  
  return (<>
    {getCart?.products?.length>0 ? <>
    
    <div className="container mx-auto px-4 pb-16 pt-10">
      <h1 className="mt-10 sm:mt-20 text-2xl sm:text-4xl font-extrabold text-white bg-gradient-to-r from-emerald-500 to-green-700 py-4 px-6 rounded-xl shadow-lg shadow-green-500/50 text-center w-[90%] sm:w-[70%] mx-auto">
        Total Cart :
        <span className="  bg-blue-500 text-white rounded-lg shadow-md shadow-blue-400/50 animate-pulse transition-transform transform hover:scale-110">
          {getCart?.totalCartPrice}
        </span>
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 md:px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-4 md:px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-4 md:px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-4 md:px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-4 md:px-6 py-3">
               Total
              </th>
              <th scope="col" className="px-4 md:px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {getCart?.products?.map((product) => (
              <tr
                key={product.product.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-3 md:p-4">
                  <img
                    src={product.product.imageCover}
                    className="w-12 md:w-16 lg:w-24 max-w-full max-h-full rounded-md shadow"
                    alt={product.product.title}
                  />
                </td>
                <td className="px-4 md:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.product.title}
                </td>
                <td className="px-4 md:px-6 py-4">
                <div className="flex items-center">
  <button className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" onClick={()=>updateProduct(product.product.id,product.count-1)}>
    <span className="sr-only">Quantity button</span>
    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
    </svg>
  </button>
  <div>
    <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={product.count} required />
  </div>
  <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" onClick={()=>updateProduct(product.product.id,product.count+1)}>
    <span className="sr-only">Quantity button</span>
    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
    </svg>
  </button>
</div>

                  
                </td>
                <td className="px-4 md:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.price }
                </td>
                <td className="px-4 md:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.price * product.count}
                </td>
                <td className="px-4 md:px-6 py-4">
                  <button className="text-red-600 dark:text-red-500 hover:underline font-medium" onClick={()=>DeleteProduct(product.product.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       <Link to={`/Checkout`}>

       <button className="bg-red-600  w-full hover:bg-emerald-600 mt-3 p-3">Check Out </button>

       </Link>
          
        
        
      </div>
      
    </div>  
    
    
    </>: (

  <div className="flex flex-col items-center justify-center pt-20">
    <img
      src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" 
      alt="Empty Cart"
      className="w-48 sm:w-64 opacity-80 hover:opacity-100 transition-opacity duration-300 transform hover:scale-105"
    />
    <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-600">
      Your Cart is Empty
    </h1>
    <p className="text-gray-500 text-lg sm:text-xl mt-2">
      Looks like you haven't added anything yet!
    </p>
  </div>
)}
  
    </>
  );
}
