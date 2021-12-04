import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Image404 } from "../components/Images";
import "../styles/page404.css";

const Page404 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <main
        aria-labelledby="404"
        className="flex h-screen items-center justify-center bg-gray-100"
      >
        <div className="min-w-screen min-h-screen bg-white flex items-center p-5 lg:p-20 overflow-hidden relative">
          <div className="flex-1 min-h-full min-w-full rounded-3xl bg-gray-100 shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
            <div className="w-full md:w-1/2">
              <div className="mb-10 md:mb-20 text-gray-600 font-light lg:text-lg">
                <h1 className="font-black uppercase text-3xl lg:text-5xl text-orange-500 mb-10">
                  You seem to be lost!
                </h1>
                <p>The page you're looking for isn't available.</p>
                <p>Try again or use the Go Back button below.</p>
              </div>
              <div className="mb-20 md:mb-0 animate-bounce">
                <NavLink
                  to="/"
                  className="text-lg font-light outline-none focus:outline-none text-gray-800 hover:text-blue-700"
                >
                  <i className="fas fa-arrow-left px-2"></i>Go Back
                </NavLink>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center">
              <Image404 />
            </div>
          </div>
          <div className="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
          <div className="w-96 h-full bg-yellow-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
        </div>
      </main>
    </>
  );
};

export default Page404;
