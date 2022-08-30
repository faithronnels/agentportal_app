import React, { Fragment } from "react";

import logo from "../assets/images/mblogo.png";
import ForgotPassword from "../components/signin/ForgotPassword";

const ForgotPasswordPage = () => {
  return (
    <Fragment>
      <main
        className="relative bg-[#ffffff]  bg-fixed bg-contain bg-center  bg-no-repeat bg-origin-content "
        style={{
          backgroundImage: `url(${logo})`,
        }}
      >
        <div>
          <ForgotPassword />
        </div>
      </main>
   
    </Fragment>
  );
};

export default ForgotPasswordPage;
