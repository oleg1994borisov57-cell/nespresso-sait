import { Box, styled } from "@mui/material";
import { H3TextStyle } from "../../../../../typography/styles";

export const BuyWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  maxWidth: "996px",
  margin: "50px auto",
  zIndex: "99",
  display: "flex",
  boxShadow: "2px 2px 5px #999",
  padding: "20px 30px",
  borderRadius: "3px",
  overflow: "visible",
  height: "140px",
  marginBottom: "-70px",
  backgroundColor: "#FFF",
  justifyContent: "space-between",
  "&>div": {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    width: "calc((100% - 100px) / 3)",
    flexDirection: "column",
  },
  [theme.breakpoints.down(998)]: {
    position: "initial",
    height: "auto",
    minHeight: "208px",
    flexDirection: "column",
    boxShadow: "none",
    margin: "0px",
    "&>div:first-of-type": {
      display: "none",
    },
    "&>div": {
      justifyContent: "flex-start",
      width: "100%",
    },
  },
}));

export const Divider = styled(Box)({
  width: "1px !important",
  background: "#666",
  margin: "0 25px",
});

export const Text = styled(H3TextStyle)(({ theme }) => ({
  fontWeight: "bold",
  "&.price": {
    color: "#3a8900",
    [theme.breakpoints.down(998)]: {
      textAlign: "center",
    },
  },
  "&.oldPrice": {
    color: "#666",
    textDecoration: "line-through",
  },
}));
