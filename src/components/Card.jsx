import React from "react";
import ProductContext from "../context/ProductContext";
import UserContext from "../context/UserContext";

function Card() {
  const { products, loading, error } = React.useContext(ProductContext);
  const { setUser } = React.useContext(UserContext);
  console.log(products, loading, error);

  return <div>Hello</div>;
}

export default Card;
