import React, { useContext } from "react";
import ProductContext from "../context/ProductContext";

export function PriceRangeFilter({ register }) {
  const options = [
    { min: 0, max: 100, label: "$0 - $100" },
    { min: 100, max: 500, label: "$100 - $500" },
    { min: 500, max: 1000, label: "$500 - $1000" },
    // above 1000
    { min: 1000, max: null, label: "Above $1000" },
  ];

  return (
    <>
      {options.map((option, i) => {
        return (
          <li key={i} className="pt-1">
            <input
              type="checkbox"
              {...register("price-range")}
              value={`options.min: ${option.min}, options.max: ${option.max}`}
              className="form-checkbox focus:ring-indigo-400 focus:ring-opacity-25 border border-gray-300 rounded-sm transition duration-150 ease-in-out mx-2"
            />
            <label
              htmlFor={`price-range-${i}`}
              className="label-default text-gray-700"
            >
              {option.label}
            </label>
          </li>
        );
      })}
    </>
  );
}

export function CategoryFilter() {
  // shape - {id: id, name: name}
  const { categories } = useContext(ProductContext);
  return (
    <>
      <option value="" className="text-gray-800" defaultValue>
        All Categories
      </option>
      {categories &&
        categories.map((category) => {
          return (
            <option
              key={category.id}
              value={category.id}
              className="text-gray-700 form-select focus:ring-indigo-400 focus:ring-opacity-25"
            >
              {category.name}
            </option>
          );
        })}
    </>
  );
}

export function BrandFilter() {
  // shape - {id: id, name: name}
  const { brands } = useContext(ProductContext);
  return (
    <>
      <option value="" className="text-gray-800" defaultValue>
        All Brands
      </option>
      {brands &&
        brands.map((brand) => {
          return (
            <option
              key={brand.id}
              value={brand.id}
              className="text-gray-700 form-select focus:ring-indigo-400 focus:ring-opacity-25"
            >
              {brand.brandName}
            </option>
          );
        })}
    </>
  );
}

export function FrequencyResponsesFilter() {
  const { frequencyResponses } = useContext(ProductContext);
  return (
    <>
      <option value="" className="text-gray-800" defaultValue>
        All Frequencies
      </option>
      {frequencyResponses &&
        frequencyResponses.map((frequency) => {
          return (
            <option
              key={frequency.id}
              value={frequency.id}
              className="text-gray-700 form-select focus:ring-indigo-400 focus:ring-opacity-25"
            >
              {frequency.frequencyResponse}
            </option>
          );
        })}
    </>
  );
}

export function ImpedanceRangeFilter() {
  const { impedanceRanges } = useContext(ProductContext);
  return (
    <>
      <option value="" className="text-gray-800" defaultValue>
        All Ranges
      </option>
      {impedanceRanges &&
        impedanceRanges.map((impedanceRange, i) => {
          return (
            <option
              key={i}
              value={impedanceRange}
              className="text-gray-700 form-select focus:ring-indigo-400 focus:ring-opacity-25"
            >
              {impedanceRange[0]} - {impedanceRange[1]} Ohms
            </option>
          );
        })}
    </>
  );
}
