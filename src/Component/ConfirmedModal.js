import React from "react";

const ConfirmedModal = ({ title, body, action, actionData, closeModal }) => {
  return (
    <div>
      <input
        type="checkbox"
        id="confirmed-modal"
        className="modal-toggle"
        defaultChecked={actionData ? true : false}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{body}</p>
          <div className="modal-action">
            <label
              onClick={() => action(actionData?._id)}
              htmlFor="confirmed-modal"
              className="btn py-0 flex my-0 h-10 text-sm capitalize rounded min-h-0 bg-green-700 hover:bg-green-800 text-green-50"
            >
              Confirm
            </label>
            <label
              htmlFor="confirmed-modal"
              className="btn py-0 flex my-0 h-10 text-sm capitalize rounded min-h-0 bg-red-700 hover:bg-red-800 text-red-50"
              onClick={() => closeModal(null)}
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedModal;
