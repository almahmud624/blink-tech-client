import React, { useContext, useEffect, useState } from "react";
import { FiXCircle } from "react-icons/fi";
import { json, Link, useLocation } from "react-router-dom";
import SectionTitle from "../../Component/SectionTitle";
import TitleHighlighter from "../../Component/TitleHighlighter";
import { DataContext } from "../../Context/DataProvider";
import { addToDb } from "../../Utilities/Localdb";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import Product from "../Product/Product";

const Products = () => {
  const { products, cart, setCart } = useContext(DataContext);
  const [query, setQuery] = useState("");
  const [filterProducts, setFilterProducts] = useState(products);
  const [showPopups, setShowPopups] = useState(false);
  const location = useLocation();

  // filter and query product
  const handleProductFilter = (categoryValue) => {
    if (categoryValue === "all") {
      setFilterProducts(products);
      return;
    }
    const filterByCategory = products?.filter(
      (item) => item?.category === categoryValue
    );
    setFilterProducts(filterByCategory);
  };

  // product add to cart
  const handleAddToCart = (product) => {
    let newCart;
    let _id = product?._id;
    const newCartItem = {
      _id: product?._id,
      productName: product?.productName,
      productPrice: product?.productPrice,
      imgURL: product?.imgURL,
      category: product?.category,
      quantity: 1,
    };

    // add products on localstorage
    addToDb(_id, "products-list");

    const exist = cart.find((i) => i._id === newCartItem._id);
    if (exist) {
      exist.quantity += 1;

      const restItem = cart.filter((i) => i._id !== exist._id);
      newCart = [...restItem, exist];
    } else {
      newCart = [...cart, newCartItem];
    }

    setCart(newCart);
    setShowPopups(true);
  };

  // modal total cart price calculation
  const totalPrice = cart.reduce((acc, cur) => {
    const total = parseInt(acc) + parseInt(cur.productPrice) * cur.quantity;
    return total;
  }, 0);

  // hide left sidebar on homepage
  const home = location?.pathname === "/" || location.pathname === "/home";

  return (
    <div className={`py-20 max-w-screen-xl mx-auto ${!home && "flex gap-20"}`}>
      {!home && (
        <LeftSideBar
          handleProductFilter={handleProductFilter}
          setQuery={setQuery}
          className=""
        />
      )}

      {/**All Products */}
      <div className="pt-10">
        {products.length > 0 ? (
          <>
            <TitleHighlighter>Products</TitleHighlighter>
            <SectionTitle>Explore Our Products</SectionTitle>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20">
              {products
                ?.filter((searchItem) =>
                  searchItem?.productName.toLowerCase().includes(query)
                )
                .map((product) => (
                  <Product
                    key={Math.random()}
                    product={product}
                    setShowPopups={setShowPopups}
                    handleAddToCart={handleAddToCart}
                  ></Product>
                ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex h-screen justify-self-end px-20  items-center justify-center">
              <span className="py-4 px-20 border-2 w-full block text-3xl  border-gray-800">
                Data Not Found!
              </span>
            </div>
          </>
        )}
      </div>

      {/* model */}
      <div
        className={`${showPopups ? " fixed inset-0  z-40 " : " opacity-0 "}`}
      >
        <div
          className={` ${
            showPopups
              ? " justify-center items-center  opacity-100 flex overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none absolute top-0 left-0 focus:outline-none scale-100 transition-all duration-500 backdrop-blur- backdrop-brightness-50 backdrop-blur-[0.75px] cursor-pointer"
              : "opacity-0 scale-110 absolute top-0 left-0 "
          }`}
          onClick={() => setShowPopups(false)}
        >
          <div className="relative my-6 mx-auto w-1/3">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white  outline-none focus:outline-none">
              <div className="bg-gray-100 p-2 rounded">
                <FiXCircle
                  className="text-2xl text-indigo-900 cursor-pointer"
                  onClick={() => setShowPopups(false)}
                />
                <div className="p-6 text-center sm:p-8 max-w-lg mx-auto ">
                  <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
                    The Product was added to your cart
                  </p>
                  <li className="flex items-start justify-between text-gray-700 border p-2 rounded mt-5">
                    <img
                      className="flex-shrink-0 object-cover w-12 h-12 dark:border-transparent rounded outline-none   dark:bg-gray-500"
                      src={cart[cart.length - 1]?.imgURL}
                      alt="Polaroid camera"
                    />
                    <h3>
                      {cart[cart.length - 1]?.productName}
                      <span className=" text-green-600 ml-2 text-lg">
                        x{cart[cart.length - 1]?.quantity}
                      </span>
                    </h3>
                    <div className="text-right">
                      <span className="block">
                        ${cart[cart.length - 1]?.productPrice}
                      </span>
                    </div>
                  </li>
                  <div className="flex justify-between text-gray-700 mt-5 items-center">
                    <p className="text-xs">
                      You have {cart?.length} items in your cart
                    </p>
                    <p className="text-sm">Subtotal: {totalPrice}$</p>
                  </div>

                  <Link
                    className="mt-8 inline-block w-full rounded-lg bg-indigo-600 py-4 text-sm font-bold text-white shadow-xl"
                    to="/checkout"
                  >
                    CheckOut
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
