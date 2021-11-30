import React, { useContext } from "react";
import ProductContext from "../context/ProductContext";

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
