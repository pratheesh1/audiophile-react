import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loaders from "../components/Loaders";

function Orders() {
  const { token, user, isLoading } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //check if user is logged in
  if (!token && !user && !isLoading) {
    toast.error("You must be logged in to view this page.", {
      autoClose: 4000,
      toastId: "login",
    });
    return <Navigate to="/login" />;
  }

  //return checkout page

  //return cart
  return isLoading ? <Loaders /> : <></>;
}

export default Orders;
