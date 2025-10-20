import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CustomDeleteDialog({ open, onClose, handleDelete }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      dir="rtl"
    >
      <DialogTitle id="alert-dialog-title">
        {"هل انت متأكد انك تريد حذف هذه المهمة؟"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          لا يمكنك التراجع بعد الحذف!
        </DialogContentText>
      </DialogContent>
      <DialogActions >
        <Button color="primary" onClick={onClose}>إلغاء</Button>
        <Button color="error" onClick={handleDelete} autoFocus>
          نعم متأكد
        </Button>
      </DialogActions>
    </Dialog>
  );
}
