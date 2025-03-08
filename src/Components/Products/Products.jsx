import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [searchParams] = useSearchParams();
  const brandId = searchParams.get("brand");
  const catId = searchParams.get("cat");

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      let url = "https://ecommerce.routemisr.com/api/v1/products?";
      if (brandId) url += `brand=${brandId}&`;
      if (catId) url += `category=${catId}`;

      try {
        const res = await axios.get(url);
        setProducts(res.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [brandId, catId]);

  const currentProducts = useMemo(() => {
    const lastProductIndex = currentPage * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;
    return products.slice(firstProductIndex, lastProductIndex);
  }, [products, currentPage]);

  return (
    <>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-800 drop-shadow-lg p-4 text-center uppercase tracking-wider mt-16">
        🛍 Our Products
      </h1>

      <div className="flex flex-wrap justify-center mb-10 gap-6 mt-10">
        {loading ? (
          <div className="spinner border-t-4 border-emerald-500 w-12 h-12 rounded-full animate-spin"></div>
        ) : currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div
              className="w-40 sm:w-48 md:w-56 lg:w-44 border rounded-lg shadow-md p-4 mb-10 hover:shadow-xl transition"
              key={product.id}
            >
              <div className="product">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-emerald-800 font-semibold">
                  {product.category.name}
                </h3>
                <h3 className="text-emerald-800">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>

                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold">{product.price} EGY</span>
                  <span className="text-yellow-500 font-bold">
                    {product.ratingsAverage} <i className="fas fa-star"></i>
                  </span>
                </div>

                <button className="bg-emerald-600 p-2 w-full rounded-lg text-white mt-3 hover:bg-emerald-700 transition btn">
                  <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
                  Show Details
                  </Link>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No products found.</p>
        )}
      </div>

      <div className="flex justify-center space-x-4 mb-10">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`px-4 py-2 rounded-lg font-semibold shadow-md transition ${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="px-4 py-2 font-semibold">{currentPage}</span>

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev * productsPerPage < products.length ? prev + 1 : prev
            )
          }
          className={`px-4 py-2 rounded-lg font-semibold shadow-md transition ${
            currentPage * productsPerPage >= products.length
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          }`}
          disabled={currentPage * productsPerPage >= products.length}
        >
          Next
        </button>
      </div>
    </>
  );
}
