import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import CopyRightFooter from "../components/layout/footer/CopyRightFooter";
import SideBar from "../components/layout/SideBar";

const ProtectedLayout = () => {
  return (
    <Fragment>
      <main className=" relative bg-fixed bg-contain bg-center  bg-no-repeat bg-origin-content h-[87vh] pt-10">
        <SideBar />
        <section
          className="flex flex-col  justify-around  max-w-[1240px] mx-auto p-6     
     "
        >
          <div className=" min-h-[300px] md:min-h-[370px] pt-12">
            <Outlet />
          </div>
          <div className="mt-[9vh] md:mt-[32vh] ">
            {" "}
            <CopyRightFooter />
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default ProtectedLayout;
