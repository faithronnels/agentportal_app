import React, { Fragment, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AiFillEye } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
  updateRegInfo,
  clearRegistrationError,
  clearRegistrationSuccessMsg,
} from "../../../redux/actions/agentRegistrationAction";

import { useAgentRegState } from "../../../redux/selectors";
import Spinner from "../../commons/Spinner";
import AlertComponent from "../../commons/AlertComponent";

export const UpdateRegInfo = ({ agentInfo, handleCloseModal }) => {
  const dispatch = useDispatch();
  const RegState = useAgentRegState();

  const { successMsg, errorMsg, isLoading } = RegState;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: agentInfo,
  });

  // eslint-disable-next-line no-empty-pattern
  const {} = useFieldArray({
    control,
    name: "newShopDetails",
  });

  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        dispatch(clearRegistrationError());
      }, 5000);
    }
    if (successMsg) {
      setTimeout(() => {
        dispatch(clearRegistrationSuccessMsg());

        handleCloseModal();
      }, 5000);
    }
  }, [errorMsg, successMsg, dispatch, handleCloseModal]);

  const handleUpdateRegInfo = (info) => {
    info.agentid = agentInfo.agentid;
       dispatch(updateRegInfo(info));
  };
  return (
    <Fragment>
      <div className=" bg-[#fbfbfb] pb-8">
        <div className="flex flex-row justify-end  relative cursor-pointer">
          <div
            className="absolute rounded-full text-[#FF7204] p-3 font-bold"
            onClick={() => handleCloseModal(false)}
          >
            X
          </div>
        </div>
        <div className="w-[98%]  p-2   mx-auto my-3  shadow-sm">
          <form onSubmit={handleSubmit(handleUpdateRegInfo)}>
            <h2 className="text-xl  md:text-2xl font-bold text-center mb-4 ">
              Update Reg Information
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
                  title="Successful"
                  message={successMsg}
                  type="success"
                  color="green"
                />
              )}
            </div>
            {(agentInfo.accountCreationStatus === null ||
              agentInfo.accountCreationStatus === "not created") && (
              <Fragment>
                <label className="block my-1 ">
                  <span className="text-gray-700">First name</span>

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
                    placeholder="Enter Firstname"
                    {...register("firstname", {
                      required: "Firstname  is required",
                    })}
                  />
                  <span role="alert" className="text-[11px] text-red-500 ml-3">
                    {errors.firstname?.message}
                  </span>
                </label>
                <label className="block my-1 ">
                  <span className="text-gray-700">Middlename</span>

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
                    placeholder="Enter Middlename"
                    {...register("middlename")}
                  />
                </label>
                <label className="block my-1 ">
                  <span className="text-gray-700">Surname</span>

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
                    placeholder="Enter first name"
                    {...register("surname", {
                      required: "Surname is required",
                    })}
                  />
                  <span role="alert" className="text-[11px] text-red-500 ml-3">
                    {errors.surname?.message}
                  </span>
                </label>
                <h5>Shop Details</h5>
                <ul>
                  {agentInfo.shopDetails.map((item, index) => {
                    return (
                      <li key={index}>
                        <Fragment>
                          <div>
                            {" "}
                            <label className="block">
                              <span className="text-gray-700">Shop Name</span>

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
                                id={`item[${index}]`}
                                control={control}
                                placeholder="New Shop Name"
                                defaultValue={`${item.shopname}`}
                                {...register(
                                  `newShopDetails[${index}].shopname`,
                                  {
                                    required: "Shop name is required.",
                                  }
                                )}
                              />
                            </label>
                          </div>
                          <input
                            type="hidden"
                            defaultValue={`${item.new_shop_details_id}`}
                            {...register(
                              `newShopDetails[${index}].new_shop_details_id`,
                              {
                                required: "Shop name is required.",
                              }
                            )}
                          />
                          <div className="flex  flex-row ">
                            <label className="block relative flex-grow">
                              <span className="text-gray-700">Password</span>

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
                                control={control}
                                id={`password[${index}]`}
                                defaultValue={`${item.password}`}
                                placeholder="Password"
                                {...register(
                                  `newShopDetails[${index}].password`,
                                  {
                                    required: "Password is required",
                                    pattern: {
                                      value:
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                                      message:
                                        "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
                                    },
                                    minLength: {
                                      value: 8,
                                      message:
                                        "Password Must be above 7 characters",
                                    },
                                  }
                                )}
                              />
                              <div className="absolute flex justify-center items-center right-0 w-[40px] top-0 mt-6 h-[40px] bg-gray-500 ">
                                <AiFillEye
                                  size={20}
                                  style={{ color: "#FFffff" }}
                                  className="justify-self-center"
                                />
                              </div>
                            </label>
                          </div>

                          <div>
                            <span
                              role="alert"
                              className="text-[11px] text-red-500 px-1"
                            >
                              {
                                errors?.newShopDetails?.[index]?.username
                                  ?.message
                              }
                            </span>
                            <span
                              role="alert"
                              className="text-[11px] text-red-500 px-1"
                            >
                              {
                                errors?.newShopDetails?.[index]?.password
                                  ?.message
                              }
                            </span>
                          </div>
                        </Fragment>
                      </li>
                    );
                  })}
                </ul>

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
                    {...register("emailId", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Invalid Email format",
                      },
                    })}
                  />
                  <span role="alert" className="text-[11px] text-red-500 ml-3">
                    {errors.emailId?.message}
                  </span>
                </label>

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
                        {isLoading && <Spinner />} Update Reg Info
                      </span>
                    )}
                  </button>
                </div>
              </Fragment>
            )}
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default UpdateRegInfo;
