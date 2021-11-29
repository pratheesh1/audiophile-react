import React, { useEffect } from "react";

const Page404 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="h-screen w-full">404</div>
    </>
  );
};

export default Page404;
