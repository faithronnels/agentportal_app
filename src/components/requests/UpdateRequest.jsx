import React, { useState, useEffect, useMemo, Fragment } from "react";

import { AiOutlineReload } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux/es/exports";
import { useImmer } from "use-immer";
import ModalComponent from "../commons/ModalComponent";
import DataTable from "../commons/DataTable/DataTableBase";
import { fetchRequest } from "../../redux/actions/requestAction";
import { useRequestState } from "../../redux/selectors/index";
import Spinner from "../commons/Spinner";
import RequestDetails from "./requestDetails/RequestDetails";

const resolvedStyles = {
  color: "green",
  fontWeight: "bold",
};
const UnresolvedStyles = {
  color: "red",
  fontWeight: "bold",
};
const customStyles = {
  headCells: {
    style: {
      fontWeight: "bold",
    },
  },
};

const UpdateRequest = () => {
  const requestState = useRequestState();
  const dispatch = useDispatch();
  const [showRequestModal, setShowRequestModal] = useState(false);

  const [data, setData] = useState([]);
  const [tabledata, setTableData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedRow, setSelectedRow] = useState({});
  const { isLoading } = requestState;

  useEffect(() => {}, [selectedRow]);

  const handleRequestButton = (row) => {
    setSelectedRow(data.filter((item) => item.refNum === row.reference)[0]);
    setShowRequestModal(true);
  };

  useEffect(() => {
    if (requestState.requests !== null) {
      const { requests, total_rows } = requestState.requests;
      setData(requests);
      setTotalRows(total_rows);
      setTableData(handleTableListData(requests));
    
    } else {
      setTableData([]);
      setTotalRows(0);
    }
    return () => {};
  }, [requestState.requests]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => [
    {
      name: "Ref Num",
      selector: (row) => row.reference,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Agent Username",
      selector: (row) => row.username,
      sortable: true,
      maxWidth: "200px",
    },
    {
      name: "Request Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) =>
        row.status === "Resolved" ? (
          <span style={resolvedStyles}>Resolved</span>
        ) : (
          <span style={UnresolvedStyles}>Unresolved</span>
        ),
    },
    {
      cell: (row) => (
        <Fragment>
          <div
            onClick={() => handleRequestButton(row)}
            className="border border-1  p-1 text-center shadow-md"
          >
            {" "}
            <FaRegEdit
              size={20}
              style={{ color: "#FF7204" }}
              className="inline-flex "
            />{" "}
          </div>
        </Fragment>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]);

  const [filter, setFilter] = useImmer({
    pageno: 1,
    status: "update",
    limit: 10,
  });

  useEffect(() => {
    fetchRequestData(filter);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchRequestData = (filter) => {
    dispatch(fetchRequest(filter));
  };
  const onPageNumberingChange = (limit, page) => {
    setFilter((draft) => {
      draft.pageno = page;
      draft.limit = limit;
    });
  };
  const onPageChange = (input) => {
    setFilter((draft) => {
      draft.pageno = input;
    });
  };

  const handleTableListData = (requests) =>
    requests?.map((request) => ({
      reference: request.refNum,
      category: request.category,
      username: request.agentUsername,
      date: request.requestDate,
      status: request.resolved === "Y" ? "Resolved" : "Unresolved",
    }));

  return (
    <Fragment>
     
        {" "}
        <h1 className="text-2xl md:text-3xl font-bold text-[#344968]">
          Pending Requests
        </h1>
        <section
          className="flex flex-col justify-around w-full mx-auto pt-2 md:pt-5   text-gray-700    
     "
        >
          <div className="flex  flex-col md:flex-row justify-start mt-8">
            <button
              className=" p-3 mx-2 text-[#ffffff] bg-[#FF7204] text-center hover:drop-shadow-xl"
              type="button"
              onClick={() => fetchRequestData(filter)}
            >
              <AiOutlineReload
                size={25}
                style={{ color: "#ffffff" }}
                className="inline-flex mr-2"
              />{" "}
              Reload Page
            </button>
          </div>

          {tabledata && (
            <div>
              <DataTable
                columns={columns}
                tableList={tabledata}
                keyField="reference"
                progressPending={isLoading}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={onPageNumberingChange}
                onChangePage={onPageChange}
                customStyles={customStyles}
                progressComponent={<Spinner />}
              />

              <div className="relative">
                {showRequestModal && (
                  <ModalComponent>
                    <RequestDetails
                      selectedRow={selectedRow}
                      setShowModal={setShowRequestModal}
                      handleReloadPage={() => fetchRequestData(filter)}
                    />
                  </ModalComponent>
                )}
              </div>
            </div>
          )}
        </section>
      
    </Fragment>
  );
};

export default UpdateRequest;
