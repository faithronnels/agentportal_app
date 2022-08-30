import React, { Fragment, useEffect, useRef } from "react";
import { AiOutlineFire } from "react-icons/ai";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import add from "../assets/images/mb-ad-online.png";
import logo from "../assets/images/mblogo.png";

const HomePage = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        `agent for free!`,
        "earn up to 40% on stake per ticket!!",
        "earn up to 3% profit on top-up sales!",
        "earn bi-weekly bonus!",
      ], // Strings to display
      // Speed settings, try diffrent values untill you get good results
      startDelay: 300,
      typeSpeed: 120,
      backSpeed: 140,

      smartBackspace: false,
      loop: true,
      showCursor: false,
    });

    // Destropying
    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <Fragment>
      <main className="flex flex-col relative pt-2 md:pt-5">
        <section className="relative grid md:grid-cols-2 justify-between items-center max-w-[1240px] mx-auto    mt-10  ">
          <div className="min-h-[20rem] sm:min-h-[22rem] md:min-h-full pl-3 pr-3  md:pr-0  bg-transparent  z-20 ">
            <img
              src={add}
              alt="tradefada"
              className=" mt-5 md:mt-[-5%] bg-[#fbfbfb]  "
            />
          </div>
          <div className=" bg-gradient-to-t from-[#FF7204] via-[#fe9402] to-[#fbfbfb] text-[#ffffff] min-h-[200px] drop-shadow-xl flex justify-center items-center pr-4 md:pr-5 md:ml-[-2%] ">
            <p className="  text-xl sm:text-2xl md:text-3xl    font-bold text-center px-3 ">
              Register as a merrybet{" "}
              <span ref={el} className="md:text-3xl  sm:test-4xl   px-2">
                {" "}
              </span>
              <AiOutlineFire
                size={30}
                style={{ color: "white" }}
                className="inline-flex "
              />
            </p>
          </div>
        </section>{" "}
        <section className="grid grid-cols-1 max-w-[1240px] mx-auto p-6 md:p-10 ">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center md:text-left">
            Requirements
          </h1>
          <p className="text-2xl ">
            Our agents are required to have the following to be able to tap in
            fully to our offers
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 my-5 text-l">
            <div className="py-5 md:px-3 text-left">
              {" "}
              <ul>
                <li>
                  <IoMdCheckmarkCircleOutline
                    size={15}
                    style={{ color: "#FF7204" }}
                    className="inline-flex mx-2"
                  />
                  An office space or shop
                </li>
                <li>
                  <IoMdCheckmarkCircleOutline
                    size={15}
                    style={{ color: "#FF7204" }}
                    className="inline-flex mx-2"
                  />
                  A Desktop or Laptop with over 1GB ram
                </li>
                <li>
                  <IoMdCheckmarkCircleOutline
                    size={15}
                    style={{ color: "#FF7204" }}
                    className="inline-flex mx-2"
                  />
                  An office printer to print daily games
                </li>
                <li>
                  <IoMdCheckmarkCircleOutline
                    size={15}
                    style={{ color: "#FF7204" }}
                    className="inline-flex mx-2"
                  />
                  A thermal Printer for printing gaming receipt
                </li>
                <li>
                  <IoMdCheckmarkCircleOutline
                    size={15}
                    style={{ color: "#FF7204" }}
                    className="inline-flex mx-2"
                  />
                  A required first deposit of N20,000. N10,000 will be funded to
                  the Betting shop account and N10,000 will be funded to the
                  Virtual account as soon as they are created
                </li>
              </ul>
            </div>
            <div className="py-3 md:px-3">
              {" "}
              <h3 className=" text-l md:text-2xl font-extrabold text-center md:text-left">
                VIRTUAL SPORTS REQUIREMENT HARDWARE
              </h3>
              <p>
                {" "}
                STRONG HD DECODER (preferable) OR PRIME JOY DECODER OR ASTRA
                DECODER on ABS3A @3 degrees west KU3 beam with CPE parameter
                below
              </p>
              <ul>
                <li>
                  <IoMdCheckmarkCircleOutline
                    size={15}
                    style={{ color: "#FF7204" }}
                    className="inline-flex md:mx-2"
                  />
                  Frequency----------------11168
                </li>
                <li>
                  <IoMdCheckmarkCircleOutline
                    size={15}
                    style={{ color: "#FF7204" }}
                    className="inline-flex md:mx-2"
                  />
                  Symbol Rate-------------30000m/s
                </li>
                <li>
                  <IoMdCheckmarkCircleOutline
                    size={15}
                    style={{ color: "#FF7204" }}
                    className="inline-flex md:mx-2"
                  />
                  Polarization--------------Horizontal
                </li>
                <li>
                  <IoMdCheckmarkCircleOutline
                    size={15}
                    style={{ color: "#FF7204" }}
                    className="inline-flex md:mx-2"
                  />
                  Longitude ----------------3 degrees west{" "}
                </li>
                <li>
                  <IoMdCheckmarkCircleOutline
                    size={15}
                    style={{ color: "#FF7204" }}
                    className="inline-flex md:mx-2"
                  />
                  90cm - 1m Dish
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section
          className=" bg-scroll bg-contain bg-center bg-no-repeat bg-origin-content border-t-4 border-[#0ab9415f] "
          style={{
            backgroundImage: `url(${logo})`,
          }}
        >
          <div className="bg-gradient-to-r from-[#FF7204] via-[#f89d57b3] to-[#FF7204] ">
            <div className="">
              <div className="grid grid-cols-1 max-w-[1240px] mx-auto  text-3xl p-6 md:p-10 ">
                <h1 className=" text-3xl md:text-4xl font-extrabold  text-center md:text-left text-[#FBFBFB]">
                  Become an Agent
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-4 my-5 text-l">
                  <div className="md:col-span-3 py-5 px-3">
                    {" "}
                    <p className="text-xl text-[#FBFBFB]">
                      To become a Merrybet agent, please click the sign up
                      button and fill the form and we would contact you shortly.
                      For more information, kindly call the Agent registration
                      line on 08130741625.
                    </p>
                  </div>
                  <div className=" md:col-span-1  py-3  px-2 md:px-4 ">
                    <Link to="signup">
                      {" "}
                      <div className="bg-[#fbfbfb] text-[#FF7204]  py-3  text-xl font-bold shadow-md  border-[3px] border-transparent hover:text-[#fbfbfb] hover:bg-transparent hover:border-[#fbfbfb] text-center rounded-md">
                        Agent Sign up
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default HomePage;
