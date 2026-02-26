import { Box, styled } from "@mui/material";
import { P3TextStyle } from "../../../../typography/styles";
import Link from "next/link";

export const ItemWrapper = styled("li")(({ theme }) => ({
  position: "relative",
  listStyle: "none",
  width: "100px",
  height: "68px",
  borderTop: "none",
  borderBottom: "none",
  [theme.breakpoints.up(997)]: {
    transition: ".5s all",
    "&:hover": {
      background: "#FFF",
      boxShadow: "0 0 15px 2px #e9e9e9a6",
      "& div": {
        border: "none",
      },
    },
  },

  [theme.breakpoints.down(997)]: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "0 16px",
    alignItems: "center",
    // borderBottom: "solid black 1px",
    // "&:hover": {
    //   background: "initial",
    //   // boxShadow: "0 0 15px 2px #e9e9e9a6",
    //   // "& div": {
    //   //   border: "none",
    //   // },
    // },
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  position: "absolute",
  top: "0",
  padding: "8px 0",
  textDecoration: "none",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  // border: "#d9d9d9 1px solid",
  width: "100%",
  height: "100%",
  borderTop: "none",
  borderBottom: "none",
  [theme.breakpoints.down(997)]: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "34px",
    flexDirection: "row",
    alignItems: "center",
    // padding: "0 16px",
  },
}));
