import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
  csuVerifyAgentPayment,
  clearRegistrationError,
  clearRegistrationSuccessMsg,
} from "../../../redux/actions/agentRegistrationAction";

import { useAgentRegState } from "../../../redux/selectors";
import Spinner from "../../commons/Spinner";
import AlertComponent from "../../commons/AlertComponent";

export const CSUVerifyPayment = ({ agentInfo, handleCloseModal }) => {
  const dispatch = useDispatch();
  const RegState = useAgentRegState();

  const { successMsg, errorMsg, isLoading } = RegState;

  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        dispatch(clearRegistrationError());
        handleCloseModal();
      }, 5000);
    }
    if (successMsg) {
      setTimeout(() => {
        dispatch(clearRegistrationSuccessMsg());
        handleCloseModal();
      }, 5000);
    }
  }, [errorMsg, successMsg, dispatch, handleCloseModal]);

  const handleUpdateRegInfo = (info) => {
    info.agentId = agentInfo.agentid;
    dispatch(csuVerifyAgentPayment(info));
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
              Submit For Payment Verification
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
                <label className="block ">
                  <span className="text-gray-700">Commission Plan</span>

                  <select
                    className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                    {...register("commisionPlan", {
                      required: "Enter Commission Plan",
                    })}
                  >
                    <option value="Per Ticket">Per Ticket</option>
                  </select>
                  <span role="alert" className="ml-3 text-[11px] text-red-500">
                    {errors.commisionPlan?.message}
                  </span>
                </label>
                <label className="block">
                  <span className="text-gray-700">Comment</span>{" "}
                  <span role="alert" className="text-[11px] text-red-500 ml-3">
                    {errors.csuComment?.message}
                  </span>
                  <textarea
                    className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                    rows="2"
                    {...register("csuComment")}
                  ></textarea>
                </label>

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
                        Submitted
                      </span>
                    ) : (
                      <span className="inline-flex ">
                        {isLoading && <Spinner />} Verify Payment
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
export default CSUVerifyPayment;
