import React from "react";
import Cart from "../Cart/Cart";

const CartDrawer = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={
        " fixed overflow-hidden bg-gray-700 z-10  bg-opacity-0 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-all opacity-100 duration-500 translate-x-0 "
          : " transition-all delay-500 opacity-0 translate-x-full ")
      }
    >
      <section
        className={
          "md:w-96 w-40 right-0 absolute bg-gray-700 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform" +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
        id="cart-drawer"
      >
        <article className="relative max-w-lg pb-10 flex flex-col space-y-6 h-full">
          <Cart setIsOpen={setIsOpen} />
        </article>
      </section>
      <section
        className=" h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </div>
  );
};

export default CartDrawer;
