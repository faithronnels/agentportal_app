import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { stateList } from "../commons/data/stateLists";

const PersonalInfo = ({
  nextStep,
  handleProgress,
  previousStep,
  setRegForm,
  regForm,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: regForm });

  const onSubmit = (data) => {
    setRegForm(data);
    nextStep(1);
    handleProgress(12.5);
  };
  const handlePreviousStep = () => {
    previousStep(1, 12.5);
  };

  const HandleStateSelect = ({ control }) => {
    const originState = useWatch({
      control,
      name: "stateOfOrigin",
    });

    if (originState) {
      let selectedOriginState = stateList.filter(
        (state) => state.name === originState
      );

      // setlocalGovernments(selectedState[0].lgas);
      return selectedOriginState[0].lgas.map((lga, index) => (
        <option key={index} value={lga}>
          {lga}
        </option>
      ));
    }
  };
  const HandleResStateSelect = ({ control }) => {
    const resState = useWatch({
      control,
      name: "residentialState",
    });

    if (resState) {
      let selectedresState = stateList.filter(
        (state) => state.name === resState
      );

      return selectedresState[0].lgas.map((lga, index) => (
        <option key={index} value={lga}>
          {lga}
        </option>
      ));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-2xl text-[#FF7204]">
          Personal Information
        </h3>
        <div className="max-w-lg">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col md:flex-row justify-between">
              <label className="block md:w-[49%]">
                <span className="text-gray-700">State of Origin</span>
                <span role="alert" className="text-[11px] text-red-500 ml-3">
                  {errors.stateOfOrigin?.message}
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
                  {...register("stateOfOrigin", {
                    required: "This  is required",
                  })}
                >
                  <option value="">Select State</option>
                  {stateList.map((i) => (
                    <option key={i.id} value={i.name}>
                      {i.name}
                    </option>
                  ))}
                </select>
                {/* <HandleStateSelect control={control} /> */}
              </label>
              <label className="block  md:w-[49%] mt-4 md:mt-0">
                <span className="text-gray-700">Local Govt Area</span>
                <span role="alert" className="text-[11px] text-red-500 ml-3">
                  {errors.originLga?.message}
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
                  {...register("originLga", {
                    required: "This  is required",
                  })}
                >
                  <option value="">Select LGA</option>
                  <HandleStateSelect control={control} />
                </select>
              </label>
            </div>
            <label className="block ">
              <span className="text-gray-700">Religion</span>{" "}
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.religion?.message}
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
                {...register("religion", {
                  required: "This  is required",
                })}
              >
                <option>Christian</option>
                <option>Muslim</option>
                <option>Traditionist</option>
                <option>Other</option>
              </select>
            </label>

            <label className="block">
              <span className="text-gray-700">Residential Address</span>{" "}
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.residentialAddress?.message}
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
                {...register("residentialAddress", {
                  required: "This  is required",
                })}
              ></textarea>
            </label>
            <div className="flex flex-col md:flex-row justify-between">
              <label className="block md:w-[50%]">
                <span className="text-gray-700">State of Residence</span>{" "}
                <span role="alert" className="text-[11px] text-red-500 ml-3">
                  {errors.residentialState?.message}
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
                  {...register("residentialState", {
                    required: "This  is required",
                  })}
                >
                  <option value="">Select State</option>
                  {stateList.map((i) => (
                    <option key={i.id} value={i.name}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block  md:w-[48%] mt-4 md:mt-0">
                <span className="text-gray-700">Local Govt Area</span>
                <span role="alert" className="text-[11px] text-red-500 ml-3">
                  {errors.residentialLga?.message}
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
                  {...register("residentialLga", {
                    required: "This  is required",
                  })}
                >
                  <option value="">Select LGA</option>
                  <HandleResStateSelect control={control} />
                </select>
              </label>
            </div>
            <div className="block">
              <div className="mt-2">
                <span className="text-gray-700">
                  {" "}
                  Are you an existing agent?{" "}
                </span>
                <span role="alert" className="text-[11px] text-red-500 ml-3">
                  {errors.agentExist?.message}
                </span>
              </div>
              <div className="flex flex-row justify-center md:justify-start">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="Yes"
                    className="
                          border-gray-300 border-2
                          text-black
                          focus:border-gray-300 focus:ring-black
                        "
                    {...register("agentExist", {
                      required: "This  is required",
                    })}
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center ml-1">
                  <input
                    type="radio"
                    value="No"
                    className="
                          border-gray-300 border-2
                          text-black
                          focus:border-gray-300 focus:ring-black
                        "
                    {...register("agentExist", {
                      required: "This  is required",
                    })}
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
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
    </div>
  );
};

export default PersonalInfo;
