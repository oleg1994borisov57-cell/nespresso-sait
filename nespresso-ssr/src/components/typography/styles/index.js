import { Typography, styled } from "@mui/material";

export const H1TextStyle = styled(Typography)(({ theme }) => ({
  color: "#17171a",
  textTransform: "uppercase",
  fontSize: "36px",
  lineHeight: "48px",
  letterSpacing: "8px",
  fontFamily: "NespressoLucas,Helvetica,Arial,sans-serif",
  [theme.breakpoints.down(997)]: {
    fontSize: "30px",
    lineHeight: "40px",
    letterSpacing: "6px",
  },
}));

export const H3TextStyle = styled(Typography)({
  fontWeight: "700",
  fontSize: "18px",
  lineHeight: "24px",
  letterSpacing: "3px",
  color: "#17171a",
  fontFamily: "NespressoLucas,Helvetica,Arial,sans-serif",
  textTransform: "uppercase",
});

export const P3TextStyle = styled(Typography)({
  display: "block",
  fontFamily: "NespressoLucas,Helvetica,Arial,sans-serif",
  fontWeight: "600",
  textTransform: "uppercase",
  color: "#17171a",
  letterSpacing: "1px",
  fontSize: "16px",
  lineHeight: "15px",
});
