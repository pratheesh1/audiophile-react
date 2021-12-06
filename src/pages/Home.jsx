import React, { useEffect, useState, useContext } from "react";
import ProductContext from "../context/ProductContext";
import Loaders from "../components/Loaders";
import { useNavigate } from "react-router";
import MainTypical from "../components/MainTypical";
import Recommendations from "../components/Recommendations";
import Brands from "../components/Brands";

const Home = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { categories, loading, setParams, brands } = useContext(ProductContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setParams({});
  }, []);

  //useEffect to scroll to top of page when filter is applied
  useEffect(() => {
    !openMenu && window.scrollTo(0, 0);
    const navContainer = document.getElementById("nav-categories");
    if (openMenu) {
      navContainer && navContainer.classList.remove("hidden");
    }
    if (!openMenu && !loading) {
      navContainer && navContainer.classList.add("hidden");
    }
  }, [openMenu, loading]);

  return loading ? (
    <Loaders />
  ) : (
    <>
      {/* main page */}
      <section className="bg-gray-100 w-full overflow-hidden min-h-screen relative">
        {/* nav for categories */}
        <nav
          className="bg-white shadow-md absolute md:relative w-screen hidden md:block overflow-x-auto border-t"
          id="nav-categories"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* link for each category */}
              {categories?.map((category) => (
                <button
                  key={category.id}
                  className="flex items-center"
                  onClick={() => {
                    setParams({ category: category.id });
                    navigate("/home");
                    setOpenMenu(false);
                  }}
                >
                  <span className="ml-7 pb-3 md:pb-0 text-gray-600 hover:text-gray-800 hover:scale-110 whitespace-nowrap">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* main page content */}
        {/* section 1 */}
        <div className="min-h-screen">
          <div
            className="h-[65vh] bg-hero bg-right bg-cover bg-no-repeat grid grid-cols-2"
            role="button"
            onClick={() => {
              navigate("/home");
            }}
          >
            <div className="col-span-2 lg:col-span-1 h-full flex flex-col items-center justify-center p-5 lg:pl-14">
              <div className="text-center text-white text-3xl md:text-5xl">
                <h1 className="text-white text-left font-bold py-3">
                  Welcome to Audiophile. Get lost in music.
                </h1>
                <h1 className="text-white text-left text-3xl md:text-4xl font-bold py-3">
                  Buy{" "}
                  <span className="text-orange-500">
                    <MainTypical />
                  </span>
                </h1>
              </div>
              {/* shop now button */}
              <div className="text-right w-full pr-16 pt-5 hover:animate-bounce">
                <span className="bg-orange-500 hover:bg-orange-600 text-white text-2xl font-bold py-3 md:py-4 px-5 rounded">
                  Shop Now
                </span>
              </div>
            </div>
          </div>
          <div className="h-2/6 py-10">
            <Recommendations />
          </div>
        </div>
        {/* section 2 */}
        <div className="grid grid-cols-12 min-h-[50vh]">
          <div className="col-span-12 md:col-start-2 md:col-span-10 md:p-5 h-1/4 grid grid-cols-12">
            <div className="col-span-12 lg:col-span-8 md:p-5 h-full order-2 lg:order-1">
              {/* carousel of brands */}
              <Brands
                brands={brands}
                setParams={setParams}
                navigate={navigate}
              />
            </div>
            <div className="col-span-12 lg:col-span-4 p-1 md:p-5 md:pl-10 h-full order-1 lg:order-2">
              {/* title section */}
              <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-center md:text-left text-3xl font-bold p-3 w-full">
                  Shop all your favorite brands.
                </h1>
                {/* catchphrase */}
                <h1 className="text-left text-base md:text-xl font-light p-3 w-full">
                  All your favorite brands in one place. Shop to your heart's
                  content and be rewarded as you go.
                </h1>
              </div>
            </div>
          </div>
        </div>
        {/* mobile menu */}
        {/* absolute positioned filter button */}
        <div className="fixed bottom-2 right-3 m-2 md:hidden">
          <button
            className="bg-gray-200 text-gray-700 font-bold py-2 px-3 rounded-full focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <i className="fas fa-filter"></i>
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
