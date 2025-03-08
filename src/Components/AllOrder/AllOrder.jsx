import React, { useContext, useEffect, useState } from "react";
import "./AllOrder.module.css";
import { CartContext } from "../../Context/CartContext";

export default function AllOrder() {
  const [Orders, setOrders] = useState([]);
  let { getAllOrder, idOrder } = useContext(CartContext);

  async function testAllOrders() {
    if (!idOrder) {
      console.warn("⚠️ No user ID found, skipping API call.");
      return;
    }

    try {
      let res = await getAllOrder(idOrder);

      if (res && res.data) {
        console.log("✅ Orders response:", res.data);
        setOrders(res.data);
      } else {
        console.warn("⚠️ No orders data found in response.");
      }
    } catch (error) {
      console.error("❌ Failed to fetch orders:", error);
    }
  }

  useEffect(() => {
    testAllOrders();
  }, [idOrder]);

  return (
    <div className="bg-gray-100 min-h-screen py-10 mt-5">
      <h1 className="bg-gradient-to-r from-green-400 to-emerald-600 mt-5 text-white text-center p-6 text-2xl font-bold rounded-lg shadow-lg mx-6">
        📦 All Orders
      </h1>

      <div className="container mx-auto mt-6 px-6">
        {Orders.length > 0 ? (
          Orders.map((order, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg mb-6 border-l-8 border-emerald-500 hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-700">
                🆔 Order ID:{" "}
                <span className="text-emerald-600">{order.id}</span>
              </h2>
              <h3 className="text-md font-medium mt-1">
                📌 Status:{" "}
                <span className="text-green-600 font-semibold">
                  {order.status}
                </span>
              </h3>
              <p className="text-md text-gray-600">
                💰 Total Price:{" "}
                <span className="text-emerald-700 font-semibold">
                  EGP {order.totalOrderPrice}
                </span>
              </p>
              <p className="text-md text-gray-500">
                📅 Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <h3 className="font-bold text-gray-800 mt-4">🛒 Products:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2 bg-emerald-500 p-4 rounded-lg">
                {order.cartItems && order.cartItems.length > 0 ? (
                  order.cartItems.map((item, i) => (
                    <div
                      key={i}
                      className="p-4 border rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-center bg-neutral-400"
                    >
                      <div className="w-32 h-32 flex justify-center items-center overflow-hidden rounded-lg bg-white p-2">
                        <img
                          src={item.product.imageCover}
                          className="w-full h-full object-contain"
                          alt={item.product.title}
                        />
                      </div>
                      <p className="text-md font-semibold text-gray-700 text-center mt-2">
                        {item.product.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        🛍️ Quantity:{" "}
                        <span className="font-bold">{item.count}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        💵 Price:{" "}
                        <span className="font-bold text-emerald-600">
                          ${item.price}
                        </span>
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 ml-4">No products found.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg font-semibold mt-10">
            🚫 No orders found.
          </p>
        )}
      </div>
    </div>
  );
}
