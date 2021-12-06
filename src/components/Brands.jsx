import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/recommendations.css";

const Brands = ({ brands, setParams, navigate }) => {
  //settings for carousel
  var settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 700,
    swipeToSlide: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    rows: 2,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return brands ? (
    <Slider {...settings}>
      {brands?.map(
        (brand) =>
          brand?.thumbnail && (
            <>
              <div
                className="h-[130px] w-[140px] my-5 mx-3"
                role="button"
                onClick={() => {
                  setParams({ brand: [brand.id] });
                  navigate("/home");
                }}
              >
                <img
                  className="object-contain object-center rounded-lg"
                  src={brand.thumbnail}
                  alt={brand.brandName}
                />
              </div>
            </>
          )
      )}
    </Slider>
  ) : (
    <></>
  );
};
export default Brands;
