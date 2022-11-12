import React from "react";
import aboutImg from "../../Assests/about-img.jpg";
import TitleHighlighter from "../../Component/TitleHighlighter";

const About = () => {
  return (
    <div>
      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row-reverse justify-between pb-0">
          <img
            src={aboutImg}
            className="max-w-md rounded-lg shadow-2xl"
            alt=""
          />
          <div className="p-5 py-16 bg-indigo-100 dark:bg-indigo-900">
            <TitleHighlighter>Welcome to Tech</TitleHighlighter>
            <h1 className="text-5xl font-bold">All About Blink Tech</h1>
            <p className="py-6">
              We’re a team of creative and make amazing site in ecommerce from
              Unite States. We love colour pastel, its make our designlook so
              awesome. Now ! come here and create fashion trending with us We’re
              a team of creative and make amazing site in ecommerce from Unite
              States. We love colour pastel, its make our designlook so awesome.
              Now ! come here and create fashion trending with us
            </p>
            {/* <button className="btn btn-primary">Get Started</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
