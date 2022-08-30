import React, { Fragment, useCallback } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useForm } from "react-hook-form";
import { checkFileValidation } from "../commons/fileUploadValidation";

const GuarantorDocuments = ({
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
    previousStep(1,12.5);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFileChange = useCallback((e) => {
    const inputName = e.target.name;
    clearErrors(`${inputName}`);
    const result = checkFileValidation(e);
    if (result === "invalid size") {
      setError(`${inputName}`, {
        type: "maxSize",
        message: "File  is too large. Maximum File size is 500kb",
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
          Guarantor's Document Uploads
        </h3>

        <div className="max-w-lg">
          <div className="grid grid-cols-1 gap-6">
            <p className="mt-2 text-[#FF7204] ">
              File Upload Requirements: Valid upload file types are jpeg, png,
              jpg and pdf only.
              <span className="font-bold">
                {" "}
                Maximum file size for each upload is 500kb.
              </span>
            </p>
            <label className="block">
              <span className="text-gray-700">Scanned Guarantor form </span>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.guarantorFormImage?.message}
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
                accept="image/png, image/jpg, image/jpeg,image/jfif,pdf"
                {...register("guarantorFormImage", {
                  required: "This  is required",
                  onChange: (e) => handleFileChange(e),
                })}
              />
            </label>
            <label className="block mt-2">
              <span className="text-gray-700">Guarantor Work Id Card </span>{" "}
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.guarantorWorkIdCardImage?.message}
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
                accept="image/png, image/jpg, image/jpeg,image/jfif,pdf"
                placeholder="New Shop Name"
                {...register("guarantorWorkIdCardImage", {
                  required: "This  is required",
                  onChange: (e) => handleFileChange(e),
                })}
              />
            </label>
            <label className="block mt-2">
              <span className="text-gray-700">Guarantor Utility Bill</span>{" "}
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.guarantorUtilityBillImage?.message}
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
                accept="image/png, image/jpg, image/jpeg,image/jfif,pdf"
                placeholder="New Shop Name"
                {...register("guarantorUtilityBillImage", {
                  required: "This  is required",
                  onChange: (e) => handleFileChange(e),
                })}
              />
            </label>
            <label className="block mt-2">
              <span className="text-gray-700">Guarantor Valid Id card</span>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.guarantorValidIdCardImage?.message}
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
                placeholder="New Shop Name"
                {...register("guarantorValidIdCardImage", {
                  required: "This  is required",
                  onChange: (e) => handleFileChange(e),
                })}
              />
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

export default GuarantorDocuments;
