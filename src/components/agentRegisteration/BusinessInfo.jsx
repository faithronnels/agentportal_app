import React, { Fragment, useState, useEffect } from "react";
import { useForm, useWatch, useFieldArray } from "react-hook-form";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import axios from "axios";
import config from "../../config/index";
import {
  MdNavigateNext,
  MdNavigateBefore,
  MdAddchart,
  MdDeleteForever,
} from "react-icons/md";

import { stateList } from "../commons/data/stateLists";

const BusinessInfo = ({
  nextStep,
  handleProgress,
  previousStep,
  setRegForm,
  regForm,
}) => {
  const {
    register,
    control,
    clearErrors,
    setValue,
    setError,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: regForm });

  const isAgentExisting = regForm.agentExist;

  const [shopCheck, setShopCheck] = useState(false);

  const [usernames, setUsernames] = useState([]);

  const [pwdVisible, setPwdVisible] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "newShopDetails",
  });

  const onSubmit = (data) => {
    setRegForm(data);
    nextStep(1);
    handleProgress(12.5);
  };
  const handlePreviousStep = () => {
    previousStep(1, 12.5);
  };

  const handleShopCheck = async (e) => {
    setShopCheck(false);
    clearErrors("existingShopName");
    const shopname = e.target.value.trim().toLowerCase();
    if (shopname === "") return;
    try {
      const url = `${config.Urls.base}/username/${shopname}`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response && response.data.statusCode === 200) {
        if (response.data.data === "true") {
          setShopCheck(true);
        }
        if (response.data.data === "false") {
          setShopCheck(false);
          setError("existingShopName", {
            type: "NonExistingShop",
            message: "Invalid Shopname. Provide a valid Shop name",
          });
          setTimeout(() => {
            setValue(`existingShopName`, "");
            setFocus(`existingShopName`);
          }, 1000);
        }
      }
    } catch (err) {
      setShopCheck(false);
      setError("existingShopName", {
        type: "NonExistingShop",
        message: "Invalid Shopname. Provide a valid Shop name",
      });
      setTimeout(() => {
        setValue(`existingShopName`, "");
        setFocus(`existingShopName`);
      }, 1000);
    }
  };

  useEffect(() => {}, [usernames]);

  const handleNameCheck = async (e, index) => {
    clearErrors(`newShopDetails[${index}].username`);
    const shopname = e.target.value.trim().toLowerCase();
    if (shopname === "") return;

    const itemIndex = getItemIndex(usernames, index);
    let obj = {
      index,
      inputedvalue: shopname,
      availability: null,
    };
    try {
      const url = `${config.Urls.base}/username/${shopname}`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response && response.data.statusCode === 200) {
        if (response.data.data === "true") {
          obj = {
            index,
            inputedvalue: shopname,
            availability: false,
          };
          updateUsernameArr(obj, itemIndex);
          setError(`newShopDetails[${index}].username`, {
            type: "ExistingShop",
            message: `${shopname} Shop name already exist. Provide another Shop name`,
          });
          setTimeout(() => {
            setValue(`newShopDetails[${index}].username`, "");
            setFocus(`newShopDetails[${index}].username`);
          }, 1000);
        }
        if (response.data.data === "false") {
          obj = {
            index,
            inputedvalue: shopname,
            availability: true,
          };
          updateUsernameArr(obj, itemIndex);
        }
      }
    } catch (err) {
      obj = {
        index,
        inputedvalue: shopname,
        availability: null,
      };
      updateUsernameArr(obj, itemIndex);
    }
  };

  const getItemIndex = (arr, item) => {
    return arr.findIndex((e) => e.index === item);
  };

  const updateUsernameArr = (obj, itemIndex) => {
    if (itemIndex === -1) {
      setUsernames([...usernames, obj]);
      return;
    }
    const newArr = [...usernames];
    newArr[itemIndex] = obj;
    setUsernames(newArr);
  };

  const HandleBizState = ({ control }) => {
    const bizState = useWatch({
      control,
      name: "businessState",
    });

    if (bizState) {
      let selectedBizState = stateList.filter(
        (state) => state.name === bizState
      );

      return selectedBizState[0].lgas.map((lga, index) => (
        <option key={index} value={lga}>
          {lga}
        </option>
      ));
    }
  };

  const toggleShow = () => {
    setPwdVisible(!pwdVisible);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-2xl text-[#FF7204]">
          Business Information
        </h3>
        <div className="max-w-lg">
          <div className="grid grid-cols-1 gap-6">
            {isAgentExisting === "Yes" && (
              <label className="block">
                <span className="text-gray-700">Existing shop name</span>
                <span role="alert" className="text-[11px] text-red-500 ml-2">
                  {errors.existingShopName?.message}
                </span>

                {shopCheck && (
                  <span className=" text-[11px] text-[#0AB942]">
                    <IoMdCheckmarkCircleOutline
                      size={12}
                      style={{ color: "#0AB942" }}
                      className="inline-flex ml-2"
                    />{" "}
                    Shopname Exist
                  </span>
                )}
                {/* end of shop check error */}
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
                  placeholder="Existing shop name"
                  {...register("existingShopName", {
                    required: "This  is required",
                  })}
                  onBlur={handleShopCheck}
                  // onBlur={booooo}
                />
              </label>
            )}
            {/* field array */}
            {fields.map((item, index) => {
              return (
                <div key={item.id} className="flex flex-col">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      {" "}
                      <label className="block">
                        <span className="text-gray-700">New Shop Name</span>

                        {usernames.length > 0 &&
                        usernames[index]?.availability ? (
                          <span className=" text-[11px] text-[#0AB942]">
                            <IoMdCheckmarkCircleOutline
                              size={12}
                              style={{ color: "#0AB942" }}
                              className="inline-flex ml-2"
                            />{" "}
                            Available
                          </span>
                        ) : null}
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
                          id={`username[${index}]`}
                          control={control}
                          placeholder="New Shop Name"
                          {...register(`newShopDetails[${index}].username`, {
                            required: "Shop name is required.",
                          })}
                          onBlur={(e) => handleNameCheck(e, index)}
                        />
                      </label>
                    </div>
                    <div className="flex  flex-row ">
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
                          control={control}
                          id={`password[${index}]`}
                          placeholder="Password"
                          {...register(`newShopDetails[${index}].password`, {
                            required:
                              "Password is required. Remove field if not needed",
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
                          className="absolute flex justify-center items-center right-0 w-[40px] top-0 mt-6 h-[40px] bg-gray-500 hover:cursor-pointer"
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
                      <div className="self-end">
                        {index === 0 ? (
                          <div
                            className="w-fit bg-transparent self-end rounded-lg"
                            type="button"
                            onClick={() => {
                              append({
                                username: "",
                                password: "",
                              });
                            }}
                          >
                            <MdAddchart
                              size={35}
                              style={{ color: "#0AB942" }}
                              className="inline-flex mr-2 hover:cursor-pointer"
                            />
                          </div>
                        ) : (
                          <div
                            className="w-fit  bg-transparent self-end rounded-lg"
                            type="button"
                            onClick={() => remove(index)}
                          >
                            <MdDeleteForever
                              size={35}
                              style={{ color: "#FF7204" }}
                              className="inline-flex ml-2 hover:cursor-pointer"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <span
                      role="alert"
                      className="text-[11px] text-red-500 px-1"
                    >
                      {errors?.newShopDetails?.[index]?.username?.message}
                    </span>
                    <span
                      role="alert"
                      className="text-[11px] text-red-500 px-1"
                    >
                      {errors?.newShopDetails?.[index]?.password?.message}
                    </span>
                  </div>
                </div>
              );
            })}
            {/* end of field array */}
            <label className="block">
              <span className="text-gray-700">Business Address</span>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.businessAddress?.message}
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
                {...register("businessAddress", {
                  required: "Business address is required",
                })}
              ></textarea>
            </label>
            <div className="flex flex-col md:flex-row justify-between">
              <label className="block md:w-[50%]">
                <span className="text-gray-700">Business State</span>
                <span role="alert" className="text-[11px] text-red-500 ml-3">
                  {errors.businessState?.message}
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
                  {...register("businessState", {
                    required: "Select a state",
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
              <label className="block  md:w-[48%]">
                <span className="text-gray-700">Local Govt Area</span>
                <span role="alert" className="text-[11px] text-red-500 ml-3">
                  {errors.businessLga?.message}
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
                  {...register("businessLga", {
                    required: "This is required",
                  })}
                >
                  <option value="">Select LGA</option>
                  <HandleBizState control={control} />
                </select>
              </label>
            </div>
            <label className="block  ">
              <span className="text-gray-700">How did you hear about us</span>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.informationMedium?.message}
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
                {...register("informationMedium", {
                  required: "This is required",
                })}
              >
                <option value="Facebook">Facebook</option>
                <option value="Banner">Banner</option>
                <option value="Forum/Blog">Forum/Blog</option>
                <option value="Radio/Tv">Radio/Tv</option>
                <option value="Newspaper/Magazine">Newspaper/Magazine</option>
                <option value="Others">Others</option>
              </select>
            </label>
            <label className="block">
              <span className="text-gray-700">If others, Please Specify</span>
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
                placeholder="if others, specify"
                {...register("otherInfoMedium")}
              />
            </label>
            <div className="flex flex-col md:flex-row justify-between">
              <label className="block">
                <span className="text-gray-700">Agent Referral Name</span>
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
                  placeholder="Referral Name"
                  {...register("referralName")}
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Agent Referral Contact</span>
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
                  placeholder="Referral Contact"
                  {...register("referralContact")}
                />
              </label>
            </div>{" "}
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

export default BusinessInfo;
