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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { baseURL } from "../Api/Api";
import Cookie from "cookie-universal";

// const rolesOptions = ["employee", "tech_support_team", "user", "admin"]; // Update roles options based on your requirements

const AddEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [firstName, setFirstName] = useState("");
  // const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const cookie = Cookie();

  useEffect(() => {
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

        console.log("API Response:", employeesResponse);

        const employeesData = employeesResponse.data.data;
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const token = cookie.get("token");
        const rolesResponse = await axios.get(
          `${baseURL}/admin/role/allRoles`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const rolesData = rolesResponse.data.data;
        // if (rolesData && typeof rolesData === "object") {
        const rolesArray = rolesData?.map((item) => item?.name);

        setRoleOptions(rolesArray);
        console.log("ii", rolesArray);
        // }
        //  else {
        //   console.error("Invalid roles data format:", roleOptions);
        // }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const getRandomLightColor = () => {
    const lightColors = [
      "#F0F8FF",
      "#F0FFFF",
      "#F5F5DC",
      "#FAFAD2",
      "#FFF5EE",
      "#FFE4E1",
      "#F0FFF0",
      "#FFFFF0",
    ];

    const randomIndex = Math.floor(Math.random() * lightColors.length);
    return lightColors[randomIndex];
  };
  const handleAddEmployee = () => {
    setShowDialog(true);
    setEditingEmployeeId(null);
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
            Authorization: `Bearer ${cookie.get("token")}`,
          },
        }
      );

      console.log("Form Submit Response:", response);

      setEmployees([...employees, response.data.data]);

      setShowDialog(false);
      setFirstName("");
      setEmail("");
      setMiddleName("");
      setLastName("");
      setGender("");
      setSelectedRoles([]);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  const handleEditEmployee = (id) => {
    const employee = employees.find((employee) => employee.id === id);
    setEditingEmployeeId(id);
    setFirstName(employee.more_info.first_name);
    setEmail(employee.email);
    setMiddleName(employee.more_info.middle_name);
    setLastName(employee.more_info.last_name);
    setGender(employee.more_info.gender);
    setRole(employee.role);
    setShowDialog(true);
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const token = cookie.get("token");
      await axios.delete(`${baseURL}/employee/deleteEmployee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error("There was an error deleting the employee!", error);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "auto",
        padding: 2,
        marginBottom: "10px",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddEmployee}
        style={{ marginLeft: 8, marginBottom: "20px" }}
      >
        Add Employee
      </Button>
      <Dialog
        className="modelAddEm"
        open={showDialog}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            setShowDialog(false);
          }
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "450px",
            backgroundColor: "var(--secondary)",
            color: "var(--title)",
            paddingTop: "2",
          }}
        >
          {editingEmployeeId ? "" : ""}
          <Button
            onClick={() => setShowDialog(false)}
            color="primary"
            style={{
              marginLeft: "350px",
              marginBottom: "0",
              padding: "0",
            }}
          >
            Cancel
          </Button>
        </DialogTitle>
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
            }}
          >
            <img
              src="../../public/aeb135578200d078b6076b9cc3d1445f.gif"
              alt="Loading"
              className="loading-image"
            />

            <Typography variant="h6" sx={{ color: "var(--title)" }}>
              Welcome to Employee Form
            </Typography>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              required
              size="small"
              style={{ color: "var( --title)" }}
            />
            <TextField
              label="Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              fullWidth
              required
              size="small"
              style={{ color: "var( --title)" }}
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              required
              size="small"
              style={{ color: "var( --title)" }}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              size="small"
              style={{ color: "var( --title)" }}
            />
            <FormControl fullWidth size="small">
              <InputLabel id="gender-label" sx={{ color: "var(--title)" }}>
                Gender
              </InputLabel>
              <Select
                labelId="gender-label"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel id="role-label" sx={{ color: "var(--title)" }}>
                Role
              </InputLabel>
              <Select
                labelId="role-label"
                value={selectedRoles}
                onChange={(e) => setSelectedRoles(e.target.value)}
                multiple
              >
                {roleOptions?.map((roleOption) => (
                  <MenuItem key={roleOption} value={roleOption}>
                    {roleOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button type="submit" variant="contained" color="primary">
                Invite
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {employees.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees?.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.user_name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    {Array.isArray(employee.role) &&
                      employee.role.map((item) => (
                        <Button
                          key={item}
                          variant="contained"
                          style={{
                            backgroundColor: getRandomLightColor(),
                            color: "var( --title)",
                            margin: 2,
                            width: "auto",
                            height: "auto",
                            cursor: "not-allowed",
                            pointerEvents: "none",
                          }}
                        >
                          {item}
                        </Button>
                      ))}
                  </TableCell>

                  <TableCell style={{ display: "flex", gap: "2px" }}>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditEmployee(employee.id)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteEmployee(employee.id)}
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

export default AddEmployee;
