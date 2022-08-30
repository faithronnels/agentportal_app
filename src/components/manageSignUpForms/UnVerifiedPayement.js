import React, { useState, useEffect, useMemo, Fragment } from "react";

import { AiOutlineReload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdMarkChatRead } from "react-icons/md";
import { useDispatch } from "react-redux/es/exports";
import { useImmer } from "use-immer";

import DataTable from "../commons/DataTable/DataTableBase";
import { fetchRegistrations } from "../../redux/actions/agentRegistrationAction";
import { useAgentRegState } from "../../redux/selectors/index";
import Spinner from "../commons/Spinner";

const customStyles = {
  headCells: {
    style: {
      fontWeight: "bold",
    },
  },
};

const UnVerifiedPayments = () => {
  const regState = useAgentRegState();
  const dispatch = useDispatch();
  const history = useNavigate();

  const [tabledata, setTableData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);

  const { isLoading } = regState;

  const handleViewButton = (row) => {
    const id = row["Agent Id"];
    history(`/reg/agentaccount/${id}`);
  };

  useEffect(() => {
    if (regState?.agentRegistrations !== null) {
      const { unverified_reg, total_rows } = regState.agentRegistrations;

      setTotalRows(total_rows);
      setTableData(handleTableListData(unverified_reg));
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
      name: "Payment Status",
      cell: (row) => (
        <Fragment>
          {row["Payment Comfirmation"] === "no_dep" ? (
            "No Deposit"
          ) : (
            <Fragment>
              {row["Payment Comfirmation"] === "incomplete_dep"
                ? "Incomplete Deposit"
                : "Payment Processing"}
            </Fragment>
          )}
        </Fragment>
      ),
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
    status: "unverified",
    limit: 10,
  });

  useEffect(() => {
    fetchRegData(filter);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

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
      "Mobile Number": `'${reg.mobilenumber}`,
      "Origin LGA": reg.originLga,
      "Phone Number": `'${reg.phonenumber}`,
      "Residence LGA": reg.residenceLga,
      "Residence State": reg.residenceState,
      "Account Approval Status": reg.accountApprovalStatus,
      "Bank Name": reg.accountBankName,
      "Account Bank Remark": reg.accountBankRemark,
      "Payment Verification Date": reg.accountVerificationDate,
      "Accountant Name": reg.accountantName,
      "Accountant Remark": reg.accountantRemark,
      "Agent Bank Account Name": reg.agentAccountName,
      "Agent Bank Account Number": `'${reg.agentAccountNum}`,
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
      "Payment Comfirmation": reg.paymentConfirmation,
    }));

  return (
    <Fragment>
    
        {" "}
        <h1 className="text-2xl md:text-3xl font-bold text-[#344968]">
          Unverified Payments
        </h1>
        <section
          className="flex flex-col justify-around w-full mx-auto pt-2 md:pt-5   text-gray-700    
     "
        >
          <div className="flex  flex-col md:flex-row justify-start mt-8">
            <button
              className=" p-3 mx-2 text-[#ffffff] bg-[#FF7204] text-center hover:drop-shadow-xl"
              type="button"
              onClick={() => fetchRegData(filter)}
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
              />
            </div>
          ) : (
            <div className="p-4 ">No Records Avalable</div>
          )}
        </section>
     
    </Fragment>
  );
};

export default UnVerifiedPayments;
