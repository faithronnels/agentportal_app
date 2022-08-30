import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux/es/exports";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import AlertComponent from "../commons/AlertComponent";
import Spinner from "../commons/Spinner";

import {
  setNewUser,
  clearUserSuccessMsg,
  clearUserError,
} from "../../redux/actions/userAction";
import { useUserState } from "../../redux/selectors/index";

const AddUser = ({ handleCloseModal }) => {
  const dispatch = useDispatch();
  const userState = useUserState();

  const [pwdVisible, setPwdVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");

  const toggleShow = () => {
    setPwdVisible(!pwdVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { userRoles, successMsg, errorMsg, isLoading } = userState;
  const onSubmit = (data) => {
    dispatch(setNewUser(data));
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
        // handleReload();
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
              New User
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
            <label className="block relative flex-grow">
              <span className="text-gray-700">Password</span>

              <input
                type={pwdVisible ? "text" : "password"}
                className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                    
                  "
                placeholder="Password"
                {...register("password", {
                  required: "Password is required.",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                    message:
                      "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
                  },
                  minLength: {
                    value: 8,
                    message: "Password Must be above 7 characters",
                  },
                })}
              />
              <div
                className="absolute flex justify-center items-center right-0 w-[40px] top-0 mt-6 h-[40px] bg-gray-500 "
                onClick={toggleShow}
              >
                {pwdVisible ? (
                  <AiFillEye
                    size={20}
                    style={{ color: "#FFffff" }}
                    className="justify-self-center"
                  />
                ) : (
                  <AiFillEyeInvisible
                    size={20}
                    style={{ color: "#FFffff" }}
                    className="justify-self-center"
                  />
                )}
              </div>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.password?.message}
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
                    Saved
                  </span>
                ) : (
                  <span className="inline-flex ">
                    {isLoading && <Spinner />} Save User
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

export default AddUser;
