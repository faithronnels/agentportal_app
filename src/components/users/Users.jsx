import React, { useState, useEffect, useMemo, Fragment } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { AiOutlineReload } from "react-icons/ai";
import { useDispatch } from "react-redux/es/exports";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import ModalComponent from "../commons/ModalComponent";
import DataTable from "../commons/DataTable/DataTableBase";
import { getAllUser, getUserRoles } from "../../redux/actions/userAction";
import { useUserState, useAuthState } from "../../redux/selectors/index";
import Spinner from "../commons/Spinner";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";


const customStyles = {
  headCells: {
    style: {
      paddingLeft: "8px",
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

const Users = () => {
  const userState = useUserState();
  const authState = useAuthState();
  const dispatch = useDispatch();
  // const location = useLocation();

  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [updateModal, setupdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleupdateModal = () => setupdateModal(true);
  const handledeleteModal = () => setDeleteModal(true);

  const handleClose = () => {
    setupdateModal(false);
    setDeleteModal(false);
  };

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getUserRoles());
  }, [dispatch]);

  const { currentUser } = authState;

  useEffect(() => {}, [selectedRow]);

  useEffect(() => {
    if (userState.users !== null) {
      setData(handleTableListData(userState.users));
    } else {
      setData([]);
    }
    return () => {};
  }, [userState.users]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => [
    {
      name: "Full names",
      selector: (row) => row.fullname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.roleDescription,
      sortable: true,
    },

    {
      cell: (row) => (
        <Fragment>
          <div
            onClick={() => handleConfirmUpdate(row)}
            className="border border-1  p-1 text-center shadow-md"
          >
            {" "}
            <FiEdit
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
    {
      cell: (row) => (
        <Fragment>
          <div
            onClick={() => handleConfirmDelete(row)}
            className="border border-1  p-1 text-center shadow-md"
          >
            {" "}
            <MdDelete
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

  const handleTableListData = (items) =>
    items?.map((item) => ({
      fullname: item.fullname,
      email: item.email,
      roleDescription: item.roleDescription,
      role: item.role_id !== 5 ? "Staff" : "Principal Agent",
      userId: item.userId,
      roleId: item.role_id,
    }));

  const handleConfirmUpdate = (row) => {
    setSelectedRow(row);
    handleupdateModal();
  };

  const handleConfirmDelete = (row) => {
    setSelectedRow(row);
    handledeleteModal();
  };

  const handleReloadPage = () => {
    dispatch(getAllUser());
    dispatch(getUserRoles());
  };

  return (
    <Fragment>
      {" "}
      <h1 className="text-2xl md:text-3xl font-bold text-[#344968]">
        View Users
      </h1>
      {currentUser &&
        currentUser.Is_principal_agent === "false" &&
        (currentUser.roleDescription === "CSU Admin" ||
          currentUser.roleDescription === "IT") && (
          <section
            className="flex flex-col justify-around w-full mx-auto pt-2 md:pt-5   text-gray-700    
     "
          >
            <div className="flex  flex-col md:flex-row justify-start mt-8">
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
              <button
                className=" p-3 mx-2 w-[150px] text-[#ffffff] bg-[#FF7204] text-center hover:drop-shadow-xl"
                type="button"
                onClick={() => dispatch(getAllUser())}
              >
                <AiOutlineReload
                  size={25}
                  style={{ color: "#ffffff" }}
                  className="inline-flex mr-2"
                />{" "}
                Reload Page
              </button>
            </div>

            {data && (
              <div>
                <DataTable
                  keyField="userId"
                  progressComponent={<Spinner />}
                  columns={columns}
                  tableList={data}
                  pagination
                  customStyles={customStyles}
                />

                <div className="relative">
                  {deleteModal && (
                    <ModalComponent>
                      <DeleteUser
                        selectedRow={selectedRow}
                        handleCloseModal={handleClose}
                        handleReload={handleReloadPage}
                      />
                    </ModalComponent>
                  )}
                </div>

                <div className="relative">
                  {updateModal && (
                    <ModalComponent>
                      <UpdateUser
                        selectedRow={selectedRow}
                        handleCloseModal={handleClose}
                        handleReload={handleReloadPage}
                      />
                    </ModalComponent>
                  )}
                </div>

                <div className="relative">
                  {showAddModal && (
                    <ModalComponent>
                      <AddUser
                        handleCloseModal={() => setShowAddModal(false)}
                        // handleReload={handleReloadPage}
                      />
                    </ModalComponent>
                  )}
                </div>
              </div>
            )}
          </section>
        )}
    </Fragment>
  );
};

export default Users;
