import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function Cart() {
  const { user } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setRedirect(true);
    }
    if (redirect) {
      toast.info("You must be logged in to view cart. Redirecting...", {
        autoClose: 5000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [redirect, navigate, user]);

  //loading
  if (!user) {
    return (
      <>
        <section className="h-screen m-5 lg:pt-5">
          <div className="flex justify-center items-center h-5/6">
            <Loader
              type="Puff"
              color="#00BFFF"
              height="100"
              width="100"
              timeout={5000}
              className="pb-50"
            />
          </div>
          {/* toast */}
          <ToastContainer autoClose={8000} />
        </section>
      </>
    );
  }

  return <div>This is a cart</div>;
}

export default Cart;
