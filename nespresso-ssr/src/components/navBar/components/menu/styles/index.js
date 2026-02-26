import { Box, styled } from "@mui/material";
import { P3TextStyle } from "../../../../typography/styles";

export const CloseButton = styled(P3TextStyle)(() => ({
  fontWeight: "400",
  letterSpacing: "0.5px",
  fontSize: "24px",
}));

export const MenuBg = styled(Box)({
  position: "fixed",
  width: "100vh",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, .5)",
});

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
    position: "fixed",
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
