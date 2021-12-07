import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import CartContext from "../context/CartContext";

function CartItem({ product }) {
  const { removeFromCart, updateCartItem } = useContext(CartContext);
  const navigate = useNavigate();

  //update cart item
  const updateItem = (quantity) => {
    if (product) {
      if (quantity + product?.quantity > 0) {
        updateCartItem({
          productId: product?.productId,
          quantity: product?.quantity + quantity,
        });
      } else {
        toast.error(
          "Quantity cannot be negative. Use remove button to remove item.",
          {
            toastId: "updateItem",
            autoClose: 3000,
          }
        );
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="flex items-center hover:bg-gray-100  px-0 md:px-6 py-5">
          <div className="flex w-2/5">
            <div className="w-20 hidden md:block">
              {product?.product?.image[0] ? (
                <img
                  className="h-24 object-cover hover:scale-125"
                  src={product?.product?.image[0]?.imageUrl}
                  alt="product"
                  onClick={() => navigate(`/product/${product?.productId}`)}
                  role="button"
                />
              ) : (
                <img
                  className="h-24 object-cover hover:scale-125"
                  src="https://via.placeholder.com/150"
                  alt="product placeholder"
                  onClick={() => navigate(`/product/${product?.productId}`)}
                  role="button"
                />
              )}
            </div>
            <div className="flex flex-col justify-between ml-0 md:ml-4 flex-grow">
              <span className="font-bold text-xs md:text-sm">
                {product?.product?.name}
              </span>
              <span className="text-red-500 text-xs">
                {product?.product?.brand?.brandName}
              </span>
              <span
                role="button"
                onClick={() =>
                  removeFromCart({ productId: product?.productId })
                }
                className="font-semibold hover:text-red-500 text-gray-500 text-xs"
              >
                Remove
              </span>
            </div>
          </div>
          <div className="flex justify-center w-auto md:w-1/5">
            <i
              className="fas fa-minus pt-3 md:pt-4 text-xs md:text-base"
              onClick={() => updateItem(-1)}
              role="button"
            ></i>

            <input
              className="mx-2 border text-center w-10 md:w-12"
              type="text"
              name="quantity"
              value={product?.quantity}
              disabled={true}
            />
            <i
              className="fas fa-plus pt-3 md:pt-4 text-xs md:text-base"
              onClick={() => updateItem(1)}
              role="button"
            ></i>
          </div>
          <span className="text-center w-1/5 font-semibold text-sm">{`$${
            product?.originalPrice / 100
          }`}</span>
          <span className="text-center w-1/5 font-semibold text-sm">{`$${
            (product?.originalPrice * product?.quantity) / 100
          }
        `}</span>
        </div>
      </div>
    </>
  );
}

export default CartItem;
