import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loaders from "../components/Loaders";

function Cart() {
  //state
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

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

  //loading
  if (!user) {
    return (
      <>
        <Loaders />
      </>
    );
  }

  //return cart
  return <div>This is a cart</div>;
}

export default Cart;
