import React, { Fragment } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import guarantorForm from "../../../assets/agentdownloads/guarantor.pdf";
import termsConditions from "../../../assets/agentdownloads/terms&conditions.pdf";

const guarantorFormDownload = () => {
  const FileSaver = require("file-saver");
  FileSaver.saveAs(guarantorForm, "guarantorform.pdf");
  window.open(guarantorForm, "_blank");
};
const termsConditionDownload = () => {
  window.open(termsConditions, "_blank");
  const FileSaver = require("file-saver");
  FileSaver.saveAs(termsConditions, "terms&conditions.pdf");
};

export const MainMenuTopNav = (props) => {
  const { data, handleSubMenu, subMenu, subMenuContainer, subMenuLinkStyle } =
    props;

  return (
    <Fragment>
      {" "}
      {data.map((item) =>
        item.subMenu ? (
          <div key={item.value}>
            <div className="p-4 relative ">
              <div
                className=" inline-flex items-center"
                onClick={handleSubMenu}
              >
                {item.value}
                {subMenu ? (
                  <MdArrowDropDown size={20} />
                ) : (
                  <MdArrowDropUp size={20} />
                )}
              </div>
            </div>
            {subMenu && (
              <div className={`block mt-5 ${subMenuContainer}`}>
                <div className="flex flex-col">
                  {item.subMenuData.map((subItems) => {
                    if (subItems.value === "Agent Downloads") {
                      return (
                        <div
                          key={subItems.id}
                          className={`${subMenuLinkStyle}`}
                          onClick={guarantorFormDownload}
                        >
                          {subItems.value}
                        </div>
                      );
                    } else if (subItems.value === "Terms & Conditions") {
                      return (
                        <div
                          key={subItems.id}
                          className={`${subMenuLinkStyle}`}
                          onClick={termsConditionDownload}
                        >
                          {subItems.value}
                        </div>
                      );
                    }
                    return (
                      <NavLink
                        key={subItems.id}
                        className={`${subMenuLinkStyle}`}
                        to={subItems.link}
                      >
                        {subItems.value}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <NavLink
            className="p-4 hover:font-bold"
            to={item.link}
            key={item.value}
          >
            {item.value}
          </NavLink>
        )
      )}
    </Fragment>
  );
};

export const MainMenuSideBar = (props) => {
  const {
    data,
    handleSubMenu,
    subMenu,
    subMenuContainer,
    subMenuLinkStyle,
    handleCloseMenu,
    menuLinkStyle,
  } = props;

  return (
    <Fragment>
      {" "}
      {data.map((item) =>
        item.subMenu ? (
          <div
            key={item.value}
            className={`p-2 relative`}
            onClick={handleSubMenu}
          >
            <div className=" inline-flex items-center">
              {item.value}
              {subMenu ? (
                <MdArrowDropDown size={20} />
              ) : (
                <MdArrowDropUp size={20} />
              )}
            </div>
            {subMenu && (
              <div className={`block ${subMenuContainer}`}>
                <div className="flex flex-col">
                  {item.subMenuData.map((subItems) => {
                    if (subItems.value === "Agent Downloads") {
                      return (
                        <div
                          key={subItems.id}
                          className={`${subMenuLinkStyle}`}
                          // to={subItems.link}
                          onClick={() => {
                            handleCloseMenu();
                            guarantorFormDownload();
                          }}
                        >
                          {subItems.value}
                        </div>
                      );
                    } else if (subItems.value === "Terms & Conditions") {
                      return (
                        <div
                          key={subItems.id}
                          className={`${subMenuLinkStyle}`}
                          // to={subItems.link}
                          onClick={() => {
                            handleCloseMenu();
                            termsConditionDownload();
                          }}
                        >
                          {subItems.value}
                        </div>
                      );
                    }
                    return (
                      <NavLink
                        key={subItems.id}
                        className={`${subMenuLinkStyle}`}
                        to={subItems.link}
                        onClick={handleCloseMenu}
                      >
                        {subItems.value}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to={item.link}
            key={item.value}
            className={`${menuLinkStyle} `}
            onClick={handleCloseMenu}
          >
            {item.value}
          </Link>
        )
      )}
    </Fragment>
  );
};

export const DynamicMenuSideBar = (props) => {
  const {
    data,
    handleSubMenu,
    subMenu,
    subMenuContainer,
    subMenuLinkStyle,
    handleCloseMenu,
    menuLinkStyle,
  } = props;

  return (
    <Fragment>
      {" "}
      {data.map((item) =>
        item.subMenu ? (
          <div key={item.value} className={`p-3 relative`}>
            <div className=" inline-flex items-center" onClick={handleSubMenu}>
              {item.value}
              {subMenu ? (
                <MdArrowDropDown size={20} />
              ) : (
                <MdArrowDropUp size={20} />
              )}
            </div>
            {subMenu && (
              <div className={`block ${subMenuContainer}`}>
                <div className="flex flex-col">
                  {item.subMenuData.map((subItems) => {
                    return (
                      <NavLink
                        key={subItems.id}
                        className={`${subMenuLinkStyle}`}
                        to={subItems.link}
                        onClick={handleCloseMenu}
                      >
                        <div className="inline-flex ml-1">
                          {" "}
                          {subItems.icons ? subItems.icons : ""}{" "}
                          {subItems.value}
                        </div>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to={item.link}
            key={item.value}
            className={`${menuLinkStyle} inline-flex ml-1`}
            onClick={handleCloseMenu}
          >
            {item.icons ? item.icons : ""} {item.value}
          </Link>
        )
      )}
    </Fragment>
  );
};
