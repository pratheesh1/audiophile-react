import { createContext, useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import { apiBaseUrl } from "../api/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

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
          toast.success("Item added to cart.", {
            toastId: v4(),
            autoClose: 3000,
          });
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
      toast.error("Something went wrong. Please try again.", {
        toastId: "addToCart",
        autoClose: 3000,
      });
    }
  };

  /*
   * @description: update cart item
   *
   * @param {Object} item
   * @param {Number} item.productId - product id
   * @param {Number} [item.productVariantId] - product variant id
   * @param {Number} [item.quantity] - quantity
   */
  const updateCartItem = async (item) => {
    try {
      if (user && token) {
        const data = await axios({
          method: "post",
          url: `${apiBaseUrl}/cart/update`,
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
          data: item,
        });

        if (data) {
          setCartUpdated(true);
          toast.success("Item quantity updated.", {
            toastId: v4(),
            autoClose: 3000,
          });
        }
      } else {
        toast.info(
          "You must be logged in to update items in cart. Redirecting...",
          {
            autoClose: 3000,
          }
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        toastId: "updateCartItem",
        autoClose: 3000,
      });
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
      const { data } = await axios({
        method: "delete",
        url: `${apiBaseUrl}/cart/remove`,
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
        data: item,
      });
      if (data) {
        setCartUpdated(true);
        toast.info("Item removed to cart.", {
          toastId: v4(),
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        toastId: "removeFromCart",
        autoClose: 3000,
      });
    }
  };

  /*
   * @description: checkout cart
   * @param {number} addressId - address id
   * @param {string} [notes] - notes
   *
   * @returns {Object} - stripe payment intent
   */
  const checkoutCart = async (addressId, notes) => {
    try {
      const { data } = await axios.get(`${apiBaseUrl}/cart/checkout`, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
        params: {
          addressId: addressId,
          notes: notes,
        },
      });
      if (data) {
        console.log(data);
        setCart([]);
        setCartUpdated(true);
        toast.success("Cart successfully checked out.", {
          toastId: v4(),
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        toastId: "checkoutCart",
        autoClose: 3000,
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        setCart: setCart,
        updateCartItem: updateCartItem,
        checkoutCart: checkoutCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
