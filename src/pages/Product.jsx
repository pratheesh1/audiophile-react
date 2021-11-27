import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import useAxiosGet from "../hooks/useAxiosGet";
import { apiBaseUrl } from "../api/link";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const { data, isLoading, getError } = useAxiosGet(
    `${apiBaseUrl}/products/${id}`
  );

  //set product state
  useEffect(() => {
    if (!isLoading && !getError && data) {
      setProduct(data.product);
    }
  }, [data, getError, isLoading]);

  //get images for carousel
  const images =
    product?.image &&
    product.image.map((image) => {
      return image.imageUrl;
    });

  //add to cart
  const addToCart = (id) => {
    //TODO: add to cart
    console.log(id, "addToCart");
  };

  const byuNow = (id) => {
    toast.loading("Getting product details...", {
      type: "info",
      autoClose: false,
      loading: true,
      toastId: id,
    });

    //TODO: remove timeout
    setTimeout(() => {
      navigate("/checkout");
    }, 2000);
    console.log(id, "byuNow");
    //TODO: buy now
  };

  //loading
  if (isLoading) {
    return (
      <>
        <section className="h-screen m-5 lg:pt-5">
          <div className="flex justify-center items-center h-5/6">
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

  //error
  if (getError) {
    navigate("/404");
  }

  //page
  return (
    <>
      <section className=" w-full min-h-screen mt-5 lg:pt-5">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-start-2 md:col-span-10">
            <div className="grid grid-cols-12">
              <div className="col-span-12 md:col-span-7 flex items-center justify-center">
                {/* image carousel */}
                <div className="flex flex-col items-center justify-center">
                  <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    stopOnHover={true}
                    swipeable={true}
                    transitionTime={1000}
                    ariaLabel="Product Images"
                    useKeyboardArrows={true}
                    emulateTouch={true}
                    className="w-4/5 md:w-3/5 lg:w-1/2"
                  >
                    {images &&
                      images.map((image) => {
                        return (
                          <div className="w-full">
                            <img src={image} alt="product" />
                            <p className="legend">{product?.name}</p>
                          </div>
                        );
                      })}
                  </Carousel>
                </div>
              </div>
              <div className="col-span-12 md:col-span-5 flex items-center h-full justify-center py-5">
                <div className="h-full">
                  {/* product info */}
                  <div className="w-full flex flex-col items-start justify-center px-3">
                    <div className="h-5/6 min-h-[150px] w-full">
                      <h1 className="text-3xl font-bold text-gray-800">
                        {product?.name}
                      </h1>
                      <hr className="border-b-1 border-gray-400 my-3" />
                      <p className="text-gray-800">{product?.description}</p>
                      <p className="text-gray-800">
                        <span className="text-gray-600">$</span>
                        {product?.baseCost / 100}
                      </p>
                    </div>
                    <div className="grid grid-cols-6 pt-5 h-1/6">
                      <div className="col-start-2 md:col-start-1">
                        <button
                          className="py-2 px-2 mr-1 bg-orange-500 hover:bg-orange-600 hover:scale-110 text-white text-xs uppercase rounded whitespace-nowrap"
                          onClick={() => {
                            byuNow(product.id);
                          }}
                        >
                          <i className="fas fa-credit-card pr-1"></i> Buy Now
                        </button>
                      </div>
                      <div className="col-start-4">
                        <button
                          className=" px-2 py-2 mr-2 bg-gray-800 hover:scale-110 text-white text-xs uppercase rounded whitespace-nowrap"
                          onClick={() => {
                            addToCart(product.id);
                          }}
                        >
                          <i className="fas fa-cart-plus pr-1"></i> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* toast */}
        <ToastContainer autoClose={8000} limit={1} />
      </section>
    </>
  );
}

export default Product;
