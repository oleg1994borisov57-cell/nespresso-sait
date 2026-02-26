import { styled } from "@mui/material";
import { H1TextStyle, P3TextStyle } from "../../../../../typography/styles";
import ActiveLink from "../../../../../activeLink/ActiveLink";

export const AboutCompanyMenu = styled("ul")(({ theme }) => ({
  position: "relative",
  width: "50%",
  listStyle: "none",
  left: 0,
  zIndex: "1",
  [theme.breakpoints.down(997)]: {
    position: "relative",
  },
}));

export const AboutMenuButton = styled(ActiveLink)({
  display: "inline-block",
  padding: "10px 5px",
  "&.active": {
    backgroundColor: "#e4d7d4",
  },
  "&:hover": {
    backgroundColor: "#e4d7d4",
  },
});

export const AboutMenuListItem = styled("li")(({ theme }) => ({}));

export const AboutMenuButtonTitle = styled(P3TextStyle)({
  textTransform: "none !important",
  letterSpacing: "0px",
});

export const AboutMenuTitle = styled(H1TextStyle)(({ theme }) => ({
  fontSize: "30px !important",
  letterSpacing: "0px",
  textTransform: "none",
  [theme.breakpoints.down(997)]: {
    display: "none",
  },
}));
