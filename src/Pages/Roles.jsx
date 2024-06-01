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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { baseURL } from "../Api/Api";
import Cookie from "cookie-universal";

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
  return <Slide direction="up" ref={ref} {...props} />;
});

const RolesTable = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [editingRoleId, setEditingRoleId] = useState(null);
  const cookie = Cookie();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const token = cookie.get("token");
        console.log(token);
        const rolesResponse = await axios.get(
          `http://127.0.0.1:8000/api/admin/role/allRoles`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const rolesData = rolesResponse.data.data;
        if (rolesData && typeof rolesData === "object") {
          const rolesArray = Object.entries(rolesData).map(
            ([role, permissions]) => ({
              id: role,
              role: role,
              permissions: permissions,
            })
          );
          setRoles(rolesArray);
        } else {
          console.error("Invalid roles data format:", rolesData);
        }

        const initialPermissionsState = predefinedPermissions.reduce(
          (acc, permission) => {
            acc[permission] = false;
            return acc;
          },
          {}
        );

        setSelectedPermissions(initialPermissionsState);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleOpen = () => {
    setOpen(true);
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const permissionsArray = Object.keys(selectedPermissions).filter(
      (permission) => selectedPermissions[permission]
    );
    const roleData = {
      title: roleName,
      permissions: permissionsArray,
    };

    const url = editingRoleId
      ? `${baseURL}/admin/role/editRole`
      : `${baseURL}/admin/role/addRole`;

    const data = editingRoleId
      ? {
          role: editingRoleId,
          new_name: roleName,
          permissions: permissionsArray,
        }
      : roleData;

    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${cookie.get("token")}`,
        },
      });

      if (editingRoleId) {
        setRoles(
          roles.map((role) =>
            role.id === editingRoleId ? response.data : role
          )
        );
      } else {
        setRoles([...roles, response.data]);
      }

      handleClose();
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
      const formData = new FormData();
      formData.append("role", id);

      await axios.post(`${baseURL}/admin/role/deleteRole`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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
    <Box sx={{ height: "100vh", overflowY: "auto", padding: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        style={{ marginBottom: 16, marginLeft: 8 }}
      >
        Add Role
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            paddingBottom: 0,
            color: "var(--title)",
            backgroundColor: "var(--secondary)",
          }}
        >
          {editingRoleId ? "Edit Role" : "Add Role"}
        </DialogTitle>
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{
            marginBottom: 2,
            padding: 2,
            paddingTop: 0,
            backgroundColor: "var(--secondary)",
          }}
        >
          <DialogContent>
            <TextField
              label="Role Name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              fullWidth
              required
              margin="normal"
              sx={{ color: "var(--title)" }}
            />
            <FormGroup>
              <Grid container spacing={2}>
                {predefinedPermissions.map((permission) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={2}
                    key={permission}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedPermissions[permission]}
                          onChange={handleCheckboxChange}
                          name={permission}
                          sx={{ color: "var(--title)" }}
                        />
                      }
                      label={permission}
                      sx={{ color: "var(--title)" }}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "space-between",
              padding: "16px 24px",
              backgroundColor: "var(--secondary)",
            }}
          >
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {roles.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Permissions</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(roles) && roles.length > 0 ? (
                roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>{role.id}</TableCell>
                    <TableCell>{role.role}</TableCell>
                    <TableCell>
                      {Array.isArray(role.permissions) &&
                        role.permissions.map((permission) => (
                          <Button
                            key={permission}
                            variant="contained"
                            color="primary"
                            style={{ margin: 2 }}
                          >
                            {permission}
                          </Button>
                        ))}
                    </TableCell>
                    <TableCell
                      style={{
                        display: "flex",
                        gap: "2px",
                      }}
                    >
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditRole(role.id)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteRole(role.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No roles available
                  </TableCell>
                </TableRow>
              )}
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
            There Are No Users To display, Let us Add Someone To Our Team
          </h3>
        </Box>
      )}
    </Box>
  );
};

export default RolesTable;
