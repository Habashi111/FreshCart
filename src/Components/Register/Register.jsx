import React, { useContext, useState } from "react";
import "./Register.module.css";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import style from "../../assets/images/slider-image-1.jpeg";
import { UserContext } from "../../Context/UsersContext";
export default function Register() {
  const [Apierror, setApierror] = useState("");
  const [Apisuccess, setApisuccess] = useState("");
  const [isLoading, setisLoading] = useState(false);
  let navegate = useNavigate();
 let{setUserLogin}=useContext(UserContext);
  // --------------------------------------handelRegister and call Api--------------------------------------->
  function handelRegister(value) {
    setisLoading(true);
   
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, value)
      .then(function (res) {
        setisLoading(false);
        localStorage.setItem("token",res.data.token)
        setUserLogin(res.data.token)
        navegate("/Login");
      })
      .catch(function (res) {
        setisLoading(false);
        setApierror(res.response.data.message);
      });
  }
  // ------------------------------------------validate---------------------------------------->
  let myValidation = yup.object().shape({
    name: yup
      .string()
      .min(3, "min length is 3")
      .max(10, "max length is 10")
      .required("the name is required"),
    email: yup
      .string()
      .email("not valid email")
      .required("the email is required"),
    password: yup
      .string()
      .min(6, "min length is 6")
      .max(10, "max length is 10")
      .required("password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "password not match")
      .required("the repassword is required"),
    phone: yup
      .string()
      .matches(/^01[1025][0-9]{8}$/, "phone not valid")
      .required("the phone is required"),
  });
  // --------------------------------formik collect object in data------------------------------------------->
  let formek = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    onSubmit: handelRegister,
    validationSchema: myValidation,
  });
  // ---------------------------------------------------------------------------------->
  return (
    <>
      <div
        style={{ backgroundImage: `url(${style})` }}
        className="bg-cover relative  bg-center w-full h-screen overflow-hidden "
      >
  <img src={style} alt="Background" className="hidden" />

   {Apierror ? (
        <h1 className=" relative top-[10%] left-[auto]  text-center w-[300px]  text-center   m-auto bg-red-700 p-3 text-black z-50">
          {Apierror}
        </h1>
      ) : null}

<form
        onSubmit={formek.handleSubmit}
        className="max-w-md mx-auto my-20 p-5 bg-[#f0f3f2] "
      >
        <h1 className="text-emerald-600 my-4 font-bold text-2xl">
          Register Now
        </h1>
        <div className="relative z-0 w-full mb-5 group ">
          <input
            type="text"
            name="name"
            value={formek.values.name}
            onChange={formek.handleChange}
            onBlur={formek.handleBlur}
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Name
          </label>
          {formek.errors.name && formek.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formek.errors.name}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formek.values.email}
            onChange={formek.handleChange}
            onBlur={formek.handleBlur}
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Email
          </label>
          {formek.errors.email && formek.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formek.errors.email}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            value={formek.values.password}
            onChange={formek.handleChange}
            onBlur={formek.handleBlur}
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your password
          </label>

          {formek.errors.password && formek.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formek.errors.password}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            value={formek.values.rePassword}
            onChange={formek.handleChange}
            onBlur={formek.handleBlur}
            id="floating_repassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_repassword"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Repassword
          </label>

          {formek.errors.rePassword && formek.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formek.errors.rePassword}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            value={formek.values.phone}
            onChange={formek.handleChange}
            onBlur={formek.handleBlur}
            id="floating_phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_phone"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Phone
          </label>
          {formek.errors.phone && formek.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formek.errors.phone}</span>
            </div>
          ) : null}
        </div>
        {isLoading ? (
          <button
            type="submit"
            key={"vfvfv"}
            className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >
            <i className="fas fa-spinner fa-spin"></i>
          </button>
        ) : (
          <button
            type="submit"
            className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >
            signup
          </button>
        )}

        <div className="ml-2 text-gray-400">
          Already have an account?{" "}
          <Link to="/Login" className="ml-2 text-emerald-600">
            Login
          </Link>
        </div>
      </form>


      </div>
   


    </>
  );
}
