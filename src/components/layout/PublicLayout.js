import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Navbar from "./header/Navbar";

const PublicLayout = () => {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default PublicLayout;
