import { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import {
  Button,
  Box,
  TextField,
  IconButton,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Chip,
} from "@mui/material";
import { Edit, Delete, AdminPanelSettings, Close } from "@mui/icons-material";
import { baseURL } from "../Api/Api";
import Cookie from "cookie-universal";
import { DataGrid } from "@mui/x-data-grid";
import { color } from "framer-motion";
import { red } from "@mui/material/colors";

const predefinedPermissions = [
  "role control",
  "admin report create",
  "admin report view",
  "admin report edit",
  "admin report delete",

  "logs view",
  "employee control",
  "employee view",

  "block user",

  "news create",
  "news view",
  "news delete",

  "user view",
  "user edit",
  "user delete",

  "seeker create",
  "company create",
  "user report create",
  "user report view",
  "user report delete",

  "opportunity create",
  "opportunities view",
  "opportunity delete",

  "post create",
  "posts view",
  "post delete",

  "request create",
  "request view",
  "request edit",
  "status edit",
  "request delete",
];

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const getRandomLightColor = () => {
  const darkColors = [
    "#A057C2",
    "#A0CFCF",
    "#A05C75",
    "#A0C077",
    "#A0B5BD",
    "#A08BA1",
    "#A0A7A7",
    "#A0A9A7",
  ];

  const randomIndex = Math.floor(Math.random() * darkColors.length);
  return darkColors[randomIndex];
};

const RolesTable = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState({});
  // const [editingRoleId, setEditingRoleId] = useState(null);
  const cookie = Cookie();

  const fetchRoles = async () => {
    try {
      const token = cookie.get("token");
      const rolesResponse = await axios.get(`${baseURL}/admin/role/allRoles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const rolesData = rolesResponse.data.data;
      setRoles(rolesData);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  useEffect(() => {
    fetchRoles();
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setRoleName("");
    setSelectedPermissions([]);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingRoleId(null);
    setRoleName("");
    const initialPermissionsState = predefinedPermissions.reduce(
      (acc, permission) => {
        acc[permission] = false;
        return acc;
      },
      {}
    );
    setSelectedPermissions(initialPermissionsState);
  };

  const permissionsArray = Object.keys(selectedPermissions).filter(
    (permission) => selectedPermissions[permission]
  );

  const handleAddRole = () => {
    setOpen(true);
    setRoleName("");
    setSelectedPermissions([]);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const roleData = {
      title: roleName,
      permissions: permissionsArray,
    };

    try {
      const response = await axios.post(
        `${baseURL}/admin/role/addRole`,
        roleData,
        {
          headers: {
            Authorization: `Bearer ${cookie.get("token")}`,
          },
        }
      );

      setRoles([...roles, response.data.data]);
      setOpen(false);
      setRoleName("");
      setSelectedPermissions([]);
      fetchRoles();
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  const handleEditRole = (id) => {
    const role = roles.find((role) => role.id === id);
    setEditingRoleId(id);
    setRoleName(role.role);
    const permissionsState = predefinedPermissions.reduce((ar, permission) => {
      ar[permission] = role.permissions.includes(permission);
      return ar;
    }, {});
    setSelectedPermissions(permissionsState);
    handleOpen();
  };

  const handleDeleteRole = async (id) => {
    try {
      const token = cookie.get("token");

      const confirmed = window.confirm("Are You Sure?");

      if (!confirmed) {
        return;
      }

      await axios.delete(
        `http://127.0.0.1:8000/api/admin/role/deleteRole/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRoles(roles.filter((role) => role.id !== id));
    } catch (error) {
      console.error("There was an error deleting the role!", error);
    }
  };

  const handleCheckboxChange = (event) => {
    setSelectedPermissions({
      ...selectedPermissions,
      [event.target.name]: event.target.checked,
    });
  };
  const columns = [
    { field: "id", headerName: "ID", width: 50, color: "var(--title)" },
    {
      field: "name",
      headerName: "Role Name",
      width: 100,
    },
    {
      field: "permissions",
      headerName: "Permissions",
      flex: 1,
      color: "var(--title)",
      backgroundColor: "var(--secondary)",

      renderCell: (params) => (
        <Box>
          {params.value?.map((permission, index) => (
            <Chip
              key={index}
              label={permission}
              style={{
                margin: 2,
                borderRadius: "20px",
                backgroundColor: "rgb(189, 212, 255)",
                color: "rgb(53, 52, 52)",
              }}
              icon={
                <AdminPanelSettings style={{ color: " rgb(78, 76, 76)" }} />
              }
            />
          ))}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",

      color: "var(--title)",
      backgroundColor: "var(--secondary)",
      // width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEditRole(params.row.id)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteRole(params.row.id)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "auto",
        padding: 2,
        bgcolor: "var(--secondary)",
        color: "var(--title)",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddRole}
        style={{ marginBottom: 16, marginLeft: 8, bgcolor: "var(--secondary)" }}
      >
        Add Role
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          bgcolor: "--var(--secondary)",
        }}
      >
        <Close
          className="iconclose"
          onClick={handleClose}
          sx={{ bgcolor: "--var(--secondary)" }}
        />

        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{
            paddingTop: 0,
            backgroundColor: "var(--secondary)",
            display: "flex",
            flexDirection: "column",
            bgcolor: " var(--secondary)",

            color: "var(--title)",
          }}
        >
          <img
            src="../../public/aeb135578200d078b6076b9cc3d1445f.gif"
            alt="Loading"
            className="loading-image"
            style={{ alignSelf: "center" }}
          />
          <DialogTitle
            sx={{
              paddingBottom: 0,
              color: "var(--title)",
              bgcolor: "var(--secondary)",
              alignSelf: "center",
            }}
          >
            Do You Need To Add New Role?
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Role Name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              fullWidth
              required
              margin="normal"
              sx={{ color: "var(--title)" }}
              InputProps={{
                style: {
                  color: "var(--title)",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "var(--title)",
                },
              }}
            />
            <Grid container spacing={0} sx={{ bgcolor: "var(--secondary)" }}>
              {predefinedPermissions?.map((permission) => (
                <Grid item key={permission}>
                  <Chip
                    label={permission}
                    onClick={() =>
                      handleCheckboxChange({
                        target: {
                          name: permission,
                          checked: !selectedPermissions[permission],
                        },
                      })
                    }
                    style={{
                      margin: 2,
                      borderRadius: "20px",
                      backgroundColor: selectedPermissions[permission]
                        ? getRandomLightColor()
                        : "var( --border)",
                      color: "var(--title)",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "space-between",
              padding: "16px 24px",
              backgroundColor: "var(--secondary)",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ alignSelf: "center" }}
            >
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {roles.length > 0 ? (
        <Box
          sx={{
            height: 480,
            width: "100%",
            color: "var(--title)",
            bgcolor: "var(--secondary)",
          }}
        >
          <DataGrid
            rows={roles?.map((role) => ({
              ...role,
              permissions: role.permissions?.map((perm) => perm.name),
            }))}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            sx={{ color: "var(--title)", bgcolor: "var(--secondary)" }}
            // components={{
            //   Toolbar: GridToolbarContainer,
            //   ExportButton: GridToolbarExport,
            // }}
          />
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          color="var(--title)"
        >
          <img
            src="../../public/undraw_empty_re_opql.svg"
            alt="No Employees"
            style={{ width: "300px", height: "300px" }}
          />
          <h3 style={{ color: "var(--title)" }}>
            There Are No Users To display, Let us Add Someone To Our Team
          </h3>
        </Box>
      )}
    </Box>
  );
};

export default RolesTable;
