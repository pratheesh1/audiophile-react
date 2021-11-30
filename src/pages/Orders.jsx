import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import OrderContext from "../context/OrderContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loaders from "../components/Loaders";
import OrderItem from "../components/OrderItem";
const { format } = require("date-fns");

function Orders() {
  const { token, user, isLoading } = useContext(UserContext);
  const { orders, orderIsLoading } = useContext(OrderContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(orders[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //useEffect to scroll to top of page when filter is applied
  useEffect(() => {
    !openMenu && window.scrollTo(0, 0);
    if (openMenu) {
      document.getElementById("ordermenu-container").classList.remove("hidden");
      document.getElementById("order-container").classList.add("hidden");
    }
    if (!openMenu && !orderIsLoading && !isLoading) {
      document.getElementById("ordermenu-container").classList.add("hidden");
      document.getElementById("order-container").classList.remove("hidden");
    }
  }, [openMenu, orderIsLoading, isLoading]);

  //check if user is logged in
  if (!token && !user && !isLoading) {
    toast.error("You must be logged in to view this page.", {
      autoClose: 4000,
      toastId: "login",
    });
    return <Navigate to="/login" />;
  }

  const orderTotal = currentOrder
    ? currentOrder.orderItem.reduce((accum, item) => {
        return accum + item.cost * item.quantity;
      }, 0)
    : 0;

  //return order history page
  return isLoading || orderIsLoading ? (
    <Loaders />
  ) : (
    <>
      <section className="bg-gray-100 w-full overflow-hidden min-h-screen relative lg:p-10 xl:pl-16">
        <div className="grid grid-cols-12 gap-4">
          {/* Menu */}
          <div
            id="ordermenu-container"
            className="col-span-12 md:col-start-1 lg:col-start-1 md:col-span-3 md:pt-5 absolute md:relative bg-gray-300 md:bg-transparent w-full h-screen md:h-auto overflow-x-scroll hidden md:block shadow-md border"
          >
            <div className="w-10/12 sm:w-5/6 md:w-auto h-full md:h-auto">
              <h1 className="p-2 lg:pl-10 text-xl font-serif text-gray-800">
                View All Orders
              </h1>
              {/* for each order */}
              {orders.map((order) => (
                <div
                  role="button"
                  onClick={() => {
                    setCurrentOrder(order);
                  }}
                  key={order?.id}
                  className="bg-blue-100 border-t border-b border-blue-200 text-gray-700 px-4 py-3 lg:pl-10"
                >
                  <p className="font-serif">Order ID: &nbsp;{order?.id}</p>
                  <p className="font-light text-base">
                    Order Date: &nbsp;
                    {format(new Date(order?.timestamp), "dd.MM.yyyy")}{" "}
                  </p>
                </div>
              ))}
            </div>
            {/* absolute position close button to close menu on mobile */}
            <div
              className="absolute top-3 right-3 m-2 p-2 text-gray-700 text-xl cursor-pointer md:hidden"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <i className="fas fa-times"></i>{" "}
            </div>
          </div>
          {/* Main */}
          <div
            id="order-container"
            className="w-full md:pt-10 col-span-12 md:col-span-9 2xl:col-span-8 border shadow-md"
          >
            <div className="w-full bg-gray-200">
              <h1 className="text-xl font-serif text-gray-900 p-2 w-full border-b">
                Order Details:
              </h1>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-12 md:col-span-6 p-2">
                <h2 className="text-base font-light text-gray-800">
                  Order Date: &nbsp;{" "}
                  {currentOrder?.timestamp &&
                    format(new Date(currentOrder.timestamp), "dd.MM.yyyy")}
                </h2>
                <h2 className="text-base font-light text-gray-800">
                  <span className="font-bold">Order Status:</span>
                  &nbsp;{currentOrder?.status?.name}
                </h2>
              </div>
              <div className="col-span-12 md:col-span-6 p-2">
                <h2 className="text-base font-light text-gray-800">
                  <span className="font-bold">Order Total:</span>
                  &nbsp;{`$${orderTotal / 100}`}
                </h2>
                <h2 className="text-base font-light text-gray-800">
                  Order ID: &nbsp;{currentOrder?.id}
                </h2>
              </div>
            </div>
            {/* order items */}
            {currentOrder?.orderItem?.map((item) => (
              <OrderItem key={item?.id} item={item} />
            ))}
          </div>
        </div>

        {/* absolute positioned filter button */}
        <div className="fixed bottom-2 right-3 m-2 md:hidden">
          <button
            className="bg-gray-200 text-gray-700 font-bold py-2 px-3 rounded-full focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <i className="fas fa-barcode"></i>
          </button>
        </div>
        <span className="hidden md:block"></span>
      </section>
    </>
  );
}

export default Orders;
