import React, { useEffect, useState, useRef, Fragment } from "react";
import { useDispatch } from "react-redux/es/exports";
import ReactToPrint from "react-to-print";
import { useParams, useNavigate } from "react-router-dom";

import {
  BsFillCloudDownloadFill,
  BsFillPrinterFill,
  BsFileEarmarkPlay,
} from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { GoPrimitiveDot } from "react-icons/go";
import {
  MdOutlineSkipPrevious,
  MdDeleteForever,
  MdMarkChatRead,
} from "react-icons/md";
import { ImStatsBars } from "react-icons/im";

import {
  getRegistrationInfoById,
  clearAgentRegInfo,
} from "../../../redux/actions/agentRegistrationAction";
import {
  useAgentRegState,
  useAuthState,
  useUserState,
} from "../../../redux/selectors";
import { getAllUser } from "../../../redux/actions/userAction";
import Spinner from "../../commons/Spinner";
import ModalImage from "../../commons/ModalImage/ModalImage";
import { fileDownload } from "../../commons/FileDownloader";
import { RegistrationPrint } from "./RegistrationPrint";
import UpdateRegInfo from "../formProcessing/UpdateRegInfo";
import CSUVerifyPayment from "../formProcessing/CSUVerifyPayment";
import DeleteRegInfo from "../formProcessing/DeleteRegInfo";
import AccountVerifyPayment from "../formProcessing/AccountVerifyPayment";
import CSUReVerifyPayment from "../formProcessing/CSUReVerifyPayment";
import ModalComponent from "../../commons/ModalComponent";
import ITCreateAccount from "../formProcessing/ITCreateAccount";
import AccountStats from "./AccountStats";

