import { Box, styled } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export const Product = styled("article")({
  position: "relative !important",
  height: "auto !important",
  display: "block !important",
  marginLeft: "20px !important",
  marginBottom: "20px !important",
  width: "calc((100% - 100px) / 4) !important",
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
    borderTop: "1px solid #eee !important",
    padding: "0px 16px !important",
    minHeight: "100px !important",
    display: "table !important",
    position: "relative !important",
    cursor: "pointer !important",
    clear: "both !important",
    marginBottom: "0 !important",
  },
});

export const StyledLink = styled(Link)({
  textDecoration: "none",
  ".list &": {
    display: "flex !important",
    alignItems: "center !important",
    width: "100%",
  },
});

export const ProductImgWrapper = styled(Box)({
  padding: "32px 0 8px",
  ".list &": {
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
    marginRight: "8px !important",
  },
});

export const ProductImg = styled(Image)(({ theme }) => ({
  position: "relative",
  width: "auto",
  margin: "auto",
  height: "120px",
  top: "0",
  display: "block",
  transition: "top 0.25s, opacity 0.25s",
  [theme.breakpoints.down(429)]: {
    height: "90px",
  },
}));

export const ProductName = styled(Box)({
  paddingBottom: "0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  maxWidth: "100%",
  marginBottom: "0",
  marginLeft: "0",
  fontWeight: "700",
  lineHeight: "1.5em",
  ".list &": {
    width: "calc(100% - 145px)",
    paddingBottom: "30px",
    marginTop: "30px",
    height: "80px",
    justifyContent: "center",
    alignItems: "flex-start",
  },
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
  fontSize: "14px",
  lineHeight: "22px",
  letterSpacing: "3px",
  ".list &": {
    alignItems: "flex-start !important",
    height: "auto !important",
    textAlign: "start !important",
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
    width: "80px",
    marginLeft: "auto",
    minHeight: "74px",
    padding: "0",
    border: "none",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
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
