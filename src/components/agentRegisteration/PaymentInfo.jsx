import React, { Fragment, useCallback } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useForm } from "react-hook-form";
import { checkFileValidation } from "../commons/fileUploadValidation";

const PaymentInfo = ({
  nextStep,
  handleProgress,
  previousStep,
  setRegForm,
  regForm,
}) => {
 
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: regForm,
  });

  const onSubmit = (data) => {
    setRegForm(data);
    nextStep(1);
    handleProgress(12.5);
  };

  const handlePreviousStep = () => {
    regForm.agentExist === "No" ? previousStep(1,12.5) : previousStep(2,25);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFileChange = useCallback((e) => {
    const inputName = e.target.name;
    clearErrors(`${inputName}`);
    const result = checkFileValidation(e);
    if (result === "invalid size") {
      setError(`${inputName}`, {
        type: "maxSize",
        message: "File  is too large.Maximum File size is 500kb",
      });
      setTimeout(() => {
        setValue(`${inputName}`, "");
      }, 1000);
    }
    if (result === "invalid file type") {
      setError(`${inputName}`, {
        type: "maxType",
        message: "Invalid file type.Select a valid file type",
      });
      setTimeout(() => {
        setValue(`${inputName}`, "");
      }, 1000);
    }
  });
  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-2xl text-[#FF7204]">
          Payment Information
        </h3>
        <div className="max-w-lg mt-3">
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-gray-700">Name of Depositor</span>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.depositorName?.message}
              </span>
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
                placeholder="Name of Depositor"
                {...register("depositorName", {
                  required: "This  is required",
                })}
              />
            </label>
            <label className="block  ">
              <span className="text-gray-700">Amount Deposited</span>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.depositAmount?.message}
              </span>
              <input
                type="number"
                className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                placeholder="Amount Deposited"
                {...register("depositAmount", {
                  required: "This  is required",
                  pattern: {
                    value: /^[0-9\b]+$/,
                    message: "Only numbers are allowed",
                  },
                })}
              />
            </label>

            <label className="block ">
              <span className="text-gray-700">Merrybet Account Credited</span>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.merrybetBank?.message}
              </span>
              <select
                className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                {...register("merrybetBank", {
                  required: "This  is required",
                })}
              >
                <option value="">Please Specify</option>
                <option value="First Bank">First Bank</option>
                <option value="Zenith Bank">Zenith Bank</option>
              </select>
            </label>
            <label className="block  ">
              <span className="text-gray-700">Date of Deposit</span>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.depositDate?.message}
              </span>
              <input
                type="date"
                className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                {...register("depositDate", {
                  required: "This  is required",
                })}
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Proof of Payment Upload </span>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.paymentProofImage?.message}
              </span>
              <input
                type="file"
                className="
                    mt-0
                    block
                    w-full
                    file:px-0.5
                    border-0 
                    focus:ring-0 focus:border-black 
                  "
                id="paymentProofImage"
                accept="image/png, image/jpg, image/jpeg,image/jfif, pdf"
                {...register("paymentProofImage", {
                  required: "This  is required",
                  onChange: (e) => handleFileChange(e),
                })}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Deposit Comments</span>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.depositComment?.message}
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
                {...register("depositComment", {
                  required: "This  is required",
                })}
              ></textarea>
            </label>

            <div className="flex flex-row justify-between">
              <button
                className="my-3 py-4  w-[48%] text-[#ffffff] bg-[#FF7204] "
                type="button"
                onClick={handlePreviousStep}
              >
                <MdNavigateBefore
                  size={25}
                  style={{ color: "#ffffff" }}
                  className="inline-flex ml-2"
                />
                Previous
              </button>
              <button
                className="my-3 py-4  w-[48%] text-[#ffffff] bg-[#FF7204] "
                type="submit"
              >
                Next
                <MdNavigateNext
                  size={25}
                  style={{ color: "#ffffff" }}
                  className="inline-flex mr-2"
                />{" "}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default PaymentInfo;
