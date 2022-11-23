import React from "react";
import PrimaryBtn from "../../Component/PrimaryBtn";
import SectionTitle from "../../Component/SectionTitle";
import TitleHighlighter from "../../Component/TitleHighlighter";
import techDocImg from "../../Assests/techdoc-img.jpg";

const GetATechDoc = () => {
  return (
    <div>
      <div className="hero md:py-16 py-0 md:pt-10 pt-0 bg-base-100">
        <div className="hero-content flex-col gap-4 md:gap-20 lg:flex-row">
          <div className="max-w-md">
            <img
              src={techDocImg}
              alt=""
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
          <div>
            <TitleHighlighter>TechDoc</TitleHighlighter>
            <SectionTitle>do you need a tech doc?</SectionTitle>
            <p className="py-3 md:py-6">
              Unable to work? Your computer freezes? Phone touch not working?
              <br />
              We'll help you get back to work. Fast and Qualitatively
            </p>
            <PrimaryBtn toNavigate="/tech-doc">Get Started</PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetATechDoc;
