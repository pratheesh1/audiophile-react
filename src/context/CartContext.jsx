import { createContext, useState, useEffect } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider
      value={
        {
          //state data
        }
      }
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
