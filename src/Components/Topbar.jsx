import {
  DarkModeOutlined,
  NotificationsActive,
  WbSunny,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useState, useEffect } from "react";

// import Search from "../Pages/Search/Search";
// import "../Pages/Search/styleSearch";
import "../Components/S.css";

export default function Topbar() {
  const [theme, setTheme] = useState(
    localStorage.getItem("currentMode") ?? "dark"
  );

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [theme]);

  return (
    <div className="top">
      {/* <Search /> */}
      <div className="icon-group">
        <button
          onClick={() => {
            //send value to local storage
            localStorage.setItem(
              "currentMode",
              theme === "light" ? "dark" : "light"
            );
            // get value from LS
            setTheme(localStorage.getItem("currentMode"));
          }}
          className="mode flex"
        >
          {theme === "dark" ? (
            <DarkModeOutlined className="icon-small iconmoon" />
          ) : (
            <WbSunny className="icon-small  iconsun" />
          )}
        </button>
        <NotificationsActive className="icon-small iconNo" />
        <Avatar className="avatar-small">A</Avatar>
      </div>
    </div>
  );
}
