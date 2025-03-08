import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const BrandsContext = createContext();

export function BrandsContextProvider({ children }) {
  const [brands, setBrands] = useState([]); 
  const [loading, setLoading] = useState(true); 

  
  function fetchBrands() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/brands") 
      .then((res) => {
        setBrands(res.data.data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <BrandsContext.Provider value={{ brands, loading }}>
      {children}
    </BrandsContext.Provider>
  );
}
