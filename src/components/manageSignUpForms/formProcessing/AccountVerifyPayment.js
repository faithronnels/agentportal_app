import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
  accountVerifyPayment,
  clearRegistrationError,
  clearRegistrationSuccessMsg,
} from "../../../redux/actions/agentRegistrationAction";

import { useAgentRegState } from "../../../redux/selectors";
import Spinner from "../../commons/Spinner";
import AlertComponent from "../../commons/AlertComponent";

export const AccountVerifyPayment = ({ agentInfo, handleCloseModal }) => {
  const dispatch = useDispatch();
  const RegState = useAgentRegState();
  const [showBank, setShowBank] = useState(false);

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

  const handleUpdateRegInfo = async (info) => {
    info.verificationId = agentInfo.shopVerificationId;
    info.agentId = agentInfo.agentid;

    dispatch(accountVerifyPayment(info));
  };
  const handleSetShowBank = (e) => {
    e.target.value === "approved" ? setShowBank(true) : setShowBank(false);
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
              Payment Verification
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
              <div className="grid grid-cols-1 text-[13px] py-1">
                <p>
                  Agent Names:
                  <span className="font-bold ml-2">
                    {agentInfo.firstname}{" "}
                    {agentInfo.middlename ? agentInfo.middlename : ""}{" "}
                    {agentInfo.surname}
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[13px] py-1">
                <div>
                  <p>
                    MB Account Credited:
                    <span className="font-bold ml-2">
                      {agentInfo.mbBankName}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    Date of Deposit:
                    <span className="font-bold ml-2">
                      {agentInfo.depositDate}
                    </span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[13px] py-1">
                <div>
                  <p>
                    Depositor's Name:
                    <span className="font-bold  ml-2">
                      {agentInfo.depositorName}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    Deposit Amount:
                    <span className="font-bold  ml-2">
                      {agentInfo.depositAmount}
                    </span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1  text-[13px] py-1">
                <div>
                  <p>
                    Deposit Comment:
                    <span className="font-bold  ml-2">
                      {agentInfo.depositComment}
                    </span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1  text-[13px] py-1">
                <p>
                  Commision Plan:
                  <span className="font-bold  ml-2 ">
                    {agentInfo.commissionPlan}
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-1  text-[13px] py-1">
                <p>
                  CSU Approving staff:
                  <span className="font-bold  ml-2">
                    {agentInfo.csuApprovingStaffName}
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[13px] pt-1 pb-2">
                <div>
                  <p>
                    CSU Comment:
                    <span className="font-bold  ml-2">
                      {agentInfo.csuApprovingStaffComment}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between mt-1">
                <label className="block w-[48%] my-1 ">
                  <span className="text-gray-700">Payment Confirmation</span>

                  <select
                    className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                    {...register("paymentConfirmation", {
                      required: "Enter Commission Plan",
                    })}
                  >
                    <option value="">Select Confirm Type</option>
                    <option value="no_dep">No deposit</option>
                    <option value="incomplete_dep">Incomplete Deposit</option>
                    <option value="complete_dep">Complete Deposit</option>
                  </select>
                  <span role="alert" className="ml-3 text-[11px] text-red-500">
                    {errors.paymentConfirmation?.message}
                  </span>
                </label>
                <label className="block  w-[48%] my-1">
                  <span className="text-gray-700">Deposit Amount Seen</span>

                  <input
                    type="text"
                    className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                    placeholder="Deposit Amount Seen"
                    {...register("depositSeen", {
                      required: "This  is required",
                      pattern: {
                        value: /^[0-9\b]+$/,
                        message: "Only numbers are allowed",
                      },
                    })}
                  />
                  <span role="alert" className="text-[11px] text-red-500 ml-3">
                    {errors.depositSeen?.message}
                  </span>
                </label>
              </div>

              <label className="block">
                <span className="text-gray-700">Comment</span>{" "}
                <span role="alert" className="text-[11px] text-red-500 ml-3">
                  {errors.accountComment?.message}
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
                  {...register("accountComment")}
                ></textarea>
              </label>
              <label className="block ">
                <span className="text-gray-700">Payment Approval</span>

                <select
                  className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                  {...register("approvalStatus", {
                    required: "Select PAymentApproval Status",
                  })}
                  onChange={handleSetShowBank}
                >
                  <option value="">Select Status</option>
                  <option value="approved">Approved</option>
                  <option value="unapproved">Unapproved</option>
                </select>
                <span role="alert" className="ml-3 text-[11px] text-red-500">
                  {errors.approvalStatus?.message}
                </span>
              </label>
              {showBank && (
                <Fragment>
                  <h5>Payment Funding Details</h5>

                  <label className="block  ">
                    <span className="text-gray-700">Bank Name</span>

                    <input
                      type="text"
                      className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                      placeholder="Enter first name"
                      {...register("bankName", {
                        required: "Bank name is required",
                      })}
                    />
                    <span
                      role="alert"
                      className="text-[11px] text-red-500 ml-3"
                    >
                      {errors.bankName?.message}
                    </span>
                  </label>

                  <label className="block ">
                    <span className="text-gray-700">Bank Remark</span>{" "}
                    <span
                      role="alert"
                      className="text-[11px] text-red-500 ml-3"
                    >
                      {errors.bankRemark?.message}
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
                      {...register("bankRemark")}
                    ></textarea>
                  </label>
                </Fragment>
              )}

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
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default AccountVerifyPayment;
