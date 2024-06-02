import { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Chip,
} from "@mui/material";
import {
  Edit,
  Delete,
  ManageAccounts,
  ManageAccountsOutlined,
  AdminPanelSettings,
} from "@mui/icons-material";
import { baseURL } from "../Api/Api";
import Cookie from "cookie-universal";

const predefinedPermissions = [
  "role control",
  "employee control",
  "delete user",
  "report user",
  "view news",
  "view employees",
  "view opportunities",
  "view users",
  "view posts",
  "delete opportunity",
  "block user",
  "delete post",
  "view requests",
  "delete request",
  "news control",
  "view reports user",
  "delete report user",
  "admin report",
  "view admin reports",
  "opportunity control",
  "edit request",
  "post control",
  "request control",
];

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
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
  const [editingRoleId, setEditingRoleId] = useState(null);
  const cookie = Cookie();

  const fetchRoles = async () => {
    try {
      const token = cookie.get("Bearer");
      const rolesResponse = await axios.get(`${baseURL}/role/allRoles`, {
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
      const response = await axios.post(`${baseURL}/role/addRole`, roleData, {
        headers: {
          Authorization: `Bearer ${cookie.get("Bearer")}`,
        },
      });

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
      const token = cookie.get("Bearer");

      const confirmed = window.confirm("Are You Sure?");

      if (!confirmed) {
        return;
      }

      await axios.delete(`http://127.0.0.1:8000/api/role/deleteRole/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "auto",
        padding: 2,
        bgcolor: "var(--secondary)",
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
        }}
      >
        <Button
          onClick={handleClose}
          color="primary"
          sx={{
            padding: "10px",

            textAlign: "end",
          }}
        >
          Cancel
        </Button>

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
              backgroundColor: "var(--secondary)",
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
              {predefinedPermissions.map((permission) => (
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
        <TableContainer
          component={Paper}
          sx={{ bgcolor: "var(--secondary) ", color: "var(--title)" }}
        >
          <Table sx={{ bgcolor: "var(--secondary) ", color: "var(--title)" }}>
            <TableHead
              sx={{ bgcolor: "var(--secondary) ", color: "var(--title)" }}
            >
              <TableRow
                sx={{ bgcolor: "var(--secondary) ", color: "var(--title)" }}
              >
                <TableCell
                  sx={{ bgcolor: "var(--secondary) ", color: "var(--title)" }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{ bgcolor: "var(--secondary) ", color: "var(--title)" }}
                >
                  Role
                </TableCell>
                <TableCell
                  sx={{ bgcolor: "var(--secondary) ", color: "var(--title)" }}
                >
                  Permissions
                </TableCell>
                <TableCell
                  sx={{ bgcolor: "var(--secondary) ", color: "var(--title)" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{ bgcolor: "var(--secondary) ", color: "var(--title)" }}
            >
              {roles?.map((role) => (
                <TableRow key={role?.id}>
                  <TableCell
                    sx={{ alignSelf: "center", color: "var(--title) " }}
                  >
                    {role?.id}
                  </TableCell>
                  <TableCell
                    sx={{ alignSelf: "center", color: "var(--title)" }}
                  >
                    {role?.name}
                  </TableCell>
                  <TableCell
                    sx={{ alignSelf: "center", color: "var(--title) " }}
                  >
                    {Array.isArray(role.permissions) &&
                      role?.permissions?.map((permission) => (
                        <Button
                          key={permission}
                          variant="contained"
                          style={{
                            margin: 2,
                            fontSize: "smaller",
                            cursor: "not-allowed",
                            pointerEvents: "none",
                            borderRadius: "20px",
                          }}
                        >
                          <AdminPanelSettings />
                          {permission.name}
                        </Button>
                      ))}
                  </TableCell>
                  <TableCell
                    style={{
                      display: "flex",
                      gap: "2px",
                      color: "var(--title) ",
                    }}
                  >
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditRole(role.id)}
                      sx={{ color: "var(--title)" }}
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteRole(role.id)}
                      sx={{ color: "var(--title)" }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
            style={{ width: "300px", height: "300px" }}
          />
          <h3 style={{ color: "var(--title)" }}>
            There Are No Users To display, Let's Add Someone To Our Team
          </h3>
        </Box>
      )}
    </Box>
  );
};

export default RolesTable;
