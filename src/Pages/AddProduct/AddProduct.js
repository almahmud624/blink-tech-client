import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ProductDataContext } from "../../Context/ProductData";

const AddProduct = () => {
  const { products, setProducts } = useContext(ProductDataContext);

  const [trending, setTrending] = useState(false);
  const [promoted, setPromoted] = useState(false);
  // const [filterValue, setFilterValue] = useState(null);
  const [deleteUpdateProduct, setDeleteUpdateProduct] = useState(null);
  const [product, setProduct] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  console.log(promoted);

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

    if (!deleteUpdateProduct) {
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
        });
    } else {
      // update product
      fetch(
        `https://blink-tech-server.vercel.app/products/${deleteUpdateProduct._id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(product),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("Data Updated");
          }
        });
      const updatedProducts = [...products];
      updatedProducts[
        updatedProducts
          .map((v, i) => [i, v])
          .filter((v) => v[1]._id === deleteUpdateProduct._id)[0][0]
      ] = product;
      setProducts(updatedProducts);
      setIsUpdate(false);
      setProduct({});
      setDeleteUpdateProduct(null);
    }

    e.target.reset();
  };

  // delete data
  const handleDelete = (id) => {
    fetch(`https://blink-tech-server.vercel.app/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Data Remove Successfully");
        }
      });
    const restProduct = products.filter((product) => product._id !== id);
    setProducts(restProduct);
    setDeleteUpdateProduct(null);
    setShowModal(false);
  };

  // search data // !!bad searching functionality
  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   const searchValue = e.target.value;
  //   setFilterValue(searchValue);
  // };
  // useEffect(() => {
  //   if (filterValue) {
  //     const filterData = products.filter((product) =>
  //       product.productName.toLowerCase().includes(filterValue)
  //     );
  //     setProducts(filterData);
  //   } else {
  //     fetch("https://blink-tech-server.vercel.app/products")
  //       .then((res) => res.json())
  //       .then((data) => setProducts(data));
  //   }
  // }, [filterValue]);

  // get update and delete product id
  const handleDeleteUpdateProduct = (id, deleteAlert, updateAlert) => {
    fetch(`https://blink-tech-server.vercel.app/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDeleteUpdateProduct(data);
        if (!deleteAlert) {
          setProduct(data);
        }
      });
    setShowModal(deleteAlert);
    setIsUpdate(updateAlert);
  };
  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Add Product
        </h2>
        <div
          className={`${
            isUpdate ? "fixed inset-0 z-10 overflow-y-auto" : undefined
          }`}
        >
          <form
            className={`${
              isUpdate
                ? "relative w-full max-w-xl p-4 mx-auto  bg-gray-800 rounded-md shadow-2xl"
                : undefined
            }`}
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
                    defaultValue={product?.isTrending}
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
                      Product
                    </option>
                    <option>computer</option>
                    <option>laptop</option>
                    <option>headphone</option>
                    <option>audio</option>
                    <option>games</option>
                    <option>camera</option>
                    <option>smartphone</option>
                    <option>iphone&ipad</option>
                    <option>tablet</option>
                    <option>watch</option>
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
                    defaultValue={product?.isPromoted}
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
              <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                {isUpdate ? "Update" : "Send"}
              </button>
              {isUpdate && (
                <button
                  onClick={() => setIsUpdate(false)}
                  className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-red-400 rounded-md hover:bg-red-400 focus:outline-none focus:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
      <section className="max-w-4xl my-10 p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <div className="mt-5 my-10 w-1/2 mx-auto text-center">
          <input
            type="text"
            placeholder="Search Product"
            className="input input-bordered w-full"
            // onChange={handleSearch}
          />
        </div>
        <div className="grid grid-cols-2 justify-center items gap-5">
          {products?.map((prod) => (
            <div
              className="card w-96 mx-auto bg-neutral text-neutral-content"
              key={Math.random()}
            >
              <div className="card-body items-center text-center">
                <div className="flex gap-3 items-center">
                  <div className="avatar bg-indigo-100 rounded-md">
                    <div className="w-16 rounded shadow-lg">
                      <img
                        src={prod.imgURL}
                        className="drop-shadow-xl"
                        alt="Tailwind-CSS-Avatar-component"
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className="card-title">{prod.productName}</h2>
                    <p>_id: {prod._id}</p>
                  </div>
                </div>
                <div className="card-actions justify-end mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleDeleteUpdateProduct(prod._id, false, true)
                    }
                  >
                    Update
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={() => handleDeleteUpdateProduct(prod._id, true)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 sm:flex">
                  <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-red-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <h4 className="text-lg font-medium text-gray-800">
                      Delete account ?
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                        onClick={() => handleDelete(deleteUpdateProduct._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default AddProduct;
