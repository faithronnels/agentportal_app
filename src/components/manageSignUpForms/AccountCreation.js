import React, { useState, useEffect, useMemo, Fragment } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdMarkChatRead } from "react-icons/md";
import { useDispatch } from "react-redux/es/exports";
import { useImmer } from "use-immer";
import DataTable from "../commons/DataTable/DataTableBase";
import { fetchRegistrations } from "../../redux/actions/agentRegistrationAction";
import { useAgentRegState, useAuthState } from "../../redux/selectors/index";
import Spinner from "../commons/Spinner";
import ModalComponent from "../commons/ModalComponent";
import ITCreateAccount from "./formProcessing/ITCreateAccount";

const customStyles = {
  headCells: {
    style: {
      fontWeight: "bold",
    },
  },
};

const AccountCreation = () => {
  const regState = useAgentRegState();
  const authState = useAuthState();
  const dispatch = useDispatch();
  const history = useNavigate();
  const { currentUser } = authState;

  const [tabledata, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [iTAccountCreationModal, setITAccountCreationModal] = useState(false);

  const { isLoading } = regState;
  const reload = () => window.location.reload();

  const handleViewButton = (row) => {
    const id = row["Agent Id"];
    history(`/reg/agentaccount/${id}`);
  };

  useEffect(() => {
    if (regState?.agentRegistrations !== null) {
      const { acctCreation_reg, total_rows } = regState.agentRegistrations;

      setTotalRows(total_rows);
      setTableData(handleTableListData(acctCreation_reg));
      setData(acctCreation_reg);
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
            <FaEye
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
    {
      cell: () => (
        <Fragment>
          <div
            onClick={() => setITAccountCreationModal(true)}
            className="border border-1  p-2 text-center text-[#FF7204] shadow-md hover:shadow-xl hover:text-[#ffffff] hover:bg-[#FF7204]"
          >
            {" "}
            <MdMarkChatRead
              size={20}
              // style={{ color: "" }}
              className="inline-flex "
            />{" "}
            Create Account
          </div>
        </Fragment>
      ),
      width: "150px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]);

  const [filter, setFilter] = useImmer({
    pageno: 1,
    status: "accountcreation",
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
      "Account Creation Approver": reg.accountCreationApprover,
    }));

  const handleClosingModal = () => {
    setITAccountCreationModal(false);
    reload();
  };

  return (
    <Fragment>
      {" "}
      <h1 className="text-2xl md:text-3xl font-bold text-[#344968]">
        New Account Creation
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
        {currentUser.roleDescription === "IT" && iTAccountCreationModal && (
          <ModalComponent>
            <ITCreateAccount
              agentInfo={data[0]}
              handleCloseModal={handleClosingModal}
              isLoading={isLoading}
            />
          </ModalComponent>
        )}
      </section>
    </Fragment>
  );
};

export default AccountCreation;
