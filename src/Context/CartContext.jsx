import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ استيراد صحيح
import { useQuery, useQueryClient } from "@tanstack/react-query";

export let CartContext = createContext();

export function CartContextProvider(props) {
  const queryClient = useQueryClient();
  const [orderId, setOrderId] = useState(null);
  const [idOrder, setidOrder] = useState(0);

  let token = localStorage.getItem("token");
  let header = { token };

  // ✅ فك تشفير التوكن عند تحميل المكون
  useEffect(() => {
    if (token) {
      try {
        const user = jwtDecode(token);
        console.log("User decoded:", user);
        setidOrder(user.id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [token]);

  function addProductCart(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: id },
        { headers: header }
      )
      .then((response) => {
        queryClient.invalidateQueries(["CartProduct"]);
        return response;
      });
  }

  function removeProduct(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: header,
      })
      .then((response) => {
        queryClient.invalidateQueries(["CartProduct"]);
        return response;
      });
  }

  function fetchProductCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: header,
    });
  }

  async function getProductCart() {
    let res = await fetchProductCart();
    if (res?.data?.data?._id) {
      console.log("Cart id", res?.data?.data?._id);
      setOrderId(res.data.data._id);
    } else {
      console.error("No cart ID found in response");
    }
  }

  async function getAllOrder(idOrder) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${idOrder}`)
      .then((res) => res)
      .catch((err) => err);
  }

  function updateProductCart(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: count },
        { headers: header }
      )
      .then((res) => {
        if (res.data.status === "success") {
          queryClient.invalidateQueries(["CartProduct"]);
        }
        return res;
      })
      .catch((err) => err);
  }

  async function Checkout(cartId, url, Formdata) {
    if (!cartId) {
      console.log();
      console.error("❌ cartId is undefined!");
      return Promise.reject("Cart ID is missing");
    }
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: Formdata },
        { headers: header }
      )
      .then((res) => {
        console.log("✅ Checkout response:", res.data);
        return res;
      })
      .catch((err) => {
        console.error("❌ Checkout error:", err);
        return err;
      });
  }

  useEffect(() => {
    if (!orderId) {
      getProductCart();
    }
  }, [orderId]);

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["CartProduct"],
    queryFn: fetchProductCart,
  });

  return (
    <CartContext.Provider
      value={{
        addProductCart,
        updateProductCart,
        removeProduct,
        Checkout,
        orderId,
        getAllOrder,
        fetchProductCart,
        getProductCart,
        idOrder,
        isLoading,
        isError,
        error,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
