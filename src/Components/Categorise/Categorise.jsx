import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Categorise.module.css";

export default function Categorise() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategory = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        setCategory(res.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategory();
  }, []);

  return (
    <>
      {loading ? (
        <div className="lds-dual-ring mt-28"></div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-emerald-600 text-center mt-16 p-3">
            Categories
          </h1>
          <div className="flex flex-wrap justify-center gap-8">
            {category.map((cat) => (
              <div
                key={cat._id}
                className="w-[250px] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/products?cat=${cat._id}`)}
              >
                <img
                  src={cat.image}
                  className="w-full h-[200px] object-cover rounded-t-2xl"
                  alt={cat.name}
                />
                <div className="p-4">
                  <h3 className="text-xl text-center font-semibold text-emerald-700">
                    {cat.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
