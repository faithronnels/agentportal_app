import React from "react";
import { useLocation } from "react-router-dom";
import { MdOutlineNotAccessible } from "react-icons/md";

const NotAllowedPage = () => {
  let location = useLocation();
  return (
    <section className="grid grid-cols-1 max-w-[1240px] mx-auto p-6 md:p-10 ">
      <div className="flex flex-col relative pt-2 md:pt-5  justify-center "></div>
      <div className="flex flex-rox justify-center al">
        <MdOutlineNotAccessible
          size={50}
          style={{ color: "#FF7204" }}
          className="inline-flex mr-2"
        />{" "}
      </div>
      <div className="flex flex-rox justify-center al">
        <h3 className="text-[#444444] font-bold text-2xl">
          No match for <code>{location.pathname}</code>
        </h3>
      </div>
    </section>
  );
};

export default NotAllowedPage;
