import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import logo from "../../assets/images/mblogo.png";
import SideBarContent from "./SideBarContent";
import { useAuthState } from "../../redux/selectors/index";

const SideBar = () => {
  const authState = useAuthState();
  const { currentUser } = authState;
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleCloseMenu = () => {
    setNav(false);
  };

  return (
    <Fragment>
      <div className="relative  ">
        <div className="fixed top-0 w-full text-[#1d1d1d] bg-[#fbfbfb] shadow-md  z-50">
          <div className="flex justify-between items-center max-w-[1240px] mx-auto p-3  relative ">
            <Link to="/" className="flex justify-between items-center">
              <img src={logo} className="h-16 " alt="logo" />
              <p className="flex flex-col px-2">
                <span className="text-3xl ">Merrybet</span>{" "}
                <span className="place-self-end text-[0.6rem]">
                  ...where champions play
                </span>
              </p>
            </Link>
            <div onClick={handleNav} className="block ">
              {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed right-0 top-[86px] w-[65%] sm:w-[40%] md:w-[30%] lg:w-[20%] h-full z-40   text-[#1d1d1d] bg-[#fbfbfb] block  shadow-lg  ${
          nav ? " translate-x-0  " : " translate-x-full "
        } ease-in-out duration-500`}
      >
        <div className="flex flex-col pt-5  ">
          <SideBarContent
            handleCloseMenu={handleCloseMenu}
            currentUser={currentUser}
          />
        </div>
      </div>

      {/* )} */}
    </Fragment>
  );
};

export default SideBar;
