import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { MdNavigateNext } from "react-icons/md";

const Biography = ({ nextStep, handleProgress, setRegForm, regForm }) => {
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
  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-2xl text-[#FF7204]">Basic Bio</h3>
        <div className="max-w-lg mt-2">
          <div className="grid grid-cols-1 gap-6">
            <label className="block box-border">
              <span className="text-gray-700">First Name</span>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {" "}
                {errors.firstname?.message}
              </span>

              <input
                id="firstname"
                type="text"
                className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                placeholder="First Name"
                {...register("firstname", {
                  required: "First name is required",
                })}
              />
            </label>
            <label className="block box-border ">
              <span className="text-gray-700">Middle Name</span>
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
                placeholder="Middle Name"
                {...register("middlesname")}
              />
            </label>
            <label className="block box-border">
              <span className="text-gray-700">Surname</span>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.surname?.message}
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
                placeholder="Surname"
                {...register("surname", { required: "Surname is required" })}
              />
            </label>
            <div className="flex flex-col md:flex-row justify-between">
              <label className="block md:w-[50%]">
                <span className="text-gray-700">Title</span>

                <span role="alert" className="ml-3 text-[11px] text-red-500">
                  {errors.title?.message}
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
                  {...register("title", { required: "Title is required" })}
                >
                  <option>Mr</option>
                  <option>Mrs</option>
                  <option>Miss</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="block  md:w-[48%] mt-4 md:mt-0">
                <span className="text-gray-700">Gender</span>

                <span role="alert" className="ml-3 text-[11px] text-red-500">
                  {errors.gender?.message}
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
                  {...register("gender", { required: "Gender is required" })}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
            </div>
            <label className="block ">
              <span className="text-gray-700">Date of Birth (18 +)</span>

              <span role="alert" className="ml-2 text-[11px] text-red-500">
                {errors.dob?.message}
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
                max={moment().subtract(18, "years").format("YYYY-MM-DD")}
                {...register("dob", { required: "Date of Birth is required" })}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Email</span>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.email?.message}
              </span>

              <input
                type="email"
                className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                placeholder="Email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Invalid Email format",
                  },
                })}
              />
            </label>

            <div className="flex flex-col md:flex-row justify-between">
              <label className="block md:w-[49%]">
                <span className="text-gray-700">Mobile Number</span>
                <span role="alert" className="text-[11px] text-red-500 ml-3">
                  {errors.mobileNumber?.message}
                </span>
                <input
                  type="tel"
                  className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                  placeholder="Mobile Number (080...)"
                  {...register("mobileNumber", {
                    required: "This is required",
                    maxLength: {
                      value: 11,
                      message: "Must be 11 digits",
                    },
                    minLength: {
                      value: 11,
                      message: "Must be 11 digits",
                    },
                    pattern: {
                      value: /^[0-9\b]+$/,
                      message: "Only numbers are allowed",
                    },
                  })}
                />
              </label>
              <label className="block md:w-[49%] mt-4 md:mt-0 ">
                <span className="text-gray-700">Phone Number</span>
                <span role="alert" className="text-[11px] text-red-500 ml-3">
                  {errors.phoneNumber?.message}
                </span>
                <input
                  type="tel"
                  className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                  placeholder="Phone Number"
                  {...register("phoneNumber", {
                    maxLength: {
                      value: 11,
                      message: "Must be 11 digits",
                    },
                    minLength: {
                      value: 11,
                      message: "Must be 11 digits",
                    },
                    pattern: {
                      value: /^[0-9\b]+$/,
                      message: "Only numbers are allowed",
                    },
                  })}
                />
              </label>
            </div>

            <div className="flex flex-row justify-end">
              <button
                className="my-3 py-4 w-full md:w-[48%] text-[#ffffff] bg-[#FF7204]  "
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

export default Biography;
