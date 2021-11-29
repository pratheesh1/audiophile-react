import React, { useState, useEffect, useContext } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import useAxiosGet from "../hooks/useAxiosGet";
import { apiBaseUrl } from "../api/link";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loaders from "../components/Loaders";
import CartContext from "../context/CartContext";

function Product() {
  //state
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  //fetch data
  const { data, isLoading, getError } = useAxiosGet(
    `${apiBaseUrl}/products/${id}`
  );
  const { addToCart } = useContext(CartContext);
  const [formQuantity, setFormQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //set product state
  useEffect(() => {
    if (!isLoading && !getError && data) {
      setProduct(data.product);
    }
  }, [data, getError, isLoading]);

  ///check if form quantity is valid
  useEffect(() => {
    if (formQuantity < 0 || !formQuantity) {
      setFormQuantity(1);
      toast.error("Invalid quantity!", {
        toastId: "formQuantity",
        autoClose: 3000,
      });
    }
  }, [formQuantity]);

  //get images for carousel
  const images =
    product?.image &&
    product.image.map((image) => {
      return image.imageUrl;
    });

  //add to cart
  const addItemToCart = (id, quantity) => {
    addToCart({ productId: id, quantity: quantity ? quantity : null });
  };

  //buy now
  const byuNow = (id) => {
    toast.loading("Getting product details...", {
      type: "info",
      autoClose: false,
      loading: true,
    });
    addItemToCart(id);

    setTimeout(() => {
      toast.dismiss();
      navigate("/cart");
    }, 2000);
  };

  //loading
  if (isLoading) {
    return <Loaders />;
  }

  //error
  if (getError) {
    navigate("/404");
  }

  //page
  return (
    <>
      <section className="min-h-screen mt-5 lg:pt-20 max-w-[100vw] overflow-hidden">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-start-2 md:col-span-9">
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
                      images.map(function (image, i) {
                        return (
                          <div key={i} className="w-full">
                            <img src={image} alt="product" />
                            <p className="legend">{product?.name}</p>
                          </div>
                        );
                      })}
                  </Carousel>
                  {images?.length < 1 && (
                    <p className="text-center">
                      No images available for this product.
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-12 md:col-span-5 flex items-center h-full justify-center py-5">
                <div className="h-full">
                  {/* product info */}
                  <div className="w-full flex flex-col items-start justify-center px-3">
                    <div className="h-5/6 min-h-[150px] w-full">
                      {/* name, description */}
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        {product?.name}
                      </h1>
                      <hr className="border-b-1 border-gray-400 my-3" />
                      <div className="grid grid-cols-2">
                        <div className="col-span-1">
                          <p className="text-gray-800">
                            {product?.description}
                          </p>
                          <p className="text-gray-800 py-3 text-xl font-semibold">
                            <span className="text-gray-600">$</span>
                            {product?.baseCost / 100}
                          </p>
                        </div>

                        {/* image */}
                        <div className="col-span-1 flex justify-end">
                          {product?.brand?.thumbnail && (
                            <img
                              src={product?.brand?.thumbnail}
                              alt="brand"
                              className="w-1/2 lg:w-1/3 h-auto object-contain"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-6 pt-5 h-1/6">
                      {/* product details, tags, categories etc */}
                      <div className="col-span-6 py-3 pb-14">
                        <div className="flex flex-col items-start justify-center">
                          <div className="flex flex-col items-start justify-center">
                            <p className="text-gray-800">
                              <span className="text-gray-600">
                                Brand: &nbsp;
                                <span className="text-gray-700 font-light text-base">
                                  {product?.brand.brandName}
                                </span>
                              </span>
                            </p>
                            <p className="text-gray-800">
                              <span className="text-gray-600">
                                Category: &nbsp;
                                <span className="text-gray-700 font-light text-base">
                                  {product?.category.name}
                                </span>
                              </span>
                            </p>
                            {product?.customTag?.length > 0 && (
                              <p className="text-gray-800">
                                <span className="text-gray-600">
                                  Product Tags:&nbsp; &nbsp;
                                  <span className="text-gray-700 font-light text-base">
                                    {product?.customTag.reduce((prev, curr) => {
                                      return `${prev} #${curr.customTag.tagName}`;
                                    }, "")}
                                  </span>
                                </span>
                              </p>
                            )}
                            {product?.stock >= 0 && (
                              <p className="text-gray-800">
                                <span className="text-gray-600">
                                  Stock: &nbsp;
                                  <span className="text-gray-700 font-bold text-base">
                                    {product.stock
                                      ? "In Stock"
                                      : "Out of Stock"}
                                  </span>
                                </span>
                              </p>
                            )}
                            {/* tech specs */}
                            <h1 className="text-gray-800 mt-3">
                              <span className="text-gray-600 font-medium">
                                Product Specs:
                              </span>
                            </h1>
                            <hr className="border-b-1 border-gray-400 w-full" />
                            <p className="text-gray-800">
                              <span className="text-gray-600">
                                Bluetooth: &nbsp;
                                <span className="text-gray-700 font-light text-base">
                                  {product?.bluetooth ? "Yes" : "No"}
                                </span>
                              </span>
                            </p>
                            {product?.frequencyResponseId && (
                              <p className="text-gray-800">
                                <span className="text-gray-600">
                                  Frequency Response: &nbsp;
                                  <span className="text-gray-700 font-light text-base">
                                    {
                                      product?.frequencyResponse
                                        .frequencyResponse
                                    }
                                  </span>
                                </span>
                              </p>
                            )}
                            {product?.impedanceRangeId && (
                              <p className="text-gray-800">
                                <span className="text-gray-600">
                                  Impedance Range: &nbsp;
                                  <span className="text-gray-700 font-light text-base">
                                    {product?.impedanceRange.impedanceValue}
                                    &nbsp;Ohms
                                  </span>
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-start-1">
                        <button
                          className={`py-4 px-2 md:px-3 mr-1 text-xs uppercase rounded whitespace-nowrap ${
                            product?.stock
                              ? "bg-orange-500 hover:bg-orange-600 hover:scale-110 text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                          disabled={!product?.stock}
                          onClick={() => {
                            byuNow(product.id);
                          }}
                        >
                          <i className="fas fa-credit-card pr-1"></i> Buy Now
                        </button>
                      </div>
                      <div className="col-start-3 md:col-start-4 flex">
                        <input
                          type="text"
                          placeholder="Quantity"
                          value={formQuantity}
                          onChange={(e) => {
                            setFormQuantity(e.target.value);
                          }}
                          className="w-10 md:w-14 rounded ml-7 md:ml-0 mr-2 border-2 border-gray-400 focus:outline-none focus:border-orange-500"
                        />
                        <button
                          className=" px-2 py-2 mr-2 bg-gray-800 hover:scale-110 text-white text-xs uppercase rounded whitespace-nowrap"
                          onClick={() => {
                            addItemToCart(product.id, formQuantity);
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
      </section>
    </>
  );
}

export default Product;
