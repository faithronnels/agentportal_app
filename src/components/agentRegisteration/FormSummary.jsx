import React, { Fragment } from "react";
import { useDispatch } from "react-redux/es/exports";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import termsConditions from "../../assets/agentdownloads/terms&conditions.pdf";
import { useForm } from "react-hook-form";
import { setNewRegistration } from "../../redux/actions/agentRegistrationAction";

const FormSummary = ({
  nextStep,
  handleProgress,
  previousStep,
  setRegForm,
  regForm,
}) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: regForm,
  });
  const regInfo = regForm;
  const onSubmit = (data) => {
    setRegForm(data);

    dispatch(setNewRegistration(regForm));
    nextStep(1);
    handleProgress(12.5);
  };
  const handlePreviousStep = () => {
    previousStep(1, 12.5);
  };
  const handleTermsConditions = () => {
    window.open(termsConditions, "_blank");
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-2xl text-[#FF7204]">
          Confirmation: Almost Done!
        </h3>

        <div className="max-w-lg text-left">
          <table className="table-auto">
            <tbody>
              <tr>
                <th scope="row">Names</th>
                <td colSpan="2">
                  {regInfo.firstname}{" "}
                  {regInfo.middlename ? regInfo.middlename : ""}{" "}
                  {regInfo.surname}
                </td>
              </tr>
              <tr>
                <th scope="row">Title</th>
                <td colSpan="2">{regInfo.title}</td>
              </tr>
              <tr>
                <th scope="row">Gender</th>
                <td colSpan="2">{regInfo.gender}</td>
              </tr>
              <tr>
                <th scope="row">Date of Birth</th>
                <td colSpan="2">{regInfo.dob}</td>
              </tr>
              <tr>
                <th scope="row">Religion</th>
                <td colSpan="2">{regInfo.religion}</td>
              </tr>
              <tr>
                <th scope="row">State of Origin</th>
                <td colSpan="2">{regInfo.stateOfOrigin}</td>
              </tr>
              <tr>
                <th scope="row">L.G.A</th>
                <td colSpan="2">{regInfo.originLga}</td>
              </tr>
              <tr>
                <th scope="row">Email</th>
                <td colSpan="2">{regInfo.email}</td>
              </tr>
              <tr>
                <th scope="row">Mobile Number(s)</th>
                <td colSpan="2">
                  {regInfo.mobileNumber}
                  {regInfo.phoneNumber ? (
                    <Fragment>
                      {" / "}
                      {regInfo.phoneNumber}
                    </Fragment>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
              <tr>
                <th scope="row">Residential Address</th>
                <td colSpan="2">
                  {regInfo.residentialAddress}
                  {", "}
                  {regInfo.residentialState}
                  {", LGA- "}
                  {regInfo.residentialLga}
                </td>
              </tr>
            </tbody>
          </table>
          <h5>Business Information</h5>
          <table className="table-auto">
            <tbody>
              <tr>
                <th scope="row">Existing Agent?</th>
                <td colSpan="2">{regInfo.agentExist}</td>
              </tr>
              <tr>
                <th scope="row">Title</th>
                <td colSpan="2">{regInfo.title}</td>
              </tr>

              <tr>
                <th scope="row">Existing Shop Name</th>
                <td>
                  {regInfo.existingShopName ? regInfo.existingShopName : ""}
                </td>
              </tr>
              <tr>
                <th scope="row">New ShopNames</th>
                <td colSpan="2">
                  <ul>
                    {regInfo.newShopDetails.map((item, index) => {
                      return <li key={index}>{item.username}</li>;
                    })}
                  </ul>
                </td>
              </tr>
              <tr>
                <th scope="row">Business Address</th>
                <td colSpan="2">{regInfo.businessAddress}</td>
              </tr>
              <tr>
                <th scope="row">State/LGA</th>
                <td>
                  {regInfo.businessState}
                  {" / "}
                  {regInfo.businessLga}
                </td>
              </tr>
              <tr>
                <th scope="row"> How did you hear about us?</th>
                <td colSpan="2">
                  {regInfo.informationMedium}
                  {regInfo.otherInfoMedium ? (
                    <Fragment>
                      {" / "}
                      {regInfo.otherInfoMedium}
                    </Fragment>
                  ) : (
                    ""
                  )}
                </td>
              </tr>

              <tr>
                <th scope="row">Referral's Name</th>
                <td colSpan="2">
                  {regInfo.referralName ? regInfo.referralName : ""}
                </td>
              </tr>

              <tr>
                <th scope="row">Referral's Contact</th>
                <td colSpan="2">
                  {regInfo.referralContact ? regInfo.referralContact : ""}
                </td>
              </tr>
              <tr>
                <th scope="row">Bank Details</th>
                <td colSpan="2">
                  {regInfo.accountName}
                  {" - "}
                  {regInfo.accountNumber}
                  {" - "}
                  {regInfo.bankName}
                </td>
              </tr>
            </tbody>
          </table>
          <h5>Payment Information</h5>
          <table className="table-auto">
            <tbody>
              <tr>
                <th scope="row">Depositor Name</th>
                <td colSpan="2">{regInfo.depositorName}</td>
              </tr>
              <tr>
                <th scope="row">Amount</th>
                <td colSpan="2">{regInfo.depositAmount}</td>
              </tr>
              <tr>
                <th scope="row">MB Account Credited</th>
                <td colSpan="2">{regInfo.merrybetBank}</td>
              </tr>
              <tr>
                <th scope="row">Deposit Date</th>
                <td colSpan="2">{regInfo.depositDate}</td>
              </tr>
              <tr>
                <th scope="row">Comment</th>
                <td colSpan="2">{regInfo.depositComment}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2">
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="
                          border-gray-300 border-2
                          text-black
                          focus:border-gray-300 focus:ring-black
                          
                        "
                  value="yes"
                  {...register("agreementCheck", {
                    required:
                      "Agreement to terms and conditions is compulsory to continue",
                  })}
                />
                <span className="ml-2">
                  I, agree to abide by these terms and condition. (Please note:
                  By checking this box you have agreed to all our terms and
                  conditions. Uncheck the box, if otherwise.)
                </span>
              </label>
              <div
                className="font-bold  m-2 cursor-pointer"
                onClick={handleTermsConditions}
              >
                Read Terms and Conditions
              </div>
              <span role="alert" className="text-[11px] text-red-500 ml-3">
                {errors.agreementCheck?.message}
              </span>
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <button
              className="my-3 py-4  w-[48%] text-[#ffffff] bg-[#FF7204] "
              type="button"
              onClick={handlePreviousStep}
            >
              <MdNavigateBefore
                size={25}
                style={{ color: "#ffffff" }}
                className="inline-flex ml-2"
              />
              Previous
            </button>
            <button
              className="my-3 py-4  w-[48%] text-[#ffffff] bg-[#0AB942] "
              type="submit"
            >
              Submit
              <MdNavigateNext
                size={25}
                style={{ color: "#ffffff" }}
                className="inline-flex mr-2"
              />{" "}
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default FormSummary;
