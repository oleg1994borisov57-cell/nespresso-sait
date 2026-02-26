import { Box, styled } from "@mui/material";

export const NavHeader = styled(Box)(() => ({
  margin: "auto",
  textAlign: "center",
  "& h1": {
    textTransform: "uppercase",
  },
}));

export const NavMenu = styled(Box)(({ theme }) => ({
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  "& > *": {
    color: "#000",
    display: "flex",
    alignItems: "center",
    margin: "0 20px",
    paddingBottom: "7px",
    cursor: "pointer",
    [theme.breakpoints.down(768)]: {
      margin: "0 15px",
      fontSize: "14px",
    },
  },
  "& > *:not(.active)": {
    opacity: "0.6",
  },

  "& > *:not(.active):hover": {
    opacity: "1",
  },

  "& > *.active": {
    borderBottom: "2px solid black",
  },

  "& > * svg": {
    width: "auto",
    height: "30px",
    [theme.breakpoints.down(768)]: {
      height: "24px",
    },
  },
}));
