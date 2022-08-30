import React, { Fragment } from "react";

const ModalComponent = ({ children }) => {
  return (
    <Fragment>
      <div className="absolute justify-center items-center flex overflow-x-hidden overflow-y-hidden inset-0 z-50 outline-none focus:outline-none w-full mx-auto">
        <div className="fixed w-[96%] md:w-[50%]  mx-auto   top-24 ">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none overflow-y-auto max-h-[500px]  ">
            {children}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </Fragment>
  );
};

export default ModalComponent;
