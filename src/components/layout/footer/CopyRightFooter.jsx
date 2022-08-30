import React from 'react'

const CopyRightFooter = () => {
      const getCurrentYear = new Date().getFullYear();
  return (
    <div>
      {" "}
      <div className="text-center text-[11px]">
        &copy; Copyright {getCurrentYear}
        <strong> Merrybet Gold Ltd </strong>. All Rights Reserved
      </div>
    </div>
  );
}

export default CopyRightFooter