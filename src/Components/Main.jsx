// MainLayout.js
import { Outlet, useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";
import { useEffect } from "react";

import Cookie from "cookie-universal";

export const Main = () => {
  const cookie = Cookie();
  const token = cookie.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  console.log(cookie.get("token"));

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: "200px",
        }}
      >
        <Topbar />
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Main;
