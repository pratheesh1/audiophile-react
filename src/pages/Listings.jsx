import React, { useContext, useState, useEffect } from "react";
import {
  PriceRangeFilter,
  CategoryFilter,
  BrandFilter,
  FrequencyResponsesFilter,
  ImpedanceRangeFilter,
} from "../components/ListingFilterOptions";
import ProductContext from "../context/ProductContext";
import Card from "../components/Card";
import { useForm } from "react-hook-form";
import Loaders from "../components/Loaders";
import { useNavigate } from "react-router-dom";

function Listings() {
  //state
  const { products, loading, error } = useContext(ProductContext);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  //form
  const { register, watch } = useForm();

  //useEffect to scroll to top of page when filter is applied
  useEffect(() => {
    !openMenu && window.scrollTo(0, 0);
    if (openMenu) {
      document.getElementById("menu-container").classList.toggle("hidden");
      document.getElementById("main-container").classList.toggle("hidden");
    }
    //FIXME: component only affected after 2 rounds of state change
    console.log(openMenu, "changes");
  }, [openMenu, products]);

  //form submit
  watch((data) => {
    console.log(data);
  });

  //error
  if (error) {
    navigate("/404");
  }
  //loading
  if (loading) {
    return <Loaders />;
  }

  //page
  return (
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
                <div className="col-span-12 col-start-1 lg:col-start-4">
                  {/* price range */}
                  <div className="listing-filter-options m-2 pt-5 pr-2">
                    <h3 className="mx-2 font-sans font-medium">Price Range</h3>
                    <ul>
                      <PriceRangeFilter register={register} />
                    </ul>
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
                      name="frequencyResponses"
                      multiple
                      {...register("frequencyResponses")}
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
                      name="impedanceRange"
                      multiple
                      {...register("impedanceRange")}
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
              <i class="fas fa-times"></i>{" "}
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
                      <option value="price">Price</option>
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
                  <Card key={product.id} product={product} />
                ))}
            </div>
          </div>
        </div>

        {/* featured products */}

        {/* all products */}

        {/* absolute positioned filter button */}
        <div className="fixed bottom-0 right-0 m-2 md:hidden">
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
}

export default Listings;
