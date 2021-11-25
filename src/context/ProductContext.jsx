import { createContext } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { apiBaseUrl } from "../api/link";

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const { data, fetchError, isLoading } = useAxiosFetch(
    `${apiBaseUrl}/products`
  );
  console.log(apiBaseUrl);

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
