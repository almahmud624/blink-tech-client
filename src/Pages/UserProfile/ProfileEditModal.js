import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FiAlertOctagon } from "react-icons/fi";
import { AuthContext } from "../../Context/AuthProvider";

const ProfileEditModal = ({ handleUserProfileUpdate }) => {
  const { user } = useContext(AuthContext);
  const [imgPreview, setImgPreview] = useState(user?.photoURL);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    handleUserProfileUpdate(data);
  };
  return (
    <div>
      <input type="checkbox" id="profile-edit-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="profile-edit-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Update Your Profile</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-2">
            <div className="flex flex-col gap-5">
              <div className="p-2 flex justify-center">
                <img
                  src={imgPreview}
                  alt=""
                  className="w-24 h-24 rounded-full"
                />
              </div>
              <div className="">
                <label for="photoURL" className="sr-only">
                  Your photoURL
                </label>
                <input
                  type="text"
                  name="photoURL"
                  id="photoURL"
                  defaultValue={user?.photoURL}
                  onInput={(e) => setImgPreview(e.target.value)}
                  className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-slate-900 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 border-gray-600"
                  placeholder="Your photoURL"
                  {...register("photoURL", { required: true })}
                  aria-invalid={errors.photoURL ? "true" : "false"}
                />
                {errors.photoURL?.type === "required" && (
                  <p role="alert" className="py-2 pb-1 text-red-500">
                    <FiAlertOctagon className="inline-block text-red-500 mr-1" />{" "}
                    Your photoURL is required
                  </p>
                )}
              </div>
            </div>

            <div className="">
              <label for="name" className="sr-only">
                Your Name
              </label>
              <input
                type="text"
                name="displayName"
                id="name"
                defaultValue={user?.displayName}
                className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border-transparent bg-slate-900 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 border rounded-lg border-gray-600"
                placeholder="Your Name"
                {...register("displayName", { required: true })}
                aria-invalid={errors.displayName ? "true" : "false"}
              />
              {errors.displayName?.type === "required" && (
                <p role="alert" className="py-2 pb-1 text-red-500">
                  <FiAlertOctagon className="inline-block text-red-500 mr-1" />{" "}
                  Your name is required
                </p>
              )}
            </div>
            <div className="flex flex-col mt-4 lg:space-y-2">
              <button
                type="submit"
                className="flex items-center justify-center w-full px-10 py-3 text-base font-medium text-center text-gray-800 transition duration-500 ease-in-out transform bg-indigo-300 rounded-xl hover:bg-indigo-700 hover:text-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <label
                  className="w-full h-full cursor-pointer"
                  htmlFor="profile-edit-modal"
                >
                  Update
                </label>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
