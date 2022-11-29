import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { toast } from "react-hot-toast";
import ProfileEditModal from "../UserProfile/ProfileEditModal";

const UserProfile = () => {
  const { user, setUser, userVerify, userProfileUpdate } =
    useContext(AuthContext);

  const userJoinDate = user?.metadata?.creationTime
    ?.split(" ")
    .slice(0, 4)
    .join(" ");
  const userLastSignedDate = user?.metadata?.lastSignInTime
    ?.split(" ")
    .slice(0, 4)
    .join(" ");

  // edit user profile
  const handleUserProfileUpdate = (profileInfo) => {
    userProfileUpdate(profileInfo)
      .then(() => {
        toast.success("Profile Successfully updated");
        const updatedUserProfile = {
          ...user,
          displayName: profileInfo?.displayName,
          photoURL: profileInfo?.photoURL,
        };

        setUser(updatedUserProfile);
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };
  return (
    <div className="">
      <div className="md:m-10 mt-0  mx-4 max-w-sm md:mx-auto md:py-20 py-5">
        <div className="rounded-lg border bg-white dark:bg-gray-600 border-gray-500 px-4 pt-3 pb-10 shadow-lg ">
          <div className="text-right pb-5">
            <label
              htmlFor="profile-edit-modal"
              className="cursor-pointer text-sm underline text-indigo-300 text-right"
              onClick={() => {
                if (!user?.emailVerified) {
                  toast.error("First verify your email,Please...");
                }
              }}
            >
              Edit Profile
            </label>
          </div>
          <div className="relative mx-auto flex justify-center">
            {/* <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span> */}
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-36 rounded-full h-auto">
                <img
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrxIowHNK_RDNCH9s7q_BOfWFkWSScYXs4vMEDnKmwS2YQBTodn04kuxqsO7Kb8sJajFI&usqp=CAU"
                  }
                  alt=""
                />
              </div>
            </label>
          </div>
          <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-300 capitalize">
            {user?.displayName}
          </h1>
          <h3 className="font-lg text-semibold text-center leading-6 text-gray-300">
            {user?.email}
          </h3>
          {/* <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Architecto, placeat!
          </p> */}
          <ul className="mt-3 divide-y rounded bg-gray-100 dark:bg-gray-900 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
            <li className="flex items-center py-3 text-sm">
              <span className="text-gray-300">Status</span>
              <span className="ml-auto">
                <span
                  className={`rounded-full  py-1 px-2 text-xs font-medium ${
                    user?.emailVerified
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {user?.emailVerified ? "Verified" : "Not Verified"}
                </span>
                {user?.emailVerified || (
                  <span
                    className="rounded-full cursor-pointer py-1 px-2 text-xs font-medium capitalize underline text-indigo-300"
                    onClick={() => {
                      userVerify();
                      toast.success(
                        "Verification mail sent your email address"
                      );
                    }}
                  >
                    Verify your email
                  </span>
                )}
              </span>
            </li>
            <li className="flex items-center py-3 text-sm">
              <span className="text-gray-300">Joined On</span>
              <span className="ml-auto text-gray-400">{userJoinDate}</span>
            </li>
            <li className="flex items-center py-3 text-sm">
              <span className="text-gray-300">Last Signed In</span>
              <span className="ml-auto text-gray-400">
                {userLastSignedDate}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {user?.emailVerified && (
        <ProfileEditModal handleUserProfileUpdate={handleUserProfileUpdate} />
      )}
    </div>
  );
};

export default UserProfile;
