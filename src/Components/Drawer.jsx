import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

export default function AnchorTemporaryDrawer() {
  const [state, setState] = React.useState({
    right: false,
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    role: "",
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    // Check if the click event target is the close button
    if (event && event.target && event.target.id === "closeButton") {
      setState({ ...state, [anchor]: false });
    } else if (!event.target.closest(".MuiDrawer-root")) {
      // Check if the click event target is outside the drawer
      setState({ ...state, [anchor]: open });
    }
  };

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <Box p={2} display="flex" flexDirection="column" alignItems="center">
        <Avatar sx={{ width: 64, height: 64, mb: 2 }}>A</Avatar>
        <TextField
          label="First Name"
          value={state.firstName}
          onChange={handleChange("firstName")}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={state.lastName}
          onChange={handleChange("lastName")}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={state.email}
          onChange={handleChange("email")}
          fullWidth
          margin="normal"
        />
        <Select
          value={state.gender}
          onChange={handleChange("gender")}
          displayEmpty
          fullWidth
          margin="normal"
        >
          <MenuItem value="" disabled>
            Gender
          </MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
        <Select
          value={state.role}
          onChange={handleChange("role")}
          displayEmpty
          fullWidth
          margin="normal"
        >
          <MenuItem value="" disabled>
            Role
          </MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="employee">Employee</MenuItem>
        </Select>
      </Box>
      <Divider />

      <Button variant="contained" fullWidth>
        Add Employee
      </Button>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer("right", true)}>Open Right Drawer</Button>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
        <Button id="closeButton" onClick={toggleDrawer("right", false)}>
          Close
        </Button>
      </Drawer>
    </div>
  );
}
