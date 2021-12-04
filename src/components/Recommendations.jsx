import React, { useContext } from "react";
import Slider from "react-slick";
import ProductContext from "../context/ProductContext";
import CartContext from "../context/CartContext";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/recommendations.css";

const Recommendations = () => {
  const { products } = useContext(ProductContext);
  const recommendations =
    products?.length > 7 ? products.slice(0, 7) : products;
  const { addToCart } = useContext(CartContext);

  console.log(recommendations);
  const generateCards = () => {
    return recommendations.map((product) => (
      <span key={product.id} className="hover:animate-wiggle">
        <Card product={product} addToCart={addToCart} />
      </span>
    ));
  };

  var settings = {
    arrows: true,
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    swipeToSlide: true,
    slidesToShow: 4.7,
    slidesToScroll: 1,
    initialSlide: 0,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>{recommendations && generateCards()}</Slider>
    </>
  );
};

export default Recommendations;
