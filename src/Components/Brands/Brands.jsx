import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom"; 

export default function Brands() {
  
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  function getBrands() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then((res) => {
        setBrands(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-800 drop-shadow-lg p-4 text-center uppercase tracking-wider">
        🏆 Our Top Brands 🏆
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-12 h-12 border-t-4 border-emerald-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-2xl w-40 sm:w-48 md:w-56 cursor-pointer"
              onClick={() => navigate(`/products?brand=${brand._id}`)}
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-32 h-32 object-contain rounded-lg"
              />
              <h3 className="mt-3 text-lg font-semibold text-emerald-800">{brand.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
