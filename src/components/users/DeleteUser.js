import React, { useEffect } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
  deleteUser,
  clearUserSuccessMsg,
  clearUserError,
} from "../../redux/actions/userAction";
import { useDispatch } from "react-redux/es/exports";
import { useUserState } from "../../redux/selectors/index";
import AlertComponent from "../commons/AlertComponent";
import Spinner from "../commons/Spinner";
const DeleteUser = ({ selectedRow, handleCloseModal, handleReload }) => {
  const dispatch = useDispatch();
  const userState = useUserState();
  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };
  const { isLoading, errorMsg, successMsg } = userState;
  
  const { fullname, role, email, userId } = selectedRow;
  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        dispatch(clearUserError());
      }, 5000);
    }
    if (successMsg) {
      setTimeout(() => {
        dispatch(clearUserSuccessMsg());
        handleReload();
        handleCloseModal();
      }, 5000);
    }
  }, [errorMsg, successMsg, dispatch, handleCloseModal, handleReload]);
  return (
    <div className=" bg-[#fbfbfb] pb-8">
      <div className="flex flex-row justify-end  relative cursor-pointer">
        <div
          className="absolute rounded-full text-[#FF7204] p-3 font-bold"
          onClick={() => handleCloseModal(false)}
        >
          X
        </div>
      </div>

      <div
        className="flex flex-row justify-around  mx-auto pt-2 md:pt-5  max-h-full    
     "
      >
        <div className="w-[98%]  p-2   mx-auto my-3  shadow-sm">
          <h2 className="text-xl  md:text-2xl font-bold text-center mb-4 ">
            Delete User
          </h2>
          <div className=" my-1">
            {errorMsg && (
              <AlertComponent
                title="Error"
                message={errorMsg}
                type="error"
                color="red"
              />
            )}
            {successMsg && (
              <AlertComponent
                title="Success"
                message={successMsg}
                type="success"
                color="green"
              />
            )}
          </div>
          <div className="m-2">
            <p className="my-1">Are you sure you want to delete ?</p>
            <p className="my-1">
              Fullname: <span className="font-bold">{fullname}</span>
            </p>
            <p className="my-1">
              Role: <span className="font-bold">{role}</span>
            </p>
            <p className="my-1">
              Email: <span className="font-bold">{email}</span>
            </p>

            <p className="text-[red] font-bold my-2">
              {" "}
              This action cannot be reversed.
            </p>
          </div>

          <div className="flex flex-row justify-end">
            <button
              className={`my-2 py-3 px-4   text-[#ffffff] bg-[#FF7204] justify-self-right text-center ${
                isLoading || successMsg
                  ? "cursor-not-allowed bg-[#f0a165]"
                  : null
              }`}
              type="button"
              onClick={() => handleDelete(userId)}
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
                  Deleted
                </span>
              ) : (
                <span className="inline-flex ">
                  {" "}
                  {isLoading && <Spinner />}Delete User
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
