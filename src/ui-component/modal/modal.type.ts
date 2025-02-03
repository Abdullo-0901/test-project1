import { Breakpoint } from "@mui/material";
import React from "react";

export type ModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  maxWidth: false | Breakpoint | undefined;
  children: React.ReactNode;
};
