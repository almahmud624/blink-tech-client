import React, { useContext } from "react";
import { GrGoogle } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";
import { setAuthToken } from "../../Utilities/JwtApi";

const SocialLogin = () => {
  const { userGoogleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  // google sign in
  const handleGoogleSignIn = () => {
    userGoogleSignIn()
      .then((res) => {
        const user = res.user;
        // get jwt token
        setAuthToken(user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };
  return (
    <div>
      <div>
        <button
          type="submit"
          className="w-full items-center block px-10 py-3 text-base font-medium text-center text-indigo-900 transition bg-indigo-300 duration-500 ease-in-out transform border-2 border-indigo-400 shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={handleGoogleSignIn}
        >
          <div className="flex items-center justify-center">
            <GrGoogle />
            <span className="ml-4"> Log in with Google</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
