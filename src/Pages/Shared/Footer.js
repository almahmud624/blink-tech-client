import React from "react";
import { Link } from "react-router-dom";
import { IoLogoAppleAppstore, IoLogoGooglePlaystore } from "react-icons/io5";
import PrimaryBtn from "../../Component/PrimaryBtn";

const Footer = () => {
  return (
    <div>
      <footer className="footer p-5 md:p-10 bg-base-100 text-base-content">
        <div>
          <div>
            <h4 className="text-3xl font-bold">Blink Tech</h4>
          </div>
          <div className="py-3">
            <h5 className="font-semibold text-lg">
              Ready for make life become easier
            </h5>
            <p className="font-base text-md my-1">
              Download our app from Google Play and App store
            </p>
            <div className="grid md:grid-flow-col gap-4 w-full mt-4">
              <a
                href="https://play.google.com/store/apps"
                target="_blank"
                rel="noreferrer"
                className="flex flex-row justify-center items-center font-medium text-md border-2 py-3 px-1 md:px-4 rounded-md bg-green-600 text-gray-100 border-teal-900 hover:bg-transparent hover:text-green-400 transition-all duration-300 md:w-full w-10/12"
              >
                Download on Google Play{" "}
                <IoLogoGooglePlaystore className="ml-2 text-lg" />
              </a>
              <a
                href="https://play.google.com/store/apps"
                target="_blank"
                rel="noreferrer"
                className="flex flex-row justify-center items-center font-medium text-md border-2 py-3 px-1 md:px-4 rounded-md bg-green-600 text-gray-100 border-teal-900 hover:bg-transparent hover:text-green-400 transition-all duration-300 md:w-full w-10/12"
              >
                Download on App store{" "}
                <IoLogoAppleAppstore className="ml-2 text-lg" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <Link to="" className="link link-hover">
            About us
          </Link>
          <Link to="" className="link link-hover">
            Contact
          </Link>
          <Link to="" className="link link-hover">
            Jobs
          </Link>
          <Link to="" className="link link-hover">
            Press kit
          </Link>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <Link to="" className="link link-hover">
            Terms of use
          </Link>
          <Link to="" className="link link-hover">
            Privacy policy
          </Link>
          <Link to="" className="link link-hover">
            Cookie policy
          </Link>
        </div>
        <div>
          <span className="footer-title">Newsletter</span>
          <div className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="relative md:w-full w-10/12">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered w-full pr-16"
              />
              <PrimaryBtn
                customClass={
                  "absolute mt-0 py-3.5 top-0 right-0 rounded-l-none"
                }
              >
                Subscribe
              </PrimaryBtn>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
