import React, { Fragment, useState, useEffect } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { stateList } from "../../commons/data/stateLists";
import { bankList } from "../../commons/data/bankLists";

export const AddCancelBetSlip = ({ register, errors }) => {
  return (
    <Fragment>
      <label className="block">
        <span className="text-gray-700">BetSlip Number</span>

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
          placeholder="Enter betslip number"
          {...register("betSlipNumber", {
            required: "Betslip number is required",
          })}
        />
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.betSlipNumber?.message}
        </span>
      </label>
    </Fragment>
  );
};
export const ChangeBank = ({ register, errors }) => {
  return (
    <Fragment>
      <p className="my-2 text-[#FF7204]">
        Fill in the Account Details currently in use
      </p>

      <div className="flex flex-col md:flex-row justify-between">
        <label className="block md:w-[49%]">
          <span className="text-gray-700">Current Bank Name</span>
          <select
            className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
            {...register("currentBank", {
              required: "Select a bank",
            })}
          >
            {bankList.map((i) => (
              <option key={i.id} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
          <span role="alert" className="text-[11px] text-red-500 ml-3">
            {errors.currentBank?.message}
          </span>
        </label>
        <label className="block  md:w-[49%]">
          <span className="text-gray-700">Current account number</span>

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
            placeholder="Enter account number"
            {...register("currentAccountNum", {
              required: "This  is required",
              pattern: {
                value: /^[0-9\b]+$/,
                message: "Only numbers are allowed",
              },
              maxLength: {
                value: 10,
                message: "Maximum characters allowed is 10",
              },
              minLength: {
                value: 10,
                message: "Miniimum characters allowed is 10",
              },
            })}
          />
          <span role="alert" className="text-[11px] text-red-500 ml-3">
            {errors.currentAccountNum?.message}
          </span>
        </label>
      </div>
      <label className="block">
        <span className="text-gray-700">Current account name</span>

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
          placeholder="Account Name"
          {...register("currentAccountName", {
            required: "Enter Account Name",
          })}
        />
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.currentAccountName?.message}
        </span>
      </label>

      <hr className="my-1" />
      <p className="my-2 text-[#FF7204]">
        Fill in the new account details you want to use
      </p>

      <div className="flex flex-col md:flex-row justify-between">
        <label className="block md:w-[49%]">
          <span className="text-gray-700">New Bank Name</span>

          <select
            className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
            {...register("newBank", {
              required: "Select a bank",
            })}
          >
            {bankList.map((i) => (
              <option key={i.id} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
          <span role="alert" className="text-[11px] text-red-500 ml-3">
            {errors.newBank?.message}
          </span>
        </label>
        <label className="block  md:w-[49%]">
          <span className="text-gray-700">New account number</span>

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
            placeholder="Enter account number"
            {...register("newAccountNum", {
              required: "This  is required",
              pattern: {
                value: /^[0-9\b]+$/,
                message: "Only numbers are allowed",
              },
              maxLength: {
                value: 10,
                message: "Maximum characters allowed is 10",
              },
              minLength: {
                value: 10,
                message: "Miniimum characters allowed is 10",
              },
            })}
          />
          <span role="alert" className="text-[11px] text-red-500 ml-3">
            {errors.newAccountNum?.message}
          </span>
        </label>
      </div>
      <label className="block">
        <span className="text-gray-700">New account name</span>

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
          placeholder="Account Name"
          {...register("newAccountName", {
            required: "Enter Account Name",
          })}
        />
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.newAccountName?.message}
        </span>
      </label>
    </Fragment>
  );
};
export const ReversalAccount = ({ register, errors }) => {
  return (
    <Fragment>
      <label className="block  ">
        <span className="text-gray-700">Wrongly Funded Account</span>

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
          placeholder="Enter wrongly funded account"
          {...register("reversalAccount", {
            required: "This  is required",
          })}
        />
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.reversalAccount?.message}
        </span>
      </label>
      <div className="flex flex-col md:flex-row justify-between">
        <label className="block md:w-[49%] ">
          <span className="text-gray-700">Date</span>

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
            {...register("reversalDate", {
              required: "This  is required",
            })}
          />
          <span role="alert" className="text-[11px] text-red-500 ml-3">
            {errors.reversalDate?.message}
          </span>
        </label>

        <label className="block  md:w-[49%]">
          <span className="text-gray-700">Amount</span>

          <input
            type="number"
            className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
            placeholder="Enter account number"
            {...register("reversalAmount", {
              required: "This  is required",
              pattern: {
                value: /^[0-9\b]+$/,
                message: "Only numbers are allowed",
              },
            })}
          />
          <span role="alert" className="text-[11px] text-red-500 ml-3">
            {errors.reversalAmount?.message}
          </span>
        </label>
      </div>

      <label className="block">
        <span className="text-gray-700">Upload Proof </span>

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
          id="fileImage"
          accept="image/png, image/jpg, image/jpeg,image/jfif, pdf"
          {...register("fileImage", {
            required: "This  is required",
            // onChange: (e) => handleFileChange(e),
          })}
        />
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.fileImage?.message}
        </span>
      </label>
    </Fragment>
  );
};
export const OwnershipTransfer = ({ register, errors }) => {
  const [localGovernments, setlocalGovernments] = useState([]);
  const [currentState, setCurrentState] = useState("");

  useEffect(() => {
    if (currentState) {
      let selectedState = stateList.filter(
        (state) => state.name === currentState
      );
      setlocalGovernments(selectedState[0].lgas);
    }
  }, [currentState]);
  const handleStateSelect = (e) => {
    setCurrentState(e.target.value);
  };

  return (
    <Fragment>
      <label className="block my-1">
        <span className="text-gray-700">Shop Address</span>

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
          {...register("shopAddress", {
            required: "Shop address is required",
          })}
        ></textarea>
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.shopAddress?.message}
        </span>
      </label>
      <div className="flex flex-col md:flex-row justify-between my-2">
        <label className="block md:w-[50%]">
          <span className="text-gray-700">Shop State</span>

          <select
            className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
            {...register("shopState", {
              required: "Select a state",
            })}
            onChange={handleStateSelect}
          >
            <option value="">Select State</option>
            {stateList.map((i) => (
              <option key={i.id} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
          <span role="alert" className="text-[11px] text-red-500 ml-3">
            {errors.shopState?.message}
          </span>
        </label>
        <label className="block  md:w-[48%]">
          <span className="text-gray-700">Local Govt Area</span>

          <select
            className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
            {...register("shopLga", {
              required: "This is required",
            })}
          >
            <option value="">Select LGA</option>
            {localGovernments.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          <span role="alert" className="text-[11px] text-red-500 ml-3">
            {errors.shopLga?.message}
          </span>
        </label>
      </div>

      <label className="block  my-1">
        <span className="text-gray-700">Enter Firstname</span>

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
          {...register("firstName", {
            required: "This is required",
          })}
        />
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.firstName?.message}
        </span>
      </label>
      <label className="block  my-1">
        <span className="text-gray-700">Middle name</span>

        <input
          type="text"
          placeholder="Enter middlename"
          className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
          {...register("middleName")}
        />
      </label>
      <label className="block  my-1">
        <span className="text-gray-700">Surname</span>

        <input
          type="text"
          placeholder="Enter Surname"
          className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
          {...register("surname", {
            required: "This is required",
          })}
        />
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.surname?.message}
        </span>
      </label>
      <label className="block my-1">
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
      <div className="flex flex-col md:flex-row justify-between my-1">
        <label className="block md:w-[49%]">
          <span className="text-gray-700">Mobile Number</span>

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
            {...register("mobile", {
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
          <span role="alert" className="text-[11px] text-red-500 ml-3">
            {errors.mobile?.message}
          </span>
        </label>
        <label className="block md:w-[49%] mt-4 md:mt-0 ">
          <span className="text-gray-700">Phone Number</span>

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
          <span role="alert" className="text-[11px] text-red-500 ml-3">
            {errors.phoneNumber?.message}
          </span>
        </label>
      </div>

      <p className="text-[#FF7204] mt-1">Agent Bank Account Details</p>
      <p className="text-[#3b3b3b] mb-1 ">
        {" "}
        Please ensure that the bank account details are entered accurately and
        are valid.
      </p>
      <div className="flex flex-col md:flex-row justify-between my-1">
        <label className="block md:w-[49%]">
          <span className="text-gray-700">Bank Name</span>

          <select
            className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
            {...register("bankName", {
              required: "Select a bank",
            })}
          >
            {bankList.map((i) => (
              <option key={i.id} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
          <span role="alert" className="text-[11px] text-red-500 ml-3">
            {errors.bankName?.message}
          </span>
        </label>
        <label className="block  md:w-[49%]">
          <span className="text-gray-700">Account number</span>

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
            placeholder="Enter account number"
            {...register("accountNumber", {
              required: "This  is required",
              pattern: {
                value: /^[0-9\b]+$/,
                message: "Only numbers are allowed",
              },
              maxLength: {
                value: 10,
                message: "Maximum characters allowed is 10",
              },
              minLength: {
                value: 10,
                message: "Miniimum characters allowed is 10",
              },
            })}
          />
          <span role="alert" className="text-[11px] text-red-500 ml-3">
            {errors.accountNumber?.message}
          </span>
        </label>
      </div>
      <label className="block my-1">
        <span className="text-gray-700">Account name</span>

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
          placeholder="Account Name"
          {...register("accountName", {
            required: "Enter Account Name",
          })}
        />
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.accountName?.message}
        </span>
      </label>
      <label className="block my-1">
        <span className="text-gray-700">ID Card </span>

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
          id="fileImage"
          accept="image/png, image/jpg, image/jpeg,image/jfif, pdf"
          {...register("fileImage", {
            required: "ID card is required",
            // onChange: (e) => handleFileChange(e),
          })}
        />
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.fileImage?.message}
        </span>
      </label>
    </Fragment>
  );
};
export const ShopCreditReversal = ({ register, errors }) => {
  return (
    <Fragment>
      <div className="flex flex-col md:flex-row justify-between my-1">
        <label className="block  md:w-[49%]">
          <span className="text-gray-700">Amount</span>

          <input
            type="number"
            className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
            placeholder="Enter account number"
            {...register("amount", {
              required: "Amount is required",
              pattern: {
                value: /^[0-9\b]+$/,
                message: "Only numbers are allowed",
              },
            })}
          />
          <span role="alert" className="text-[11px] text-red-500 ml-3">
            {errors.amount?.message}
          </span>
        </label>
        <label className="block md:w-[49%]  ">
          <span className="text-gray-700">Date</span>
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
            {...register("date", {
              required: "Date is required",
            })}
          />{" "}
          <span role="alert" className="text-[11px] text-red-500 ml-3">
            {errors.date?.message}
          </span>
        </label>
      </div>
      <label className="block">
        <span className="text-gray-700">Upload Proof </span>

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
          accept="image/png, image/jpg, image/jpeg,image/jfif, pdf"
          {...register("fileImage", {
            required: "Proof of payment document is required",
            // onChange: (e) => handleFileChange(e),
          })}
        />
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.fileImage?.message}
        </span>
      </label>
    </Fragment>
  );
};
export const ShopPasswordUpdate = ({ register, errors }) => {
  const [pwdVisible, setPwdVisible] = useState(false);
  const toggleShow = () => {
    setPwdVisible(!pwdVisible);
  };
  return (
    <Fragment>
      <label className="block my-1 ">
        <span className="text-gray-700">Account Type</span>

        <select
          className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
          {...register("accountType", {
            required: "Account Type is required",
          })}
        >
          <option value="">Select an option</option>
          <option value="Betting Shop">Betting Shop</option>
          <option value="Top up Account">Top up Account</option>
        </select>
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.accountType?.message}
        </span>
      </label>
      <label className="block relative my-1">
        <span className="font-bold mr-3">New Password</span>

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
          {...register("newPassword", {
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
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.newPassword?.message}
        </span>
      </label>

      <label className="block  my-1">
        <span className="text-gray-700">Old Password</span>

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
          placeholder="Enter Old Password"
          {...register("oldPassword", {
            required: "Old Password is required",
          })}
        />
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.oldPassword?.message}
        </span>
      </label>
    </Fragment>
  );
};
export const ActivateDeactivateAccount = ({ register, errors }) => {
  const [localGovernments, setlocalGovernments] = useState([]);
  const [currentState, setCurrentState] = useState("");

  useEffect(() => {
    if (currentState) {
      let selectedState = stateList.filter(
        (state) => state.name === currentState
      );
      setlocalGovernments(selectedState[0].lgas);
    }
  }, [currentState]);
  const handleStateSelect = (e) => {
    setCurrentState(e.target.value);
  };

  return (
    <Fragment>
      <label className="block my-1">
        <span className="text-gray-700">Shop Address</span>

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
          {...register("shopAddress", {
            required: "Shop address is required",
          })}
        ></textarea>
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.shopAddress?.message}
        </span>
      </label>
      <div className="flex flex-col md:flex-row justify-between my-1">
        <label className="block md:w-[50%]">
          <span className="text-gray-700">Shop State</span>

          <select
            className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
            {...register("shopState", {
              required: "Select a state",
            })}
            onChange={handleStateSelect}
          >
            <option value="">Select State</option>
            {stateList.map((i) => (
              <option key={i.id} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
          <span role="alert" className="text-[11px] text-red-500 ml-3">
            {errors.shopState?.message}
          </span>
        </label>
        <label className="block  md:w-[48%]">
          <span className="text-gray-700">Local Govt Area</span>

          <select
            className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
            {...register("shopLga", {
              required: "This is required",
            })}
          >
            <option value="">Select LGA</option>
            {localGovernments.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          <span role="alert" className="text-[11px] text-red-500 ml-3">
            {errors.shopLga?.message}
          </span>
        </label>
      </div>
    </Fragment>
  );
};
export const ShopVerification = ({ register, errors }) => {
  const [localGovernments, setlocalGovernments] = useState([]);
  const [currentState, setCurrentState] = useState("");

  useEffect(() => {
    if (currentState) {
      let selectedState = stateList.filter(
        (state) => state.name === currentState
      );
      setlocalGovernments(selectedState[0].lgas);
    }
  }, [currentState]);
  const handleStateSelect = (e) => {
    setCurrentState(e.target.value);
  };

  return (
    <Fragment>
      <label className="block my-1">
        <span className="text-gray-700">Shop Address</span>

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
          {...register("shopAddress", {
            required: "Shop address is required",
          })}
        ></textarea>
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.shopAddress?.message}
        </span>
      </label>
      <div className="flex flex-col md:flex-row justify-between my-1">
        <label className="block md:w-[49%]">
          <span className="text-gray-700">Shop State</span>

          <select
            className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
            {...register("shopState", {
              required: "Select a state",
            })}
            onChange={handleStateSelect}
          >
            <option value="">Select State</option>
            {stateList.map((i) => (
              <option key={i.id} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
          <span role="alert" className="text-[11px] text-red-500 ml-3">
            {errors.shopState?.message}
          </span>
        </label>
        <label className="block  md:w-[49%]">
          <span className="text-gray-700">Local Govt Area</span>
          <select
            className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
            {...register("shopLga", {
              required: "This is required",
            })}
          >
            <option value="">Select LGA</option>
            {localGovernments.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>{" "}
          <span role="alert" className="text-[11px] text-red-500 ml-3">
            {errors.shopLga?.message}
          </span>
        </label>
      </div>
      <label className="block my-1 ">
        <span className="text-gray-700">Mobile Number</span>
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
          placeholder="Mobile Number"
          {...register("phoneNum", {
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
        />{" "}
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.phoneNum?.message}
        </span>
      </label>
      <label className="block my-1">
        <span className="text-gray-700">Select Outdoor Shop Image </span>
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
          id="fileImage"
          accept="image/png, image/jpg, image/jpeg,image/jfif, pdf"
          {...register("shopOutdoorImage", {
            required: "ID card is required",
            // onChange: (e) => handleFileChange(e),
          })}
        />{" "}
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.shopOutdoorImage?.message}
        </span>
      </label>
      <label className="block my-1">
        <span className="text-gray-700">Select Indoor Shop Images </span>
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
          accept="image/png, image/jpg, image/jpeg,image/jfif, pdf"
          {...register("shopIndoorImage", {
            required: "ID card is required",
            // onChange: (e) => handleFileChange(e),
          })}
        />{" "}
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.shopIndoorImage?.message}
        </span>
      </label>
    </Fragment>
  );
};
export const ClosedAccounts = ({ register, errors }) => {
  return (
    <Fragment>
      <label className="block  my-1">
        <span className="text-gray-700">Name of closed login(s)</span>

        <p style={{ fontSize: "0.8rem" }}>
          Separate names with a comma if more than one
        </p>
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
          placeholder="Number of Shops"
          {...register("closedLoginsNames", {
            required: "This is required",
          })}
        />
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.closedLoginsNames?.message}
        </span>
      </label>

      <label className="block my-1">
        <span className="text-gray-700">Number of Physical Shops</span>
        <input
          type="number"
          className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
          placeholder="Number of Shops"
          {...register("numberOfShops", {
            required: "This is required",
            pattern: {
              value: /^[0-9\b]+$/,
              message: "Only numbers are allowed",
            },
          })}
        />{" "}
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.numberOfShops?.message}
        </span>
      </label>
      <label className="block my-1">
        <span className="text-gray-700"> Number of Cashier account needed</span>
        <input
          type="number"
          className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
          placeholder="Number of Cashier Account"
          {...register("numberOfCashierAccount", {
            required: "This is required",
            pattern: {
              value: /^[0-9\b]+$/,
              message: "Only numbers are allowed",
            },
          })}
        />{" "}
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.numberOfCashierAccount?.message}
        </span>
      </label>
    </Fragment>
  );
};
export const OtherIssues = ({ register, errors }) => {
  // const handleFileChange = (e) => {
  //   let files = e.target.files;
  //   setValue("fileImage", files);
  // };
  return (
    <Fragment>
      <label className="block my-1">
        <span className="text-gray-700">Image / File upload </span>
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
          accept="image/png, image/jpg, image/jpeg,image/jfif, pdf"
          {...register("fileImage")}
        />{" "}
        <span role="alert" className="text-[11px] text-red-500 ml-3">
          {errors.fileImage?.message}
        </span>
      </label>
    </Fragment>
  );
};
