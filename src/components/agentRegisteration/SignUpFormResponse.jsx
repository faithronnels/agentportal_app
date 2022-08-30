import React, { Fragment, useEffect } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegTimesCircle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAgentRegState } from "../../redux/selectors";

const SignUpFormResponse = ({ handleRefreshForm }) => {
  const agentRegState = useAgentRegState();
  const { isLoading, successMsg, errorMsg } = agentRegState;
  useEffect(() => { }, [agentRegState]);


  return (
    <Fragment>
      <form>
        <div className="max-w-lg">
          <div className="grid grid-cols-1 gap-6">
            {isLoading && (
              <div className="text-center">
                <AiOutlineLoading3Quarters
                  size={45}
                  style={{ color: "#0AB942" }}
                  className="inline-flex ml-2"
                />
              </div>
            )}
            {successMsg && successMsg !== "" && (
              <div>
                <div
                  className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md"
                  role="alert"
                >
                  <div className="text-center">
                    <p className="font-bold"> Congratulations!!!</p>
                  </div>
                  <div className="flex">
                    <div className="py-1 mr-2">
                      <IoMdCheckmarkCircleOutline
                        size={30}
                        style={{ color: "#0AB942" }}
                        className="inline-flex"
                      />
                    </div>
                    <p className="text-sm">
                      Your Application has been submited.Our Customer
                      Relationship Officers will be in touch with you asap.
                      <br />
                      You can check your email for a confirmation message with
                      your details.
                    </p>
                  </div>
                </div>

                <div
                  className="font-bold text-[#FF7204] cursor-pointer"
                  onClick={handleRefreshForm}
                >
                  Reload Form{" "}
                </div>
              </div>
            )}
            {errorMsg && errorMsg !== "" && (
              <div>
                <div
                  className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md"
                  role="alert"
                >
                  <div className="text-center">
                    <p className="font-bold"> An Error Occured</p>
                  </div>
                  <div className="flex">
                    <div className="py-1 mr-2">
                      <FaRegTimesCircle
                        size={30}
                        style={{ color: "#f44a4a" }}
                        className="inline-flex ml-2"
                      />
                    </div>
                    <p className="text-sm">
                      {errorMsg?.errorMsg}
                      There have been an error in your application. Kindly
                      refresh and fill again
                    </p>
                  </div>
                </div>
                <div
                  className="font-bold text-[#FF7204] cursor-pointer"
                  onClick={handleRefreshForm}
                >
                  Reload Form{" "}
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default SignUpFormResponse;
