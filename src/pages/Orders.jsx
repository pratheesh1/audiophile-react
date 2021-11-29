import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loaders from "../components/Loaders";

function Orders() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //check if user is logged in
  useEffect(() => {
    if (!user) {
      toast.info("You must be logged in to view this page. Redirecting...", {
        autoClose: 5000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [user, navigate]);

  //loading
  if (!user) {
    return (
      <>
        <Loaders />
        {/* toast */}
      </>
    );
  }

  //return checkout page
  return <></>;
}

export default Orders;
