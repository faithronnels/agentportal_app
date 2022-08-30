import React, { useState } from "react";
import { GiWallet } from "react-icons/gi";
import AgentDocuments from "./AgentDocuments";
import BankInfo from "./BankInfo";
import Biography from "./Biography";
import BusinessInfo from "./BusinessInfo";
import FormSummary from "./FormSummary";
import GuarantorDocuments from "./GuarantorDocuments";
import PaymentInfo from "./PaymentInfo";
import PersonalInfo from "./PersonalInfo";
import SignUpFormResponse from "./SignUpFormResponse";

const SignUpForm = () => {
  const [regForm, setRegForm] = useState({
    firstname: "",
    surname: "",
    middlename: "",
    title: "",
    gender: "",
    dob: "",
    religion: "",
    stateOfOrigin: "",
    originLga: "",
    email: "",
    mobileNumber: "",
    phoneNumber: "",
    residentialAddress: "",
    residentialState: "",
    residentialLga: "",
    agentExist: "",
    existingShopName: "",
    newShopDetails: [{ username: "", password: "" }],
    businessAddress: "",
    businessState: "",
    businessLga: "",
    informationMedium: "",
    otherInfoMedium: "",
    referralName: "",
    referralContact: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    passportImage: null,
    paymentProofImage: null,
    bankStatementImage: null,
    utilityBillImage: null,
    agentIdCardImage: null,
    selfieImage: null,
    guarantorFormImage: null,
    guarantorWorkIdCardImage: null,
    guarantorUtilityBillImage: null,
    guarantorValidIdCardImage: null,
    depositorName: "",
    depositAmount: "",
    merrybetBank: "",
    depositDate: "",
    depositComment: "",
    agreementCheck: "",
  });
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  function handleClearReg() {
    setRegForm({
      firstname: "",
      surname: "",
      middlename: "",
      title: "",
      gender: "",
      dob: "",
      religion: "",
      stateOfOrigin: "",
      originLga: "",
      email: "",
      mobileNumber: "",
      phoneNumber: "",
      residentialAddress: "",
      residentialState: "",
      residentialLga: "",
      agentExist: "",
      existingShopName: "",
      newShopDetails: [{ username: "", password: "" }],
      businessAddress: "",
      businessState: "",
      businessLga: "",
      informationMedium: "",
      otherInfoMedium: "",
      referralName: "",
      referralContact: "",
      bankName: "",
      accountName: "",
      accountNumber: "",
      passportImage: null,
      paymentProofImage: null,
      bankStatementImage: null,
      utilityBillImage: null,
      agentIdCardImage: null,
      selfieImage: null,
      guarantorFormImage: null,
      guarantorWorkIdCardImage: null,
      guarantorUtilityBillImage: null,
      guarantorValidIdCardImage: null,
      depositorName: "",
      depositAmount: "",
      merrybetBank: "",
      depositDate: "",
      depositComment: "",
      agreementCheck: "",
    });
  }
  function nextStep(level) {
    setStep(step + level);
  }
  function previousStep(level, negate) {
    step === 1 ? setStep(1) : setStep(step - level);
    setProgress(progress - negate);
  }
  function handleProgress(progressValue) {
    setProgress(progress + progressValue);
  }
  function handleRefreshForm() {
    setStep(1);
    setProgress(0);
    handleClearReg();
  }
  return (
    <div>
      <h2 className="text-xl  md:text-2xl font-bold text-center my-3 md:my-0">
        {" "}
        Sign Up to become an Agent today{" "}
        <GiWallet
          size={45}
          style={{ color: "#0AB942" }}
          className="inline-flex mr-2"
        />{" "}
      </h2>

      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-4">
        <div
          className="bg-[#0AB942] text-[0.5rem] font-medium text-blue-100 text-center  p-[0.2px] leading-none rounded-full"
          style={{ width: `${progress}%` }}
        >
          {" "}
          {progress}%
        </div>
      </div>

      <div className="my-4 ">
        <div className="grid grid-cols-1 gap-6 ">
          {step === 1 && (
            <Biography
              nextStep={nextStep}
              handleProgress={handleProgress}
              setRegForm={setRegForm}
              regForm={regForm}
            />
          )}
          {step === 2 && (
            <PersonalInfo
              nextStep={nextStep}
              previousStep={previousStep}
              handleProgress={handleProgress}
              setRegForm={setRegForm}
              regForm={regForm}
            />
          )}
          {step === 3 && (
            <BusinessInfo
              nextStep={nextStep}
              previousStep={previousStep}
              handleProgress={handleProgress}
              setRegForm={setRegForm}
              regForm={regForm}
            />
          )}
          {step === 4 && (
            <BankInfo
              nextStep={nextStep}
              previousStep={previousStep}
              handleProgress={handleProgress}
              setRegForm={setRegForm}
              regForm={regForm}
            />
          )}
          {step === 5 && (
            <AgentDocuments
              nextStep={nextStep}
              previousStep={previousStep}
              handleProgress={handleProgress}
              setRegForm={setRegForm}
              regForm={regForm}
            />
          )}
          {step === 6 && (
            <GuarantorDocuments
              nextStep={nextStep}
              previousStep={previousStep}
              handleProgress={handleProgress}
              setRegForm={setRegForm}
              regForm={regForm}
            />
          )}
          {step === 7 && (
            <PaymentInfo
              nextStep={nextStep}
              previousStep={previousStep}
              handleProgress={handleProgress}
              setRegForm={setRegForm}
              regForm={regForm}
            />
          )}
          {step === 8 && (
            <FormSummary
              nextStep={nextStep}
              previousStep={previousStep}
              handleProgress={handleProgress}
              setRegForm={setRegForm}
              regForm={regForm}
            />
          )}
          {step === 9 && (
            <SignUpFormResponse
              handleRefreshForm={handleRefreshForm}
              setRegForm={setRegForm}
              regForm={regForm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
