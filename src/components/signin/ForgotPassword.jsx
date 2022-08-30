import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux/es/exports";
import { useAuthState } from "../../redux/selectors";
import {
  forgotPassword,
  clearAuthError,
  clearAuthSuccessMsg,
} from "../../redux/actions/authAction";
import AlertComponent from "../commons/AlertComponent";
import Spinner from "../commons/Spinner";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const authState = useAuthState();
   const {
     register,
     handleSubmit,
     formState: { errors },
  } = useForm();
  
  const { successMsg, errorMsg, isLoading } = authState;

 

  useEffect(() => {}, [authState]);
 

  const onSubmit = async (data) => {
    dispatch(forgotPassword(data));
  };
  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        dispatch(clearAuthError());
      }, 5000);
    }
    if (successMsg) {
      setTimeout(() => {
        dispatch(clearAuthSuccessMsg());
      }, 5000);
    }
  }, [dispatch, errorMsg, successMsg]);
  return (
    <section
      className="flex flex-row justify-around  mx-auto pt-2 md:pt-5  max-h-full  bg-gradient-to-tl from-[#fffffffa] to-[#f5f2f2f3]   
     "
    >
      <div className=" min-w-[90%] sm:min-w-86% md:min-w-[60%] lg:min-w-[40%] p-2 md:p-6  mx-auto my-5  shadow-xl">
        {errorMsg && (
          <AlertComponent
            title="Invalid Credentials"
            message={errorMsg}
            type="error"
            color="red"
          />
        )}
        {successMsg && (
          <AlertComponent
            title="Password Reset Successful"
            message={successMsg}
            type="success"
            color="green"
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          {" "}
          <h2 className="text-xl  md:text-2xl font-bold text-center my-3 ">
            {" "}
            Login
          </h2>
          <label className="block">
            <span className="text-gray-700">Email</span>
            <span role="alert" className="text-[11px] text-red-500 ml-3">
              {" "}
              {errors.email?.message}
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
              placeholder="Enter Your Email"
              {...register("email", {
                required: "Email is required.",
              })}
            />
          </label>
          <div className="flex flex-row justify-between align-middle my-2">
            <Link
              to="/signin"
              className="hover:text-[#FF7204] cursor-pointer mt-2"
            >
              {" "}
              Login to account
            </Link>{" "}
            <button
              className={`my-2 py-3 md:py-4 w-[55%]  md:w-[40%] text-[#ffffff] bg-[#FF7204] justify-self-right ${
                isLoading ? "cursor-not-allowed bg-[#f0a165]" : null
              }`}
              type="submit"
            >
              <span className="inline-flex ">
                {isLoading && <Spinner />} Reset Password
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
