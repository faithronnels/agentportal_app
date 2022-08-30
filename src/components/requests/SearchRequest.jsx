import React, { useState, useEffect, useMemo, Fragment } from "react";

import { AiOutlineReload } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux/es/exports";
import { useImmer } from "use-immer";
import { BsEye } from "react-icons/bs";
import ModalComponent from "../commons/ModalComponent";

import DataTable from "../commons/DataTable/DataTableBase";
import { fetchRequest, getCategory } from "../../redux/actions/requestAction";
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

const SearchRequest = () => {
  const requestState = useRequestState();

  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
  } = useForm();

  const [showRequestModal, setShowRequestModal] = useState(false);

  const [data, setData] = useState([]);
  const [tabledata, setTableData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedRow, setSelectedRow] = useState({});

  const { isLoading, category } = requestState;

  useEffect(() => {}, [selectedRow]);
  const handleRequestButton = (row) => {
    setSelectedRow(data.filter((item) => item.refNum === row.reference)[0]);
    setShowRequestModal(true);
  };

  useEffect(() => {
    if (requestState.requests !== null) {
      const { search_requests, total_rows } = requestState.requests;
      setData(search_requests);
      setTotalRows(total_rows);
      setTableData(handleTableListData(search_requests));
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
    status: "search",
    limit: 10,
    category: "",
    resolutionstatus: "",
  });

  useEffect(() => {
    dispatch(getCategory());

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRequestData = () => {
    const data = { ...filter };
    dispatch(fetchRequest(data));
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
      <h1 className="text-2xl md:text-3xl font-bold text-[#344968]">
        Search Requests
      </h1>
      <section
        className="flex flex-col justify-around w-full mx-auto pt-2 md:pt-5   text-gray-700    
     "
      >
        <div className="flex  flex-col  mt-8">
          <form>
            <div className="flex flex-col  md:flex-row justify-between  mt-1">
              <label className="block md:w-[30%] m-1 ">
                <span className="text-gray-700">Request Category</span>

                <select
                  className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                  {...register("category", {
                    required: "Enter Commission Plan",
                  })}
                  onChange={(e) =>
                    setFilter((draft) => {
                      draft.category = e.target.value;
                    })
                  }
                >
                  <option value="">Select Category</option>
                  {category?.map((i) => (
                    <option key={i.categoryId} value={i.categoryName.trim()}>
                      {i.categoryName}
                    </option>
                  ))}
                </select>
                <span role="alert" className="ml-3 text-[11px] text-red-500">
                  {errors.category?.message}
                </span>
              </label>
              <label className="block  md:w-[30%] m-1 ">
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
                  {...register("resolutionstatus", {
                    required: "Enter Commission Plan",
                  })}
                  onChange={(e) =>
                    setFilter((draft) => {
                      draft.resolutionstatus = e.target.value;
                    })
                  }
                >
                  <option value="">Select Status</option>
                  <option value="Y">Resolved</option>
                  <option value="N">Unresolved</option>
                </select>
                <span role="alert" className="ml-3 text-[11px] text-red-500">
                  {errors.status?.message}
                </span>
              </label>

              <button
                className={`p-2  text-[#ffffff] bg-[#FF7204] text-center hover:drop-shadow-xl md:w-[25%] max-h-[40px] md:mt-7 ${
                  isLoading ? "cursor-not-allowed bg-[#f0a165]" : null
                }`}
                type="button"
                onClick={fetchRequestData}
              >
                <span className="inline-flex ">
                  {isLoading && <Spinner />}{" "}
                  <AiOutlineReload
                    size={20}
                    style={{ color: "#ffffff" }}
                    className="inline-flex mr-2"
                  />{" "}
                  Search
                </span>
              </button>
            </div>
          </form>
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
            />
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
                handleReloadPage={fetchRequestData}
              />
            </ModalComponent>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default SearchRequest;
