import { useState } from "react";
import "./style.css";
import HomeIcon from "@mui/icons-material/Home";
import {
  AddModerator,
  BarChart,
  Block,
  ContactsOutlined,
  Group,
  LocalPhone,
  LogoutRounded,
  ManageAccounts,
  MenuRounded,
  Newspaper,
  PersonAddAltRounded,
  PieChartOutline,
  ReportProblemRounded,
  Settings,
  Timeline,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Logout from "../Pages/Auth/Logout";

export default function Sidebar() {
  const navigate = useNavigate();
  const [currentActive, setCurrentActive] = useState("dash");
  const [menuActive, setMenuActive] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(true);

  const handleSubmenuClick = (path) => {
    setSubmenuVisible(false);
    navigate(path);
  };

  return (
    <div className={`side ${menuActive ? "expanded" : ""}`}>
      <div className="top-button">
        <button
          onClick={() => {
            setMenuActive(!menuActive);
          }}
          className={`menu-button ${menuActive ? "rotated" : ""}`}
        >
          <MenuRounded />
        </button>
      </div>

      <div className="middle-buttons">
        <button
          onClick={() => {
            setCurrentActive("dash");
            navigate("");
            setSubmenuVisible(false);
          }}
          className={currentActive === "dash" ? "active" : ""}
        >
          <HomeIcon />
          {menuActive && <span>Dashboard</span>}
        </button>

        <div className="submenu-container">
          <button
            onClick={() => {
              setSubmenuVisible(true);
            }}
            className={currentActive === "manage" ? "active" : ""}
          >
            <ManageAccounts />
            {menuActive && <span>Manage Team</span>}
          </button>
          {submenuVisible && (
            <div className="submenu">
              <button
                onClick={() => {
                  handleSubmenuClick("/Roles");
                  setCurrentActive("manage");
                  navigate("/Roles");
                }}
                className="submenu-item"
              >
                <AddModerator /> {menuActive && <span>Roles</span>}
              </button>
              <button
                onClick={() => {
                  handleSubmenuClick("/Employee");
                  setCurrentActive("manage");
                  navigate("/Employee");
                }}
                className="submenu-item"
              >
                <PersonAddAltRounded />
                {menuActive && <span>Employee</span>}
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            setCurrentActive("user");
            navigate("/Users");
            setSubmenuVisible(false);
          }}
          className={currentActive === "user" ? "active" : ""}
        >
          <Group />
          {menuActive && <span>Users</span>}
        </button>
        <button
          onClick={() => {
            setCurrentActive("posts");
            navigate("/Posts");
            setSubmenuVisible(false);
          }}
          className={currentActive === "posts" ? "active" : ""}
        >
          <ContactsOutlined />
          {menuActive && <span>Posts</span>}
        </button>
        <button
          onClick={() => {
            setCurrentActive("block");
            navigate("/Block");
            setSubmenuVisible(false);
          }}
          className={currentActive === "block" ? "active" : ""}
        >
          <Block />
          {menuActive && <span>Block</span>}
        </button>
        <button
          onClick={() => {
            setCurrentActive("reports");
            navigate("/Reports");
            setSubmenuVisible(false);
          }}
          className={currentActive === "reports" ? "active" : ""}
        >
          <ReportProblemRounded />
          {menuActive && <span>Reports</span>}
        </button>

        <button
          onClick={() => {
            setCurrentActive("News");
            navigate("News");
            setSubmenuVisible(false);
          }}
          className={currentActive === "News" ? "active" : ""}
        >
          <Newspaper />
          {menuActive && <span>News</span>}
        </button>
        <button
          onClick={() => {
            setCurrentActive("Contact");
            navigate("Contact-Us");
            setSubmenuVisible(false);
          }}
          className={currentActive === "Contact" ? "active" : ""}
        >
          <LocalPhone />
          {menuActive && <span>Contact Us</span>}
        </button>
        <button
          onClick={() => {
            setCurrentActive("Settings");
            navigate("Settings");
            setSubmenuVisible(false);
          }}
          className={currentActive === "Settings" ? "active" : ""}
        >
          <Settings />
          {menuActive && <span>Settings</span>}
        </button>
      </div>
      <div className="logout-button ">
        <Logout menuActive />
      </div>
    </div>
  );
}
