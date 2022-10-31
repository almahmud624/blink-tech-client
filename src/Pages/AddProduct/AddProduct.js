import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [trending, setTrending] = useState(false);
  const [products, setProducts] = useState([]);
  const [filterValue, setFilterValue] = useState(null);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [product, setProduct] = useState({});

  // get input value
  const handleInputChange = (e) => {
    const inputField = e.target.name;
    const inputValue = e.target.value;
    const newProduct = { ...product };
    newProduct[inputField] = inputValue;
    newProduct["isTrending"] = trending;
    setProduct(newProduct);
  };

  // send data to server
  const handleSend = (e) => {
    e.preventDefault();

    if (!updateProduct) {
      fetch("http://localhost:4000/products", {
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

      fetch(`http://localhost:4000/products/${updateProduct._id}`, {
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
            e.target.reset();
          }
        });
      const updatedProducts = [...products];
      updatedProducts[
        updatedProducts
          .map((v, i) => [i, v])
          .filter((v) => v[1]._id === updateProduct._id)[0][0]
      ] = product;
      setProducts(updatedProducts);
    }
  };

  // get all data
  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // delete data
  const handleDelete = (id) => {
    fetch(`http://localhost:4000/products/${id}`, {
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
  };

  // search data // !!bad searching functionality
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.value;
    setFilterValue(searchValue);
  };
  useEffect(() => {
    if (filterValue) {
      const filterData = products.filter((product) =>
        product.productName.toLowerCase().includes(filterValue)
      );
      setProducts(filterData);
    } else {
      fetch("http://localhost:4000/products")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
  }, [filterValue]);

  // update data
  const handleUpdateProduct = (id) => {
    fetch(`http://localhost:4000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUpdateProduct(data);
        setProduct(data);
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
                defaultValue={updateProduct?.productName}
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
                defaultValue={updateProduct?.imgURL}
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
                defaultValue={updateProduct?.description}
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
                  defaultValue={updateProduct?.isTrending}
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
                  defaultValue={updateProduct?.productPrice}
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
                  defaultValue={updateProduct?.category}
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
                defaultValue={updateProduct?.rating}
                onChange={handleInputChange}
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
                defaultValue={updateProduct?.discount}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              {updateProduct ? "Update" : "Send"}
            </button>
          </div>
        </form>
      </section>
      <section className="max-w-4xl my-10 p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <div className="mt-5 my-10 w-1/2 mx-auto text-center">
          <input
            type="text"
            placeholder="Search Product"
            className="input input-bordered w-full"
            onChange={handleSearch}
          />
        </div>
        <div className="grid grid-cols-2 justify-center items gap-5">
          {products?.map((product) => (
            <div
              className="card w-96 mx-auto bg-neutral text-neutral-content"
              key={Math.random()}
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title">{product.productName}</h2>
                <p>_id: {product._id}</p>
                <div className="card-actions justify-end mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleUpdateProduct(product._id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-ghost"
                    htmlFor="my-modal"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AddProduct;
