import React, { useState, useContext } from "react";
import {
  BrandImage,
  CartImage,
  Dropdown,
  Hamburger,
  SearchIcon,
} from "./Images";
import avatar from "../assets/images/avatar.png";
import { NavLink, useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import UserContext from "../context/UserContext";
import { ToastContainer } from "react-toastify";
import ProductContext from "../context/ProductContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const { setParams, params } = useContext(ProductContext);
  const { cart } = useContext(CartContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setParams({ ...params, name: search, description: search });
    navigate("/home");
  };

  return (
    <>
      {/* navbar */}
      <nav className="bg-gray-50 shadow py-1">
        <div className="container mx-auto px-6 py-3 lg:flex lg:justify-between lg:items-center">
          <div className="flex justify-between items-center">
            {/* logo */}
            <div>
              <NavLink
                className="text-gray-800 text-xl font-bold lg:text-2xl hover:text-gray-700"
                to="/"
              >
                <BrandImage />
              </NavLink>
            </div>

            {/* mobile menu */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="p-2 text-gray-700 border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40focus:ring-blue-300 focus:ring focus:outline-none"
                aria-label="toggle menu"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Hamburger open={isOpen} />
              </button>
            </div>
          </div>

          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div
            className={`lg:flex items-center mt-3 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:mx-6">
              <NavLink
                className="nav-link"
                to="/"
                onClick={() => setIsOpen(!isOpen)}
              >
                Home
              </NavLink>
              <NavLink
                className="nav-link"
                to="/home"
                onClick={() => setIsOpen(!isOpen)}
              >
                Shop
              </NavLink>
              <NavLink
                className="nav-link"
                to="/orders"
                onClick={() => setIsOpen(!isOpen)}
              >
                Orders
              </NavLink>
              <NavLink
                className="nav-link whitespace-nowrap"
                to="/contact-us"
                onClick={() => setIsOpen(!isOpen)}
              >
                Contact Us
              </NavLink>

              {/* search */}
              <span className="relative my-3 mx-1 mb-5 lg:m-0 text-gray-600">
                <form onSubmit={handleSubmit}>
                  <input
                    className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none w-full"
                    type="search"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 mt-3 mr-2"
                  >
                    <SearchIcon />
                  </button>
                </form>
              </span>
            </div>

            {/* user/login-register */}
            <div className="flex lg:flex-row lg:mx-6 justify-between">
              {user ? (
                <span>
                  <div className="flex flex-row items-center focus:outline-none mx-2">
                    <span className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                      {user?.imageUrl ? (
                        <img
                          src={user?.imageUrl}
                          className="object-cover w-full h-full"
                          alt="avatar"
                        />
                      ) : (
                        <img
                          src={avatar}
                          className="object-cover w-full h-full"
                          alt="avatar"
                        />
                      )}
                    </span>
                    <h3 className="mx-2 text-sm font-medium text-gray-700">
                      Hi, {user?.firstName}
                    </h3>
                    <button
                      onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
                      className="relative z-10 mx-2 block p-2 text-gray-700 border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40focus:ring-blue-300 focus:ring focus:outline-none"
                    >
                      <Dropdown />

                      {/* dropdown */}
                      <span
                        className={`absolute right-0 top-9 z-20 w-48 py-2 mt-2 bg-gray-300 rounded-md shadow-xl ${
                          dropdownIsOpen ? "block" : "hidden"
                        }`}
                      >
                        <NavLink
                          to="/orders"
                          className="account-dropdown"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          Your Orders
                        </NavLink>
                        <NavLink
                          to="/"
                          className="account-dropdown"
                          onClick={() => {
                            logout();
                            setIsOpen(!isOpen);
                          }}
                        >
                          Sign Out{" "}
                        </NavLink>
                      </span>
                    </button>
                  </div>
                </span>
              ) : (
                <span>
                  <NavLink
                    to="/login"
                    className="nav-link"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="nav-link"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Register
                  </NavLink>
                </span>
              )}

              {/* cart */}
              <NavLink
                className="relative text-gray-700 hover:text-gray-600 pt-2 pr-5"
                to="/cart"
                onClick={() => setIsOpen(!isOpen)}
              >
                <CartImage count={cart ? cart.length : 0} />
              </NavLink>
            </div>
          </div>
        </div>
        {/* toast */}
        <ToastContainer autoClose={8000} limit={10} closeOnClick={true} />
      </nav>
    </>
  );
}

export default Header;
