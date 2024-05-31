import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import { Box, Typography, Button } from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
  Delete,
  Visibility,
  BusinessCenter,
} from "@mui/icons-material";
import Header from "../Components/Header";
import { rows } from "../Components/data";
import axios from "axios";

const Users = () => {
  const theme = useTheme();
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterValue, setFilterValue] = useState("all");
  const [tableData, setTableData] = useState(rows);

  const handleView = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleDelete = (id) => {
    axios
      .delete(`/users/${id}`)
      .then((response) => {
        setTableData(tableData.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("Error ", error);
      });
  };

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setFilterValue(selectedValue);
    axios
      .get(`/filteredData?filter=${selectedValue}`)
      .then((response) => {
        console.log("Filtered data received:", response.data);
        setTableData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Username",
      align: "center",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "access",
      headerName: "Role",
      flex: 1,
      align: "center",
      headerAlign: "center",

      renderCell: ({ row: { access } }) => (
        <>
          <Box
            sx={{
              p: "5px",
              width: "99px",
              borderRadius: "3px",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-evenly",
              marginLeft: "130px",
              marginTop: "10px",
              backgroundColor:
                access === "Admin"
                  ? theme.palette.primary.dark
                  : access === "Manager"
                  ? theme.palette.secondary.dark
                  : access === "Company"
                  ? "grey"
                  : "#3da58a",
            }}
          >
            {access === "Admin" && (
              <AdminPanelSettingsOutlined
                sx={{ color: "#fff" }}
                fontSize="small"
              />
            )}
            {access === "Manager" && (
              <SecurityOutlined sx={{ color: "#fff" }} fontSize="small" />
            )}
            {access === "Company" && (
              <BusinessCenter
                sx={{ color: "#fff", fontSize: "18px" }}
                fontSize="small"
              />
            )}
            {access === "User" && (
              <LockOpenOutlined sx={{ color: "#fff" }} fontSize="small" />
            )}
            <Typography sx={{ fontSize: "13px", color: "#fff" }}>
              {access}
            </Typography>
          </Box>
          <AdminPanelSettingsOutlined sx={{ color: "#fff" }} fontSize="small" />
        </>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
        >
          <Button
            variant="contained"
            size="small"
            startIcon={<Visibility />}
            sx={{ mr: 1, fontSize: "14px" }}
            onClick={() => handleView(row)}
          >
            View
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<Delete />}
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      {/* <Header title={"Users"} subTitle={"Managing the User Members"} /> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
          overflow: "hidden",
        }}
        style={{
          color: "var(--title)",
          backgroundColor: "unset",
        }}
      >
        <Select
          value={filterValue}
          onChange={handleFilterChange}
          variant="outlined"
          style={{
            width: "150px",
            height: "40px",
            marginLeft: "1040px",
            color: "var(--title)",
            background: "unset",
            border: "var(--border)",
          }}
        >
          <MenuItem
            style={{
              color: "var(--title)",
              backgroundColor: "unset",
            }}
            value="all"
          >
            All Users
          </MenuItem>
          <MenuItem
            style={{
              color: "var(--title)",
              backgroundColor: "unset",
            }}
            value="Companies"
          >
            Companies
          </MenuItem>
          <MenuItem
            style={{
              color: "var(--title)",
              backgroundColor: "unset",
            }}
            value="JobSeekers"
          >
            Seekers
          </MenuItem>
          <MenuItem
            style={{
              color: "var(--title)",
              backgroundColor: "unset",
            }}
            value="Managers"
          >
            Managers
          </MenuItem>
        </Select>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "70vh",
          overflowY: "auto",
        }}
        style={{
          color: "var(--title)",
          backgroundColor: "unset",
        }}
      >
        <DataGrid
          rows={tableData}
          // @ts-ignore
          columns={columns}
          disableColumnMenu={true}
          autoHeight
          style={{
            color: "var(--title)",
            backgroundColor: "unset",
          }}
        />
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Typography
                style={{
                  color: "var(--title)",
                  backgroundColor: "unset",
                }}
              >
                Username: {selectedUser.name}
              </Typography>
              <Typography
                style={{
                  color: "var(--title)",
                  backgroundColor: "unset",
                }}
              >
                Email: {selectedUser.email}
              </Typography>
              <Typography
                style={{
                  color: "var(--title)",
                  backgroundColor: "unset",
                }}
              >
                Age: {selectedUser.age}
              </Typography>
              <Typography
                style={{
                  color: "var(--title)",
                  backgroundColor: "unset",
                }}
              >
                Phone: {selectedUser.phone}
              </Typography>
              <Typography
                style={{
                  color: "var(--title)",
                  backgroundColor: "unset",
                }}
              >
                Access: {selectedUser.access}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Users;
