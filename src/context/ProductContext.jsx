import { createContext } from "react";
import useAxiosGet from "../hooks/useAxiosGet";
import { apiBaseUrl } from "../api/link";

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const { data, fetchError, isLoading } = useAxiosGet(`${apiBaseUrl}/products`);

  return (
    <ProductContext.Provider
      value={{
        products: data,
        loading: isLoading,
        error: fetchError,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
