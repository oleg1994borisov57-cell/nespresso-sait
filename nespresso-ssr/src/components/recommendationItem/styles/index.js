import { Box, styled } from "@mui/material";
import Link from "next/link";

export const ProductWrapper = styled("li")(({ theme }) => ({
  display: "flex",
  width: "25%",
  marginTop: "45px",
  borderRight: "1px solid #eee",
  padding: "0 10px",
  [theme.breakpoints.down(768)]: {
    width: "50%",
    paddingBottom: "20px",
  },
}));

export const ProductArticle = styled("article")({
  backgroundColor: "#fff",
  color: "#000",
  letterSpacing: "1.6px",
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const ProductImg = styled(Box)(({ theme }) => ({
  marginBottom: "50px",
  [theme.breakpoints.down(768)]: {
    marginBottom: "25px",
  },
}));

export const ProductLink = styled(Link)({
  display: "block",
  textAlign: "center",
  color: "inherit",
  textDecoration: "none",
  outline: "none",
});

export const ProductName = styled(Box)({
  fontFamily: "NespressoLucas,Helvetica,Arial,sans-serif",
  padding: "5px 0",
  marginBottom: "5px",
  textAlign: "left",
  fontWeight: "700",
  lineHeight: "1rem",
});

export const ProductInformationWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

export const ProductPrice = styled("span")({
  display: "block",
  color: "#986f38",
  marginTop: "5px",
  textAlign: "left",
  fontWeight: "700",
});

export const ProductBuyWrapper = styled(Box)({
  position: "relative",
  marginTop: "5px",
});
