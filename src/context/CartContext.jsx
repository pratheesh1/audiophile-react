import { createContext, useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import { apiBaseUrl } from "../api/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { loadStripe } from "@stripe/stripe-js";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  //state
  const [cart, setCart] = useState([]);
  const { user, token } = useContext(UserContext);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [stripeSession, setStripeSession] = useState(null);
  const [countries, setCountries] = useState([]);
  const [address, setAddress] = useState(null);
  const [outOfStock, setOutOfStock] = useState(false);
  const navigate = useNavigate();

  //get countries
  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/address/countries`)
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => {
        toast.error("Error connecting to server. Please try again later.", {
          autoClose: 5000,
          closeButton: true,
          toastId: "countries",
        });
      });
  }, []);

  //get and update cart
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

  //checkout with stripe if session id is set
  useEffect(() => {
    //checkout with stripe
    async function checkout() {
      const stripe = await loadStripe(stripeSession.publishableKey);
      if (stripeSession) {
        stripe.redirectToCheckout({
          sessionId: stripeSession.sessionId,
        });
      }
    }
    if (stripeSession) {
      try {
        checkout();
      } catch (error) {
        toast.update("checkoutCart", {
          render: "Something went wrong. Please try again.",
          isLoading: false,
          autoClose: 3000,
          type: "error",
        });
      }
    }
  }, [stripeSession]);

  /*********************** Helper Functions ***********************/

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
  //checkout with stripe
  const checkoutCart = async (address, notes = null) => {
    if (cart.length === 0) {
      toast.error("Your cart is empty. Please add items to cart.", {
        toastId: "checkoutCart",
        autoClose: 3000,
      });
    } else {
      if (address) {
        toast.loading("Checking out...", {
          toastId: "checkoutCart",
          autoClose: false,
          type: "info",
        });
        //get stripe session id
        try {
          const session = await axios({
            method: "post",
            url: `${apiBaseUrl}/checkout`,
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
            data: {
              addressId: address.id,
              notes: notes,
            },
          });
          setStripeSession(session.data);
        } catch (error) {
          //update cart if no stock
          if (error.response.status === 417) {
            toast.update("checkoutCart", {
              render: "Cart Updated. Please review your cart and try again.",
              isLoading: false,
              type: "error",
              closeButton: true,
            });
            setOutOfStock(true);
            setCartUpdated(true);
          } else {
            toast.update("checkoutCart", {
              render: "Something went wrong. Please try again.",
              autoClose: 3000,
              type: "error",
              isLoading: false,
            });
          }
        }
      } else {
        toast.error("Please add shipping address.", {
          toastId: "checkoutCart",
          autoClose: 3000,
          type: "error",
        });
      }
    }
  };

  /*
   * @description: add new address
   * @param {Object} address
   * @param {string} address.street
   * @param {string} address.city
   * @param {string} address.state
   * @param {string} address.zip
   * @param {number} address.countryId
   *
   * @returns {Object} - new address
   */
  const addNewAddress = async (address) => {
    try {
      const newAddress = await axios({
        method: "post",
        url: `${apiBaseUrl}/address/create`,
        data: address,
      });
      setAddress(newAddress.data);
    } catch (err) {
      toast.error("Error connecting to server. Please try again later.", {
        autoClose: 5000,
        closeButton: true,
        toastId: "address-error",
      });
    }
  };

  /*********************** End of Helper Functions ***********************/

  //return context
  return (
    <CartContext.Provider
      value={{
        cart: cart,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        setCart: setCart,
        updateCartItem: updateCartItem,
        checkoutCart: checkoutCart,
        countries: countries,
        addNewAddress: addNewAddress,
        address: address,
        setAddress: setAddress,
        outOfStock: outOfStock,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
