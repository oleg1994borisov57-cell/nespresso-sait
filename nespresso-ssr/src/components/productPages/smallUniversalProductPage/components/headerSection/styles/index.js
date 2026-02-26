import { Box, styled } from "@mui/material";
import { H1TextStyle } from "../../../../../typography/styles";

export const SectionWrapper = styled(Box)({
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
  width: "400px",
  display: "flex",
  [theme.breakpoints.down(998)]: {
    width: "100%",
  },
}));

export const InfoWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "calc(100% - 35px)",
  width: "100%",
}));

export const ProductName = styled(H1TextStyle)(({ theme }) => ({
  marginTop: "50px",
  fontWeight: "700",
  lineHeight: "32px",
  letterSpacing: ".2em",
  textTransform: "none",
  [theme.breakpoints.down(998)]: {
    marginTop: "0",
  },
}));

export const ProductPrice = styled("span")({
  fontSize: "1.125rem",
  letterSpacing: ".2em",
  display: "block",
  color: "#3d8705",
  fontWeight: "700",
  marginBottom: "20px",
  fontFamily: "NespressoLucas,Helvetica,Arial,sans-serif",
});

export const BuyButtonWrapper = styled(Box)({
  marginTop: "43px",
});
