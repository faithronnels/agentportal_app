import React from "react";
import { IoMdCheckmarkCircleOutline, IoMdWarning } from "react-icons/io";
import { FaRegTimesCircle } from "react-icons/fa";

const AlertComponent = ({ title, message, type, color }) => {
  let icon;
  switch (type) {
    case "success":
      icon = (
        <IoMdCheckmarkCircleOutline
          size={25}
          style={{ color: `${color}` }}
          className="inline-flex"
        />
      );

      break;
    case "error":
      icon = (
        <FaRegTimesCircle
          size={25}
          style={{ color: `${color}` }}
          className="inline-flex"
        />
      );

      break;
    case "warning":
      icon = (
        <IoMdWarning
          size={25}
          style={{ color: `${color}` }}
          className="inline-flex"
        />
      );

      break;

    default:
      break;
  }
  return (
    <div>
      <div
        className={`bg-${color}-100 border-t-4 border-${color}-500 rounded-b text-${color}-900 px-4 py-3 shadow-md`}
        role="alert"
      >
        <div className="flex">
          <div className="py-1 mr-2">{icon}</div>
          <div>
            {title && <p className="font-bold">{title}</p>}
            {message && <p className="text-sm">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertComponent;
