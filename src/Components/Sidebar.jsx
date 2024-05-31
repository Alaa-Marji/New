import { useState } from "react";
import "./style.css";
import HomeIcon from "@mui/icons-material/Home";
import {
  BarChart,
  Block,
  ContactsOutlined,
  Group,
  LogoutRounded,
  ManageAccounts,
  MenuRounded,
  PieChartOutline,
  ReportProblemRounded,
  Timeline,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const [currentActive, setCurrentActive] = useState("home");
  const [menuActive, setMenuActive] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false);

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
          }}
          className={currentActive === "dash" ? "active" : ""}
        >
          <HomeIcon />
          {menuActive && <span>Dashboard</span>}
        </button>

        <div className="submenu-container">
          <button
            onClick={() => setSubmenuVisible(!submenuVisible)}
            className={currentActive === "manage" ? "active" : ""}
          >
            <ManageAccounts />
            {menuActive && <span>Manage Team</span>}
          </button>
          {submenuVisible && (
            <div className="submenu">
              <button
                onClick={() => handleSubmenuClick("/Roles")}
                className="submenu-item"
              >
                Roles
              </button>
              <button
                onClick={() => handleSubmenuClick("/Employee")}
                className="submenu-item"
              >
                Employee
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            setCurrentActive("user");
            navigate("/Users");
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
          }}
          className={currentActive === "reports" ? "active" : ""}
        >
          <ReportProblemRounded />
          {menuActive && <span>Reports</span>}
        </button>

        <button
          onClick={() => {
            setCurrentActive("Line");
            navigate("");
          }}
          className={currentActive === "Line" ? "active" : ""}
        >
          <Timeline />
          {menuActive && <span>Line Chart</span>}
        </button>
        <button
          onClick={() => {
            setCurrentActive("pie");
            navigate("");
          }}
          className={currentActive === "pie" ? "active" : ""}
        >
          <PieChartOutline />
          {menuActive && <span>Pie Chart</span>}
        </button>
        <button
          onClick={() => {
            setCurrentActive("bar");
            navigate("");
          }}
          className={currentActive === "bar" ? "active" : ""}
        >
          <BarChart />
          {menuActive && <span>Bar chart</span>}
        </button>
      </div>
      <div className="logout-button">
        <button>
          <LogoutRounded />
          {menuActive && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
