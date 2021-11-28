import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loaders from "../components/Loaders";
import CartItem from "../components/CartItem";
import CartContext from "../context/CartContext";

function Cart() {
  //state
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  //check if user is logged in
  useEffect(() => {
    if (!user) {
      toast.info("You must be logged in to view cart. Redirecting...", {
        autoClose: 5000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [navigate, user]);

  //total price
  let totalPrice = 0;
  if (cart && cart?.length > 0) {
    totalPrice = cart?.reduce((acc, item) => {
      return acc + item.quantity * item.originalPrice;
    }, 0);
  }

  //loading
  if (!user) {
    return (
      <>
        <Loaders />
      </>
    );
  }

  //return cart
  return (
    <>
      <section className="bg-gray-100 w-full overflow-hidden min-h-screen relative xl:pt-5">
        <div class="container mx-auto mt-10">
          <div class="grid md:flex grid-col-12 shadow-md my-10">
            {/* products */}
            <div class="col-span-12 md:w-4/5 bg-white p-2 md:px-10 py-10">
              <div class="flex justify-between border-b pb-8">
                <h1 class="font-semibold text-xl md:text-2xl px-2 md:px-0">
                  Shopping Cart
                </h1>
                <h2 class="font-semibold text-xl md:text-2xl px-2 md:px-0">
                  {cart?.length ? cart.length : 0} Items
                </h2>
              </div>
              <div class="flex mt-10 mb-5">
                <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Quantity
                </h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Price
                </h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Total
                </h3>
              </div>
              {/* products */}
              {cart?.length > 0 ? (
                cart.map((product) => <CartItem product={product} />)
              ) : (
                <div class="flex justify-center">
                  <h1 class="text-gray-600 text-2xl font-light pt-20">
                    No items in cart.
                  </h1>
                </div>
              )}

              <NavLink to="/">
                <span class="flex font-semibold text-indigo-600 hover:text-indigo-800 text-sm mt-10 hover:scale-105">
                  <i class="fas fa-arrow-left mt-1"></i> &nbsp; Continue
                  Shopping
                </span>
              </NavLink>
            </div>

            {/* cart summary */}
            <div class="col-span-12 md:w-2/5 px-8 py-10">
              <h1 class="font-semibold text-xl md:text-2xl border-b pb-8">
                Order Summary
              </h1>
              <div class="flex justify-between mt-10 mb-5">
                <span class="font-semibold text-sm uppercase">
                  Total: &nbsp;{cart?.length ? cart.length : 0} Items
                </span>
              </div>
              <div>
                <label class="font-medium inline-block mb-3 text-sm uppercase">
                  Shipping
                </label>
                <div>Todo, address and shipping</div>
              </div>
              <div class="border-t mt-8">
                <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>{`$${totalPrice / 100}`}</span>
                </div>
                <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full rounded-md hover:scale-105">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
