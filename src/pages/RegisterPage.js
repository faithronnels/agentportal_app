import React, { Fragment } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import SignUpForm from "../components/agentRegisteration/SignUpForm";
import logo from "../assets/images/mblogo.png";

const RegisterPage = () => {
  return (
    <Fragment>
      <main
        className="relative bg-[#ffffff]  bg-fixed bg-contain bg-center  bg-no-repeat bg-origin-content "
        style={{
          backgroundImage: `url(${logo})`,
        }}
      >
        {" "}
        {/* <div className=" bg-gradient-to-t from-[#fffffffa] via-[#fffffff6] to-[#ffffffed]    "> */}
        <div className=" bg-gradient-to-tl from-[#fffffffa] to-[#f5f2f2f3]    ">
          <section
            className="flex flex-col lg:flex-row justify-around max-w-[1240px] mx-auto pt-2 md:pt-5  max-h-full 
     "
          >
            {" "}
            <div className=" lg:min-w-[48%] shadow-xl p-2 md:p-6  lg:h-[900px] ">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center md:text-left text-[#FF7204]">
                Required Documents
              </h1>
              <h2 className="text-xl  md:text-2xl font-bold text-center my-2">
                For Agent
              </h2>
              <ul className="text-[1.01rem]">
                <li>
                  {" "}
                  <IoIosCheckmarkCircle
                    size={15}
                    style={{ color: "#0AB942" }}
                    className="inline-flex mr-2"
                  />
                  Passport Photograph
                </li>
                <li>
                  {" "}
                  <IoIosCheckmarkCircle
                    size={15}
                    style={{ color: "#0AB942" }}
                    className="inline-flex mr-2"
                  />
                  Bank Statement (2 months,signed and stamped by your bank)
                </li>
                <li>
                  {" "}
                  <IoIosCheckmarkCircle
                    size={15}
                    style={{ color: "#0AB942" }}
                    className="inline-flex mr-2"
                  />
                  Utility Bill(not later than 3 months from time of
                  registration)
                </li>
                <li>
                  {" "}
                  <IoIosCheckmarkCircle
                    size={15}
                    style={{ color: "#0AB942" }}
                    className="inline-flex mr-2"
                  />
                  Valid Identity Card (Driver's License, International
                  passport,Voters Card or National ID card)
                </li>
                <li>
                  {" "}
                  <IoIosCheckmarkCircle
                    size={15}
                    style={{ color: "#0AB942" }}
                    className="inline-flex mr-2"
                  />
                  Selfie photo holding a valid ID card
                </li>
                <li>
                  {" "}
                  <IoIosCheckmarkCircle
                    size={15}
                    style={{ color: "#0AB942" }}
                    className="inline-flex mr-2"
                  />
                  Proof of Deposit
                </li>
                <li>
                  {" "}
                  <IoIosCheckmarkCircle
                    size={15}
                    style={{ color: "#0AB942" }}
                    className="inline-flex mr-2"
                  />
                  Files for upload should be less than 800kb each.
                </li>
              </ul>
              <h2 className="text-xl  md:text-2xl font-bold text-center my-2">
                For Guarantors
              </h2>
              <ul className="text-[1.01rem]">
                <li>
                  {" "}
                  <IoIosCheckmarkCircle
                    size={15}
                    style={{ color: "#0AB942" }}
                    className="inline-flex mr-2"
                  />
                  Guarantor Form
                </li>
                <li>
                  {" "}
                  <IoIosCheckmarkCircle
                    size={15}
                    style={{ color: "#0AB942" }}
                    className="inline-flex mr-2"
                  />
                  Work ID card(if available)
                </li>
                <li>
                  {" "}
                  <IoIosCheckmarkCircle
                    size={15}
                    style={{ color: "#0AB942" }}
                    className="inline-flex mr-2"
                  />
                  Utility Bill
                </li>
                <li>
                  {" "}
                  <IoIosCheckmarkCircle
                    size={15}
                    style={{ color: "#0AB942" }}
                    className="inline-flex mr-2"
                  />
                  Valid Identity Card (Driver's License, International
                  passport,Voters Card or National ID card)
                </li>
              </ul>
              <div>
                <h2 className="text-xl  md:text-2xl font-bold text-center my-2">
                  Bank Details
                </h2>
                <div className="flex flex-col md:flex-row justify-around text-[1.01rem]">
                  <div className="py-3">
                    <p className="text-center ">
                      <span className="font-bold">
                        First Bank of Nigeria LTD
                      </span>{" "}
                      <br /> Merrybet Gold LTD
                      <br /> 2023676761
                    </p>
                  </div>
                  <div className="py-3">
                    {" "}
                    <p className="text-center ">
                      <span className="font-bold">Zenith Bank PLC</span> <br />{" "}
                      Merrybet Gold LTD
                      <br /> 1013182198
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" lg:min-w-[48%] p-2 md:p-6  mx-auto ">
              <SignUpForm />
            </div>
          </section>
        </div>
      </main>
    </Fragment>
  );
};

export default RegisterPage;
