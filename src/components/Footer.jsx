import React from "react";
import { BrandImage, Facebook, Linkedin, Twitter } from "./Images";

function Footer() {
  return (
    <>
      {/* adapted from https://merakiui.com */}
      <footer className="bg-gray-200 pt-1">
        <div className=" container px-6 py-4 mx-auto">
          <div className="lg:flex">
            {/* column 1 */}
            <div className="w-full -mx-6 lg:w-2/5">
              <div className="px-6">
                <div>
                  <a
                    href="/"
                    className="text-xl font-bold text-gray-800 hover:text-gray-700"
                  >
                    <BrandImage />
                  </a>
                </div>
                <p className="max-w-md mt-2 text-gray-500">
                  Your one stop shop for all things music.
                </p>
                <div className="flex mt-4 -mx-2">
                  <a
                    href="/"
                    className="mx-2 text-gray-700 hover:text-gray-600"
                    aria-label="Linkedin"
                  >
                    <Linkedin />
                  </a>
                  <a
                    href="/"
                    className="mx-2 text-gray-700 hover:text-gray-600"
                    aria-label="Facebook"
                  >
                    <Facebook />
                  </a>
                  <a
                    href="/"
                    className="mx-2 text-gray-700 hover:text-gray-600"
                    aria-label="Twitter"
                  >
                    <Twitter />
                  </a>
                </div>
              </div>
            </div>

            {/* column 2 */}
            <div className="mt-6 lg:mt-0 lg:flex-1">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
                <div>
                  <h3 className="text-gray-700 uppercase">About</h3>
                  <a href="/" className="footer-link">
                    Company
                  </a>
                  <a href="/" className="footer-link">
                    community
                  </a>
                  <a href="/" className="footer-link">
                    Careers
                  </a>
                </div>
                <div>
                  <h3 className="text-gray-700 uppercase">Blog</h3>
                  <a href="/" className="footer-link">
                    Tec
                  </a>
                  <a href="/" className="footer-link">
                    Music
                  </a>
                  <a href="/" className="footer-link">
                    Videos
                  </a>
                </div>
                <div>
                  <h3 className="text-gray-700 uppercase">Products</h3>
                  <a href="/" className="footer-link">
                    Headphones
                  </a>
                  <a href="/" className="footer-link">
                    Speakers
                  </a>
                  <a href="/" className="footer-link">
                    Accessories
                  </a>
                </div>
                <div>
                  <h3 className="text-gray-700 uppercase">Contact</h3>
                  <span className="footer-link">+1 526 654 8965</span>
                  <span className="footer-link">john@gemail.com</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="h-px my-6 bg-gray-300 border-none" />

          {/* copyright */}
          <div>
            <p className="text-center text-gray-800">
              © Audiophile {new Date().getFullYear()} - All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
