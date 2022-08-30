import React from "react";
import { ImSpinner2 } from "react-icons/im";

const Spinner = ({ size = 17, color = "#FFffff" }) => {
  return (
    <div className="flex justify-center">
      <ImSpinner2
        size={size}
        style={{ color: `${color}` }}
        className="animate-spin  mr-2 my-auto "
      />
    </div>
  );
};

export default Spinner;
