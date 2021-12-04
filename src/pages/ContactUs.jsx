import React, { useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    if (
      e.target.name.value === "" ||
      e.target.email.value === "" ||
      e.target.message.value === "" ||
      e.target.subject.value === ""
    ) {
      toast.info("Please fill all the fields!", {
        autoClose: 3000,
        closeButton: true,
      });
      return;
    }

    emailjs
      .sendForm(
        "service_29k0j49",
        "template_srocfp6",
        form.current,
        "user_4rii07hg3SdmVPT50YT5h"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <>
      <section class="flex flex-col items-center justify-center h-[92vh] w-full bg-gray-100">
        <div class="px-6 py-4 mx-auto bg-white rounded-lg shadow-md">
          <div>
            <h2 class="text-3xl font-semibold text-center text-gray-800">
              Get in touch with the Audiophile team!
            </h2>
            <form ref={form} onSubmit={sendEmail}>
              <div class="mt-6 ">
                <div class="items-center -mx-2 md:flex py-3">
                  {/* name */}
                  <div class="w-full mx-2 py-2">
                    <label class="block mb-2 text-sm font-medium text-gray-600">
                      Name
                    </label>
                    <input
                      class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1"
                      type="text"
                      name="name"
                    />
                  </div>
                  {/* email */}
                  <div class="w-full mx-2 mt-4 md:mt-0 py-2">
                    <label class="block mb-2 text-sm font-medium text-gray-600">
                      E-mail
                    </label>
                    <input
                      class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1"
                      type="email"
                      name="email"
                    />
                  </div>
                </div>
                {/* subject */}
                <div class="w-full">
                  <label class="block mb-2 text-sm font-medium text-gray-600">
                    Subject
                  </label>
                  <input
                    class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1"
                    type="text"
                    name="subject"
                  />
                </div>
                {/* message */}
                <div class="w-full mt-4">
                  <label class="block mb-2 text-sm font-medium text-gray-600">
                    Message
                  </label>
                  <textarea
                    class="block w-full h-40 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1"
                    name="message"
                  />
                </div>
                <div class="flex justify-center mt-6">
                  <button
                    class="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    type="submit"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
