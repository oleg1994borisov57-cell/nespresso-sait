import { Box, styled } from "@mui/material";

export const Main = styled("main")(({ theme }) => ({
  background: "#faf9f8",
  color: "#17171a",

  display: "flex",
  flexDirection: "column",

  "& #add_sticky_sku": {
    position: "fixed",
    right: "26px",
    bottom: "25px",
    zIndex: "980",
    pointerEvents: "none",
    opacity: "0 !important",
    transition: "all 0.1s",
    [theme.breakpoints.down(768)]: {
      buttom: "10px",
      height: "100px",
      right: "4%",
      right: "auto",
      left: "16px",
    },
    [theme.breakpoints.down(600)]: {
      display: "none",
    },
  },
}));

export const PageWrapper = styled(Box)(({ theme }) => ({
  background: "#fff",
  paddingBottom: "128px",
  paddingTop: "68px",
  [theme.breakpoints.down(767)]: {
    paddingTop: "0px",
    paddingBottom: "64px",
  },
}));
