import { useState, useEffect } from "react";
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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Chip,
} from "@mui/material";
import { Edit, Delete, AdminPanelSettings } from "@mui/icons-material";
import { baseURL } from "../Api/Api";
import Cookie from "cookie-universal";
import "./Loading/Loading.css";
import Loading from "./Loading/loading";

const AddEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [roleOptions, setRoleOptions] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const cookie = Cookie();
  const [oLoading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const token = cookie.get("Bearer");
      const employeesResponse = await axios.get(
        `http://127.0.0.1:8000/api/admin/employee/employees`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const employeesData = employeesResponse.data.data;
      setEmployees(employeesData);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.error("Error fetching employees:", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const token = cookie.get("Bearer");
      const rolesResponse = await axios.get(`${baseURL}/role/allRoles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const rolesData = rolesResponse.data.data;
      console.log("fmkrkgjifkj", rolesData);
      const rolesArray = rolesData?.map((item) => item?.name);
      setRoleOptions(rolesArray);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchEmployees();
  }, []);

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

  const handleAddEmployee = () => {
    setShowDialog(true);
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setEmail("");
    setGender("");
    setSelectedRoles([]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const employeeData = {
      email: email,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      gender: gender,
      roles_name: selectedRoles,
    };

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin/employee/addEmployee`,
        employeeData,
        {
          headers: {
            Authorization: `Bearer ${cookie.get("Bearer")}`,
          },
        }
      );

      setEmployees([...employees, response.data.data]);
      setShowDialog(false);
      setFirstName("");
      setEmail("");
      setMiddleName("");
      setLastName("");
      setGender("");
      setSelectedRoles([]);
      fetchEmployees();
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  const handleEditEmployee = (id) => {
    const employee = employees.find((employee) => employee.id === id);
    setEditingEmployee(employee);
    setFirstName(employee.more_info.first_name);
    setEmail(employee.email);
    setMiddleName(employee.more_info.middle_name);
    setLastName(employee.more_info.last_name);
    setGender(employee.more_info.gender);
    setSelectedRoles(employee.role);
    setShowEditDialog(true);
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    const updatedEmployeeData = {
      roles_name: selectedRoles,
    };

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/admin/employee/updateEmployee/${editingEmployee.id}`,
        updatedEmployeeData,
        {
          headers: {
            Authorization: `Bearer ${cookie.get("Bearer")}`,
          },
        }
      );

      setEmployees(
        employees.map((employee) =>
          employee.id === editingEmployee.id
            ? { ...employee, role: selectedRoles }
            : employee
        )
      );

      setShowEditDialog(false);
      setEditingEmployee(null);
      setSelectedRoles([]);
    } catch (error) {
      console.error("There was an error updating the employee!", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const token = cookie.get("Bearer");
      const confirmed = window.confirm("Are You Sure ?");

      if (!confirmed) {
        return;
      }
      await axios.delete(`http://127.0.0.1:8000/api/admin/removeUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error("There was an error deleting the role!", error);
    }
  };

  const handleRoleDelete = (roleToDelete) => {
    setSelectedRoles((prevRoles) =>
      prevRoles.filter((role) => role !== roleToDelete)
    );
  };

  const handleAddRole = (roleToAdd) => {
    if (!selectedRoles.includes(roleToAdd)) {
      setSelectedRoles([...selectedRoles, roleToAdd]);
    }
  };

  return oLoading ? (
    <Loading />
  ) : (
    <Box
      sx={{
        height: "auto",
        overflowY: "auto",
        padding: 2,
        marginBottom: "10px",
        color: "var(--border)",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddEmployee}
        style={{
          marginLeft: 8,
          marginBottom: "20px",
          borderRadius: "10px",
          fontSize: "small",
        }}
      >
        Add Employee
      </Button>
      <Dialog
        open={showDialog}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            setShowDialog(false);
          }
        }}
      >
        <Button
          onClick={() => setShowDialog(false)}
          color="primary"
          style={{
            alignSelf: "end",
          }}
        >
          Cancel
        </Button>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "450px",
            backgroundColor: " var(--secondary)",

            color: "var(--title)",
            paddingTop: "2",
          }}
        ></DialogTitle>
        <DialogContent
          sx={{ backgroundColor: "var(--secondary)", color: "var(--title)" }}
        >
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.2,
              bgcolor: " var(--secondary)",
            }}
          >
            <img
              src="../../public/aeb135578200d078b6076b9cc3d1445f.gif"
              alt="Loading"
              className="loading-image"
              style={{ alignSelf: "center" }}
            />

            <Typography
              variant="h6"
              sx={{ color: "var(--title)", alignSelf: "center" }}
            >
              Welcome to Employee Form
            </Typography>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              required
              size="small"
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
            <TextField
              label="Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              fullWidth
              required
              size="small"
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

            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              required
              size="small"
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
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              size="small"
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
            <FormControl fullWidth size="small">
              <InputLabel
                id="gender-label"
                sx={{ color: "var(--title)", background: "var(--secondary)" }}
              >
                Gender
              </InputLabel>
              <Select
                labelId="gender-label"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                sx={{
                  color: "var(--title) ",
                  backgroundColor: " var(--secondary)",
                }}
              >
                <MenuItem
                  sx={{
                    color: "var(--title) ",
                    backgroundColor: " var(--secondary)",
                  }}
                  value="male"
                >
                  Male
                </MenuItem>
                <MenuItem
                  sx={{
                    color: "var(--title) ",
                    backgroundColor: " var(--secondary)",
                  }}
                  value="female"
                >
                  Female
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel
                id="role-label"
                sx={{
                  color: "var(--title)",
                  backgroundColor: "var(--secondary)",
                }}
              >
                Role
              </InputLabel>
              <Select
                labelId="role-label"
                value={selectedRoles}
                onChange={(e) => setSelectedRoles(e.target.value)}
                multiple
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        sx={{ bgcolor: getRandomLightColor(), color: "white" }}
                      />
                    ))}
                  </Box>
                )}
                sx={{
                  backgroundColor: "var(--secondary)",
                  color: "var(--title)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: selectedRoles.length > 0 ? "var(--title)" : "",
                  },
                }}
              >
                {roleOptions?.map((roleOption) => (
                  <MenuItem
                    key={roleOption}
                    value={roleOption}
                    sx={{
                      backgroundColor: "var(--secondary)",
                      color: "var(--title)",
                      "&:hover": {
                        backgroundColor: "var( --secondary)",
                        color: "var(--title)",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "var(--subtitle)",
                        color: "white",
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: "var( --secondary)",
                        color: "white",
                      },
                    }}
                  >
                    {roleOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ borderRadius: "10px", fontSize: "small" }}
              >
                Invite
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          color: "var(--title)",
        }}
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
      >
        <Button
          onClick={() => setShowEditDialog(false)}
          color="primary"
          style={{
            alignSelf: "end",
          }}
        >
          Cancel
        </Button>
        <img
          src="../../public/edit.gif"
          alt="Loading"
          className="loading-image"
          style={{
            alignSelf: "center",
            border: "5px soild black",
            backgroundColor: " var(--secondary)",
          }}
        />
        <DialogTitle
          sx={{
            width: "100% ",
            alignSelf: "center",
            backgroundColor: "var(--secondary)",
            color: "var(--title)",
          }}
        >
          Do You Want To Modify The Roles {firstName} ?
        </DialogTitle>
        <DialogContent
          sx={{ backgroundColor: "var(--secondary)", color: "var(--title)" }}
        >
          <Box
            component="form"
            onSubmit={handleEditFormSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.2,
              backgroundColor: "var(--secondary)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                mt: 1,
                backgroundColor: "var(--secondary)",
              }}
            >
              {selectedRoles.map((role) => (
                <Chip
                  key={role}
                  label={role}
                  onDelete={() => handleRoleDelete(role)}
                  color="primary"
                  style={{ backgroundColor: getRandomLightColor() }}
                />
              ))}
            </Box>
            <FormControl fullWidth size="small">
              <InputLabel id="add-role-label">Add Role</InputLabel>
              <Select
                labelId="add-role-label"
                value=""
                onChange={(e) => handleAddRole(e.target.value)}
                sx={{
                  backgroundColor: "var(--secondary)",
                  color: "var(--title)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: selectedRoles.length > 0 ? "var(--title)" : "",
                  },
                }}
              >
                {roleOptions
                  .filter((roleOption) => !selectedRoles.includes(roleOption))
                  .map((roleOption) => (
                    <MenuItem
                      key={roleOption}
                      value={roleOption}
                      sx={{
                        backgroundColor: "var(--secondary)",
                        color: "var(--title)",
                        "&:hover": {
                          backgroundColor: "var( --secondary)",
                          color: "var(--title)",
                        },
                        "&.Mui-selected": {
                          backgroundColor: "var(--subtitle)",
                          color: "white",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "var( --secondary)",
                          color: "white",
                        },
                      }}
                    >
                      {roleOption}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleEditEmployee}
                style={{ borderRadius: "10px", fontSize: "small" }}
              >
                Update
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {employees.length > 0 ? (
        <Table
          component={Paper}
          style={{ background: "var( --secondary)", color: "var(--title)" }}
        >
          <Table
            style={{ background: "var( --secondary)", color: "var(--title)" }}
          >
            <TableHead
              style={{ background: "var( --secondary)", color: "var(--title)" }}
            >
              <TableRow
                style={{
                  background: "var( --secondary)",
                  color: "var(--title)",
                }}
              >
                <TableCell
                  style={{
                    background: "var( --secondary)",
                    color: "var(--title)",
                    alignSelf: "center",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  style={{
                    background: "var( --secondary)",
                    color: "var(--title)",
                  }}
                >
                  User Name
                </TableCell>
                <TableCell
                  style={{
                    background: "var( --secondary)",
                    color: "var(--title)",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  style={{
                    background: "var( --secondary)",
                    color: "var(--title)",
                  }}
                >
                  Roles
                </TableCell>
                <TableCell
                  style={{
                    background: "var( --secondary)",
                    color: "var(--title)",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees?.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell
                    style={{
                      background: "var( --secondary)",
                      color: "var(--title)",
                    }}
                  >
                    {employee.id}
                  </TableCell>
                  <TableCell
                    style={{
                      background: "var( --secondary)",
                      color: "var(--title)",
                    }}
                  >
                    {employee.user_name}
                  </TableCell>
                  <TableCell
                    style={{
                      background: "var( --secondary)",
                      color: "var(--title)",
                    }}
                  >
                    {employee.email}
                  </TableCell>

                  <TableCell
                    style={{
                      background: "var( --secondary)",
                      color: "var(--title)",
                    }}
                  >
                    {Array.isArray(employee.role) &&
                      employee.role.map((item) => (
                        <Button
                          key={item}
                          variant="contained"
                          style={{
                            backgroundColor: getRandomLightColor(),
                            fontSize: "smaller",
                            margin: 2,
                            width: "auto",
                            height: "auto",
                            cursor: "not-allowed",
                            pointerEvents: "none",
                            borderRadius: "20px",
                          }}
                        >
                          <AdminPanelSettings />
                          {item}
                        </Button>
                      ))}
                  </TableCell>
                  <TableCell
                    style={{
                      display: "flex",
                      gap: "2px",
                      alignSelf: "center",

                      background: "var( --secondary)",
                      color: "var(--title)",
                    }}
                  >
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditEmployee(employee.id)}
                      sx={{ color: "var(--title)" }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteEmployee(employee.id)}
                      sx={{ color: "var(--title)" }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Table>
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

export default AddEmployee;
