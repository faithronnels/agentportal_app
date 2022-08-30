import React from "react";

import { virtualWeeklyBonus } from "../commons/data/data";

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
};

const VirtualCommissionTable = () => {
  const columns = [
    {
      fontSize: "1rem",
      name: "Total sales for the week",
      selector: (row) => row["sales"],
      sortable: true,
    },
    {
      name: "Bonus for the week",
      selector: (row) => row["bonus"],
      sortable: true,
      right: true,
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={virtualWeeklyBonus}
        className="w-full p-[5rem]"
        customStyles={customStyles}
        noHeader={true}
        pagination
      />
    </div>
  );
};

export default VirtualCommissionTable;
