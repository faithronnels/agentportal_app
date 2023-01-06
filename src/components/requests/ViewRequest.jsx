import React, { useState, useEffect, useMemo, Fragment } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { AiOutlineReload } from "react-icons/ai";

import { useDispatch } from "react-redux/es/exports";
import { useImmer } from "use-immer";
import { BsEye } from "react-icons/bs";
import ModalComponent from "../commons/ModalComponent";
import { AddRequest } from "./addRequest/AddRequest";
import DataTable from "../commons/DataTable/DataTableBase";
import { fetchRequest } from "../../redux/actions/requestAction";
import { useRequestState, useAuthState } from "../../redux/selectors/index";
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

const ViewRequest = () => {
  const requestState = useRequestState();
  const authState = useAuthState();
  const dispatch = useDispatch();

  const { currentUser } = authState;

  const [showAddModal, setShowAddModal] = useState(false);
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
            <BsEye
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
    status: "all",
    limit: 10,
  });

  useEffect(() => {
    fetchRequestData(filter);
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
  const handleCloseAddModal = () => {
    // dispatch(fetchRequest(filter));
    setShowAddModal(false);
  };

  return (
    <Fragment>
      {" "}
      <h1 className="text-2xl md:text-3xl font-bold text-[#344968]">
        View Requests
      </h1>
      <section
        className="flex flex-col justify-around w-full mx-auto pt-2 md:pt-5   text-gray-700    
     "
      >
        <div className="flex  flex-col md:flex-row justify-start mt-8">
          {currentUser.Is_principal_agent === "true" && (
            <button
              className=" py-3 w-[150px] text-[#ffffff] bg-[#FF7204]  hover:drop-shadow-xl"
              type="button"
              onClick={() => setShowAddModal(true)}
            >
              Add
              <MdPlaylistAdd
                size={25}
                style={{ color: "#ffffff" }}
                className="inline-flex mr-2"
              />{" "}
            </button>
          )}
          <button
            className="my-2 md:my-0 p-3 md:mx-2 w-[150px] text-[#ffffff] bg-[#FF7204] text-center hover:drop-shadow-xl"
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
        {tabledata ? (
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
            />{" "}
          </div>
        ) : (
          <div className="p-4 ">No Records Avalable</div>
        )}

        <div className="relative">
          {showRequestModal && (
            <ModalComponent>
              <RequestDetails
                selectedRow={selectedRow}
                setShowModal={setShowRequestModal}
              />
            </ModalComponent>
          )}
        </div>

        <div className="relative">
          {showAddModal && (
            <ModalComponent>
              <AddRequest
                handleCloseModal={handleCloseAddModal}
                handleReload={() => fetchRequestData(filter)}
              />
            </ModalComponent>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default ViewRequest;
