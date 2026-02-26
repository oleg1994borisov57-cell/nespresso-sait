import { Box, styled } from "@mui/material";
import { H1TextStyle } from "../../../../../typography/styles";

export const CompareWrapper = styled(Box)(({ theme }) => ({
  height: "auto",
  position: "relative",
  [theme.breakpoints.down(997)]: {
    display: "none",
  },
}));

export const CompareBg = styled("img")({
  position: "absolute",
  height: "100%",
  width: "100%",
  margin: "auto",
  top: "-9999px",
  bottom: "-9999px",
  left: "-9999px",
  right: "-9999px",
  zIndex: "2",
});

export const ComparePaper = styled(Box)({
  position: "relative",
  padding: "50px 0",
  maxWidth: "996px",
  marginLeft: "auto",
  marginRight: "auto",
  "&>*": {
    position: "relative",
    zIndex: "3",
  },
});

export const ComparePaperBg = styled(Box)({
  position: "absolute !important",
  top: "0",
  left: "-25px",
  width: "calc(100% + 50px)",
  height: "100%",
  background: "rgba(239, 233, 229, 0.92)",
});

export const Strong = styled("span")({
  fontWeight: "700",
});

export const ComparePaperTitle = styled(H1TextStyle)({});
