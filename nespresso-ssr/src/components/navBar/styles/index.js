import { Box, IconButton, styled } from "@mui/material";
import { P3TextStyle } from "../../typography/styles";

export const Nav = styled("nav")(({ theme }) => ({
  position: "absolute",
  zIndex: "999",
  top: "80px",

  backgroundColor: "#f6f6f4",
  [theme.breakpoints.down(997)]: {
    top: "0px",
    left: "0px",
    fontSize: "10px",
    zIndex: "100000",
    backgroundColor: "transparent",
  },
  [theme.breakpoints.up(997)]: {
    height: "68px",
    width: "100%",
  },
}));

export const IconWrapper = styled(Box)({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&.pulse": {
    "&::after": {
      display: "block",
      content: `''`,
      position: "absolute",
      top: "0px",
      right: "0px",
      backgroundColor: "rgb(61, 135, 5)",
      width: "8.7px",
      height: "8.7px",
      borderRadius: "100%",
      boxShadow: "0 0 0 0 rgba(61, 135, 5, 1)",
      transform: "scale(1)",
      animation: "pulse 2s infinite",
    },
  },
  "@keyframes pulse": {
    "0%": {
      transform: "scale(0.95)",
      boxShadow: "0 0 0 0 rgba(252, 53, 53, 0.336)",
    },
    "50%": {
      transform: "scale(1)",
      boxShadow: "0 0 0 2px rgba(252, 53, 53, 0.336)",
    },
    "100%": {
      transform: "scale(0.95)",
      boxShadow: "0 0 0 0 rgba(252, 53, 53, 0.336)",
    },
  },
});

export const ItemTitle = styled(P3TextStyle)(({ theme }) => ({
  fontWeight: "400",
  fontSize: "12px",
  letterSpacing: "0.5px",
  [theme.breakpoints.down(997)]: {
    fontSize: "15px",
  },
}));

export const MenuButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  // backgroundColor: "black",
  color: "black",
  top: "5px",
  left: "0px",
  [theme.breakpoints.up(997)]: {
    display: "none",
  },
}));

export const MenuWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "margin-left .4s ease-in-out",
  [theme.breakpoints.up(997)]: {
    "& li:not(:first-of-type) > a ": {
      "&::before": {
        content: '""',
        position: "absolute",
        left: "0",
        top: "12px",
        height: "calc(100% - 24px)",
        width: "1px",
        borderLeft: "1px solid #d9d9d9",
      },
    },
  },
  [theme.breakpoints.down(997)]: {
    display: "block",
    backgroundColor: "#f6f6f4",
    marginLeft: "-85vw",
    width: "85vw",
    "& li:not(:first-of-type) ": {
      "&::before": {
        content: '""',
        position: "absolute",
        left: "0px",
        top: "0px",
        height: "1px",
        width: "100%",
        backgroundColor: "#d9d9d9",
      },
      "&::after": {
        content: '"›"',
        position: "absolute",
        lineHeight: "50px",
        fontSize: "25px",
        color: "#454547",
        fontWeight: "400",
        fontFamily: "NespressoLucas",
        right: "12px",
      },
    },
  },
}));
