import React, { useEffect } from "react";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="h-screen w-full">Contact-Us</div>
    </>
  );
};

export default ContactUs;
