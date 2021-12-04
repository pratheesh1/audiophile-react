import React from "react";
import Typical from "react-typical";

const MainTypical = () => {
  const steps = [
    "Accessories",
    3000,
    "Amplifiers",
    3000,
    "Boomboxes",
    3000,
    "Cables",
    3000,
    "Earphones",
    3000,
    "Headphones",
    3000,
    "Microphones",
    3000,
    "Speakers",
    3000,
    "Mixers",
    3000,
    "Music Players",
    3000,
  ];

  return <Typical steps={steps} loop={Infinity} wrapper="span" />;
};

export default MainTypical;
