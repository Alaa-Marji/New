import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { Button } from "rsuite";

export default function DeleteConfirm() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <Dialog
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        color: "var(--title)",
      }}
      open={showDeleteDialog}
      onClose={() => setShowDeleteDialog(false)}
    >
      <Close className="iconclose" onClick={() => setShowDeleteDialog(false)} />

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
        Are You Sure You Need To Delete This Employee ?
      </DialogTitle>
      <DialogContent>
        <Box>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px", fontSize: "small" }}
            >
              Delete
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px", fontSize: "small" }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
