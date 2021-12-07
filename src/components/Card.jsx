import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Card({ product, addToCart }) {
  const navigate = useNavigate();
  const getProduct = (id) => {
    navigate(`/product/${id}`);
  };

  //add to cart
  const addProduct = (id) => {
    addToCart({ productId: id });
  };

  const byuNow = (id) => {
    toast.loading("Getting product details...", {
      type: "info",
      autoClose: 3000,
      loading: true,
    });
    addProduct(id);
    setTimeout(() => {
      toast.dismiss();
      navigate("/cart");
    }, 2000);
  };

  return (
    product && (
      <div className="col-span-12 lg:col-span-6 2xl:col-span-4 p-3 hover:scale-105 flex justify-center product-display-card">
        <div className="flex max-w-md bg-white shadow-md rounded-lg overflow-hidden">
          {product.image.length ? (
            <div
              className="w-full lg:w-1/2 bg-login flex "
              role="button"
              onClick={() => {
                getProduct(product.id);
              }}
            >
              <img
                className="object-cover flex-shrink-0"
                src={product.image[0].imageUrl}
                alt={product.name}
              />
            </div>
          ) : (
            ""
          )}
          <div
            className={`w-full p-4 ${product.image.length ? "" : "lg:w-2/3"}`}
          >
            <div
              className="h-5/6"
              role="button"
              onClick={() => {
                getProduct(product.id);
              }}
            >
              <h1 className="text-gray-900 font-bold text-lg pb-5 line-clamp-1 md:line-clamp-2">
                {product.name}
              </h1>
              <p className="mt-2 text-gray-600 text-sm pb-2 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between mt-2">
                <h1 className="text-gray-700 font-bold text-xl">{`$${
                  product.baseCost / 100
                }`}</h1>
                <h1 className="text-gray-700 font-thin text-sm">
                  {product.category.name}
                </h1>
              </div>
            </div>
            <div className="flex justify-between lg:pt-2">
              <button
                className={`py-2 px-2 mr-1 text-xs uppercase rounded whitespace-nowrap ${
                  product?.stock
                    ? "bg-orange-500 hover:bg-orange-600 hover:scale-110 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => {
                  byuNow(product.id);
                }}
              >
                <i className="fas fa-credit-card pr-1"></i> Buy Now
              </button>
              <button
                className=" px-2 py-2 mr-2 bg-gray-800 hover:scale-110 text-white text-xs uppercase rounded whitespace-nowrap"
                onClick={() => {
                  addProduct(product.id);
                }}
              >
                <i className="fas fa-cart-plus pr-1"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Card;
