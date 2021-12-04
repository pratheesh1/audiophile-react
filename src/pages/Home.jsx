import React, { useEffect, useState, useContext } from "react";
import ProductContext from "../context/ProductContext";
import Loaders from "../components/Loaders";
import { useNavigate } from "react-router";

const Home = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { categories, products, loading, setParams } =
    useContext(ProductContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
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
          className="bg-white shadow-md absolute md:relative w-screen hidden md:block overflow-x-auto"
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
                    navigate("/");
                    setOpenMenu(false);
                  }}
                >
                  <span className="ml-4 pb-3 md:pb-0 text-gray-600 hover:text-gray-800 hover:scale-110 whitespace-nowrap">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* main page content */}
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-start-2 md:col-span-10 p-5">
            Hello
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
