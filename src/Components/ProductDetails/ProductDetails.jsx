import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from 'react-hot-toast';
export default function ProductDetails() {
  const [Loading, setLoading] = useState(false)
  let { addProductCart } = useContext(CartContext); // Ensure addProductCart is used correctly

  async function addCart(id) {
    setLoading(true);
    let res = await addProductCart(id);
  if(res.data.status=="success")  {
    toast.success(res.data.message);
    setLoading(false);
  }
  else{
    toast.error(res.data.message);
    setLoading(false);
  }
  
  console.log(res);
  
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
  };

  let { id, category } = useParams();
  const [categorys, setCategory] = useState(null);
  const [specicalCategory, setspecicalCategory] = useState([]);

  function GetProductDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }

  function getAllCategory() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let recentProduct = res.data.data.filter(
          (product) => product.category.name === category
        );
        setspecicalCategory(recentProduct);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }

  useEffect(() => {
    GetProductDetails();
    getAllCategory();
  }, [id, category]);

  return (
    <>
      <div className="container mx-auto mt-16 p-2">
        {categorys ? (
          <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-lg shadow-xl border border-gray-200">
            {/* Product Images with Unique Keys */}
            <div className="md:w-1/2 w-full">
              <Slider {...settings}>
                {categorys?.images.map((src, index) => (
                  <img
                    key={index} // ✅ Fixed missing key warning
                    src={src}
                    className="w-full h-96 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                    alt={categorys.title}
                  />
                ))}
              </Slider>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 w-full bg-gray-50 p-6 rounded-lg shadow-md">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                {categorys.title}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed tracking-wide">
                {categorys.description.split(" ").slice(0, 5).join(" ")}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-2xl font-semibold text-green-600">
                  {categorys.price} EGY
                </span>
                <span className="text-yellow-500 text-lg font-bold">
                  <i className="fas fa-star"></i> {categorys.ratingsAverage} / 5
                </span>
              </div>

              {/* Add to Cart Button - Fixed Function Call */}
              <button
                className="mt-6 w-full bg-emerald-700 text-white text-lg font-medium py-3 rounded-lg shadow-md transition-transform duration-300 hover:bg-blue-700 hover:scale-105 mb-11"
                onClick={() => addCart(categorys.id)} // ✅ Fixed incorrect function call
              >
                إضافة إلى السلة <i className="fa-solid fa-cart-arrow-down"></i>
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">جارٍ تحميل المنتج...</p>
        )}
      </div>

      {/* Related Products Section */}
      <div className="flex flex-wrap justify-center gap-4">
        {specicalCategory.length > 0 ? (
          specicalCategory.map((product) => (
            <div
              className="w-40 sm:w-48 md:w-56 lg:w-44 border rounded-lg shadow-md p-4 mb-20"
              key={product.id} // ✅ Fixed key warning in related products
            >
              <div className="product">
                <img src={product.imageCover} alt="" />
                <h3 className="text-emerald-800">{product.category.name}</h3>
                <h3 className="text-emerald-800">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>

                <div className="flex justify-between">
                  <span>{product.price} EGY</span>
                  <span>
                    {product.ratingsAverage} <i className="fas fa-star text-[gold]"></i>
                  </span>
                </div>

                <button className="btn bg-emerald-600 p-2 w-full rounded-lg text-white" onClick={Loading? <i className="fas fa-spin fa-spinner"></i>:""}>
                  <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
                  
                    Show Details
                  </Link>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="spinner"></div>
        )}
      </div>
    </>
  );
}
