import React, { Fragment } from "react";
import SignInForm from "../components/signin/SignInForm";
import logo from "../assets/images/mblogo.png";


const SignInPage = () => {
  return (
    <Fragment>
      <main>
        <div
          className="relative bg-[#ffffff]  bg-fixed bg-contain bg-center  bg-no-repeat bg-origin-content "
          style={{
            backgroundImage: `url(${logo})`,
          }}
        >
          <SignInForm />
        </div>
      </main>
    
    </Fragment>
  );
};

export default SignInPage;
