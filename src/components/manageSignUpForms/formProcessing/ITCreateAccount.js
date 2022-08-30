import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
  itAccountUpdate,
  clearRegistrationError,
  clearRegistrationSuccessMsg,
} from "../../../redux/actions/agentRegistrationAction";

import { useAgentRegState } from "../../../redux/selectors";
import Spinner from "../../commons/Spinner";
import AlertComponent from "../../commons/AlertComponent";

export const ITCreateAccount = ({ agentInfo, handleCloseModal }) => {
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
      }, 5000);
    }
    if (successMsg) {
      setTimeout(() => {
        dispatch(clearRegistrationSuccessMsg());

        handleCloseModal();
      }, 5000);
    }
  }, [errorMsg, successMsg, dispatch, handleCloseModal]);

  const onSubmit = async (info) => {
    info.verificationId = agentInfo.shopVerificationId;
    info.agentId = agentInfo.agentid;

    dispatch(itAccountUpdate(info));
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-xl  md:text-2xl font-bold text-center mb-4 ">
              Account Creation
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

            <Fragment>
              <div className="grid grid-cols-3 gap-2   py-2">
                <p>
                  First name:
                  <span className="font-bold ml-2">{agentInfo.firstname} </span>
                </p>
                <p>
                  Middle name:
                  <span className="font-bold ml-2">
                    {agentInfo.middlename ? agentInfo.middlename : ""}{" "}
                  </span>
                </p>
                <p>
                  Surname:
                  <span className="font-bold ml-2">{agentInfo.surname}</span>
                </p>
              </div>
              <div className="grid grid-cols-1   py-2">
                <p>
                  Location (state):
                  <span className="font-bold ml-2">
                    {agentInfo.businessState}
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-1   py-2">
                <span className="font-bold">Shop Details:</span>
                <div className="mx-5">
                  <ul>
                    {agentInfo.shopDetails &&
                      agentInfo.shopDetails.map((item, index) => {
                        return (
                          <li key={index} className="my-1">
                            Shopname:{" "}
                            <span className="font-bold ml-1">
                              {item.shopname}
                            </span>{" "}
                            <span className="ml-3">
                              {" "}
                              Password:{" "}
                              <span className="font-bold ml-1">
                                {item.password}
                              </span>
                            </span>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1  py-2">
                <div>
                  <p>
                    Commision Type:
                    <span className="font-bold  ml-2">
                      {agentInfo.commissionPlan}
                    </span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1   py-2">
                <div>
                  <p>
                    Accountant Remark:
                    <span className="font-bold  ml-2">
                      {agentInfo.accountantRemark}
                    </span>
                  </p>
                </div>
              </div>

              <label className="block ">
                <span className="text-gray-700">Select Status</span>

                <select
                  className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                  {...register("accountCreationStatus", {
                    required: "Enter Commission Plan",
                  })}
                >
                  <option value="">Select a status</option>
                  <option value="created">Created</option>
                  <option value="not created">Not created</option>
                </select>
                <span role="alert" className="ml-3 text-[11px] text-red-500">
                  {errors.accountCreationStatus?.message}
                </span>
              </label>

              <label className="block">
                <span className="text-gray-700">Comment</span>{" "}
                <span role="alert" className="text-[11px] text-red-500 ml-3">
                  {errors.acctCreationRemark?.message}
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
                  {...register("acctCreationRemark")}
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
                      Status Updated
                    </span>
                  ) : (
                    <span className="inline-flex ">
                      {isLoading && <Spinner />} Update Account status
                    </span>
                  )}
                </button>
              </div>
            </Fragment>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default ITCreateAccount;
