import React, { Fragment } from "react";

import ModalImage from "../../commons/ModalImage/ModalImage";

export const CancelBetSlip = ({ betslipData }) => {
  return (
    <Fragment>
      <p className="py-1">
        <label className="font-bold ">BetSlip Number:</label>{" "}
        <span className="ml-1">{betslipData[0].betslip_number}</span>
      </p>
    </Fragment>
  );
};
export const ChangeBankInfo = ({ BankData }) => {
  const {
    currentAccountName,
    currentAccountNum,
    currentBank,
    newAccountName,
    newAccountNum,
    newBank,
  } = BankData[0];
  return (
    <Fragment>
      <p className="font-bold text-[#FF7204] py-1">Current Bank Details</p>
      <div className="flex flex-col md:flex-row justify-between">
        <p className="py-1">
          <label className="font-bold ">Bank Name:</label>{" "}
          <span className="ml-1"> {currentBank}</span>
        </p>
        <p className="py-1">
          <label className="font-bold ">Account Number: </label>{" "}
          <span className="ml-1"> {currentAccountNum}</span>
        </p>
      </div>
      <p className="py-1">
        <label className="font-bold ">Account Name: </label>{" "}
        <span className="ml-1"> {currentAccountName}</span>
      </p>

      <p className="font-bold text-[#FF7204] py-1">New Bank Details</p>
      <div className="flex flex-row justify-between">
        <p className="py-1">
          <label className="font-bold ">Bank Name: </label>{" "}
          <span className="ml-1"> {newBank}</span>
        </p>
        <p className="py-1">
          <label className="font-bold ">Account Number:</label>{" "}
          <span className="ml-1"> {newAccountNum}</span>
        </p>
      </div>
      <p className="py-1">
        <label className="font-bold ">Account Name:</label>{" "}
        <span className="ml-1"> {newAccountName}</span>
      </p>
    </Fragment>
  );
};
export const TopUpReversalAccount = ({ TopUpReversalData, fileUploadData }) => {
  const { reversalAccount, reversalAmount, reversalDate } =
    TopUpReversalData[0];
  return (
    <Fragment>
      <div className="flex flex-row justify-between">
        <p className="py-1">
          <label className="font-bold ">Reversal Account:</label>{" "}
          <span className="ml-1"> {reversalAccount}</span>
        </p>
        <p className="py-1">
          <label className="font-bold ">Reversal Amount:</label>{" "}
          <span className="ml-1"> {reversalAmount}</span>
        </p>
      </div>
      <p className="py-1">
        <label className="font-bold ">Reversal Date:</label>{" "}
        <span className="ml-1"> {reversalDate}</span>
      </p>

      {fileUploadData && (
        <Fragment>
          <div className="mt-4">
            <div className="h-[150px] w-[150px] m-auto cursor-pointer  border-2 border-solid  border-[#fff8dc] p-2 shadow-md  shadow-[#00000033] hover:shadow-[#00000033] ease-in-out duration-300 ">
              <ModalImage
                src={fileUploadData[0].fileName}
                alt={fileUploadData[0].fileDescription}
                caption={fileUploadData[0].fileDescription}
                disabled={false}
                useImage
                imageClassName="h-full w-full"
              />
            </div>
            <p className="mt-2">
              <strong>Click image to view image</strong>
            </p>
          </div>
        </Fragment>
      )}

      <br />
    </Fragment>
  );
};
export const OwnershipTransfer = ({
  transferOfAccountOwnershipData,
  fileUploadData,
}) => {
  const {
    accountName,
    accountNumber,
    bankName,
    email,
    firstName,
    middleName,
    mobile,
    phoneNumber,
    shopAddress,
    shopLGA,
    shopState,
    surname,
  } = transferOfAccountOwnershipData[0];
  const { fileDescription, fileName } = fileUploadData[0];
  return (
    <Fragment>
      <div className="flex flex-row justify-between">
        <div>
          <strong>Shop Address: </strong>
          {shopAddress}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <strong>Shop State: </strong>
          {shopState}
        </div>
        <div>
          <strong>Shop LGA: </strong>
          {shopLGA}
        </div>
      </div>
      <br />
      <p className="text-center">
        <strong>New Account Owner Details</strong>
      </p>
      <div className="flex flex-row justify-between">
        <div>
          {" "}
          <strong>Name: </strong> {firstName} {middleName ? middleName : null}{" "}
          {surname}{" "}
        </div>
        <div>
          <strong>Email: </strong>
          {email}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <strong>Mobile Number: </strong>
          {mobile}
        </div>
        <div>
          <strong>Phone Number: </strong>
          {phoneNumber ? phoneNumber : null}
        </div>
      </div>
      <br />
      <p className="text-center">
        <strong>New Account Owner Bank Details</strong>
      </p>
      <div className="flex flex-row justify-between">
        <div>
          <strong>Bank Name: </strong>
          {bankName}
        </div>
        <div>
          <strong>Account Number: </strong>
          {accountNumber}
        </div>
        <div>
          <strong>Account Name: </strong>
          {accountName}
        </div>
      </div>
      <br />
      <div className="flex flex-row justify-between">
        <div>
          <div className="company-Image-div viewDetail">
            <ModalImage
              src={fileName}
              alt={fileDescription}
              caption={fileDescription}
              disabled={false}
              useImage
              imageClassName="company-image"
            />
          </div>
          <p className="mt-2">
            <strong>Click image to view {fileDescription}</strong>
          </p>
        </div>
      </div>

      <br />
    </Fragment>
  );
};
export const ShopCreditReversal = ({
  ShopCreditReversalData,
  fileUploadData,
}) => {
  const { reversalAmount, reversalDate } = ShopCreditReversalData;

  return (
    <Fragment>
      <div className="flex flex-row justify-between">
        <div>
          <strong>Reversal Amount: </strong> {reversalAmount}
        </div>
        <div>
          <strong>Reversal Date: </strong>
          {reversalDate}{" "}
        </div>
      </div>
      {fileUploadData && fileUploadData !== null && (
        <div className="flex flex-row justify-between">
          <div>
            <div className="company-Image-div viewDetail">
              <ModalImage
                src={fileUploadData[0].fileName}
                alt={fileUploadData[0].fileDescription}
                caption={fileUploadData[0].fileDescription}
                disabled={false}
                useImage
                imageClassName="company-image"
              />
            </div>
            <p className="mt-2">
              <strong>
                Click image to view {fileUploadData[0].fileDescription}
              </strong>
            </p>
          </div>
        </div>
      )}
      <br />
    </Fragment>
  );
};
export const ShopPassword = ({ ShopChangeOfPassword }) => {
  const { accountType, newPassword, oldPassword } = ShopChangeOfPassword[0];
  return (
    <Fragment>
      <div className="flex flex-row justify-between">
        <div>
          <strong>Account Type: </strong>
          {accountType}
        </div>
        <div>
          <strong>Old Paasword: </strong>
          {oldPassword}
        </div>
        <div>
          <strong>New Password: </strong>
          {newPassword}
        </div>
      </div>
      <br />
    </Fragment>
  );
};
export const ActivateDeactivateAccount = ({
  activateDeactivateAccountData,
}) => {
  const { shopAddress, shopLGA, shopState } = activateDeactivateAccountData[0];
  return (
    <Fragment>
      <div className="flex flex-row justify-between">
        <div>
          <strong>Shop Address: </strong>
          {shopAddress}
        </div>
        <div>
          <strong>Shop State</strong>
          {shopState}
        </div>
        <div>
          <strong>Shop LGA: </strong>
          {shopLGA}
        </div>
      </div>
      <br />
    </Fragment>
  );
};
export const ShopVerification = ({ shopVerificationData, fileUploadData }) => {
  const { phoneNum, shopAddress, shopLGA, shopState } = shopVerificationData[0];

  return (
    <Fragment>
      <div className="flex flex-row justify-between">
        <div>
          <strong>Shop Address: </strong>
          {shopAddress}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <strong>Shop State: </strong>
          {shopState}
        </div>
        <div>
          <strong>Shop LGA: </strong>
          {shopLGA}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <strong>Phone Number: </strong>
          {phoneNum}
        </div>
      </div>
      <br />
      {fileUploadData !== null && (
        <div className="flex flex-row justify-between">
          <div>
            <div className="company-Image-div viewDetail">
              <ModalImage
                src={fileUploadData[0].fileName}
                alt={fileUploadData[0].fileDescription}
                caption={fileUploadData[0].fileDescription}
                disabled={false}
                useImage
                imageClassName="company-image"
              />
            </div>
            <p className="mt-2">
              <strong>
                Click image to view {fileUploadData[0].fileDescription}
              </strong>
            </p>
          </div>
          <div>
            <div className="company-Image-div viewDetail">
              <ModalImage
                src={fileUploadData[1].fileName}
                alt={fileUploadData[1].fileDescription}
                caption={fileUploadData[1].fileDescription}
                disabled={false}
                useImage
                imageClassName="company-image"
              />
            </div>
            <p className="mt-2">
              <strong>
                Click image to view {fileUploadData[1].fileDescription}
              </strong>
            </p>
          </div>
        </div>
      )}
      <br />
    </Fragment>
  );
};
export const ClosedAccountDetails = ({ ClosedAccountsData }) => {
  const { closedLoginsNames, numberOfCashierAccount, numberOfShops } =
    ClosedAccountsData[0];
  const namesp = closedLoginsNames.split(",");
  const names = namesp.map((name, index) => <li key={index}>{name}</li>);
  return (
    <Fragment>
      <div className="flex flex-row justify-between">
        <div>
          <strong>Number of Shops: </strong>
          {numberOfShops}
        </div>
        <div>
          <strong>Number of Cashier Account: </strong>
          {numberOfCashierAccount}{" "}
        </div>
      </div>
      <br />
      <div className="flex flex-row justify-between">
        <div>
          <strong>Closed Login Names</strong>
          <ul> {names}</ul>
        </div>
      </div>
      <br />
    </Fragment>
  );
};
export const OtherIssues = ({ fileUploadData }) => {
  const { fileDescription, fileName } = fileUploadData[0];
  return (
    <Fragment>
      <div className="flex flex-row justify-between">
        <div>
          <div className="company-Image-div viewDetail">
            <ModalImage
              src={fileName}
              alt={fileDescription}
              caption={fileDescription}
              disabled={false}
              useImage
              imageClassName="company-image"
            />
          </div>
          <p className="mt-2">
            <strong>Click image to view {fileDescription}</strong>
          </p>
        </div>
      </div>
      <br />
    </Fragment>
  );
};
