import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux/es/exports";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
  AddCancelBetSlip,
  ChangeBank,
  ReversalAccount,
  OwnershipTransfer,
  ShopCreditReversal,
  ShopPasswordUpdate,
  ActivateDeactivateAccount,
  ShopVerification,
  ClosedAccounts,
  OtherIssues,
} from "./CategoryPanels";
import AlertComponent from "../../commons/AlertComponent";
import Spinner from "../../commons/Spinner";

import { useRequestState } from "../../../redux/selectors";
import {
  getCategory,
  setNewRequest,
  clearRequestError,
  clearRequestSuccessMsg,
} from "../../../redux/actions/requestAction";

export const AddRequest = ({ handleCloseModal, handleReload }) => {
  const dispatch = useDispatch();
  const requestState = useRequestState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [currentCategory, setCurrentCategory] = useState("");

  const { category, successMsg, errorMsg, isLoading } = requestState;
  const onSubmit = (data, e) => {
    dispatch(setNewRequest(data));
    e.target.reset();
  };
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  let panelContent;
  if (currentCategory === "cancelling betslip") {
    panelContent = <AddCancelBetSlip register={register} errors={errors} />;
  }
  if (currentCategory === "change bank details") {
    panelContent = <ChangeBank register={register} errors={errors} />;
  }
  if (currentCategory === "top up reversal") {
    panelContent = <ReversalAccount register={register} errors={errors} />;
  }
  if (currentCategory === "transfer of account ownership") {
    panelContent = <OwnershipTransfer register={register} errors={errors} />;
  }
  if (currentCategory === "shop credit reversal") {
    panelContent = <ShopCreditReversal register={register} errors={errors} />;
  }
  if (currentCategory === "change of password") {
    panelContent = <ShopPasswordUpdate register={register} errors={errors} />;
  }
  if (currentCategory === "activate / deactivate account") {
    panelContent = (
      <ActivateDeactivateAccount register={register} errors={errors} />
    );
  }
  if (currentCategory === "agent shop verification") {
    panelContent = <ShopVerification register={register} errors={errors} />;
  }
  if (currentCategory === "closed accounts") {
    panelContent = <ClosedAccounts register={register} errors={errors} />;
  }
  if (currentCategory === "other issues") {
    panelContent = <OtherIssues register={register} errors={errors} />;
  }
  const handleCategorySelect = (e) => {
    setCurrentCategory(e.target.value);
  };
  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        dispatch(clearRequestError());
      }, 3000);
    }
    if (successMsg) {
      handleReload();
      setTimeout(() => {
        dispatch(clearRequestSuccessMsg());
        handleCloseModal();
      }, 3000);
    }
  }, [errorMsg, successMsg, dispatch, handleCloseModal, handleReload]);
 

  return (
    <div className=" bg-[#fbfbfb] pb-8">
      <div className="flex flex-row justify-end  relative cursor-pointer">
        <div
          className="absolute rounded-full text-[#FF7204] p-3 font-bold"
          onClick={() => handleCloseModal(false)}
        >
          X
        </div>
      </div>

      <div
        className="flex flex-row justify-around  mx-auto pt-2 md:pt-5  max-h-full    
     "
      >
        <div className="w-[98%]  p-2   mx-auto my-3  shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-xl  md:text-2xl font-bold text-center mb-4 ">
              {currentCategory ? currentCategory.toUpperCase() : "NEW REQUEST"}
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

            <label className="block my-1">
              <span className="text-gray-700">Select Category</span>

              <select
                className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                {...register("category", {
                  required: "Select request category",
                })}
                onChange={handleCategorySelect}
              >
                <option value="">Select Category</option>
                {category.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryName.trim()}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.category?.message}
              </span>
            </label>

            <label className="block my-1 ">
              <span className="text-gray-700">Agent Username</span>

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
                placeholder="Enter agent Username"
                {...register("agentUsername", {
                  required: "Agent username is required",
                })}
              />
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.agentUsername?.message}
              </span>
            </label>

            <div className="mt-2">{panelContent}</div>

            <label className="block mt-1">
              <span className="text-gray-700">Comments</span>{" "}
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.requestComment?.message}
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
                {...register("requestComment")}
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
                    {isLoading && <Spinner />} Submit Request
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
