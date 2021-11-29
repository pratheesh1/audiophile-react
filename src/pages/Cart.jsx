import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { NavLink, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loaders from "../components/Loaders";
import CartItem from "../components/CartItem";
import CartContext from "../context/CartContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addressFormSchema } from "../validators/form";

function Cart() {
  //state
  const { token, user, isLoading } = useContext(UserContext);
  const { cart, checkoutCart, countries, address, setAddress, addNewAddress } =
    useContext(CartContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressFormSchema),
  });

  //add new address
  const onSubmit = (data) => {
    addNewAddress(data);
  };

  //redirect to login
  if (!token && !user && !isLoading) {
    toast.error("Please login to view your cart.", {
      toastId: "cart",
      autoClose: 4000,
    });
    return <Navigate to="/login" />;
  }

  //total price
  let totalPrice = 0;
  if (cart && cart?.length > 0) {
    totalPrice = cart?.reduce((acc, item) => {
      return acc + item.quantity * item.originalPrice;
    }, 0);
  }

  //return cart
  return isLoading ? (
    <Loaders />
  ) : (
    <>
      <section className="bg-gray-100 w-full overflow-hidden min-h-screen relative xl:pt-5">
        <div className="container mx-auto mt-10">
          <div className="grid md:flex grid-col-12 shadow-md my-10">
            {/* products */}
            <div className="col-span-12 md:w-4/5 bg-white p-2 md:px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-xl md:text-2xl px-2 md:px-0">
                  Shopping Cart
                </h1>
                <h2 className="font-semibold text-xl md:text-2xl px-2 md:px-0">
                  {cart?.length ? cart.length : 0} Items
                </h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Quantity
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Price
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Total
                </h3>
              </div>
              {/* products */}
              {cart?.length > 0 ? (
                cart.map((product) => (
                  <CartItem product={product} key={product.id} />
                ))
              ) : (
                <div className="flex justify-center">
                  <h1 className="text-gray-600 text-2xl font-light pt-20">
                    No items in cart.
                  </h1>
                </div>
              )}

              <NavLink to="/">
                <span className="flex font-semibold text-indigo-600 hover:text-indigo-800 text-sm mt-10 hover:scale-105">
                  <i className="fas fa-arrow-left mt-1"></i> &nbsp; Continue
                  Shopping
                </span>
              </NavLink>
            </div>

            {/* cart summary */}
            <div className="col-span-12 md:w-2/5 px-8 py-10">
              <h1 className="font-semibold text-xl md:text-2xl border-b pb-8">
                Order Summary
              </h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  Shipping Information:
                </span>
              </div>
              <div>
                {/* add address form */}
                {address?.id ? (
                  <div className="flex flex-col justify-between">
                    <p className="font-medium py-2 text-sm block w-full">
                      Address Line 1/Street:
                      <br />
                      <span className="pl-2 font-normal">{address.street}</span>
                    </p>
                    <p className="font-medium py-2 text-sm block w-full">
                      City:
                      <br />
                      <span className="pl-2 font-normal"> {address.city}</span>
                    </p>
                    <p className="font-medium py-2 text-sm block w-full">
                      State:
                      <br />
                      <span className="pl-2 font-normal"> {address.state}</span>
                    </p>
                    <p className="font-medium py-2 text-sm block w-full">
                      Zip:
                      <br />
                      <span className="pl-2 font-normal"> {address.zip}</span>
                    </p>
                    <div className="w-full lg:w-5/6 flex justify-end">
                      <button
                        className="bg-indigo-400 font-semibold hover:bg-indigo-500 px-2 py-3 text-sm text-white uppercase rounded-md hover:scale-105"
                        onClick={() => setAddress(null)}
                      >
                        Change Address
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <form className="lg:pl-5" onSubmit={handleSubmit(onSubmit)}>
                      <label className="font-medium inline-block mb-3 text-sm uppercase">
                        Address Line 1/Street
                      </label>
                      <input
                        type="text"
                        {...register("street")}
                        className="address-form w-full lg:w-5/6 block"
                        placeholder="Door/Street"
                      />
                      {errors.street && (
                        <p className="signup-form-error">
                          {errors.street.message}
                        </p>
                      )}
                      <label className="font-medium inline-block mb-3 text-sm uppercase">
                        State
                      </label>
                      <input
                        type="text"
                        {...register("state")}
                        className="address-form  w-full lg:w-5/6 block"
                        placeholder="State"
                      />
                      {errors.state && (
                        <p className="signup-form-error">
                          {errors.state.message}
                        </p>
                      )}
                      <div className="lg:flex flex-row w-full">
                        <div className="w-full lg:w-5/12 md:mr-7  xl:mr-8">
                          <label className="font-medium inline-block mb-3 text-sm uppercase">
                            City
                          </label>
                          <input
                            type="text"
                            {...register("city")}
                            className="address-form w-full block"
                            placeholder="City"
                          />
                          {errors.city && (
                            <p className="signup-form-error">
                              {errors.city.message}
                            </p>
                          )}
                        </div>
                        <div className="w-full lg:w-2/6">
                          <label className="font-medium inline-block mb-3 text-sm uppercase">
                            Zip Code
                          </label>
                          <input
                            type="text"
                            {...register("zip")}
                            className="address-form w-full block"
                            placeholder="Zip/Postal Code"
                          />
                          {errors.zip && (
                            <p className="signup-form-error">
                              {errors.zip.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <label className="font-medium inline-block mb-3 text-sm uppercase">
                        Country
                      </label>
                      <select
                        className="address-form block w-full lg:w-5/6"
                        {...register("countryId")}
                      >
                        <option value="">Select Country</option>
                        {countries?.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      {errors.countryId && (
                        <p className="signup-form-error">
                          {errors.countryId.message}
                        </p>
                      )}
                      <div className="flex justify-end items-end w-full lg:w-5/6">
                        <button
                          className="bg-indigo-500 font-semibold hover:bg-indigo-600 px-2 py-3 text-sm text-white uppercase rounded-md hover:scale-105"
                          type="submit"
                        >
                          Add Address
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
              <div className="border-t mt-8 w-full lg:w-5/6">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>{`$${totalPrice / 100}`}</span>
                </div>
                <button
                  className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full rounded-md hover:scale-105"
                  type="submit"
                  onClick={() => {
                    checkoutCart(address);
                  }}
                >
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
