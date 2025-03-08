import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Categorise from "./Components/Categorise/Categorise";
import Cart from "./Components/Cart/Cart";
import Register from "./Components/Register/Register";
import Notfound from "./Components/Notfound/Notfound";
import Logain from "./Components/Logain/Logain";
import { CounterContextProvider } from "./Context/CounterContext";
import { UserContextProvider } from "./Context/UsersContext";
import ProtectedRoute from "./Components/protectedRoute/protectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { BrandsContextProvider } from "./Context/BrandsContext";
import Brands from "./Components/Brands/Brands";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartContextProvider } from "./Context/CartContext";
import { HashRouter, Routes, Route } from "react-router-dom";
import  { Toaster } from 'react-hot-toast';
import CheckOut from "./Components/CheckOut/CheckOut";
import AllOrder from "./Components/AllOrder/AllOrder";

// Create a client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "Products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "Categorise",
        element: (
          <ProtectedRoute>
            <Categorise />
          </ProtectedRoute>
        ),
      },
      {
        path: "Cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
    
      {
        path: "Checkout",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrder />
          </ProtectedRoute>
        ),
      },
    
      {
        path: "productDetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "Brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      { path: "Register", element: <Register /> },
      { path: "Login", element: <Logain /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <BrandsContextProvider>
      <UserContextProvider>
        <CounterContextProvider>
          <QueryClientProvider client={queryClient}>
           <CartContextProvider>
             <RouterProvider router={router} />
           </CartContextProvider>
          <Toaster/>
          </QueryClientProvider>
        </CounterContextProvider>
      </UserContextProvider>
    </BrandsContextProvider>
  );
}

export default App;
