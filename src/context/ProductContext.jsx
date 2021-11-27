import { createContext } from "react";
import useAxiosGet from "../hooks/useAxiosGet";
import { apiBaseUrl } from "../api/link";

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const { data, fetchError, isLoading } = useAxiosGet(`${apiBaseUrl}/products`);
  const { data: categories } = useAxiosGet(`${apiBaseUrl}/products/categories`);
  const { data: brands } = useAxiosGet(`${apiBaseUrl}/products/brands`);
  const { data: frequencyResponses } = useAxiosGet(
    `${apiBaseUrl}/products/frequencyResponses`
  );
  const { data: impedanceRanges } = useAxiosGet(
    `${apiBaseUrl}/products/impedanceRanges`
  );

  return (
    <ProductContext.Provider
      value={{
        products: typeof data === "object" ? data.products : [],
        loading: isLoading,
        error: fetchError,
        categories: typeof categories === "object" ? categories.categories : [],
        brands: typeof brands === "object" ? brands.brands : [],
        frequencyResponses:
          typeof frequencyResponses === "object"
            ? frequencyResponses.frequencyResponses
            : [],
        impedanceRanges:
          typeof impedanceRanges === "object"
            ? impedanceRanges.impedanceRanges
            : [],
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
