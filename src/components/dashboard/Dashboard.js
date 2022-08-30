import React, { Fragment, useEffect } from "react";
import { useAuthState } from "../../redux/selectors";
import AgentDashboard from "./AgentDashboard";
import AccountCreation from "../manageSignUpForms/AccountCreation";
import InitialFormVerification from "../manageSignUpForms/InitialFormVerification";
import PaymentVerification from "../manageSignUpForms/PaymentVerification";

const Dashboard = () => {
  const authState = useAuthState();

  const { currentUser } = authState;

  useEffect(() => {}, [currentUser]);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      <div>
        {(currentUser?.roleDescription === "CSU" ||
          currentUser?.roleDescription === "CSU Admin") && (
          <InitialFormVerification />
        )}
        {currentUser?.roleDescription === "Account" && <PaymentVerification />}
        {currentUser?.roleDescription === "IT" && <AccountCreation />}
        {currentUser?.roleDescription === "Principal Agent" && (
          <AgentDashboard />
        )}
      </div>
    </Fragment>
  );
};

export default Dashboard;
