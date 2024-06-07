import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import { Box, Typography, Button } from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
  Delete,
  Visibility,
  BusinessCenter,
  Person,
} from "@mui/icons-material";
import axios from "axios";
import Cookie from "cookie-universal";

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterValue, setFilterValue] = useState("AllUsers");
  const [tableData, setTableData] = useState([]);
  const cookie = Cookie();

  const fetchUsers = async (filterValue) => {
    try {
      const token = cookie.get("token");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/admin/getUsers/${filterValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      const formattedData = response.data.data.map((user) => ({
        id: user.id,
        name: user.user_name,
        email: user.email,
        access: user.role,
        more_info: user.more_info,
      }));
      console.log("ddfgfhgjkh", formattedData);
      setTableData(formattedData);
    } catch (error) {
      console.error("Error fetching users:", error);
      console.error("Error details:", error.response?.data);
    }
  };

  useEffect(() => {
    fetchUsers(filterValue);
  }, [filterValue]);

  const handleView = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteUser = async (id) => {
    try {
      const token = cookie.get("token");
      const confirmed = window.confirm("Are You Sure ?");

      if (!confirmed) {
        return;
      }
      await axios.delete(`http://127.0.0.1:8000/api/admin/removeUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTableData(tableData.filter((user) => user.id !== id));
    } catch (error) {
      console.error("There was an error deleting the role!", error);
    }
  };

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setFilterValue(selectedValue);
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

      renderCell: ({ row: { access } }) => {
        const roles = access[1];
        console.log(roles);
        const getRoleIcon = (roles) => {
          switch (roles) {
            case "job-seeker":
              return (
                <Person
                  sx={{ color: "#fff", marginRight: "5px", fontSize: "20px" }}
                />
              );
            case "company":
              return (
                <BusinessCenter
                  sx={{ color: "#fff", marginRight: "5px", fontSize: "20px" }}
                />
              );
            default:
              return (
                <Person
                  sx={{ color: "#fff", marginRight: "5px", fontSize: "20px" }}
                />
              );
          }
        };

        const getBackgroundColor = (roles) => {
          switch (roles) {
            case "employee":
              return " #60af4c";
            case "Company":
              return "grey";
            default:
              return "black";
          }
        };

        return (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)", // Adjust the number based on your preference
              gap: "5px",
              width: "100%",
            }}
          >
            <Box
              // key={index}
              sx={{
                p: "5px",
                borderRadius: "3px",
                textAlign: "center",
                marginLeft: "143px",
                marginTop: "10px",
                display: "flex",
                fontSize: "small",

                justifyContent: "space-evenly",
                backgroundColor: getBackgroundColor(roles),
              }}
            >
              {getRoleIcon(roles)}
              <Typography sx={{ fontSize: "13px", color: "#fff" }}>
                {roles}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
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
            onClick={() => handleDeleteUser(row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      {tableData.length > 0 ? (
        <>
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
                value="AllUsers"
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
              columns={columns}
              disableColumnMenu={true}
              style={{
                color: "var(--title)",
                backgroundColor: "unset",
              }}
            />
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src="../../public/undraw_empty_re_opql.svg"
            alt="No Employees"
            style={{ marginTop: "70px", width: "300px", height: "300px" }}
          />
          <h3 style={{ color: "var(--title)" }}>
            There Are No Users To Display
          </h3>
        </Box>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Typography
                style={{ color: "var(--title)", backgroundColor: "unset" }}
              >
                0 Username: {selectedUser.name}
              </Typography>
              <Typography
                style={{ color: "var(--title)", backgroundColor: "unset" }}
              >
                Email: {selectedUser.email}
              </Typography>
              <Typography
                style={{ color: "var(--title)", backgroundColor: "unset" }}
              >
                Age: {selectedUser.more_info?.age}
              </Typography>
              <Typography
                style={{ color: "var(--title)", backgroundColor: "unset" }}
              >
                Phone: {selectedUser.more_info?.phone}
              </Typography>
              <Typography
                style={{ color: "var(--title)", backgroundColor: "unset" }}
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