const AccountDetails = () => {
  let { id } = useParams();
  const componentRef = useRef();
  const regState = useAgentRegState();
  const authState = useAuthState();
  const userState = useUserState();
  const history = useNavigate();

  const dispatch = useDispatch();
  const { agentsAccountInfo } = regState;
  const { currentUser } = authState;
  const { users } = userState;

  const [data, setdata] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updateRegInfoModal, setUpdateRegInfoModal] = useState(false);
  const [csuVerifyPaymentModal, setCsuVerifyPaymenModal] = useState(false);
  const [csuReVerifyPaymentModal, setCsuReVerifyPaymentModal] = useState(false);
  const [accountVerifyPaymenModal, setAccountVerifyPaymenModal] =
    useState(false);
  const [iTAccountCreationModal, setITAccountCreationModal] = useState(false);
  const [deleteRegModal, setDeleteRegModal] = useState(false);
  const [accountStatsModal, setAccountStatsModal] = useState(false);

  const handleClosingModal = () => {
    setUpdateRegInfoModal(false);
    setCsuVerifyPaymenModal(false);
    setCsuReVerifyPaymentModal(false);
    setAccountVerifyPaymenModal(false);
    setITAccountCreationModal(false);
  };
  const handleCloseDeleteModal = () => {
    setDeleteRegModal(false);

    history("/reg/new");
  };

  useEffect(() => {
    if (agentsAccountInfo === null) {
      dispatch(getRegistrationInfoById(id));
      dispatch(getAllUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (regState?.agentsAccountInfo !== null) {
      setdata(regState.agentsAccountInfo);
      setIsLoading(false);
      return () => {};
    }
  }, [regState.agentsAccountInfo]);


  const handleBackButton = () => {
    history(-1);
    dispatch(clearAgentRegInfo());
  };

  return (
    <section
      className="flex flex-col justify-around w-full mx-auto pt-2 md:pt-5   text-gray-700    
     "
    >
      <h1 className="text-2xl md:text-3xl font-bold text-[#344968]">
        Account Details
      </h1>
      {isLoading && (
        <div className="flex justify-center text-center mt-12">
          <Spinner size={40} color="#000000" />
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-col  my-auto">
          <div className="flex flex-row my-3 justify-around sm:justify-start ">
            {" "}
            <button
              className=" p-3 mx-2 text-[#ffffff] bg-[#FF7204] text-center hover:drop-shadow-xl"
              type="button"
              onClick={() => setAccountStatsModal(true)}
            >
              <ImStatsBars
                size={25}
                style={{ color: "#ffffff" }}
                className="inline-flex md:mr-2"
              />{" "}
              <span className="hidden md:inline-flex"> Account Stats</span>
            </button>{" "}
            <button
              className=" p-3 mx-2 text-[#ffffff] bg-[#FF7204] text-center hover:drop-shadow-xl"
              type="button"
              onClick={() => fileDownload(data)}
            >
              <BsFillCloudDownloadFill
                size={25}
                style={{ color: "#ffffff" }}
                className="inline-flex md:mr-2"
              />
              <span className="hidden md:inline-flex"> Documents</span>
            </button>
            <div>
              <div style={{ display: "none" }}>
                <RegistrationPrint ref={componentRef} agentInfo={data} />
              </div>
              <ReactToPrint
                trigger={() => (
                  <button
                    className=" p-3 mx-2 text-[#ffffff] bg-[#FF7204] text-center hover:drop-shadow-xl"
                    type="button"
                  >
                    <BsFillPrinterFill
                      size={25}
                      style={{ color: "#ffffff" }}
                      className="inline-flex md:mr-2"
                    />
                    <span className="hidden md:inline-flex"> Print</span>
                  </button>
                )}
                content={() => componentRef.current}
              />
            </div>
            <button
              className=" p-3 mx-2 text-[#ffffff] bg-[#FF7204] text-center hover:drop-shadow-xl"
              type="button"
              onClick={handleBackButton}
            >
              <MdOutlineSkipPrevious
                size={25}
                style={{ color: "#ffffff" }}
                className="inline-flex md:mr-2"
              />{" "}
              <span className="hidden md:inline-flex"> Go Back</span>
            </button>
          </div>
          <div>
            <h3 className="font-bold text-xl my-2">
              Reference Number: {data.refNum}
            </h3>

            <div className="grid grid-cols-1   py-1">
              <p>
                <span className="font-bold mr-2">Registration Date: </span>
                <span className=" ml-2">{data.registrationDate} </span>
              </p>
            </div>
            <div className="grid grid-cols-1  py-1">
              <p className="text-[#FF9800] font-bold">Personal Information</p>
            </div>
            <div className="grid grid-cols-3 gap-2  py-1">
              <p>
                <span className="font-bold mr-2"> First name: </span>
                <span className=" ml-2">{data.firstname} </span>
              </p>
              {data.middlename && (
                <p>
                  <span className="font-bold mr-2"> Middle name: </span>
                  {data.middlename ? data.middlename : ""}{" "}
                </p>
              )}
              <p>
                <span className="font-bold mr-2"> Surname: </span>
                {data.surname}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2  py-1">
              <p>
                <span className="font-bold mr-2"> Title: </span>
                <span className=" ml-2">{data.title} </span>
              </p>
              <p>
                <span className="font-bold mr-2">Gender: </span>
                {data.middlename ? data.gender : ""}{" "}
              </p>
              <p>
                <span className="font-bold mr-2"> Date of Birth: </span>
                {data.dob}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2  py-1">
              <p>
                <span className="font-bold mr-2"> State of Origin: </span>
                <span className=" ml-2">{data.originState} </span>
              </p>
              <p>
                <span className="font-bold mr-2">L.G.A : </span>
                {data.middlename ? data.originLga : ""}{" "}
              </p>
              <p>
                <span className="font-bold mr-2"> Religion: </span>
                <span className=" ml-2">{data.religion} </span>
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2  py-1">
              <p>
                <span className="font-bold mr-2"> Email: </span>
                <span className=" ml-2">{data.emailId} </span>
              </p>
              <p>
                <span className="font-bold mr-2">Mobile Number(s) : </span>
                {data.middlename ? data.mobilenumber : ""}{" "}
              </p>
              {data.phonenumber !== "" && (
                <p>
                  <span className="font-bold mr-2"> Phone Number(s): </span>
                  <span className=" ml-2">
                    {data.phonenumber ? data.phonenumber : ""}{" "}
                  </span>
                </p>
              )}
            </div>
            <div className="grid grid-cols-1  py-1">
              <p>
                <span className="font-bold mr-2">Residential Address: </span>
                <span className=" ml-2">{data.residenceAddress} </span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2  py-1">
              <p>
                <span className="font-bold mr-2"> State of Residence: </span>
                <span className=" ml-2">{data.residenceState} </span>
              </p>
              <p>
                <span className="font-bold mr-2">L.G.A: </span>
                <span className=" ml-2">{data.residenceLga} </span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2  py-1">
              <p>
                <span className="font-bold mr-2"> Advert Medium: </span>
                <span className=" ml-2">{data.marketingMedia} </span>
              </p>
              <p>
                <span className="font-bold mr-2"> Specify</span>
                <span className=" ml-2">{data.otherMarketingMedia} </span>
              </p>
            </div>
            <div className="grid grid-cols-1  mt-1 py-2">
              <p className="text-[#FF9800] font-bold">Business Information</p>
            </div>
            <div className="grid grid-cols-1  py-1">
              <p>
                <span className="font-bold mr-2"> Business Address: </span>
                <span className=" ml-2">{data.businessAddress} </span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2  py-1">
              <p>
                <span className="font-bold mr-2"> Business State: </span>
                <span className=" ml-2">{data.businessState} </span>
              </p>
              <p>
                <span className="font-bold mr-2"> Business L.G.A:</span>
                <span className=" ml-2">{data.businessLga} </span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2  py-1">
              <p>
                <span className="font-bold mr-2"> Existing Agent Status: </span>
                <span className=" ml-2">{data.agentExistStatus} </span>
              </p>
              <p>
                <span className="font-bold mr-2"> Existing Shop Name:</span>
                <span className=" ml-2">
                  {data.existingShopname ? data.existingShopname : ""}{" "}
                </span>
              </p>
            </div>
            <div className="grid grid-cols-1  mt-1 py-2">
              <p className="text-[#FF9800] font-bold">New Shop Details</p>
            </div>
            <div className="grid grid-cols-1 gap-1  py-1">
              <div></div>
              <div>
                {" "}
                <ul>
                  {data.shopDetails &&
                    data.shopDetails.map((item, index) => {
                      return (
                        <div key={index} className="px-3">
                          <li>
                            <GoPrimitiveDot
                              size={15}
                              className="inline-flex mr-1"
                            />
                            <span className="font-bold mr-1"> Shopname: </span>
                            {item.shopname}{" "}
                            <span className="ml-3">
                              <span className="font-bold mr-1">Password: </span>{" "}
                              {item.password}
                            </span>
                          </li>
                        </div>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-1  mt-1 py-2">
              <p className="text-[#FF9800] font-bold">Agent Bank Details</p>
            </div>
            <div className="grid grid-cols-2 gap-2  py-1">
              <p>
                <span className="font-bold mr-2"> Bank Name: </span>
                <span className=" ml-2">{data.agentbankName} </span>
              </p>
              <p>
                <span className="font-bold mr-2"> Account Number:</span>
                <span className=" ml-2">
                  {data.agentAccountNum ? data.agentAccountNum : ""}{" "}
                </span>
              </p>
            </div>
            <div className="grid grid-cols-1   py-1">
              <p>
                <span className="font-bold mr-2"> Account Name:</span>
                <span className=" ml-2">{data.agentAccountName}</span>
              </p>
            </div>
            <div className="grid grid-cols-1  mt-1 py-2">
              <p className="text-[#FF9800] font-bold">Payment Information</p>
            </div>
            <div className="grid grid-cols-2 gap-2  py-1">
              <p>
                <span className="font-bold mr-2"> MB Account Credited: </span>
                <span className=" ml-2">{data.mbBankName} </span>
              </p>
              <p>
                <span className="font-bold mr-2"> Date of Deposit:</span>
                <span className=" ml-2">{data.depositDate}</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2  py-1">
              <p>
                <span className="font-bold mr-2"> Depositor's Name: </span>
                <span className=" ml-2">{data.depositorName} </span>
              </p>
              <p>
                <span className="font-bold mr-2"> Deposit Amount:</span>
                <span className=" ml-2">{data.depositAmount}</span>
              </p>
            </div>
            <div className="grid grid-cols-1   py-1">
              <p>
                <span className="font-bold mr-2"> Deposit Comment: </span>
                <span className=" ml-2">{data.depositComment} </span>
              </p>
            </div>
          </div>
          <div className="flex flex-row mt-10 justify-around md:justify-start  py-4">
            <div className=" max-w-[48%] md:max-w-[300px] p-3 cursor-pointer  h-[200px]">
              {" "}
              <ModalImage
                src={data.paymentProof}
                alt="payment proof"
                caption="Payment Proof"
                disabled={false}
                useImage
                imageClassName="h-[150px] w-[100%]"
              />
              <div className="text-center    text-[#fe9b45d2]">
                <p> Click Image to view payment proof</p>
              </div>
            </div>
            <div className=" max-w-[48%] md:max-w-[300px] p-3 cursor-pointer  h-[200px]">
              {" "}
              <ModalImage
                src={data.fileUploadData[0].fileName}
                alt="agent passport"
                caption="agent passport"
                disabled={false}
                useImage
                imageClassName="h-[150px] w-[100%]"
              />
              <div className="text-center    text-[#fe9b45d2]">
                <p> Click Image to view Passport</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-around md:justify-start">
            {currentUser.roleDescription === "CSU Admin" && (
              <Fragment>
                <button
                  className=" p-3 m-2 text-[#ffffff] bg-[#FF7204] text-center hover:drop-shadow-xl"
                  type="button"
                  onClick={() => setUpdateRegInfoModal(true)}
                >
                  <FiEdit
                    size={25}
                    style={{ color: "#ffffff" }}
                    className="inline-flex "
                  />{" "}
                  <span className="hidden md:inline-flex"> Update Reg</span>
                </button>

                {data.shopVerificationId === null && (
                  <Fragment>
                    <button
                      className=" p-3 m-2 text-[#ffffff] bg-[#FF7204] text-center hover:drop-shadow-xl"
                      type="button"
                      onClick={() => setCsuVerifyPaymenModal(true)}
                    >
                      <BsFileEarmarkPlay
                        size={25}
                        style={{ color: "#ffffff" }}
                        className="inline-flex"
                      />{" "}
                      <span className="hidden md:inline-flex">
                        {" "}
                        Verify Payment
                      </span>
                    </button>

                    <button
                      className=" p-2 m-2 text-[#ffffff] bg-[#ff0404] text-center hover:drop-shadow-xl"
                      type="button"
                      onClick={() => setDeleteRegModal(true)}
                    >
                      <MdDeleteForever
                        size={20}
                        style={{ color: "#ffffff" }}
                        className="inline-flex "
                      />{" "}
                      <span className="hidden md:inline-flex"> Delete Reg</span>
                    </button>
                  </Fragment>
                )}
                {data.accountApprovalStatus === "unapproved" &&
                  data.accountVerificationDate !== null && (
                    <button
                      className=" p-3 m-2 text-[#ffffff] bg-[#FF7204] text-center hover:drop-shadow-xl"
                      type="button"
                      onClick={() => setCsuReVerifyPaymentModal(true)}
                    >
                      <BsFileEarmarkPlay
                        size={25}
                        style={{ color: "#ffffff" }}
                        className="inline-flex"
                      />{" "}
                      <span className="hidden md:inline-flex">
                        {" "}
                        Re-verify Payment
                      </span>
                    </button>
                  )}
              </Fragment>
            )}
            {currentUser.roleDescription === "CSU" &&
              data.shopVerificationId === null && (
                <button
                  className=" p-3 m-2 text-[#ffffff] bg-[#FF7204] text-center hover:drop-shadow-xl"
                  type="button"
                  onClick={() => setCsuVerifyPaymenModal(true)}
                >
                  <BsFileEarmarkPlay
                    size={25}
                    style={{ color: "#ffffff" }}
                    className="inline-flex"
                  />{" "}
                  <span className="hidden md:inline-flex"> Verify Payment</span>
                </button>
              )}
            {currentUser.roleDescription === "CSU" &&
              data.accountApprovalStatus === "unapproved" &&
              data.accountVerificationDate !== null && (
                <button
                  className=" p-3 m-2 text-[#ffffff] bg-[#FF7204] text-center hover:drop-shadow-xl"
                  type="button"
                  onClick={() => setCsuReVerifyPaymentModal(true)}
                >
                  <BsFileEarmarkPlay
                    size={25}
                    style={{ color: "#ffffff" }}
                    className="inline-flex "
                  />{" "}
                  <span className="hidden md:inline-flex">
                    {" "}
                    Re-verify Payment
                  </span>
                </button>
              )}
            {currentUser.roleDescription === "Account" &&
              data.accountApprovalStatus === null && (
                <button
                  className=" p-3 m-2 text-[#ffffff] bg-[#FF7204] text-center hover:drop-shadow-xl"
                  type="button"
                  onClick={() => setAccountVerifyPaymenModal(true)}
                >
                  <MdMarkChatRead
                    size={25}
                    style={{ color: "#ffffff" }}
                    className="inline-flex "
                  />{" "}
                  <span className="hidden md:inline-flex"> Verify Payment</span>
                </button>
              )}
            {currentUser.roleDescription === "IT" &&
              data.accountApprovalStatus === "approved" &&
              data.accountCreationStatus === "processing" && (
                <button
                  className=" p-3 m-2 text-[#ffffff] bg-[#FF7204] text-center hover:drop-shadow-xl"
                  type="button"
                  onClick={() => setITAccountCreationModal(true)}
                >
                  <MdMarkChatRead
                    size={25}
                    style={{ color: "#ffffff" }}
                    className="inline-flex "
                  />{" "}
                  <span className="hidden md:inline-flex">Create Account</span>
                </button>
              )}
            <button
              className=" p-3 m-2 text-[#ffffff] bg-[#FF7204] text-center hover:drop-shadow-xl"
              type="button"
              onClick={handleBackButton}
            >
              <MdOutlineSkipPrevious
                size={25}
                style={{ color: "#ffffff" }}
                className="inline-flex md:mr-2"
              />{" "}
              <span className="hidden md:inline-flex"> Go Back</span>
            </button>
            {updateRegInfoModal && currentUser.roleDescription === "CSU Admin" && (
              <ModalComponent>
                <UpdateRegInfo
                  agentInfo={data}
                  handleCloseModal={handleClosingModal}
                />
              </ModalComponent>
            )}
            {(currentUser.roleDescription === "CSU Admin" ||
              currentUser.roleDescription === "CSU") &&
              csuVerifyPaymentModal && (
                <ModalComponent>
                  <CSUVerifyPayment
                    agentInfo={data}
                    users={users}
                    handleCloseModal={handleClosingModal}
                  />
                </ModalComponent>
              )}
            {currentUser.roleDescription === "CSU Admin" && deleteRegModal && (
              <ModalComponent>
                <DeleteRegInfo
                  agentInfo={data}
                  handleCloseModal={handleCloseDeleteModal}
                  isLoading={isLoading}
                />
              </ModalComponent>
            )}
            {(currentUser.roleDescription === "CSU Admin" ||
              currentUser.roleDescription === "CSU") &&
              csuReVerifyPaymentModal && (
                <ModalComponent>
                  <CSUReVerifyPayment
                    agentInfo={data}
                    handleCloseModal={handleClosingModal}
                    isLoading={isLoading}
                  />
                </ModalComponent>
              )}
            {currentUser.roleDescription === "Account" &&
              accountVerifyPaymenModal && (
                <ModalComponent>
                  <AccountVerifyPayment
                    agentInfo={data}
                    handleCloseModal={handleClosingModal}
                    isLoading={isLoading}
                  />
                </ModalComponent>
              )}
            {currentUser.roleDescription === "IT" && iTAccountCreationModal && (
              <ModalComponent>
                <ITCreateAccount
                  agentInfo={data}
                  handleCloseModal={handleClosingModal}
                  isLoading={isLoading}
                />
              </ModalComponent>
            )}
            {accountStatsModal && (
              <ModalComponent>
                <AccountStats
                  agentInfo={data}
                  handleCloseModal={() => setAccountStatsModal(false)}
                  isLoading={isLoading}
                />
              </ModalComponent>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default AccountDetails;
