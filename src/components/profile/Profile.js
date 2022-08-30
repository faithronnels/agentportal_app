import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import { useForm } from "react-hook-form";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useAuthState, useUserState } from "../../redux/selectors";
import {
  updateUser,
  clearUserSuccessMsg,
  clearUserError,
} from "../../redux/actions/userAction";
import AlertComponent from "../commons/AlertComponent";
import Spinner from "../commons/Spinner";

const Profile = () => {
  const authState = useAuthState();
  const userState = useUserState();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [pwdVisible, setPwdVisible] = useState(false);

  const { successMsg, errorMsg, isLoading } = userState;
  const { currentUser } = authState;
  const {
    fullname,
    email,
    is_principal_agent,
    roleDescription,
    user_id,
    username,
  } = currentUser;

  const toggleShow = () => {
    setPwdVisible(!pwdVisible);
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
      }, 5000);
    }
    reset();
  }, [dispatch, errorMsg, reset, successMsg]);
  const onSubmit = (data) => {
    dispatch(updateUser(data, user_id));
  };
  return (
    <section
      className="flex flex-col justify-around w-full mx-auto pt-2 md:pt-5   text-gray-700    
     "
    >
      <div className="">
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
        <div className="">
          {" "}
          <p className="my-2">
            <span className="font-bold mr-3">Name:</span>
            {fullname}
          </p>
          <p className="my-2">
            <span className="font-bold mr-3">email:</span>

            {email}
          </p>
          <p className="my-2">
            <span className="font-bold mr-3">Role Type:</span>

            {roleDescription}
          </p>
          {is_principal_agent && (
            <p className="my-2">
              <span className="font-bold mr-3">Username:</span>

              {username}
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row justify-between md:w-[60%]  ">
              <label className="block relative w-full md:w-[90%]">
                <span className="font-bold mr-3">Change Password?</span>

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
                    required: "Password required.",
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
              </label>
              <button
                className={`my-3 md:mt-6 md:ml-3 py-2  md:w-[100px]  text-[#ffffff] bg-[#FF7204]  ${
                  isLoading ? "cursor-not-allowed bg-[#f0a165]" : null
                }`}
                type="submit"
              >
                <span className="inline-flex ">
                  {isLoading && <Spinner />} Save
                </span>
              </button>
            </div>
          </form>
          <span role="alert" className="text-[11px] text-red-500 ">
            {" "}
            {errors.password?.message}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Profile;
