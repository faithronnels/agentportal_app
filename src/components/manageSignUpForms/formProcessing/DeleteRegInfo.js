import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
  csuDeleteRegistration,
  clearRegistrationError,
  clearRegistrationSuccessMsg,
} from "../../../redux/actions/agentRegistrationAction";

import { useAgentRegState } from "../../../redux/selectors";
import Spinner from "../../commons/Spinner";
import AlertComponent from "../../commons/AlertComponent";

export const DeleteRegInfo = ({ agentInfo, handleCloseModal }) => {
  const dispatch = useDispatch();
  const RegState = useAgentRegState();

  const { successMsg, errorMsg, isLoading } = RegState;

  const { handleSubmit } = useForm();

  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        dispatch(clearRegistrationError());
      }, 5000);
    }
    if (successMsg) {
      setTimeout(() => {
        dispatch(clearRegistrationSuccessMsg());

        handleCloseModal();
      }, 5000);
    }
  }, [errorMsg, successMsg, dispatch, handleCloseModal]);

  const handleUpdateRegInfo = async (info) => {
    info.agentid = agentInfo.agentid;
    dispatch(csuDeleteRegistration(info));
  };

  return (
    <Fragment>
      <div className=" bg-[#fbfbfb] pb-8">
        <div className="flex flex-row justify-end  relative cursor-pointer">
          <div
            className="absolute rounded-full text-[#FF7204] p-3 font-bold"
            onClick={() => handleCloseModal(false)}
          >
            X
          </div>
        </div>
        <div className="w-[98%]  p-2   mx-auto my-3  shadow-sm">
          <form onSubmit={handleSubmit(handleUpdateRegInfo)}>
            <h2 className="text-xl  md:text-2xl font-bold text-center mb-4 ">
              Delete Application
            </h2>

            <div className=" my-1">
              {errorMsg && (
                <AlertComponent
                  title="Error"
                  message={errorMsg}
                  type="error"
                  color="red"
                />
              )}
              {successMsg && (
                <AlertComponent
                  title="Successful"
                  message={successMsg}
                  type="success"
                  color="green"
                />
              )}
            </div>
            {(agentInfo.accountCreationStatus === null ||
              agentInfo.accountCreationStatus === "not created") && (
              <Fragment>
                <p className="block text-gray-700">
                  {" "}
                  Are you sure you like to delete this application?
                </p>{" "}
                <p>
                  Name:{" "}
                  <span className="font-bold">
                    {agentInfo.firstname}
                    {"  "}
                    {agentInfo.middlename ? agentInfo.middlename : null}
                    {"  "}
                    {agentInfo.surname}
                  </span>{" "}
                </p>
                <p>
                  Reference Number:{" "}
                  <span className="font-bold">{agentInfo.refNum}</span>{" "}
                </p>
                <div className="flex flex-row justify-end">
                  <button
                    className={`my-2 py-3 px-4   text-[#ffffff] bg-[#FF7204] justify-self-right text-center ${
                      isLoading || successMsg
                        ? "cursor-not-allowed bg-[#f0a165]"
                        : null
                    }`}
                    type="submit"
                  >
                    {" "}
                    {successMsg ? (
                      <span>
                        {" "}
                        <IoMdCheckmarkCircleOutline
                          size={17}
                          style={{ color: "#ffffff" }}
                          className="inline-flex "
                        />{" "}
                        Deleted
                      </span>
                    ) : (
                      <span className="inline-flex ">
                        {isLoading && <Spinner />} Delete Reg Info
                      </span>
                    )}
                  </button>
                </div>
              </Fragment>
            )}
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default DeleteRegInfo;
