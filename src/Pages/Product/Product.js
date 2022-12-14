import React from "react";
import { Link } from "react-router-dom";
import PrimaryBtn from "../../Component/PrimaryBtn";

const Product = ({ product, handleAddToCart }) => {
  return (
    <div>
      <div className="relative m-10 flex w-11/12 max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md mx-auto h-80">
        <Link
          className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
          to={`/product-details/${product._id}`}
        >
          <img className="object-cover" src={product.imgURL} alt="product" />
          {product?.discount > 0 && (
            <span className="absolute top-0 right-0 m-2 rounded-full bg-green-700 px-2 text-center text-sm font-medium text-white">
              {product?.discount}% OFF
            </span>
          )}
        </Link>
        <div className="mt-4 px-5 pb-5">
          <h5 className="text-xl tracking-tight text-slate-900">
            {product.productName}
          </h5>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-3xl font-bold text-slate-900">
                $
                {product?.discount > 0
                  ? product.productPrice -
                    Math.round(
                      product?.productPrice * (product?.discount / 100)
                    )
                  : product?.productPrice}
              </span>
              {product?.discount > 0 && (
                <span className="text-sm text-slate-900 line-through">
                  ${product?.productPrice}
                </span>
              )}
            </p>
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-indigo-700"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="mr-2 ml-3 rounded bg-indigo-900 px-2.5 py-0.5 text-xs font-semibold">
                {product.rating}
              </span>
            </div>
          </div>
          <PrimaryBtn
            customClass="py-2 px-3.5"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
};

export default Product;
