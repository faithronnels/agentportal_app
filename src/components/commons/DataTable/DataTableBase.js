import React, { Fragment, useState, useMemo } from "react";

// import "../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import ReactDataTable from "react-data-table-component";
import { ImDownload2 } from "react-icons/im";
import { HiOutlineRefresh } from "react-icons/hi";

import { MdOutlineClear } from "react-icons/md";
import "./DataTable.css";
import isEmpty from "../is-empty";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div className="relative flex  flex-row w-full md:w-[250px]">
    <input
      name="search"
      type="text"
      className="  mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black"
      id="search"
      value={filterText}
      onChange={onFilter}
      placeholder="Search table"
    />{" "}
    <div className="absolute flex justify-center items-center right-0 w-[33px] top-2  h-[33px]">
      <button
        onClick={onClear}
        className="px-2 py-[5px] text-[#ffffff] bg-[#FF7204] hover:shadow-lg"
      >
        <MdOutlineClear
          size={25}
          style={{ color: "#ffffff" }}
          className="inline-flex "
        />{" "}
      </button>
    </div>
  </div>
);

const defaultStyles = {
  header: {
    style: {
      height: "47px",
    },
  },
  headRow: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      borderTopColor: "#d2d2d2",
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "#d2d2d2",
    },
  },
  rows: {
    style: {
      paddingLeft: "10px",
      padddingRight: "10px",
    },
  },
  cells: {
    style: {
      borderBottomStyle: "solid",
      borderBottomWidth: "3px",
      borderBottomColor: "#fff",
      backgroundColor: "#f9f9f9",
    },
  },
};

const DataTable = (props) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const { tableList, columns, tableTitle, selectableRows, customStyles } =
    props;

  function convertArrayOfObjectsToCSV(array) {
    let result;
    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = tableList.length > 0 ? Object.keys(tableList[0]) : [""];

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;
        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // function downloadCSV(array) {
  //   const link = document.createElement("a");
  //   let csv = convertArrayOfObjectsToCSV(array);
  //   if (csv == null) return;

  //   const filename = "export.csv";

  //   if (!csv.match(/^data:text\/csv/i)) {
  //     csv = `data:text/csv;charset=utf-8,${csv}`;
  //   }

  //   link.setAttribute("href", encodeURI(csv));
  //   link.setAttribute("download", filename);
  //   link.click();
  // }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export_records.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  // correct code below
  const Export = ({ onExport }) => (
    <button
      onClick={() => onExport(filteredItems)}
      className="px-2 py-[6px] text-[#ffffff] bg-[#FF7204] hover:shadow-lg"
    >
      <span className="">
        {" "}
        <ImDownload2
          size={25}
          style={{ color: "#ffffff" }}
          className="inline-flex mr-2"
        />{" "}
        Download
      </span>
    </button>
  );
  // const actionsMemo = React.useMemo(
  //   () => <Export onExport={() => downloadCSV(filteredItems)} />,
  //   []
  // );
  const filteredItems = tableList.filter((item) => {
    let val;
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        if (
          item[key] &&
          item[key].toString().toLowerCase().includes(filterText.toLowerCase())
        ) {
          val = item[key]
            .toString()
            .toLowerCase()
            .includes(filterText.toLowerCase());
        }
      }
    }
    return val;
  });

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <Fragment>
        <div className="flex flex-col my-4 md:flex-row md:my-0 w-full m-auto  md:justify-end">
          <div className="flex flex-row justify-between">
            <div className="my-2 md:my-0 mx-2">
              <button
                className="px-2 py-[6px] text-[#ffffff] bg-[#FF7204] hover:shadow-lg"
                type="button"
                onClick={handleClear}
              >
                <HiOutlineRefresh
                  size={25}
                  style={{ color: "#ffffff" }}
                  className="inline-flex "
                />{" "}
              </button>
            </div>
            <div className="my-2 md:my-0 mx-2">
              <Export onExport={() => downloadCSV(filteredItems)} />
            </div>
          </div>
          <div className="my-2 md:my-0 mx-2">
            <FilterComponent
              onFilter={(e) => setFilterText(e.target.value)}
              onClear={handleClear}
              filterText={filterText}
            />
          </div>
        </div>
      </Fragment>
    );
  }, [downloadCSV, filterText, filteredItems, resetPaginationToggle]);

  return (
    <Fragment>
      {isEmpty(filteredItems) ? (
        <div>No Data Available</div>
      ) : (
        <ReactDataTable
          {...props}
          title={tableTitle ? tableTitle : null}
          columns={columns}
          data={filteredItems}
          selectableRows={selectableRows ? selectableRows : null}
          pagination
          customStyles={customStyles ? customStyles : defaultStyles}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          // tableList={filteredItems}
          // action={actionsMemo}
        />
      )}
    </Fragment>
  );
};
export default DataTable;
