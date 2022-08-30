import { FaEnvelopeOpen, FaEnvelopeOpenText, FaUserAlt } from "react-icons/fa";
import { MdMarkChatRead } from "react-icons/md";
import {
  BsStack,
  BsFileEarmarkCheckFill,
  BsFileEarmarkExcelFill,
  BsFileEarmarkArrowUpFill,
} from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { RiMailSettingsFill, RiSearchLine } from "react-icons/ri";
import { FaUsers, FaFileArchive } from "react-icons/fa";
import { BsBellFill } from "react-icons/bs";
export const mainMenu = [
  { id: 1, value: "Explore", link: "/", subMenu: false },
  { id: 2, value: "Commissions", link: "commission", subMenu: false },
  {
    id: 3,
    value: "Resources",
    subMenu: true,
    subMenuData: [
      { id: 1, value: "Agent Downloads", link: "/", subMenu: false },
      { id: 2, value: "Terms & Conditions", link: "/", subMenu: false },
    ],
  },
  { id: 4, value: "Register", link: "signup", subMenu: false },
  { id: 5, value: "Login", link: "signin", subMenu: false },
];

export const agentMenu = [
  {
    id: 1,
    value: "Request",
    subMenu: true,
    subMenuData: [
      {
        id: 1,
        value: "All Requests",
        link: "/requests/view",
        subMenu: false,
        icons: <BsStack size={15} className="mr-1 mt-1" />,
      },
      {
        id: 2,
        value: "Resolved Requests",
        link: "/requests/resolved",
        subMenu: false,
        icons: <MdMarkChatRead size={15} className="mr-1 mt-1" />,
      },
      {
        id: 3,
        value: "Unresolved Requests",
        link: "/requests/unresolved",
        subMenu: false,
        icons: <FaEnvelopeOpen size={15} className="mr-1 mt-1" />,
      },
    ],
  },
  {
    id: 2,
    value: "Profile",
    link: "/profile",
    subMenu: false,
    icons: <FaUserAlt size={15} className="mr-1 mt-1" />,
  },
  {
    id: 3,
    value: "Notifications",
    link: "/dashboard",
    subMenu: false,
    icons: <BsBellFill size={15} className="mr-1 mt-1" />,
  },
];
export const itDepartmentMenu = [
  {
    id: 1,
    value: "Manage Registration",
    subMenu: true,
    subMenuData: [
      {
        id: 1,
        value: "New Account Creation",
        link: "/reg/new",
        subMenu: false,
        icons: <FiEdit size={15} className="mr-1 mt-1" />,
      },
      {
        id: 2,
        value: "Archive",
        link: "/reg/archive",
        subMenu: false,
        icons: <FaFileArchive size={15} className="mr-1 mt-1" />,
      },
      {
        id: 3,
        value: "Advanced Search",
        link: "/reg/search",
        subMenu: false,
        icons: <RiSearchLine size={15} className="mr-1 mt-1" />,
      },
    ],
  },
  {
    id: 2,
    value: "Manage Request",
    subMenu: true,
    subMenuData: [
      {
        id: 1,
        value: "Pending Request",
        link: "/requests/update",
        subMenu: false,
        icons: <RiMailSettingsFill size={15} className="mr-1 mt-1" />,
      },
      {
        id: 2,
        value: "All Requests",
        link: "/requests/view",
        subMenu: false,
        icons: <BsStack size={15} className="mr-1 mt-1" />,
      },
      {
        id: 3,
        value: "Resolved Requests",
        link: "/requests/resolved",
        subMenu: false,
        icons: <MdMarkChatRead size={15} className="mr-1 mt-1" />,
      },
      {
        id: 4,
        value: "Unresolved Requests",
        link: "/requests/unresolved",
        subMenu: false,
        icons: <FaEnvelopeOpenText size={15} className="mr-1 mt-1" />,
      },
      {
        id: 5,
        value: "Request Search",
        link: "/requests/search",
        subMenu: false,
        icons: <RiSearchLine size={15} className="mr-1 mt-1" />,
      },
    ],
  },

  {
    id: 4,
    value: "Users",
    link: "/users",
    subMenu: false,
    icon: true,
    icons: <FaUsers size={15} className="mr-1 mt-1" />,
  },
  {
    id: 5,
    value: "Profile",
    link: "/profile",
    subMenu: false,
    icon: true,
    icons: <FaUserAlt size={15} className="mr-1 mt-1" />,
  },
];

