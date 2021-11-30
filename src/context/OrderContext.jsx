import { createContext } from "react";
import { apiBaseUrl } from "../api/link";
import useAxiosGet from "../hooks/useAxiosGet";

const OrderContext = createContext({});

export const OrderProvider = ({ children }) => {
  let { data, getError, isLoading } = useAxiosGet(`${apiBaseUrl}/orders`);

  return (
    <OrderContext.Provider
      value={{
        orders: data,
        error: getError,
        orderIsLoading: isLoading,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
