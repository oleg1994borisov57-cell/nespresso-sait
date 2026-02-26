import { DialogContentText, DialogTitle, styled } from "@mui/material";
import Dialog from "@mui/material/Dialog";

export const StyledDialog = styled(Dialog)(() => ({
  zIndex: 9999,
}));

export const Blur = styled("div")(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backdropFilter: "blur(5px)",
  zIndex: 1,
}));

export const StyledDialogContentText = styled(DialogContentText)(() => ({
  WebkitTransform: "translate3d(0,0,0)",
  position: "relative",
  color: "white",
  // fontWeight: 'bold',
  fontSize: "1rem",
  zIndex: 7,
  transform: "translateZ(0)",
  "& span": {
    fontWeight: "bold",
  },
}));

export const StyledDialogTitle = styled(DialogTitle)(() => ({
  // position: 'relative',
  color: "white",
  fontWeight: "bold",
  fontSize: "2rem",
  lineHeight: "2rem",
  zIndex: 3,
}));
