import React, { Fragment } from "react";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsYoutube,
  BsWhatsapp,
} from "react-icons/bs";
import mblogowhite from "../../../assets/images/mblogo-white.png";
import CopyRightFooter from "./CopyRightFooter";

const Footer = () => {
  return (
    <Fragment>
      {" "}
      <footer
        className=" bg-scroll bg-contain bg-left bg-no-repeat bg-origin-content bg-black"
        style={{
          backgroundImage: `url(${mblogowhite})`,
        }}
      >
        <div className="bg-gradient-to-r from-[#000000f9] via-[#000000e0] to-[#000000ed]">
          <div className="">
            <div className="grid grid-cols-1 max-w-[1240px] mx-auto p-6 md:p-10  ">
              <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center md:text-left text-[#FBFBFB]">
                Get in touch with us
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-4 my-2 md:my-5 ">
                <div className="md:col-span-1 p-3 text-center">
                  {" "}
                  <p className="md:text-xl text-[#FBFBFB] font-bold mb-2">
                    Address
                  </p>
                  <p className=" text-[#FBFBFB] ">
                    Merrybet Gold Limited, Suites C 107/108, Ikota Shopping
                    Complex, Lekki-Ajah Expressway, Lagos.
                  </p>
                </div>
                <div className="md:col-span-1 p-3 text-center">
                  {" "}
                  <p className="md:text-xl text-[#FBFBFB]  font-bold mb-2">
                    Support Lines
                  </p>
                  <p className=" text-[#FBFBFB]">
                    +234-8130741625 , +234-8071828618
                  </p>
                </div>
                <div className="md:col-span-1 p-3 text-center">
                  {" "}
                  <p className="md:text-xl text-[#FBFBFB] font-bold mb-2">
                    Email
                  </p>
                  <p className="text-l text-[#FBFBFB]">support@merrybet.com</p>
                </div>
                <div className="md:col-span-1 p-3 text-center">
                  {" "}
                  <p className="md:text-xl text-[#FBFBFB] font-bold mb-2">
                    Social Media
                  </p>
                  <div className="flex justify-between text-l text-[#FBFBFB]">
                    <a
                      href="https://www.facebook.com/merrybetsports/"
                      alt="merrybet facebook"
                    >
                      <BsFacebook
                        size={25}
                        style={{ color: "white" }}
                        className="inline-flex "
                      />
                    </a>
                    <a
                      href="https://www.instagram.com/merrybetsports_/"
                      alt="merrybet instagram"
                    >
                      <BsInstagram
                        size={25}
                        style={{ color: "white" }}
                        className="inline-flex "
                      />
                    </a>
                    <a
                      href="https://twitter.com/merrybetsports"
                      alt="merrybet twitter"
                    >
                      <BsTwitter
                        size={25}
                        style={{ color: "white" }}
                        className="inline-flex "
                      />
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UCalujqIcuOfjBIPqiJXgmOw"
                      alt="merrybet youtube"
                    >
                      <BsYoutube
                        size={25}
                        style={{ color: "white" }}
                        className="inline-flex "
                      />
                    </a>
                    <a
                      href="https://api.whatsapp.com/send/?phone=2348164387525&text&type=phone_number&app_absent=0"
                      alt="merrybet whatsapp"
                    >
                      <BsWhatsapp
                        size={25}
                        style={{ color: "white" }}
                        className="inline-flex "
                      />
                    </a>
                  </div>
                </div>
              </div>
              <CopyRightFooter />
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
