import { Box, styled } from "@mui/material";
import { P3TextStyle } from "../../../../../typography/styles";

export const Features = styled(Box)(({ theme }) => ({
  marginTop: "20px",
  display: "flex",
  width: "70%",
  flexWrap: "wrap",
  justifyContent: "space-between",
  position: "relative",
  zIndex: "10",
  [theme.breakpoints.down(997)]: {
    width: "100%",
  },
}));

export const FeatureItem = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #ccc",
  borderTop: "1px solid #ccc",
  height: "90px",
  width: "calc(50% - 25px)",
  padding: "15px 0",
  [theme.breakpoints.down(997)]: {
    width: "100%",
    display: "flex",
    height: "auto",
    padding: "10px 0",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "50px",
    borderBottom: "1px solid #ccc",
    borderTop: "none",
  },
}));

export const FeatureItemTitle = styled(P3TextStyle)({
  display: "flex",
  alignItems: "center",
  fontWeight: "700 !important",
  height: "30px",
});

export const FeatureItemValue = styled(FeatureItemTitle)(({ theme }) => ({
  flexDirection: "column",
  alignItems: "flex-start",
  fontWeight: "400 !important",
  letterSpacing: "1px",
  lineHeight: "15px",
  textTransform: "none",
}));
