import React from "react";
import { Link } from "react-router-dom";
import sellerImg from "../../Assests/seller-bg.jpg";
import PrimaryBtn from "../../Component/PrimaryBtn";
import TitleHighlighter from "../../Component/TitleHighlighter";

const BecomeSeller = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-100 pb-20">
        <div className="hero-content flex-col gap-20 lg:flex-row">
          <img
            src={sellerImg}
            alt=""
            className="max-w-md rounded-lg shadow-2xl"
          />
          <div>
            <TitleHighlighter>Seller</TitleHighlighter>
            <h1 className="text-5xl font-bold pt-3">Become A Seller!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <PrimaryBtn toNavigate="/">Start from Today</PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeSeller;
