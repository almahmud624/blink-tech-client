import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { toast } from "react-hot-toast";
import AddProduct from "../../Dashboard/AddProduct/AddProduct";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ConfirmedModal from "../../../Component/ConfirmedModal";
import Loader from "../../../Component/Loader";
import SectionTitle from "../../../Component/SectionTitle";

const AllProduct = () => {
  // const { products, setProducts } = useContext(DataContext);
  const [updateDeleteId, setUpdateDeleteId] = useState("");
  const [modal, setModal] = useState(false);
  // deleting product state
  const [deletingProduct, setDeletingProduct] = useState(null);

  // load product
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["prodcts"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "https://blink-tech-server.vercel.app/products"
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  // Product Delete
  const handleDelete = (product) => {
    try {
      axios
        .delete(`https://blink-tech-server.vercel.app/products/${product?._id}`)
        .then((res) => {
          if (res?.data.deletedCount > 0) {
            toast.success("Product Successfully Removed");
            refetch();
            setDeletingProduct(null);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalUpdateId = (id) => {
    setUpdateDeleteId(id);
    setModal(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <SectionTitle customClass={"mb-5"}>All Products</SectionTitle>
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
                          htmlFor="confirmed-modal"
                          onClick={() => setDeletingProduct(product)}
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

      <ConfirmedModal
        title={"Are you sure for deleting?"}
        body={`If you want to remove ${deletingProduct?.productName}. Once you remove it, it's can't be undone.`}
        action={handleDelete}
        actionData={deletingProduct}
        closeModal={setDeletingProduct}
      />

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
