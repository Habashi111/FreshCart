import React, {  useEffect, useState } from 'react'
import style from "./RecentProduct.module.css"
import  axios  from 'axios';

import { Link } from 'react-router-dom';
import ProductDetails from './../ProductDetails/ProductDetails';
import { useQuery } from '@tanstack/react-query';



export default function RecentProduct() {
  const [Loading, setLoading] = useState(false)


 async function getProduct(){
     return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
console.log(data.data.data);
  }

 let {data,isError,error,isLoading,isFetching}= useQuery({

    queryKey:["recentProduct"],
    queryFn:getProduct,
  })

if(isLoading){
return  <div className="spinner"></div>
}
if(isError){
  return <h3>{error}</h3>
}

//   const [products, setproducts] = useState([])
// async function getProduct(){
// await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
// .then((res)=>{
  
//   setproducts(res.data.data)
//   setLoading(res.data.data)
  
// })
// .catch((res)=>{})
// }
// useEffect(()=>{
//   getProduct();
// }

// ,[])
  return (
    <>
<h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-800 drop-shadow-lg p-4 text-center uppercase tracking-wider">
  🌟 Recent Products 🌟
</h1>

 <div className='flex flex-wrap justify-center mb-20 gap-4 '>
       
       {  data?.data?.data.map((product)=>(
<div className='w-40 sm:w-48 md:w-56 lg:w-44 border rounded-lg shadow-md p-4 mb-10 ' key={product.id} >
<div className='product'>
<img src={product.imageCover} alt="" />
<h3 className='text-emerald-800'>{product.category.name}</h3>
<h3 className='text-emerald-800'>{product.title.split(" ").slice(0,2).join(" ")}</h3>

<div className='flex justify-between'>
<span>{product.price} EGY</span>
<span>{product.ratingsAverage} <i className='fas fa-star text-[gold]'></i> </span>
</div>
<button className="btn bg-emerald-600 p-2 w-full rounded-lg text-white"> <Link to={`ProductDetails/${product.id}/${product.category.name}`} >Show Details</Link> </button>

</div>
</div>
))}
</div>
      
    </>
  )
}
