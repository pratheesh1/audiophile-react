import React from "react";

const OrderItem = ({ item }) => {
  return item ? (
    <div className="p-3 border-t">
      {/* display each order item */}
      <div className="grid grid-cols-12">
        <div className="col-span-3 lg:col-span-1">
          <img
            src={
              item?.product?.image[0]?.imageUrl
                ? item?.product?.image[0]?.imageUrl
                : "https://via.placeholder.com/150"
            }
            alt="product"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-9 lg:col-span-11 grid grid-cols-12 pl-4">
          <div className="col-span-12 md:col-span-6">
            <h2 className="text-base font-light text-gray-800">
              Product Name: &nbsp;{item?.product?.name}
            </h2>
            <h2 className="text-base font-light text-gray-800">
              Order Quantity: &nbsp;{item?.quantity}
            </h2>
            <h2 className="text-base font-light text-gray-800">
              Price: &nbsp;{"$" + item?.cost / 100}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6">
            <h2 className="text-base font-light text-gray-800">
              Item Total: &nbsp;{"$" + (item?.cost * item?.quantity) / 100}
            </h2>
            <h2 className="text-base font-light text-gray-800">
              Item Status: &nbsp;{item?.status?.name}
            </h2>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default OrderItem;
