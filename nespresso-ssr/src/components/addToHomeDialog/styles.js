import { Box, Button, IconButton, styled } from "@mui/material";
import { P3TextStyle } from "../typography/styles";
import ModalImage from "react-modal-image";

export const AddToHomeWrapper = styled(Box)({
  position: "fixed",
  transition: "opacity .3s",
  opacity: "0",
  bottom: "10px",
  left: "50%",
  padding: "10px",
  transform: "translateX(-50%)",
  zIndex: "9999999",
  width: "90%",
  backgroundColor: "#cfcfc1",
  borderRadius: "20px",
  display: "none",
  justifyContent: "space-between",
  alignItems: "center",
  "&.visible": {
    display: "flex",
    opacity: "1",
  },
});

export const CloseButton = styled(IconButton)({
  position: "absolute",
  color: "black",
  top: "-15px",
  right: "-15px",
});

export const AddToHomeButton = styled(Button)({
  backgroundColor: "black",
  color: "white",
  fontSize: "10px",
});

export const Text = styled(P3TextStyle)({});

export const AddToHomeText = styled(Text)({
  textAlign: "center",
});

export const InstructionModalImage = styled(ModalImage)({
  width: "100%",
  height: "auto",
});
