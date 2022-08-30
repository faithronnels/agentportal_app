import React, { forwardRef } from "react";
import { GoPrimitiveDot } from "react-icons/go";

export const RegistrationPrint = forwardRef((props, ref) => (
  <div ref={ref} className="mt-5 pt-5 w-[90%] m-auto">
    <div className="grid grid-cols-1 text-3xl   py-1">
      <h1>
        {" "}
        <span className="font-bold mr-2 ">Application Ref Number: </span>
        <span className=" ml-2">{props.agentInfo.refNum} </span>
      </h1>
    </div>
    <div className="grid grid-cols-2 gap-2   py-1 justify-between">
      <div className="grid grid-cols-1   py-1">
        <p>
          <span className="font-bold mr-2">Registration Date: </span>
          <span className=" ml-2">{props.agentInfo.registrationDate} </span>
        </p>
      </div>

      <div className="h-[190px] w-[215px] overflow-hidden border border-gray-100 ">
        <img
          src={props.agentInfo.fileUploadData[0].fileName}
          alt="company document"
          height="100%"
          width="100%"
        />{" "}
      </div>
    </div>

    <div>
      <div className="grid grid-cols-1  py-1">
        <p className="text-[#FF9800] font-bold">Personal Information</p>
      </div>
      <div className="grid grid-cols-3 gap-2  py-1">
        <p>
          <span className="font-bold mr-2"> First name: </span>
          <span className=" ml-2">{props.agentInfo.firstname} </span>
        </p>
        {props.agentInfo.middlename && (
          <p>
            <span className="font-bold mr-2"> Middle name: </span>
            {props.agentInfo.middlename ? props.agentInfo.middlename : ""}{" "}
          </p>
        )}
        <p>
          <span className="font-bold mr-2"> Surname: </span>
          {props.agentInfo.surname}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2  py-1">
        <p>
          <span className="font-bold mr-2"> Title: </span>
          <span className=" ml-2">{props.agentInfo.title} </span>
        </p>
        <p>
          <span className="font-bold mr-2">Gender: </span>
          {props.agentInfo.middlename ? props.agentInfo.gender : ""}{" "}
        </p>
        <p>
          <span className="font-bold mr-2"> Date of Birth: </span>
          {props.agentInfo.dob}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2  py-1">
        <p>
          <span className="font-bold mr-2"> State of Origin: </span>
          <span className=" ml-2">{props.agentInfo.originState} </span>
        </p>
        <p>
          <span className="font-bold mr-2">L.G.A : </span>
          {props.agentInfo.middlename ? props.agentInfo.originLga : ""}{" "}
        </p>
        <p>
          <span className="font-bold mr-2"> Religion: </span>
          <span className=" ml-2">{props.agentInfo.religion} </span>
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2  py-1">
        <p>
          <span className="font-bold mr-2"> Email: </span>
          <span className=" ml-2">{props.agentInfo.emailId} </span>
        </p>
        <p>
          <span className="font-bold mr-2">Mobile Number(s) : </span>
          {props.agentInfo.middlename ? props.agentInfo.mobilenumber : ""}{" "}
        </p>
        {props.agentInfo.phonenumber && (
          <p>
            <span className="font-bold mr-2"> Phone Number(s): </span>
            <span className=" ml-2">
              {props.agentInfo.phonenumber ? props.agentInfo.phonenumber : ""}{" "}
            </span>
          </p>
        )}
      </div>
      <div className="grid grid-cols-1  py-1">
        <p>
          <span className="font-bold mr-2">Residential Address: </span>
          <span className=" ml-2">{props.agentInfo.residenceAddress} </span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2  py-1">
        <p>
          <span className="font-bold mr-2"> State of Residence: </span>
          <span className=" ml-2">{props.agentInfo.residenceState} </span>
        </p>
        <p>
          <span className="font-bold mr-2">L.G.A: </span>
          <span className=" ml-2">{props.agentInfo.residenceLga} </span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2  py-1">
        <p>
          <span className="font-bold mr-2"> Advert Medium: </span>
          <span className=" ml-2">{props.agentInfo.marketingMedia} </span>
        </p>
        <p>
          <span className="font-bold mr-2"> Specify</span>
          <span className=" ml-2">{props.agentInfo.otherMarketingMedia} </span>
        </p>
      </div>
      <div className="grid grid-cols-1  mt-1 py-2">
        <p className="text-[#FF9800] font-bold">Business Information</p>
      </div>
      <div className="grid grid-cols-1  py-1">
        <p>
          <span className="font-bold mr-2"> Business Address: </span>
          <span className=" ml-2">{props.agentInfo.businessAddress} </span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2  py-1">
        <p>
          <span className="font-bold mr-2"> Business State: </span>
          <span className=" ml-2">{props.agentInfo.businessState} </span>
        </p>
        <p>
          <span className="font-bold mr-2"> Business L.G.A:</span>
          <span className=" ml-2">{props.agentInfo.businessLga} </span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2  py-1">
        <p>
          <span className="font-bold mr-2"> Existing Agent Status: </span>
          <span className=" ml-2">{props.agentInfo.agentExistStatus} </span>
        </p>
        <p>
          <span className="font-bold mr-2"> Existing Shop Name:</span>
          <span className=" ml-2">
            {props.agentInfo.existingShopname
              ? props.agentInfo.existingShopname
              : ""}{" "}
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
            {props.agentInfo.shopDetails &&
              props.agentInfo.shopDetails.map((item, index) => {
                return (
                  <div key={index} className="px-3">
                    <li>
                      <GoPrimitiveDot size={15} className="inline-flex mr-1" />
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
          <span className=" ml-2">{props.agentInfo.agentbankName} </span>
        </p>
        <p>
          <span className="font-bold mr-2"> Account Number:</span>
          <span className=" ml-2">
            {props.agentInfo.agentAccountNum
              ? props.agentInfo.agentAccountNum
              : ""}{" "}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-1   py-1">
        <p>
          <span className="font-bold mr-2"> Account Name:</span>
          <span className=" ml-2">{props.agentInfo.agentAccountName}</span>
        </p>
      </div>
      <div className="grid grid-cols-1  mt-1 py-2">
        <p className="text-[#FF9800] font-bold">Payment Information</p>
      </div>
      <div className="grid grid-cols-2 gap-2  py-1">
        <p>
          <span className="font-bold mr-2"> MB Account Credited: </span>
          <span className=" ml-2">{props.agentInfo.mbBankName} </span>
        </p>
        <p>
          <span className="font-bold mr-2"> Date of Deposit:</span>
          <span className=" ml-2">{props.agentInfo.depositDate}</span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2  py-1">
        <p>
          <span className="font-bold mr-2"> Depositor's Name: </span>
          <span className=" ml-2">{props.agentInfo.depositorName} </span>
        </p>
        <p>
          <span className="font-bold mr-2"> Deposit Amount:</span>
          <span className=" ml-2">{props.agentInfo.depositAmount}</span>
        </p>
      </div>
      <div className="grid grid-cols-1   py-1">
        <p>
          <span className="font-bold mr-2"> Deposit Comment: </span>
          <span className=" ml-2">{props.agentInfo.depositComment} </span>
        </p>
      </div>
    </div>
  </div>
));
