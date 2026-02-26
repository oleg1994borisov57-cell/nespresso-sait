import { Box, styled } from "@mui/material";
import { P3TextStyle } from "../../../../../typography/styles";

export const FaqItemWrapper = styled(Box)({
  borderBottom: "1px solid #ccc",
  marginTop: "15px",
  paddingBottom: "15px",
});

export const Question = styled(P3TextStyle)({
  fontWeight: "bold",
  textTransform: "uppercase",
  position: "relative",
  cursor: "pointer",
  paddingRight: "20px",
  "&::after": {
    content: `'‹'`,
    position: "absolute",
    right: "5px",
    top: "0",
    fontWeight: "normal",
    transform: "rotate(-90deg)",
    fontSize: "32px",
  },
  "&.active": {
    "&::after": {
      transform: "rotate(-90deg) scale(-1)",
      right: "0",
    },
  },
});

export const Answer = styled(P3TextStyle)({
  overflow: "hidden",
  marginTop: "15px",
  maxHeight: "1000px",
  fontWeight: "400",
  textTransform: "none",
});
