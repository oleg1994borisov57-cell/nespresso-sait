import { alpha, Box, styled } from "@mui/material";
import { H3TextStyle } from "../../typography/styles";
import Link from "next/link";

const textColor = "#757575";

export const Footer = styled("footer")({
  padding: "20px 20px",
  backgroundColor: "#f9f9f9",
  width: "100%",
});

export const FooterWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  //   gap: "100px",
  alignItems: "flex-start",
});

export const FooterTitle = styled(H3TextStyle)({
  color: textColor,
});

export const FooterItemList = styled("ol")({
  listStyle: "inside",
  paddingLeft: "3px",
});

export const FooterItemWrapper = styled("div")({
  paddingTop: "10px",
});

export const FooterItem = styled("li")({
  display: "block",
  fontSize: "12px",
  color: textColor,
});

export const FooterLink = styled(Link)({
  display: "block",
  fontSize: "12px",
  color: textColor,
  textDecoration: "none",
  "&:hover": {
    color: alpha(textColor, 0.8),
  },
});
