import React, { useState, useEffect, useMemo, Fragment } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdMarkChatRead } from "react-icons/md";
import { useDispatch } from "react-redux/es/exports";
import { useImmer } from "use-immer";
import { useForm } from "react-hook-form";
import DataTable from "../commons/DataTable/DataTableBase";
import { fetchRegistrations } from "../../redux/actions/agentRegistrationAction";
import { useAgentRegState } from "../../redux/selectors/index";
import Spinner from "../commons/Spinner";
import { stateList } from "../commons/data/stateLists";

const customStyles = {
  headCells: {
    style: {
      fontWeight: "bold",
    },
  },
};

const SearchReport = () => {
  const regState = useAgentRegState();
  const dispatch = useDispatch();
  const history = useNavigate();

  const [tabledata, setTableData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [searchType, setSearchType] = useState("");
  const [searchData, setSearchData] = useState("");

  const { isLoading } = regState;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleViewButton = (row) => {
    const id = row["Agent Id"];
    history(`/reg/agentaccount/${id}`);
  };

  useEffect(() => {
    if (regState?.agentRegistrations !== null) {
      const { search_result, total_rows } = regState.agentRegistrations;

      setTotalRows(total_rows);
      setTableData(handleTableListData(search_result));
    } else {
      setTableData([]);
      setTotalRows(0);
    }
    return () => {};
  }, [regState.agentRegistrations]);
 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => [
    {
      name: "Registration Ref Num",
      selector: (row) => row["Reference Num"],
      sortable: true,
    },
    {
      name: "Agent Names",
      selector: (row) => (
        <span>
          {row["Firstname"]} {row["MiddleName"] ? row["MiddleName"] : null}{" "}
          {row["Surname"]}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Application Date",
      selector: (row) => row["Registration Date"],
      sortable: true,
      maxWidth: "200px",
    },
    {
      name: "Business State",
      selector: (row) => row["Business State"],
      sortable: true,
    },

    {
      cell: (row) => (
        <Fragment>
          <div
            onClick={() => handleViewButton(row)}
            className="border border-1  p-2 text-center text-[#FF7204] shadow-md hover:shadow-xl hover:text-[#ffffff] hover:bg-[#FF7204]"
          >
            {" "}
            <MdMarkChatRead
              size={20}
              // style={{ color: "" }}
              className="inline-flex "
            />{" "}
            View
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
  });
 
  // useEffect(() => {
  //   fetchRegData(filter);
  //   return () => {};
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filter]);

  const fetchRegData = (filter) => {
    dispatch(fetchRegistrations(filter));
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

  const handleTableListData = (regs) =>
    regs?.map((reg) => ({
      "Reference Num": reg.refNum,
      "Registration Date": reg.registrationDate,
      Surname: reg.surname,
      MiddleName: reg.middlename,
      Firstname: reg.firstname,
      Gender: reg.gender,
      Title: reg.title,
      "State of Origin": reg.originState,
      "Date of Birth": reg.dob,
      Email: reg.emailId,
      "Residential Address": reg.residenceAddress,
      "Mobile Number": reg.mobilenumberr + String.fromCharCode(8203),
      "Origin LGA": reg.originLga,
      "Phone Number": reg.phonenumber + String.fromCharCode(8203),
      "Residence LGA": reg.residenceLga,
      "Residence State": reg.residenceState,
      "Account Approval Status": reg.accountApprovalStatus,
      "Bank Name": reg.accountBankName,
      "Account Bank Remark": reg.accountBankRemark,
      "Payment Verification Date": reg.accountVerificationDate,
      "Accountant Name": reg.accountantName,
      "Accountant Remark": reg.accountantRemark,
      "Agent Bank Account Name": reg.agentAccountName,
      "Agent Bank Account Number":
        reg.agentAccountNum + String.fromCharCode(8203),
      "Existing Agent": reg.agentExistStatus,
      "Shop Id": reg.agentShopId,
      "Agent Bank Name": reg.agentbankName,
      "Agent Id": reg.agentid,
      "Business Address": reg.businessAddress,
      "Business LGA": reg.businessLga,
      "Business State": reg.businessState,
      "Commission Plan": reg.commissionPlan,
      "CSU Approving Staff": reg.csuApprovingStaffComment,
      "CSU Approving Staff Name": reg.csuApprovingStaffName,
      "Deposit Amount": reg.depositAmount,
      "Deposit Comment": reg.depositComment,
      "Deposit Date": reg.depositDate,
      "Deposit Seen": reg.depositSeen,
      "Deposit Name": reg.depositorName,
      "Existing Shopname": reg.existingShopname,
      "Merrybet Credited Bank": reg.mbBankName,
    }));

  const handleShow = (e) => {
    setSearchType(e.target.value);
  };
  const onSubmit = (payload) => {
    payload.searchType = searchType;
    payload.searchData = searchData;
    payload.pageno = filter.pageno;
    payload.limit = filter.limit;
    payload.status = filter.status;
    fetchRegData(payload);
  };

  return (
    <Fragment>
     
        {" "}
        <h1 className="text-2xl md:text-3xl font-bold text-[#344968]">
          Advanced Search
        </h1>
        <section
          className="flex flex-col justify-around w-full mx-auto pt-2 md:pt-5   text-gray-700    
     "
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" my-1"></div>
            <div className="flex  flex-col md:flex-row justify-between mt-8">
              <div className="flex flex-col  md:flex-row justify-between md:w-[70%] mt-1">
                <label className="block md:w-[30%] m-1 ">
                  <span className="text-gray-700">Search Type</span>

                  <select
                    className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                    {...register("paymentConfirmation", {
                      required: "Enter Commission Plan",
                    })}
                    onChange={handleShow}
                  >
                    <option value="">Select search type</option>
                    <option value="refNum">By Reg RefNum</option>
                    <option value="shopLocation">By Shop Location</option>
                    <option value="shopName">By ShopName</option>
                  </select>
                  <span role="alert" className="ml-3 text-[11px] text-red-500">
                    {errors.paymentConfirmation?.message}
                  </span>
                </label>
                {searchType === "shopLocation" && (
                  <label className="block md:w-[35%] m-1 ">
                    <span className="text-gray-700">Select Shops Location</span>

                    <select
                      className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                      {...register("shopLocation")}
                      onChange={(e) => setSearchData(e.target.value)}
                    >
                      <option value="">Select State</option>
                      {stateList.map((i) => (
                        <option key={i.id} value={i.name}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                    <span
                      role="alert"
                      className="ml-3 text-[11px] text-red-500"
                    >
                      {errors.shopLocation?.message}
                    </span>
                  </label>
                )}
                {searchType !== "shopLocation" && (
                  <label className="block md:w-[35%]  m-1">
                    <span className="text-gray-700">Search Value</span>

                    <input
                      type="text"
                      className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                      placeholder="Enter Search Value"
                      {...register("searchValue")}
                      onChange={(e) => setSearchData(e.target.value)}
                    />
                    <span
                      role="alert"
                      className="text-[11px] text-red-500 ml-3"
                    >
                      {errors.searchValue?.message}
                    </span>
                  </label>
                )}
                <button
                  className={`p-2  text-[#ffffff] bg-[#FF7204] text-center hover:drop-shadow-xl md:w-[25%] max-h-[40px] md:mt-7 ${
                    isLoading ? "cursor-not-allowed bg-[#f0a165]" : null
                  }`}
                  type="submit"
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
            </div>
          </form>

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
        </section>
      
    </Fragment>
  );
};

export default SearchReport;
