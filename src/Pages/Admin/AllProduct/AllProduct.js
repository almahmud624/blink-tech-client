import React, { useContext, useState } from "react";
import { DataContext } from "../../../Context/DataProvider";
import { FiEdit, FiTrash } from "react-icons/fi";
import { toast } from "react-toastify";
import AddProduct from "../AddProduct/AddProduct";

const AllProduct = () => {
  const { products, setProducts } = useContext(DataContext);
  const [updateDeleteId, setUpdateDeleteId] = useState("");
  const [modal, setModal] = useState(false);

  // Product Delete
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
  };

  const handleModalUpdateId = (id) => {
    setUpdateDeleteId(id);
    setModal(true);
  };

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
        rel="stylesheet"
      />
      <div className="flex items-center justify-center bg-gray-900">
        <div className="col-span-12 w-full">
          <div className="overflow-auto lg:overflow-visible ">
            <table className="table text-gray-400 border-separate space-y-6 text-sm w-full px-5 overflow-x-auto">
              <thead className="bg-gray-800 text-gray-500">
                <tr>
                  <th className="p-3">Brand</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Discount</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => (
                  <tr key={Math.random()} className="bg-gray-800">
                    <td className="p-3 w-1/3">
                      <div className="flex align-items-center">
                        <img
                          className="rounded-md bg-indigo-300 h-12 w-12  object-cover"
                          src={product?.imgURL}
                          alt=""
                        />
                        <div className="ml-3">
                          <div className="flex flex-wrap">
                            {product?.productName}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {product?._id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 capitalize">{product?.category}</td>
                    <td className="p-3 font-bold">
                      {product?.productPrice}.00$
                    </td>
                    <td className="p-3">
                      <span className=" text-gray-50 font-semibold px-2">
                        <span className="">{product?.discount}% </span>
                        Off
                      </span>
                    </td>
                    <td className="p-3">
                      {/* <button className="text-gray-400 hover:text-gray-100 mr-2">
                        <i className="material-icons-outlined text-base">
                          visibility
                        </i>
                      </button> */}
                      <button className="text-gray-400 hover:text-gray-100 mr-5">
                        <label
                          htmlFor="my-modal-6"
                          onClick={() => setUpdateDeleteId(product?._id)}
                          className="btn text-lg p-0 py-0 min-h-0 h-0 bg-transparent hover:bg-transparent border-none text-gray-400 hover:text-gray-100"
                        >
                          <FiTrash />
                        </label>
                      </button>
                      <button className="text-gray-400 hover:text-gray-100">
                        <label
                          htmlFor="my-modal-5"
                          onClick={() => handleModalUpdateId(product?._id)}
                          className="btn text-lg p-0 py-0 min-h-0 h-0 bg-transparent hover:bg-transparent border-none text-gray-400 hover:text-gray-100"
                        >
                          <FiEdit />
                        </label>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* delete modal */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are You Sure?</h3>
          <p className="py-4">You Want to Cancel this Order.</p>
          <div className="modal-action">
            <label
              onClick={() => handleDelete(updateDeleteId)}
              htmlFor="my-modal-6"
              className="btn py-0 flex my-0 h-10 text-sm capitalize rounded min-h-0 bg-green-700 hover:bg-green-800 text-green-50"
            >
              Confirm
            </label>
            <label
              htmlFor="my-modal-6"
              className="btn py-0 flex my-0 h-10 text-sm capitalize rounded min-h-0 bg-red-700 hover:bg-red-800 text-red-50"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
      {/* update modal */}
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div
        className={`${
          modal
            ? "modal modal-bottom sm:modal-middle backdrop-brightness-50"
            : "modal modal-bottom sm:modal-middle backdrop-brightness-50 hidden"
        }`}
      >
        <div
          className="modal-box dark:bg-gray-800"
          style={{ maxWidth: "48rem" }}
        >
          <AddProduct updateId={updateDeleteId} setModal={setModal} />
          {/* <div className="modal-action">
            <label
              // onClick={() => handleDelete(updateDeleteId)}
              htmlFor="my-modal-5"
              className="btn py-0 flex my-0 h-10 text-sm capitalize rounded min-h-0 bg-green-700 hover:bg-green-800 text-green-50"
            >
              Confirm
            </label>
            <label
              htmlFor="my-modal-5"
              className="btn py-0 flex my-0 h-10 text-sm capitalize rounded min-h-0 bg-red-700 hover:bg-red-800 text-red-50"
            >
              Cancel
            </label>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
