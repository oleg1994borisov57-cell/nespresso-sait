import { Box, styled } from "@mui/material";
import { H3TextStyle, P3TextStyle } from "../../../../../typography/styles";

export const TableWrapper = styled(Box)({
  marginTop: "25px",
  display: "flex",
  alignItems: "flex-end",
});

export const TableColumn = styled(Box)({
  width: "25%",
  position: "relative",
  "&.current": {
    background: "rgba(0,0,0,0.1)",
  },
  "&:last-of-type": {
    borderLeft: "1px solid #999",
  },
  "&>img": {
    display: "block",
    width: "180px",
    height: "auto",
    margin: "0 auto",
    marginTop: "25px",
  },
});

export const CoffeeMachineTitle = styled(H3TextStyle)({
  marginTop: "10px",
  fontWeight: "bold",
  textTransform: "uppercase",
  height: "45px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const TableFeature = styled(P3TextStyle)({
  height: "45px",
  display: "flex",
  alignItems: "center",
  lineHeight: "18px !important",
  borderTop: "1px solid #999",
  textAlign: "left",
  fontWeight: "700",
  "&:last-of-type": {
    borderBottom: "1px solid #999",
  },
  "&.value": {
    paddingLeft: "15px",
    fontWeight: "400",
    textTransform: "none",
  },
});

export const TableSubtitle = styled(P3TextStyle)({
  height: "90px",
  display: "flex",
  alignItems: "center",
  padding: "0 15px",
  justifyContent: "center",
  textAlign: "center",
  textTransform: "none",
  fontWeight: "400",
});

export const TableCoffeeMachinePrice = styled(P3TextStyle)({
  color: "#3a8900",
  fontWeight: "bold",
  fontSize: "18px",
  lineHeight: "24px",
  letterSpacing: "3px",
  height: "auto",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  justifyContent: "center",
  textTransform: "none",
});
