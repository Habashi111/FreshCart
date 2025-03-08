import React, { useContext, useState } from "react";
import "./CheckOut.module.css";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";

export default function CheckOut() {
  const [storageUrl, setStorageUrl] = useState(null);
  let { Checkout, orderId } = useContext(CartContext);

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: () => {
      console.log("🟢 Order ID before checkout:", orderId);
      if (!orderId) {
        console.error("❌ orderId is undefined! Cannot proceed to checkout.");
        return;
      }
      handelRegister(orderId, `http://localhost:5173`);
    },
  });

  async function handelRegister(cartId, Url) {
    try {
      let res = await Checkout(cartId, Url, formik.values);
      if (res?.data?.session?.url) {
        window.location.href = res.data.session.url;
      } else {
        console.error("❌ Invalid checkout session URL");
      }
    } catch (error) {
      console.error("❌ Error during checkout:", error);
    }
  }

  return (
    <>
      <div className="bg-cover relative bg-center w-full h-screen overflow-hidden">
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-md mx-auto relative top-[30%] p-10 bg-[#f0f3f2]"
        >
          <h1 className="text-emerald-600 font-bold text-2xl text-center mb-4">
            CheckOut
          </h1>

          <div className="mb-5">
            <input
              type="text"
              name="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              placeholder="Enter Your details"
              className="block w-full p-2 border-b-2 border-gray-300 focus:border-emerald-600 outline-none"
              required
            />
          </div>

          <div className="mb-5">
            <input
              type="tel"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              placeholder="Enter Your phone"
              className="block w-full p-2 border-b-2 border-gray-300 focus:border-emerald-600 outline-none"
              required
            />
          </div>

          <div className="mb-5">
            <input
              type="text"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              placeholder="Enter Your city"
              className="block w-full p-2 border-b-2 border-gray-300 focus:border-emerald-600 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-800 transition"
          >
            Checkout
          </button>
        </form>
      </div>
    </>
  );
}
