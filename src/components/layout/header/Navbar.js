import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { mainMenu } from "../../commons/data/data";
import logo from "../../../assets/images/mblogo.png";
import { MainMenuTopNav, MainMenuSideBar } from "./NavMenus";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [subMenu, setSubMenu] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  const handleSubMenu = () => {
    setSubMenu(!subMenu);
  };
  const handleCloseMenu = () => {
    setNav(false);
  };

  return (
    <div className="relative h-20 ">
      <div className="fixed top-0 w-full text-[#1d1d1d] bg-[#fbfbfb] shadow-md  z-40">
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
          <div className="hidden  lg:flex">
            <MainMenuTopNav
              data={mainMenu}
              handleSubMenu={handleSubMenu}
              subMenu={subMenu}
              subMenuContainer="top-10  ease-in-out duration-500 z-20 absolute  text-sm min-w-[150px] shadow-lg bg-[#fbfbfb] "
              subMenuLinkStyle="p-2  text-[#1d1d1d] bg-[#fbfbfb]  hover:bg-[#1d1d1d] hover:text-[#fbfbfb] "
            />
          </div>
          <div onClick={handleNav} className="block lg:hidden ">
            {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
          </div>
        </div>
        {/* {nav && ( */}
        <div
          className={`fixed right-0 top-[91px] w-[65%] sm:w-[40%] h-full    text-[#1d1d1d] bg-[#fbfbfb] block lg:hidden shadow-lg  ${
            nav ? " translate-x-0 " : " translate-x-full "
          } ease-in-out duration-500`}
        >
          <div className="flex flex-col pt-5  ">
            <MainMenuSideBar
              data={mainMenu}
              handleSubMenu={handleSubMenu}
              subMenu={subMenu}
              subMenuContainer="top-10  ease-in-out duration-500 "
              subMenuLinkStyle="p-2 text-[#1d1d1d] bg-[#fbfbfb]  hover:bg-[#1d1d1d] hover:text-[#fbfbfb]"
              handleCloseMenu={handleCloseMenu}
              menuLinkStyle="p-2  text-[#1d1d1d] bg-[#fbfbfb]  hover:bg-[#1d1d1d] hover:text-[#fbfbfb]"
            />
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Navbar;
