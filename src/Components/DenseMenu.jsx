import React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";

export default function DenseMenu({ handleClose }) {
  return (
    <Paper sx={{ width: 200, marginLeft: "200px", position: "absolute" }}>
      <MenuList dense>
        <MenuItem onClick={() => handleClose("/roles")}>
          <ListItemText inset>Roles</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClose("/employee")}>
          <ListItemText inset>Employee</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
