import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { DataContext } from "../../../Context/DataProvider";

const AddProduct = ({ updateId, setModal }) => {
  const { products, setProducts } = useContext(DataContext);
  const [trending, setTrending] = useState(false);
  const [promoted, setPromoted] = useState(false);
  const location = useLocation();
  const [product, setProduct] = useState({});
  const nameRef = useRef();

  // get input value
  const handleInputChange = (e) => {
    const inputField = e.target.name;
    const inputValue = e.target.value;
    const newProduct = { ...product };
    newProduct[inputField] = inputValue;
    newProduct["isTrending"] = trending;
    newProduct["isPromoted"] = promoted;
    setProduct(newProduct);
  };

  // send data to server
  const handleSend = (e) => {
    e.preventDefault();
    if (!updateId) {
      fetch("https://blink-tech-server.vercel.app/products", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          const newProduct = [...products, data];
          setProducts(newProduct);
          toast.success("Data Uploaded Successfully");
          e.target.reset();
        });
    } else {
      // update product
      fetch(`https://blink-tech-server.vercel.app/products/${updateId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("Data Updated");
            setModal(false);
          }
        });
      const updatedProducts = [...products];
      updatedProducts[
        updatedProducts
          .map((v, i) => [i, v])
          .filter((v) => v[1]._id === updateId)[0][0]
      ] = product;
      setProducts(updatedProducts);
    }
    // setProduct({});
  };

  // get single product
  useEffect(() => {
    let isUpdate = false;
    fetch(`https://blink-tech-server.vercel.app/products/${updateId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isUpdate) {
          setProduct(data);
        }
      });

    // return a clean up function
    return () => {
      // clear something from the previous effect
      isUpdate = true;
    };
  }, [updateId]);

  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md dark:bg-gray-800">
        <h2 className="text-2xl  font-semibold text-gray-700 capitalize dark:text-white">
          {location.pathname === "/dashboard/add-products"
            ? "Create New Product"
            : "Update Product"}
        </h2>
        <div className="">
          <form
            className="relative w-full p-4 mx-auto  bg-gray-800 rounded-md "
            onSubmit={handleSend}
          >
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  for="Productname"
                >
                  Product Name
                </label>
                <input
                  id="Productname"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  required
                  name="productName"
                  defaultValue={product?.productName}
                  onChange={handleInputChange}
                  ref={nameRef}
                />
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  for="product-img"
                >
                  Product ImgURL
                </label>
                <input
                  id="product-img"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  name="imgURL"
                  required
                  defaultValue={product?.imgURL}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2 form-control">
                <label className="label">
                  <span className="label-text">Product Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-24 dark:bg-gray-800"
                  placeholder=""
                  name="description"
                  required
                  defaultValue={product?.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="flex items-center">
                <div className="form-control w-full max-w-xs flex flex-row items-center gap-1">
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => setTrending(!trending)}
                    name="isTranding"
                    defaultChecked={product?.isTrending}
                  />
                  <label className="label">
                    <span className="text-gray-700 dark:text-gray-300">
                      is Trending?
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-gray-700 dark:text-gray-200" for="price">
                  Product Price
                </label>
                <div className="input-group">
                  <span className="px-4 py-2 mt-2 bg-gray-700 font-semibold">
                    $
                  </span>
                  <input
                    id="price"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    pattern="[0-9]+"
                    name="productPrice"
                    required
                    defaultValue={product?.productPrice}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="form-control w-full max-w-xs mt-0 pt-0">
                  <label className="label mt-0 pt-0">
                    <span className="text-gray-700 dark:text-gray-300">
                      Category
                    </span>
                  </label>
                  <select
                    className="select select-bordered dark:bg-gray-800 px-4 py-2 min-h-0 h-auto"
                    name="category"
                    onChange={handleInputChange}
                    defaultValue={product?.category}
                  >
                    <option disabled selected>
                      {product?.category ? product?.category : "Product"}
                    </option>
                    <option>laptop</option>
                    <option>headphone</option>
                    <option>audio</option>
                    <option>games</option>
                    <option>camera</option>
                    <option>smartphone</option>
                    <option>iphone&ipad</option>
                    <option>tablet</option>
                    <option>watch</option>
                    <option>others</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-gray-700 dark:text-gray-200" for="ra">
                  Rating
                </label>
                <input
                  id="rating"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  pattern="^(\d)*(\.)?([0-9]{1})?$"
                  name="rating"
                  placeholder="Rating 5 or Less"
                  required
                  defaultValue={product?.rating}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-5">
                <label className="text-gray-700 dark:text-gray-200" for="ra">
                  Discount
                </label>
                <div className="input-group">
                  <span className="px-4 py-2 mt-2 bg-gray-700 font-semibold">
                    %
                  </span>
                  <input
                    id="discount"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    pattern="[0-9]+"
                    name="discount"
                    placeholder="Discount 100 or Less"
                    required
                    defaultValue={product?.discount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex items-end">
                <div className="form-control w-full max-w-xs flex flex-row items-center gap-1">
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => setPromoted(!promoted)}
                    name="isPromoted"
                    defaultChecked={product?.isPromoted}
                  />
                  <label className="label">
                    <span className="text-gray-700 dark:text-gray-300">
                      is Promoted?
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-5">
              {location.pathname === "/dashboard/add-products" && (
                <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                  Send
                </button>
              )}
            </div>
          </form>
          <div className="flex gap-5 justify-end">
            {updateId && (
              <>
                <button
                  className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  onClick={handleSend}
                >
                  Update
                </button>
                <button
                  className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-red-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  onClick={() => setModal(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddProduct;
