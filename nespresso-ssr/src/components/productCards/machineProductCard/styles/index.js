import { Box, styled } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export const Product = styled("article")({
  position: "relative !important",
  height: "auto !important",
  display: "block !important",
  marginLeft: "20px !important",
  marginBottom: "20px !important",
  width: "calc((100% - 80px) / 3) !important",
  border: "1px solid #d3d3d3 !important",
  padding: "0 16px 0 !important",
  minHeight: "0 !important",
  background: "#FFF !important",
  cursor: "pointer !important",
  clear: "both !important",
  "&:hover": {
    background: "#f2f2f2 !important",
    "& img": {
      top: "-10px",
      margin: "auto !important",
      transform: "none",
    },
  },
  ".list &": {
    width: "calc(100% - 40px) !important",
  },
});

export const StyledLink = styled(Link)({
  textDecoration: "none",
  ".list &": {
    display: "flex !important",
    alignItems: "center !important",
  },
});

export const ProductImgWrapper = styled(Box)({
  padding: "32px 0 8px",
  ".list &": {
    display: "flex !important",
    width: "160px !important",
    height: "210px !important",
    marginLeft: "-20px !important",
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
    alignItems: "center !important",
  },
});

export const ProductImg = styled(Image)({
  position: "relative",
  width: "auto",
  margin: "auto",
  height: "120px",
  top: "0",
  display: "block",
  transition: "top 0.25s, opacity 0.25s",
});

export const ProductName = styled(Box)({
  paddingBottom: "0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  height: "56px",
  maxWidth: "100%",
  marginBottom: "0",
  marginLeft: "0",
  fontWeight: "700",
  lineHeight: "1.5em",
});

export const Title = styled("h3")({
  color: "#000",
  fontWeight: "bold",
  textTransform: "uppercase",
  height: "40px",
  display: "flex !important",
  flexDirection: "column",
  justifyContent: "center",
  marginBottom: "0px !important",
  maxWidth: "100% !important",
  marginLeft: "0 !important",
  textAlign: "center",
  fontSize: "18px",
  lineHeight: "22px",
  letterSpacing: "3px",
  ".list &": {
    alignItems: "flex-start !important",
    height: "auto !important",
  },
});

export const ProductDescriptionWrapper = styled(Box)({
  minHeight: "7em",
  height: "117px",
  color: "#666",
  display: "flex !important",
  flexDirection: "column",
  justifyContent: "center",
  marginBottom: "0 !important",
  maxWidth: "100% !important",
  marginLeft: "0 !important",
  textAlign: "center",
  ".list &": {
    width: "calc(100% - 265px - 140px) !important",
    maxWidth: "450px !important",
    padding: "16px 32px 16px 0 !important",
    display: "none !important",
  },
});

export const Description = styled("p")({
  fontSize: "14px",
  lineHeight: "21px",
  letterSpacing: "1px",
  color: "#666",
  textAlign: "center",
  fontFamily: "NespressoLucas, Helvetica, Arial, sans-serif",
  ".list &": {
    height: "100px !important",
  },
});

export const ProductColors = styled(Box)({
  color: "#000",
  display: "flex",
  justifyContent: "center",
  ".list &": {
    marginTop: "60px",
  },
});

export const BuyWrapper = styled(Box)({
  position: "relative",
  borderTop: "1px solid #d2d3d3",
  padding: "16px 0",
  marginTop: "16px",
  marginBottom: "0",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  overflow: "visible",
  lineHeight: "20px",
  fontWeight: "700",
  color: "#3d8705",
  whiteSpace: "nowrap",
  textAlign: "right",
  ".list & ": {
    width: "265px",
    marginLeft: "auto",
    marginTop: "auto",
    border: "none",
    flexDirection: "column",
    alignItems: "flex-end",
  },
});

export const Price = styled(Box)(({ theme }) => ({
  textAlign: "center",
  display: "flex",
  gap: "10px",
  [theme.breakpoints.down(998)]: {
    flexDirection: "column",
    gap: "0",
  },
  "& > .oldPrice": {
    color: "#666",
    textDecoration: "line-through",
  },
}));
