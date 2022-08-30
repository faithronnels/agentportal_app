import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux/es/exports";
import AlertComponent from "../../commons/AlertComponent";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Spinner from "../../commons/Spinner";
import { useRequestState } from "../../../redux/selectors";
import {
  updateRequest,
  clearRequestError,
  clearRequestSuccessMsg,
} from "../../../redux/actions/requestAction";

const EditRequest = ({
  selectedRow,
  currentUser,
  handleReloadPage,
  setShowModal,
}) => {
  const dispatch = useDispatch();
  const requestState = useRequestState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { successMsg, errorMsg, isLoading } = requestState;

  const onSubmit = (data, e) => {
    //    dispatch(setNewRequest(data));
    dispatch(updateRequest(data, selectedRow.requestId));
  };
  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        dispatch(clearRequestError());
      }, 5000);
    }
    if (successMsg) {
      setTimeout(() => {
        dispatch(clearRequestSuccessMsg());
        handleReloadPage();
        setShowModal(false);
      }, 5000);
    }
  }, [errorMsg, successMsg, dispatch, handleReloadPage, setShowModal]);

  return (
    <div>
      <div className="w-[98%]  p-2   mx-auto  shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block my-1 ">
            <span className="text-gray-700">
              {" "}
              Enter a comment (Visible to staff only)
            </span>
            <textarea
              className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
              rows="2"
              {...register(
                `${
                  currentUser.roleDescription === "IT"
                    ? "itComment"
                    : "csuComment"
                }`
              )}
            ></textarea>
          </label>

          <label className="block my-1">
            <span className="text-gray-700">Resolution Status</span>

            <select
              className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
              {...register("resolved", {
                required: "This field is required",
              })}
            >
              <option value="">Select Status</option>
              <option value="N">Unresolved</option>
              <option value="Y">Resolved</option>
            </select>
            <span role="alert" className="text-[11px] text-red-500 ml-3">
              {errors.resolved?.message}
            </span>
          </label>
          <label className="block my-1 ">
            <span className="text-gray-700">
              {" "}
              Resolution resolutionComment (Visible to staff and PA)
            </span>
            <textarea
              className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
              rows="2"
              {...register("resolutionComment")}
            ></textarea>
          </label>
          <div className=" my-1 w-100px">
            {errorMsg && (
              <AlertComponent
                title="Request Error"
                message={errorMsg}
                type="error"
                color="red"
              />
            )}
            {successMsg && (
              <AlertComponent
                title="Request Success"
                message={successMsg}
                type="success"
                color="green"
              />
            )}
          </div>
          <div className="flex flex-row justify-end">
            <button
              className={`my-2 py-3 px-4   text-[#ffffff] bg-[#FF7204] justify-self-right text-center ${
                isLoading || successMsg
                  ? "cursor-not-allowed bg-[#f0a165]"
                  : null
              }`}
              type="submit"
            >
              {" "}
              {successMsg ? (
                <span>
                  {" "}
                  <IoMdCheckmarkCircleOutline
                    size={17}
                    style={{ color: "#ffffff" }}
                    className="inline-flex "
                  />{" "}
                  Submitted
                </span>
              ) : (
                <span className="inline-flex ">
                  {isLoading && <Spinner />} Submit Request
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRequest;