export const acountDepartmentMenu = [
  {
    id: 1,
    value: "Manage Registration",
    subMenu: true,
    subMenuData: [
      {
        id: 1,
        value: "New Registrations",
        link: "/reg/new",
        subMenu: false,
        icons: <FiEdit size={15} className="mr-1 mt-1" />,
      },
      {
        id: 2,
        value: "Verified Reg",
        link: "/reg/verified",
        subMenu: false,
        icons: <BsFileEarmarkCheckFill size={15} className="mr-1 mt-1" />,
      },
      {
        id: 3,
        value: "Unverified Reg",
        link: "/reg/unverified",
        subMenu: false,
        icons: <BsFileEarmarkExcelFill size={15} className="mr-1 mt-1" />,
      },
      {
        id: 4,
        value: "Advanced Search",
        link: "/reg/search",
        subMenu: false,
        icons: <RiSearchLine size={15} className="mr-1 mt-1" />,
      },
    ],
  },

  {
    id: 3,
    value: "Profile",
    link: "/profile",
    subMenu: false,
    icons: <FaUserAlt size={15} className="mr-1 mt-1" />,
  },
];
export const csuDepartmentMenu = [
  {
    id: 1,
    value: "Manage Registration",
    subMenu: true,
    subMenuData: [
      {
        id: 1,
        value: "New Registration",
        link: "/reg/new",
        subMenu: false,
        icons: <FiEdit size={15} className="mr-1 mt-1" />,
      },
      {
        id: 2,
        value: "Verified Reg",
        link: "/reg/verified",
        subMenu: false,
        icons: <BsFileEarmarkCheckFill size={15} className="mr-1 mt-1" />,
      },
      {
        id: 3,
        value: "Unverified Reg",
        link: "/reg/unverified",
        subMenu: false,
        icons: <BsFileEarmarkExcelFill size={15} className="mr-1 mt-1" />,
      },
      {
        id: 4,
        value: "Created Accounts",
        link: "/reg/archive",
        subMenu: false,
        icons: <BsFileEarmarkArrowUpFill size={15} className="mr-1 mt-1" />,
      },
      {
        id: 5,
        value: "Advanced Search",
        link: "/reg/search",
        subMenu: false,
        icons: <RiSearchLine size={15} className="mr-1 mt-1" />,
      },
    ],
  },
  {
    id: 2,
    value: "Manage Request",
    subMenu: true,
    subMenuData: [
      {
        id: 1,
        value: "Pending Request",
        link: "/requests/update",
        subMenu: false,
        icons: <RiMailSettingsFill size={15} className="mr-1 mt-1" />,
      },
      {
        id: 2,
        value: "All Requests",
        link: "/requests/view",
        subMenu: false,
        icons: <BsStack size={15} className="mr-1 mt-1" />,
      },
      {
        id: 3,
        value: "Resolved Requests",
        link: "/requests/resolved",
        subMenu: false,
        icons: <MdMarkChatRead size={15} className="mr-1 mt-1" />,
      },
      {
        id: 4,
        value: "Unresolved Requests",
        link: "requests/unresolved",
        subMenu: false,
        icons: <FaEnvelopeOpenText size={15} className="mr-1 mt-1" />,
      },
      {
        id: 2,
        value: "Request Search",
        link: "/requests/search",
        subMenu: false,
        icons: <RiSearchLine size={15} className="mr-1 mt-1" />,
      },
    ],
  },

  {
    id: 3,
    value: "Profile",
    link: "/profile",
    subMenu: false,
    icons: <FaUserAlt size={15} className="mr-1 mt-1" />,
  },
];
export const csuAdminDepartmentMenu = [
  {
    id: 1,
    value: "Manage Registration",
    subMenu: true,
    subMenuData: [
      {
        id: 1,
        value: "New Registration",
        link: "/reg/new",
        subMenu: false,
        icons: <FiEdit size={15} className="mr-1 mt-1" />,
      },
      {
        id: 2,
        value: "Verified Reg",
        link: "/reg/verified",
        subMenu: false,
        icons: <BsFileEarmarkCheckFill size={15} className="mr-1 mt-1" />,
      },
      {
        id: 3,
        value: "Unverified Reg",
        link: "/reg/unverified",
        subMenu: false,
        icons: <BsFileEarmarkExcelFill size={15} className="mr-1 mt-1" />,
      },
      {
        id: 4,
        value: "Created Accounts",
        link: "/reg/archive",
        subMenu: false,
        icons: <BsFileEarmarkCheckFill size={15} className="mr-1 mt-1" />,
      },
      {
        id: 5,
        value: "Advanced Search",
        link: "/reg/search",
        subMenu: false,
        icons: <RiSearchLine size={15} className="mr-1 mt-1" />,
      },
    ],
  },
  {
    id: 2,
    value: "Manage Request",
    subMenu: true,
    subMenuData: [
      {
        id: 1,
        value: "Pending Request",
        link: "update",
        subMenu: false,
        icons: <RiMailSettingsFill size={15} className="mr-1 mt-1" />,
      },
      {
        id: 2,
        value: "All Requests",
        link: "/requests/view",
        subMenu: false,
        icons: <BsStack size={15} className="mr-1 mt-1" />,
      },
      {
        id: 3,
        value: "Resolved Requests",
        link: "/requests/resolved",
        subMenu: false,
        icons: <MdMarkChatRead size={15} className="mr-1 mt-1" />,
      },
      {
        id: 4,
        value: "Unresolved Requests",
        link: "/requests/unresolved",
        subMenu: false,
        icons: <FaEnvelopeOpenText size={15} className="mr-1 mt-1" />,
      },
      {
        id: 5,
        value: "Request Search",
        link: "/requests/search",
        subMenu: false,
        icons: <RiSearchLine size={15} className="mr-1 mt-1" />,
      },
    ],
  },
  {
    id: 3,
    value: "Users",
    link: "/users",
    subMenu: false,
    icon: true,
    icons: <FaUsers size={15} className="mr-1 mt-1" />,
  },

  {
    id: 4,
    value: "Profile",
    link: "/profile",
    subMenu: false,
    icons: <FaUserAlt size={15} className="mr-1 mt-1" />,
  },
];
export const biWeeklyCommissionData = [
  { type: "Single (1 outcome)", percentage: "1.0" },
  { type: "Double (2 outcomes)", percentage: "2.0" },
  { type: "3 games (3 outcomes)", percentage: "4.0" },
  { type: "4 games (4 outcomes)", percentage: "8.0" },
  { type: "5 games (5 outcomes)", percentage: "8.0" },
  { type: "6 games (6 outcomes)", percentage: "10.0" },
  { type: "7 games (7 outcomes)", percentage: "10.0" },
  { type: "8 games (8 outcomes)", percentage: "10.0" },
  { type: "9 games (9 outcomes)", percentage: "14.0" },
  { type: "10 games (10 outcomes)", percentage: "14.0" },
  { type: "11 games (11 outcomes)", percentage: "14.0" },
  { type: "12 games (12 outcomes)", percentage: "14.0" },
  { type: "13 games (13 outcomes)", percentage: "14.0" },
  { type: "14 games (14 outcomes)", percentage: "20.0" },
  { type: "15 games (15 outcomes)", percentage: "20.0" },
  { type: "16 games (16 outcomes)", percentage: "24.0" },
  { type: "17 games (17 outcomes)", percentage: "24.0" },
  { type: "18 games (18 outcomes)", percentage: "24.0" },
  { type: "19 games (19 outcomes)", percentage: "24.0" },
  { type: "20 games (20 outcomes)", percentage: "26.0" },
  { type: "21 games (21 outcomes)", percentage: "26.0" },
  { type: "22 games (22 outcomes)", percentage: "26.0" },
  { type: "23 games (23 outcomes)", percentage: "26.0" },
  { type: "24 games (24 outcomes)", percentage: "26.0" },
  { type: "25 games (25 outcomes)", percentage: "30.0" },
  { type: "26 games (26 outcomes)", percentage: "30.0" },
  { type: "27 games (27 outcomes)", percentage: "30.0" },
  { type: "28 games (28 outcomes)", percentage: "30.0" },
  { type: "29 games (29 outcomes)", percentage: "30.0" },
  { type: "30 games (30 outcomes)", percentage: "30.0" },
  { type: "31 games (31 outcomes)", percentage: "40.0" },
  { type: "32 games (32 outcomes)", percentage: "40.0" },
  { type: "33 games (33 outcomes)", percentage: "40.0" },
  { type: "34 games (34 outcomes)", percentage: "40.0" },
  { type: "35 games (35 outcomes)", percentage: "40.0" },
  { type: "36 games (36 outcomes)", percentage: "40.0" },
  { type: "37 games (37 outcomes)", percentage: "40.0" },
  { type: "38 games (38 outcomes)", percentage: "40.0" },
  { type: "39 games (39 outcomes)", percentage: "40.0" },
  { type: "40 games (40 outcomes)", percentage: "40.0" },
  { type: "41 games (41 outcomes)", percentage: "40.0" },
  { type: "42 games (42 outcomes)", percentage: "40.0" },
  { type: "43 games (43 outcomes)", percentage: "40.0" },
  { type: "44 games (44 outcomes)", percentage: "40.0" },
  { type: "45 games (45 outcomes)", percentage: "40.0" },
];
export const virtualWeeklyBonus = [
  {
    sales: "N50,000 – N99,999",
    bonus: "N1,250",
  },
  {
    sales: "N100,000 – N199,999",
    bonus: "N2,500",
  },
  {
    sales: "N200,000 – N299,999",
    bonus: "N5,000",
  },
  {
    sales: "N300,000 – N499,999",
    bonus: "N7,500",
  },
  {
    sales: "N500,000 – N799,999",
    bonus: "N12,500",
  },
  {
    sales: "N800,000 – N999,999",
    bonus: "N20,000",
  },
  {
    sales: "N1,000,000 – N1,299,999",
    bonus: "N25,000",
  },
  {
    sales: "N1,300,000 –N1,499,999",
    bonus: "N32,500",
  },
  {
    sales: "N1,500,000 – N1,999,999",
    bonus: "N37,500",
  },
  {
    sales: "N2,000,000 - N2,999,999",
    bonus: "N50,000",
  },
  {
    sales: "N3,000,000 – N3,999,999",
    bonus: "N75,000",
  },
  {
    sales: "N4,000,000 – N4,999,999",
    bonus: "N100,000",
  },
  {
    sales: "N5,000,000 and above",
    bonus: "N125,000",
  },
];
