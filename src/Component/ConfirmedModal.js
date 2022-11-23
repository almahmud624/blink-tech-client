import React from "react";

const ConfirmedModal = ({ title, body, action, actionData, closeModal }) => {
  return (
    <>
      <div
        className={`${actionData ? " fixed inset-0  z-40 " : " opacity-0 "}`}
      >
        <div
          className={` ${
            actionData
              ? " justify-center items-center  opacity-100 flex overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none absolute top-0 left-0 focus:outline-none block transition-all duration-500 backdrop-blur- backdrop-brightness-50 backdrop-blur-[0.75px]"
              : "opacity-0 hidden absolute top-0 left-0 "
          }`}
        >
          <div className="relative my-6 mx-auto md:w-1/3 w-full md:mx-0 mx-4">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white  outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 py-3 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
              </div>
              {/*body*/}
              <div className="relative p-6 py-0 flex-auto">
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  {body}
                </p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 py-3 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => action(actionData)}
                >
                  Confirm
                </button>
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-500"
                  type="button"
                  onClick={() => closeModal(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmedModal;
