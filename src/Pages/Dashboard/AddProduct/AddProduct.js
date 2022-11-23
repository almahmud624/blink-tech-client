import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiDelete, FiUploadCloud } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const AddProduct = ({ updateId, setModal }) => {
  const location = useLocation();
  const [product, setProduct] = useState({});
  const nameRef = useRef();
  const navigate = useNavigate();

  // image preview state
  const [imgPreview, setImgPreview] = useState(null);

  // image hosting  key
  const imgHostingKey = process.env.REACT_APP_imgbb_apikey;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // send data to server
  const onSubmit = async (productInfo) => {
    // upload image on image hosting site
    const formData = new FormData();
    formData.append("image", imgPreview?.imgFile);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?expiration=600&key=${imgHostingKey}`,
      formData
    );

    if (data?.success) {
      const productImg = data.data.url;
      productInfo.imgURL = productImg;
      // store new product on server
      try {
        const { data } = await axios.post(
          "http://localhost:4000/products",
          productInfo
        );
        if (data.acknowledged) {
          toast.success("New Product Uploaded");
          setImgPreview(null);
          navigate("/dashboard/all-products");
        }
      } catch (error) {
        console.log(error);
      }
    }

    // if (!updateId) {
    //   try {
    //     const { data } = await axios.post(
    //       "http://localhost:4000/products",
    //       product
    //     );
    //     const newProduct = [...products, data];
    //     setProducts(newProduct);
    //     toast.success("Data Uploaded Successfully");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } else {
    //   // update product
    //   fetch(`http://localhost:4000/products/${updateId}`, {
    //     method: "PUT",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //     body: JSON.stringify(product),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.acknowledged) {
    //         toast.success("Data Updated");
    //         setModal(false);
    //       }
    //     });
    //   const updatedProducts = [...products];
    //   updatedProducts[
    //     updatedProducts
    //       .map((v, i) => [i, v])
    //       .filter((v) => v[1]._id === updateId)[0][0]
    //   ] = product;
    //   setProducts(updatedProducts);
    // }
    // setProduct({});
  };

  // get single product
  // useEffect(() => {
  //   fetch(`http://localhost:4000/products/${updateId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProduct(data);
  //     });
  // }, [updateId]);

  // image preview handle
  const handleImgPreview = (e) => {
    e.preventDefault();
    const imgFile = e.target.files[0];
    const imgSrc = URL.createObjectURL(imgFile);
    setImgPreview({ imgSrc, imgFile });
  };

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
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div className="">
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
                  ref={nameRef}
                  {...register("productName", {
                    required: "Product name is required",
                  })}
                />
                {errors.productName && (
                  <p role="alert" className="text-sm mt-2 text-red-400">
                    {errors.productName?.message}
                  </p>
                )}
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
                    {...register("productPrice", {
                      required: "Product Price is required",
                    })}
                  />
                </div>
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
                  {...register("description", {
                    required: "description name is required",
                  })}
                ></textarea>
              </div>

              <div className={`${imgPreview ? "" : "col-span-2"}`}>
                <div className="flex items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUploadCloud className="text-4xl" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                          Click to upload product image
                        </span>{" "}
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      {...register("imgURL", {
                        required: "Image is required",
                      })}
                      onChange={handleImgPreview}
                    />
                  </label>
                </div>
              </div>
              {imgPreview && (
                <div className="w-full relative">
                  <span
                    className="bg-gray-800 absolute right-0 top-0 p-1 px-2 rounded cursor-pointer"
                    title="Remove Image"
                    onClick={() => setImgPreview(null)}
                  >
                    <FiDelete className="text-2xl " />
                  </span>
                  <img
                    src={imgPreview.imgSrc}
                    alt=""
                    className="w-full h-44 object-contain"
                  />
                </div>
              )}

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
                    {...register("category", {
                      required: "Category is required",
                    })}
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

              <div className="">
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
                    {...register("discount")}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-5">
              {location.pathname === "/dashboard/add-products" && (
                <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                  Post
                </button>
              )}
            </div>
          </form>
          <div className="flex gap-5 justify-end">
            {updateId && (
              <>
                <button
                  className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  // onClick={handleSend}
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
