import { styled } from "@mui/material";
import { P3TextStyle } from "../../../../../typography/styles";

export const AboutContentWrapper = styled(P3TextStyle)(({ theme }) => ({
  position: "relative",
  padding: "50px 0",
  width: "100%",
  fontSize: "25px",
  fontWeight: "400 !important",
  lineHeight: "26px",
  a: {
    color: "#000",
    textDecoration: "underline",
  },
  img: {
    width: "100%",
    height: "auto",
  },
  textTransform: "none !important",
  color: "black",
  [theme.breakpoints.down(997)]: {
    position: "relative",
    textAlign: "center",
    left: "auto",
    fontSize: "16px",
  },
}));
