import React, { useContext } from "react";
import SectionTitle from "../../Component/SectionTitle";
import { DataContext } from "../../Context/DataProvider";
import SearchAndCategory from "./SearchAndCategory";
import SortPorduct from "./SortPorduct";

const LeftSideBar = ({ handleProductFilter, setQuery }) => {
  const { products } = useContext(DataContext);
  let categories = [];
  for (let product of products) {
    categories.push(product.category);
  }
  const filterdCategories = categories.filter(
    (v, i) => categories.indexOf(v) === i
  );

  return (
    <div className="">
      <div className="mx-4 md:hidden block">
        <SectionTitle>Explore Our Products</SectionTitle>
      </div>
      <SearchAndCategory
        filterdCategories={filterdCategories}
        handleProductFilter={handleProductFilter}
        setQuery={setQuery}
      />
      <SortPorduct />
    </div>
  );
};

export default LeftSideBar;
