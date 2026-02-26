import { Box, styled } from "@mui/material";
import ModalImage from "react-modal-image";

export const SliderItem = styled(Box)({
  width: "50px",
  height: "50px",
  background: "#FFF",
  overflow: "hidden",
  border: "1px solid #666",
  cursor: "pointer",
  borderRadius: "5px",
  opacity: "0.5",
  margin: "0 5px",
  "&:hover": {
    opacity: "1",
  },
  "&.active": {
    opacity: "1",
  },
});

export const SliderItems = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

export const ItemImg = styled("img")({
  height: "50px",
  width: "50px",
  objectFit: "cover",
});

export const SliderGeneralImage = styled(ModalImage)(({ theme }) => ({
  height: "450px",
  objectFit: "contain",
  width: "100%",
  [theme.breakpoints.down(998)]: {
    height: "calc(100vh - 425px)",
  },
}));
