import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { ModalProps } from "./modal.type";

export default function ModalComponent(args: ModalProps) {
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={args.maxWidth}
        open={args.open}
        onClose={() => args.setOpen(false)}
      >
        <DialogContent>
          <DialogContentText>{args.children}</DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
