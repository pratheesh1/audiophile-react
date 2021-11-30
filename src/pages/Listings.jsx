import React, { useContext, useState, useEffect } from "react";
import {
  CategoryFilter,
  BrandFilter,
  FrequencyResponsesFilter,
  ImpedanceRangeFilter,
} from "../components/ListingFilterOptions";
import ProductContext from "../context/ProductContext";
import Card from "../components/Card";
import { useForm } from "react-hook-form";
import Loaders from "../components/Loaders";
import CartContext from "../context/CartContext";
import { toast } from "react-toastify";
import * as yup from "yup";

function Listings() {
  //state
  const { products, loading, params, setParams } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const [openMenu, setOpenMenu] = useState(false);
  //form
  const { register, getValues, reset } = useForm();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //useEffect to scroll to top of page when filter is applied
  useEffect(() => {
    !openMenu && window.scrollTo(0, 0);
    if (openMenu) {
      document.getElementById("menu-container").classList.remove("hidden");
      document.getElementById("main-container").classList.add("hidden");
    }
    if (!openMenu && !loading) {
      document.getElementById("menu-container").classList.add("hidden");
      document.getElementById("main-container").classList.remove("hidden");
    }
  }, [openMenu, loading]);

  //filter products min/max price
  const filterProducts = () => {
    const { cost_max, cost_min } = getValues();
    try {
      if (cost_max) {
        yup.number().min(0).max(1000000).validateSync(cost_max);
      }
      if (cost_min) {
        yup.number().min(0).max(1000000).validateSync(cost_min);
      }
      setParams({ ...params, ...getValues() });
    } catch (error) {
      toast.error("Please enter a valid price range", {
        toastId: "filter-error",
      });
    }
  };

  //page
  return loading ? (
    <Loaders />
  ) : (
    <>
      {/* product listings page */}
      <section className="bg-gray-100 w-full overflow-hidden min-h-screen relative">
        {/* main content */}
        <div className="grid grid-cols-12 gap-4">
          {/* side filter menu - collapsable menu on mobile */}
          <div
            id="menu-container"
            className="col-span-12 md:col-start-1 lg:col-start-1 md:col-span-3 md:pt-5 absolute md:relative bg-gray-300 md:bg-transparent w-full h-screen md:h-auto overflow-x-scroll hidden md:block"
          >
            <div className="w-10/12 sm:w-5/6 md:w-auto h-full md:h-auto">
              <div className="grid grid-cols-12">
                {/* reset filter button */}
                <div className="col-span-12 col-start-1 lg:col-start-4 mt-2 ml-3 flex">
                  <button
                    className="bg-green-300 hover:bg-green-400 text-gray-800 font-light py-2 px-4 rounded-full"
                    onClick={() => {
                      setParams({});
                      reset({
                        cost_min: "",
                        cost_max: "",
                        category: "",
                        brand: [],
                        bluetooth: "",
                        frequencyResponseId: [],
                        impedanceRangeId: [],
                        sort: "",
                      });
                    }}
                  >
                    Reset Filters
                  </button>
                  <button
                    className="ml-4 bg-blue-300 hover:bg-blue-400 text-gray-800 font-light py-2 px-4 rounded-full"
                    onClick={() => {
                      filterProducts();
                    }}
                  >
                    Filter
                  </button>
                </div>
                <div className="col-span-12 col-start-1 lg:col-start-4">
                  {/* price range */}
                  <div className="listing-filter-options m-2 pt-5 pr-2">
                    <h3 className="mx-2 mb-2 font-sans font-medium">
                      Price Range
                    </h3>
                    {/* min and max price text inputs */}
                    <label className="block mb-2">
                      <span className="mx-2 font-mono text-sm">Min Price</span>
                    </label>
                    <input
                      className="m-2 form-select w-full xl:w-10/12 appearance-none border border-gray-300 block bg-white text-gray-700 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      placeholder="$0"
                      name="minPrice"
                      {...register("cost_min")}
                    />
                    <label className="block mb-2">
                      <span className="mx-2 font-mono text-sm">Max Price</span>
                    </label>
                    <input
                      className="m-2 form-select w-full xl:w-10/12 appearance-none border border-gray-300 block bg-white text-gray-700 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      placeholder="$100"
                      name="maxPrice"
                      {...register("cost_max")}
                    />
                  </div>

                  {/* category */}
                  <div className="listing-filter-options m-2 pt-5 pr-2">
                    <h3 className="mx-2 font-sans font-medium">Category</h3>
                    <select
                      className="m-2 form-select w-full xl:w-10/12 appearance-none border-0 block bg-gray-200 text-gray-700 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      name="category"
                      {...register("category")}
                    >
                      <CategoryFilter />
                    </select>
                  </div>

                  {/* brand */}
                  <div className="listing-filter-options m-2 pt-5 pr-2">
                    <h3 className="mx-2 font-sans font-medium">Brands </h3>
                    <select
                      className="m-2 form-select border-0 w-full xl:w-10/12 rounded-md text-gray-700 py-2 leading-tight focus:outline-none"
                      name="brand"
                      multiple
                      {...register("brand")}
                    >
                      <BrandFilter />
                    </select>
                  </div>

                  {/* bluetooth */}
                  <div className="listing-filter-options m-2 pt-5 pr-2">
                    <h3 className="mx-2 font-sans font-medium">Bluetooth</h3>
                    <select
                      className="m-2 form-select border-0 w-full xl:w-10/12 appearance-none block bg-gray-200 text-gray-700 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      name="bluetooth"
                      {...register("bluetooth")}
                    >
                      <option value="" defaultValue>
                        All
                      </option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                  </div>

                  {/* frequency responses */}
                  <div className="listing-filter-options m-2 pt-5 pr-2">
                    <h3 className="mx-2 font-sans font-medium">
                      Frequency Response
                    </h3>
                    <select
                      className="m-2 form-select border-0 w-full xl:w-10/12 rounded-md text-gray-700 py-2 leading-tight focus:outline-none"
                      name="frequencyResponseId"
                      multiple
                      {...register("frequencyResponseId")}
                    >
                      <FrequencyResponsesFilter />
                    </select>
                  </div>

                  {/* impedance range */}
                  <div className="listing-filter-options m-2 pt-5 pr-2">
                    <h3 className="mx-2 font-sans font-medium">
                      Impedance Range
                    </h3>
                    <select
                      className="m-2 form-select border-0 w-full xl:w-10/12 rounded-md text-gray-700 py-2 leading-tight focus:outline-none"
                      name="impedanceRangeId"
                      multiple
                      {...register("impedanceRangeId")}
                    >
                      <ImpedanceRangeFilter />
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* absolute position close button to close menu on mobile */}
            <div
              className="absolute top-3 right-3 m-2 p-2 text-gray-700 text-xl cursor-pointer md:hidden"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <i className="fas fa-times"></i>{" "}
            </div>
          </div>

          {/* main section with product cards */}
          <div
            id="main-container"
            className="w-full md:pt-10 col-span-12 md:col-span-9 2xl:col-span-8"
          >
            {/* sort and filter */}
            <div className="grid grid-cols-12  md:pb-5">
              <div className="col-span-12 md:col-span-8 flex flex-col">
                <div className="grid grid-cols-12">
                  <div className="col-span-12 md:col-span-6 listing-filter-options m-1 md:m-2 pr-2 pt-1 flex">
                    <h3 className="mx-2 font-sans font-medium whitespace-nowrap">
                      Sort By:
                    </h3>
                    <select
                      className="form-select border-0 w-full xl:w-10/12 appearance-none block bg-gray-200 text-gray-700 rounded-md md:py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                      name="sort"
                      {...register("sort")}
                    >
                      <option value="" defaultValue>
                        No Sort
                      </option>
                      <option value="baseCost">Price</option>
                      <option value="name">Name</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4 flex justify-end">
                <div className="listing-filter-options m-2 md:pt-5 pr-2">
                  <h3 className="mx-2 font-sans font-medium">
                    Showing {products?.length} result(s)
                  </h3>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-12">
              {/* product cards */}
              {products &&
                products.map((product) => (
                  <Card
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                  />
                ))}
            </div>
          </div>
        </div>

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
        <span className="hidden md:block"></span>
      </section>
    </>
  );
}

export default Listings;
