import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux/es/exports";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import AlertComponent from "../commons/AlertComponent";
import Spinner from "../commons/Spinner";

import {
  updateUser,
  clearUserSuccessMsg,
  clearUserError,
} from "../../redux/actions/userAction";
import { useUserState } from "../../redux/selectors/index";

const UpdateUser = ({ selectedRow, handleCloseModal }) => {
  const dispatch = useDispatch();
  const userState = useUserState();
  const { userRoles, successMsg, errorMsg, isLoading } = userState;
  const { userId } = selectedRow;
  const [currentCategory, setCurrentCategory] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: selectedRow });

  const onSubmit = (data) => {
    dispatch(updateUser(data, userId));
  };

  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        dispatch(clearUserError());
      }, 5000);
    }
    if (successMsg) {
      setTimeout(() => {
        dispatch(clearUserSuccessMsg());
        handleCloseModal();
      }, 5000);
    }
  }, [errorMsg, successMsg, dispatch, handleCloseModal]);
  const handleCategorySelect = (e) => {
    setCurrentCategory(e.target.value);
  };

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
              Update User Record
            </h2>

            <div className=" my-1">
              {errorMsg && (
                <AlertComponent
                  title="Update User Record Error"
                  message={errorMsg}
                  type="error"
                  color="red"
                />
              )}
              {successMsg && (
                <AlertComponent
                  title="Success"
                  message={successMsg}
                  type="success"
                  color="green"
                />
              )}
            </div>

            <label className="block my-1 ">
              <span className="text-gray-700">Fullname</span>

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
                placeholder="Enter Firstname and Surname"
                {...register("fullname", {
                  required: "Firstname and Surname are required",
                })}
              />
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.fullname?.message}
              </span>
            </label>
            <label className="block my-1">
              <span className="text-gray-700">Select Role</span>

              <select
                className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                {...register("roleId", {
                  required: "Select a role",
                })}
                onChange={handleCategorySelect}
              >
                <option value="">Select user role</option>
                {userRoles.map((item) => (
                  <option key={item.userRoleId} value={item.userRoleId}>
                    {item.roleDescription}
                  </option>
                ))}
              </select>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.roleId?.message}
              </span>
            </label>
            <label className="block">
              <span className="text-gray-700">Email</span>

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
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.email?.message}
              </span>
            </label>

            {currentCategory === "5" && (
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
                  {...register("username", {
                    required: "Agent username is required",
                  })}
                />
                <span role="alert" className="text-[11px] text-red-500 ml-3">
                  {errors.username?.message}
                </span>
              </label>
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
                    Updated
                  </span>
                ) : (
                  <span className="inline-flex ">
                    {isLoading && <Spinner />} Update User
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

export default UpdateUser;
