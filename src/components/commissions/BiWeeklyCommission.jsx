import React from "react";
import { biWeeklyCommissionData } from "../commons/data/data";

import DataTable from "react-data-table-component";

const customStyles = {
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      fontSize: "1rem",
      fontWeight: "bold",
    },
  },
  cells: {
    style: {
      fontSize: "1rem",
    },
  },
  rdt_TableFooter: {},
};

const BiWeeklyCommission = () => {
  const columns = [
    {
      fontSize: "1rem",
      name: "Number Of Outcomes",
      selector: (row) => row["type"],
      sortable: true,
    },
    {
      name: "Percentage",
      selector: (row) => row["percentage"],
      sortable: true,
      right: true,
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={biWeeklyCommissionData}
        pagination
        className="w-full p-[5rem]"
        customStyles={customStyles}
        noHeader={true}
      />
    </div>
  );
};

export default BiWeeklyCommission;
