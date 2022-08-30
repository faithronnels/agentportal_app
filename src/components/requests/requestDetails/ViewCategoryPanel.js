import React from "react";
import {
  CancelBetSlip,
  OtherIssues,
  ChangeBankInfo,
  TopUpReversalAccount,
  OwnershipTransfer,
  ShopCreditReversal,
  ShopPassword,
  ShopVerification,
  ActivateDeactivateAccount,
  ClosedAccountDetails,
} from "./CategoryPanels";

let viewPanel;
const ViewCategoryPanel = ({ data }) => {
  switch (data.category) {
    case "cancelling betslip":
      viewPanel = <CancelBetSlip betslipData={data.betslipData} />;
      break;
    case "other issues":
      if (data.fileUploadData) {
        viewPanel = <OtherIssues fileUploadData={data.fileUploadData} />;
      }
      break;
    case "change bank details":
      viewPanel = <ChangeBankInfo BankData={data.BankData} />;

      break;
    case "top up reversal":
      viewPanel = (
        <TopUpReversalAccount
          fileUploadData={data.fileUploadData ? data.fileUploadData : null}
          TopUpReversalData={data.TopUpReversalData}
        />
      );
      break;
    case "transfer of account ownership":
      viewPanel = (
        <OwnershipTransfer
          transferOfAccountOwnershipData={data.transferOfAccountOwnershipData}
          fileUploadData={data.fileUploadData}
        />
      );
      break;
    case "shop credit reversal":
      data.ClosedAccountDetailsshowRequestDetails = (
        <ShopCreditReversal
          fileUploadData={data.fileUploadData ? data.fileUploadData : null}
          ShopCreditReversalData={data.ShopCreditReversalData}
        />
      );
      break;
    case "change of password":
      viewPanel = (
        <ShopPassword ShopChangeOfPassword={data.ShopChangeOfPassword} />
      );
      break;
    case "activate / deactivate account":
      viewPanel = (
        <ActivateDeactivateAccount
          activateDeactivateAccountData={data.activateDeactivateAccountData}
        />
      );
      break;
    case "agent shop verification":
      viewPanel = (
        <ShopVerification
          fileUploadData={data.fileUploadData ? data.fileUploadData : null}
          shopVerificationData={data.shopVerificationData}
        />
      );
      break;
    case "closed accounts":
      viewPanel = (
        <ClosedAccountDetails ClosedAccountsData={data.ClosedAccountsData} />
      );
      break;
    default:
      viewPanel = null;
  }
  return <div>{viewPanel}</div>;
};

export default ViewCategoryPanel;
