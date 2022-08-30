import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import {
  // links,
  itDepartmentMenu,
  csuAdminDepartmentMenu,
  csuDepartmentMenu,
  agentMenu,
  acountDepartmentMenu,
} from "../commons/data/data";

import { logoutUser } from "../../redux/actions/authAction.js";

const SideBarContent = ({ handleCloseMenu, currentUser }) => {
  const [menu, setMenu] = useState([]);
  const [heading, setHeading] = useState("");
  const [submenu, setSubmenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlelogout = () => {
    dispatch(logoutUser());
    navigate("/signin", { replace: true });
  };
  const loggedIn = currentUser?.roleDescription;
  // the menu is displayed according to the logged in account
  //  useEffect(() => {}, [currentUser]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setdMenu = () => {
    switch (loggedIn) {
      case "IT":
        setMenu(itDepartmentMenu);
        break;
      case "CSU Admin":
        setMenu(csuAdminDepartmentMenu);
        break;
      case "CSU":
        setMenu(csuDepartmentMenu);
        break;
      case "Principal Agent":
        setMenu(agentMenu);
        break;
      case "Account":
        setMenu(acountDepartmentMenu);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (currentUser !== null) {
      setdMenu();
    }
  }, [setdMenu, currentUser]);

  const handleSubMenu = (item) => {
    heading !== item ? setHeading(item) : setHeading("");
    setSubmenu(!submenu);
  };

  return (
    <div className="h-screen">
      {menu.length > 0 &&
        menu.map((item) => (
          <div key={item.value}>
            {item && (
              <div
                className={`p-2 my-2 text-[#1d1d1d] bg-[#fbfbfb] ${
                  item.link
                    ? "hover:bg-[#1d1d1d] hover:text-[#fbfbfb] hover:cursor-pointer"
                    : ""
                }
`}
              >
                {item.link && (
                  <Link to={item.link} onClick={handleCloseMenu}>
                    <div className="inline-flex">
                      {" "}
                      <span> {item.icons ? item.icons : null}</span>{" "}
                      {item.value}
                    </div>
                  </Link>
                )}
                {item.subMenu && (
                  <Fragment>
                    <div
                      className="inline-flex "
                      onClick={() => handleSubMenu(`${item.value}`)}
                    >
                      {item.value}
                      <span> {item.icons ? item.icons : null}</span>
                      <span className="pt-1">
                        {" "}
                        {item.subMenu && heading === item.value ? (
                          <MdArrowDropDown size={20} />
                        ) : (
                          <MdArrowDropUp size={20} />
                        )}
                      </span>
                    </div>
                    <div
                      className={heading === item.value ? "block" : "hidden"}
                    >
                      {item.subMenuData.map((submenuItems, i) => (
                        <div
                          key={i}
                          className="p-2 text-[#1d1d1d] bg-[#fbfbfb]  hover:bg-[#1d1d1d] hover:text-[#fbfbfb]"
                        >
                          <Link
                            to={submenuItems.link}
                            onClick={handleCloseMenu}
                          >
                            {" "}
                            <span className="inline-flex">
                              {submenuItems.icons ? submenuItems.icons : null}{" "}
                              {submenuItems.value}
                            </span>{" "}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </Fragment>
                )}
              </div>
            )}
          </div>
        ))}
      <div
        onClick={handlelogout}
        className="p-2 my-2 text-[#1d1d1d] bg-[#fbfbfb] hover:bg-[#1d1d1d] hover:text-[#fbfbfb] hover:cursor-pointer"
      >
        <div className="inline-flex">
          <span>
            <FiLogOut size={15} className="mr-1 mt-1" />
          </span>
          Log Out
        </div>
      </div>
    </div>
  );
};

export default SideBarContent;
