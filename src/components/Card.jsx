import React from "react";
import ProductContext from "../context/ProductContext";

function Card() {
  const { products, loading, error } = React.useContext(ProductContext);

  console.log(products, loading, error);

  return <div>Hello</div>;
}

export default Card;
