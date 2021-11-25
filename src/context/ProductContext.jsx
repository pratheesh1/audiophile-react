import { createContext } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const { data, loading, error } = useAxiosFetch(
    `${process.env.BASE_API_URL}/products`
  );

  return (
    <ProductContext.Provider
      value={{
        products: data,
        loading,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
