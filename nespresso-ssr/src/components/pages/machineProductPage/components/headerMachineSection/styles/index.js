import { Box, styled } from "@mui/material";
import { H1TextStyle } from "../../../../../typography/styles";

export const HeaderSection = styled(Box)({
  position: "relative",
  paddingTop: "68px",
  paddingBottom: "3px",
});

export const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  [theme.breakpoints.down(998)]: {
    flexDirection: "column",
    padding: "0 4% 0 4%",
    maxWidth: "995px",
  },
}));

export const Wrapper = styled(Box)(({ theme }) => ({
  width: "calc(50% - 50px)",
  display: "flex",
  [theme.breakpoints.down(998)]: {
    width: "100%",
  },
}));

export const InfoWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "calc(100% - 35px)",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  width: "100%",
  [theme.breakpoints.down(998)]: {
    position: "initial",
    height: "120px",
    justifyContent: "center",
  },
}));

export const ProductName = styled(H1TextStyle)(({ theme }) => ({
  marginTop: "50px",
  [theme.breakpoints.down(998)]: {
    marginTop: "0",
  },
}));
