import React, { Fragment } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useForm } from "react-hook-form";
import { bankList } from "../commons/data/bankLists";

const BankInfo = ({
  nextStep,
  handleProgress,
  previousStep,
  setRegForm,
  regForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: regForm });
  const onSubmit = (data) => {
    setRegForm(data);
    nextStep(1);
    handleProgress(12.5);
  };
  const handlePreviousStep = () => {
    previousStep(1,12.5);
  };
  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-2xl text-[#FF7204]">Enter Your Account Details</h3>
        <div className="max-w-lg">
          <div className="grid grid-cols-1 gap-6">
            <label className="block ">
              <span className="text-gray-700">Select Bank Name</span>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.bankName?.message}
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
                {...register("bankName", {
                  required: "This  is required",
                })}
              >
                {bankList.map((i) => (
                  <option key={i.id} value={i.name}>
                    {i.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-gray-700">Account Number</span>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.accountNumber?.message}
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
                placeholder="Account Number"
                {...register("accountNumber", {
                  required: "This  is required",
                  pattern: {
                    value: /^[0-9\b]+$/,
                    message: "Only numbers are allowed",
                  },
                  maxLength: {
                    value: 10,
                    message: "Maximum characters allowed is 10",
                  },
                  minLength: {
                    value: 10,
                    message: "Miniimum characters allowed is 10",
                  },
                })}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Account Name</span>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.accountName?.message}
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
                placeholder="Account Name"
                {...register("accountName", {
                  required: "This  is required",
                })}
              />
            </label>

            <div className="flex flex-row justify-between mt-8">
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

export default BankInfo;
