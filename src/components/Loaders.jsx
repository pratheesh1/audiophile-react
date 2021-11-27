import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function Loaders() {
  return (
    <>
      <section className="h-screen m-5 lg:pt-5">
        <div className="flex justify-center items-center h-4/6">
          <Loader
            type="Puff"
            color="#00BFFF"
            height="100"
            width="100"
            className="pb-50"
          />
        </div>
      </section>
    </>
  );
}

export default Loaders;
