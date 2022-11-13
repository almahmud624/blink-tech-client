import React from "react";
import PrimaryBtn from "../../Component/PrimaryBtn";
import SectionTitle from "../../Component/SectionTitle";
import TitleHighlighter from "../../Component/TitleHighlighter";
import techDocImg from "../../Assests/techdoc-img.jpg";

const GetATechDoc = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content flex-col gap-20 lg:flex-row">
          <img
            src={techDocImg}
            alt=""
            className="max-w-md rounded-lg shadow-2xl"
          />
          <div>
            <TitleHighlighter>TechDoc</TitleHighlighter>
            <SectionTitle>do you need a tech doc?</SectionTitle>
            <p className="py-6">
              Unable to work? Your computer freezes? Phone touch not working?
              <br />
              We'll help you get back to work. Fast and Qualitatively
            </p>
            <PrimaryBtn toNavigate="/">Get Started</PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetATechDoc;
