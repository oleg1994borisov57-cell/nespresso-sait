import { Box, styled } from "@mui/material";
import Link from "next/link";
import { H3TextStyle } from "../../../../../typography/styles";

const activeColorStyles = {
  boxShadow: "0px 0px 3px #000",
};

export const ColorsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  [theme.breakpoints.down(998)]: {
    position: "absolute",
    top: "50px",
    width: "100%",
    justifyContent: "center",
    left: "50%",
    transform: "translateX(-50%)",
    height: "37px",
    padding: "0px 5px 0px 12px",
  },
}));

export const Title = styled(H3TextStyle)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down(998)]: {
    display: "none",
  },
}));

export const ColorLink = styled(Link)({
  marginTop: "10px",
  width: "22px",
  height: "22px",
  borderRadius: "100%",
  border: "1px solid gray",
  marginRight: "10px",
  cursor: "pointer",
  "&.current": activeColorStyles,
  "&:hover": activeColorStyles,
});
