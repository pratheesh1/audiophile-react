import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="h-screen w-full">Home</div>
    </>
  );
};

export default Home;
