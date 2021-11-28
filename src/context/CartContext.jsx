import { createContext, useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import { apiBaseUrl } from "../api/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user, token } = useContext(UserContext);
  const [cartUpdated, setCartUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //get cart function
    async function getCart() {
      const cart = await axios.get(`${apiBaseUrl}/cart`, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      });
      setCart(cart.data);
    }

    //if token is set, get cart data
    if (user && token) {
      const cart = getCart();
      if (cart) {
        setCart(cart);
        setCartUpdated(false);
      }
    }

    //if token is not set, clear cart
    if (!user || !token) {
      setCart([]);
      setCartUpdated(false);
    }
  }, [user, token, cartUpdated]);

  /*
   * @description: add item to cart
   * @info: if no quantity is provided, cart quantity is incremented by 1
   *
   * @param {Object} item
   * @param {Number} item.productId - product id
   * @param {Number} [item.productVariantId] - product variant id
   * @param {Number} [item.quantity] - quantity
   *
   * @returns {Object} cartItem
   */
  const addToCart = async (item) => {
    try {
      if (user && token) {
        const data = await axios({
          method: "post",
          url: `${apiBaseUrl}/cart/add`,
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
          data: item,
        });

        if (data) {
          setCartUpdated(true);
        }
      } else {
        toast.info(
          "You must be logged in to add items to cart. Redirecting...",
          {
            autoClose: 3000,
          }
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * @description: remove item from cart
   *
   * @param {Object} item
   * @param {Number} item.productId - product id
   * @param {Number} [item.productVariantId] - product variant id
   */
  const removeFromCart = async (item) => {
    try {
      const { data } = await axios.post(`${apiBaseUrl}/cart/remove`, {
        body: item,
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      });
      if (data) {
        setCartUpdated(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        cartUpdated: cartUpdated,
        setCart: setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
