import React, { Fragment } from "react";

import Profile from "../components/profile/Profile";

const ProfilePage = () => {
  return (
    <Fragment>
      {" "}
      <section
        className="flex flex-col  justify-around  max-w-[1240px] mx-auto p-6     
     "
      >
        <h1 className="text-2xl md:text-3xl font-bold text-[#344968]">
          My Profile
        </h1>

        <Profile />
      </section>
    </Fragment>
  );
};

export default ProfilePage;
