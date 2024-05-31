// MainLayout.js
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

export const Main = () => (
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

export default Main;
