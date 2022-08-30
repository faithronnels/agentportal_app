import React, { Fragment } from "react";
import ViewCategoryPanel from "./ViewCategoryPanel";
import { useAuthState } from "../../../redux/selectors/index";
import EditRequest from "./EditRequest";

const RequestDetails = (props) => {
  const authState = useAuthState();
  const { currentUser } = authState;
  const { selectedRow, setShowModal, handleReloadPage,  } = props;

  return (
    <div className="bg-gradient-to-tl from-[#fffffffa] to-[#f5f2f2f3] overflow-y-auto ">
      <div className="flex flex-row justify-end  relative cursor-pointer">
        <div
          className="absolute rounded-full text-[#FF7204] p-3 font-bold"
          onClick={() => setShowModal(false)}
        >
          X
        </div>
      </div>
      <div className="p-3 ">
        <h3 className="font-bold text-center py-2 uppercase">
          {selectedRow.category}
        </h3>
        <p className="py-1 ">
          <strong>Resolution Status: </strong>
          <span
            className={`font-bold ${
              selectedRow.resolved === "Y" ? "text-green-600" : "text-red-600"
            }
                    `}
          >
            {selectedRow.resolved === "Y" ? "Resolved" : "Unresolved"}
          </span>
        </p>
        <p className="py-1">
          <label className="font-bold">Agent Username: </label>{" "}
          <span>{selectedRow.agentUsername}</span>
        </p>
        <p className="py-1">
          <label className="font-bold">Reference No:</label>{" "}
          <span>{selectedRow.refNum}</span>
        </p>
        <p className="py-1">
          <label className="font-bold">Request Date:</label>{" "}
          <span>{selectedRow.requestDate}</span>
        </p>
        {selectedRow.requestComment && (
          <p className="py-1">
            <label className="font-bold">Request Comment:</label>{" "}
            <span>{selectedRow.requestComment}</span>
          </p>
        )}
        <p className="py-1">
          <label className="font-bold ">Principal Agent Username:</label>{" "}
          <span className="ml-1">{selectedRow.pagentUsername}</span>
        </p>{" "}
        <p className="py-1">
          <label className="font-bold ">Email Id:</label>{" "}
          <span className="ml-1">{selectedRow.pagentEmail}</span>
        </p>
        <hr className="my-2" />
        <h4 className="font-bold text-center ">Request Details</h4>
        <ViewCategoryPanel data={selectedRow} />
        {selectedRow.resolved === "Y" && (
          <Fragment>
            <hr className="my-2" />
            <h4 className="font-bold text-center py-2">Resolution Info</h4>
            <div className="flex flex-row justify-between">
              <p className="py-1">
                <label className="font-bold ">Resolution Date:</label>{" "}
                <span className="ml-1">
                  {" "}
                  {selectedRow.itVerificationDate
                    ? selectedRow.itVerificationDate
                    : selectedRow.csuVerificationDate}
                </span>
              </p>

              {selectedRow.resolutionComment && (
                <p className="py-1">
                  <label className="font-bold ">Resolution Comment:</label>{" "}
                  <span className="ml-1"> {selectedRow.resolutionComment}</span>
                </p>
              )}
            </div>
          </Fragment>
        )}
        {selectedRow.resolved === "N" && selectedRow.resolutionComment && (
          <Fragment>
            <h4 className="font-bold text-center py-2">Resolution Info</h4>
            <p className="py-1">
              <label className="font-bold ">Resolution Comment:</label>{" "}
              <span className="ml-1"> {selectedRow.resolutionComment}</span>
            </p>
          </Fragment>
        )}
        <br />
        {selectedRow.csuName && currentUser.Is_principal_agent === "false" && (
          <div className="flex flex-row justify-between">
            <p className="py-1">
              <label className="font-bold ">CSU Name:</label>{" "}
              <span className="ml-1"> {selectedRow.csuName}</span>
            </p>
            <p className="py-1">
              <label className="font-bold ">CSU Verification Date:</label>{" "}
              <span className="ml-1"> {selectedRow.csuVerificationDate}</span>
            </p>
          </div>
        )}
        {selectedRow.csuComment && currentUser.Is_principal_agent === "false" && (
          <p className="py-1">
            <label className="font-bold ">CSU Comment:</label>{" "}
            <span className="ml-1"> {selectedRow.csuComment}</span>
          </p>
        )}
        {selectedRow.itName && currentUser.Is_principal_agent === "false" && (
          <Fragment>
            <hr className="my-2" />
            <p className="py-1">
              <label className="font-bold ">IT Support Name:</label>{" "}
              <span className="ml-1"> {selectedRow.itName}</span>
            </p>
            <p className="py-1">
              <label className="font-bold ">IT Verification Date:</label>{" "}
              <span className="ml-1"> {selectedRow.itVerificationDate}</span>
            </p>
          </Fragment>
        )}
        {selectedRow.itComment && currentUser.Is_principal_agent === "false" && (
          <p className="py-1">
            <label className="font-bold ">IT Comment:</label>{" "}
            <span className="ml-1"> {selectedRow.itComment}</span>
          </p>
        )}
        {selectedRow.resolved === "N" &&
          currentUser.Is_principal_agent === "false" && (
            <EditRequest
              currentUser={selectedRow}
              selectedRow={selectedRow}
              handleReloadPage={handleReloadPage}
              setShowModal={setShowModal}
             
            />
          )}
      </div>
    </div>
  );
};

export default RequestDetails;
