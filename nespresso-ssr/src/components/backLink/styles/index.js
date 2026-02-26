import { styled } from "@mui/material";
import NextLink from "next/link";

export const Link = styled(NextLink)(({ theme }) => ({
  position: "relative",
  fontWeight: "600",
  letterSpacing: "1px",
  fontSize: "14px",
  fontFamily:
    "NespressoLucas-Light, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif",
  "&:hover": {
    textDecoration: "underline !important",
  },
  [theme.breakpoints.down(996)]: {
    fontSize: "11px",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    display: "block",
    width: "6px",
    height: "6px",
    bottom: "3px",
    top: "50%",
    transform: "translateY(-50%) rotate(45deg)",
    left: "-12px",
    borderBottom: "1px solid currentColor",
    borderLeft: "1px solid currentColor",
  },
}));
