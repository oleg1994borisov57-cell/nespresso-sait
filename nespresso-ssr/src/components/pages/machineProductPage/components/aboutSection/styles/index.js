import { Box, styled } from "@mui/material";
import { H1TextStyle } from "../../../../../typography/styles";
import ScrollIntoView from "react-scroll-into-view";

export const AboutSectionWrapper = styled(Box)(({ theme }) => ({
  height: "auto",
  padding: "100px 0 50px 0",
  backgroundColor: "#e1dad0",
  [theme.breakpoints.down(997)]: {
    padding: "50px 0 50px 0",
  },
}));

export const AboutDescription = styled("p")({
  letterSpacing: "1px",
  color: "#17171a",
  fontSize: "16px",
  fontWeight: "400",
  fontFamily: "NespressoLucas,Helvetica,Arial,sans-serif",
  lineHeight: "24px",
});

export const AboutTitle = styled(H1TextStyle)(({ theme }) => ({
  [theme.breakpoints.down(997)]: {
    fontSize: "24px",
  },
}));

export const AboutDescriptionWrapper = styled(Box)({
  marginTop: "30px",
});

export const AboutMenu = styled(Box)(({ theme }) => ({
  borderTop: "1px solid #aaa",
  borderBottom: "1px solid #aaa",
  background: "#d1cac0",
  marginBottom: "50px",
  [theme.breakpoints.down(997)]: {
    display: "none",
  },
}));

export const MenuLinksWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  height: "50px",
  alignItems: "center",
});

export const MenuLink = styled(ScrollIntoView)({
  textTransform: "none",
  cursor: "pointer",
  fontWeight: "400",
  display: "block",
  fontFamily: "NespressoLucas,Helvetica,Arial,sans-serif",
  color: "#17171a",
  letterSpacing: "1px",
  fontSize: "16px",
  lineHeight: "15px",
  "&:hover": {
    textDecoration: "underline",
  },
});
