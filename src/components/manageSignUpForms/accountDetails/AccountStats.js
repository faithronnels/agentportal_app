import React, { Fragment } from "react";

const AccountStats = ({ agentInfo, handleCloseModal }) => {
  return (
    <Fragment>
      {" "}
      <div className=" bg-[#fbfbfb] pb-8">
        <div className="flex flex-row justify-end  relative cursor-pointer">
          <div
            className="absolute rounded-full text-[#FF7204] p-3 font-bold"
            onClick={() => handleCloseModal(false)}
          >
            X
          </div>
        </div>
        <div className="w-[98%]  p-2   mx-auto my-3 ">
          <h2 className="text-xl  md:text-2xl font-bold text-center mb-4 ">
            Account Stats
          </h2>

          <div className="grid grid-cols-2 gap-2  py-1">
            <span className="font-bold ml-2"> Account Creation Status: </span>
            <span>
              {" "}
              {agentInfo.accountCreationStatus
                ? agentInfo.accountCreationStatus
                : "Pending"}
            </span>
          </div>

          <div className="grid grid-cols-1 text-[#FF9800] py-1">
            <span className="font-bold ml-2"> CSU</span>
          </div>
          <div className="grid grid-cols-2 gap-2  py-1">
            <p className="font-bold ml-2"> Commision Plan:</p>
            <p>{agentInfo.commissionPlan} </p>
          </div>
          <div className="grid grid-cols-2 gap-2  py-1">
            <span className="font-bold ml-2"> CSU Approving Staff:</span>
            <span>{agentInfo.csuApprovingStaffName} </span>
          </div>
          <div className="grid grid-cols-2 gap-2   py-1">
            <span className="font-bold ml-2">
              {" "}
              CSU Approving Staff Comment:
            </span>
            <span>{agentInfo.csuApprovingStaffComment} </span>
          </div>
          <div className="grid grid-cols-1 text-[#FF9800] py-1">
            <span className="font-bold ml-2"> Payment Verification</span>
          </div>
          <div className="grid grid-cols-2 gap-2   py-1">
            <span className="font-bold ml-2">
              {" "}
              Deposit Verified By Accountant:
            </span>
            <span>{agentInfo.accountantName}</span>
          </div>
          <div className="grid grid-cols-2 gap-2   py-1">
            <span className="font-bold ml-2">Date Verified:</span>
            <span>{agentInfo.accountVerificationDate}</span>
          </div>
          <div className="grid grid-cols-2 gap-2   py-1">
            <span className="font-bold ml-2"> Accountant's Remark:</span>
            <span>{agentInfo.accountantRemark}</span>
          </div>
          <div className="grid grid-cols-2 gap-2   py-1">
            <span className="font-bold ml-2"> Deposit Confirmation:</span>
            <span>{agentInfo.paymentStats}</span>
          </div>
          <div className="grid grid-cols-2 gap-2   py-1">
            <span className="font-bold ml-2">
              {" "}
              Payment Verification Status:
            </span>
            <span>{agentInfo.accountApprovalStatus}</span>
          </div>
          <div className="grid grid-cols-1 gap-2   py-1 my-1">
            <span className="font-bold text-[#FF9800]"> Funding Account</span>
          </div>
          <div className="grid grid-cols-2 gap-2   py-1">
            <span className="font-bold ml-2"> Bank Remark:</span>
            <span>{agentInfo.accountBankRemark}</span>
          </div>
          <div className="grid grid-cols-2 gap-2   py-1">
            <span className="font-bold ml-2"> MB Bank Funded:</span>
            <span>{agentInfo.accountBankName}</span>
          </div>
          <div className="grid grid-cols-1 text-[#FF9800]  py-1">
            <span className="font-bold ml-2"> Account Creation:</span>
          </div>
          <div className="grid grid-cols-2 gap-2   py-1">
            <span className="font-bold ml-2"> Account Creation Comment:</span>
            <span>{agentInfo.accountCreationRemark}</span>
          </div>
          <div className="grid grid-cols-2 gap-2   py-1">
            <span className="font-bold ml-2"> Account Created By:</span>
            <span>{agentInfo.createdBy}</span>
          </div>
          <div className="grid grid-cols-2 gap-2   py-1">
            <span className="font-bold ml-2"> Account Creation Date:</span>
            <span>{agentInfo.creationDate}</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AccountStats;
