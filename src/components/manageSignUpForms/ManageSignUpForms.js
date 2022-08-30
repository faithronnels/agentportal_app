import React, { Fragment } from "react";
import { useAuthState } from "../../redux/selectors";
import AccountCreation from "./AccountCreation";
import InitialFormVerification from "./InitialFormVerification";
import PaymentVerification from "./PaymentVerification";

const ManageSignUpForms = () => {
  const authState = useAuthState();
  const { currentUser } = authState;
 

  return (
    <Fragment>
      {(currentUser?.roleDescription === "CSU" ||
        currentUser?.roleDescription === "CSU Admin") && (
        <InitialFormVerification />
      )}
      {currentUser?.roleDescription === "Account" && <PaymentVerification />}
      {currentUser?.roleDescription === "IT" && <AccountCreation />}
    </Fragment>
  );
};

export default ManageSignUpForms;
