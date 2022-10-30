import React, { useState } from "react";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [trending, setTrending] = useState(false);
  const handleSend = (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const imgURL = form.imgURL.value;
    const description = form.description.value;
    const isTrending = trending;
    const productPrice = form.productPrice.value;
    const category = form.category.value;
    const rating = form.rating.value;
    const discount = form.discount.value;
    if (rating >= 5 || discount >= 100) {
      toast.error("Please Provide Valid Value");
      return;
    }
    const productInfo = {
      productName: productName,
      imgURL: imgURL,
      description: description,
      isTrending: isTrending,
      productPrice: productPrice,
      category: category,
      rating: rating,
      discount: discount,
    };
    fetch("http://localhost:4000/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Data Uploaded Successfully");
        form.reset();
      });
  };
  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Add Product
        </h2>

        <form onSubmit={handleSend}>
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
              ></textarea>
            </div>
            <div className="flex items-center">
              <div className="form-control w-full max-w-xs flex flex-row items-center gap-1">
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={() => setTrending(!trending)}
                  name="isTranding"
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
                >
                  <option disabled selected>
                    Product
                  </option>
                  <option>computer</option>
                  <option>laptop</option>
                  <option>headphone</option>
                  <option>audio</option>
                  <option>games</option>
                  <option>dvd players</option>
                  <option>smartphone</option>
                  <option>iphone&ipad</option>
                  <option>tablet</option>
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
              />
            </div>
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
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Send
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddProduct;
