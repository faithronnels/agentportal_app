import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch } from "react-redux/es/exports";
import { useAuthState } from "../../redux/selectors";
import {
  loginUser,
  clearAuthError,
  clearAuthSuccessMsg,
} from "../../redux/actions/authAction";

import AlertComponent from "../commons/AlertComponent";
import Spinner from "../commons/Spinner";

const SignIn = () => {
  const dispatch = useDispatch();
  const authState = useAuthState();
  const navigate = useNavigate();
  const { isLoading, successMsg, errorMsg, currentUser, isAuthenticated } =
    authState;
 

  useEffect(() => {}, [authState]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [pwdVisible, setPwdVisible] = useState(false);

  const toggleShow = () => {
    setPwdVisible(!pwdVisible);
  };

  const onSubmit = async (data) => {
    dispatch(loginUser(data));
  };
  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        dispatch(clearAuthError());
      }, 5000);
    }
    if (isAuthenticated && currentUser !== null) {
      navigate("/dashboard", { replace: true });
      dispatch(clearAuthSuccessMsg());
    }
  }, [currentUser, dispatch, errorMsg, isAuthenticated, navigate, successMsg]);

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
              type="email"
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
          <label className="block relative">
            <span className="text-gray-700">Password</span>
            <span role="alert" className="text-[11px] text-red-500 ml-3">
              {" "}
              {errors.password?.message}
            </span>

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
          </label>
          <div className="flex flex-row justify-between align-middle">
            <Link
              to="/forgot-pass"
              className="hover:text-[#FF7204] cursor-pointer mt-2"
            >
              {" "}
              Forgot Password?
            </Link>{" "}
            <button
              className={`my-2 py-3 md:py-4  w-[40%] text-[#ffffff] bg-[#FF7204] justify-self-right text-center ${
                isLoading ? "cursor-not-allowed bg-[#f0a165]" : null
              }`}
              type="submit"
            >
              {" "}
              <span className="inline-flex ">
                {isLoading && <Spinner />}Login
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
