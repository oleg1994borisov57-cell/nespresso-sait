import { Box, styled } from "@mui/material";

export const VideoSectionWrapper = styled(Box)({
  position: "relative",
  overflow: "hidden",
  width: "100%",
  height: "0",
  paddingBottom: "33%",
  maxWidth: "1920px",
  "&::after": {
    content: `''`,
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.3)",
  },
});

export const VideoImg = styled("img")({
  display: "block",
  margin: "auto",
  position: "absolute",
  top: "-9999px",
  right: "-9999px",
  left: "-9999px",
  bottom: "-9999px",
  width: "110%",
  height: "auto",
  filter: "blur(7px)",
});

export const VideoPlayButton = styled(Box)({
  cursor: "pointer",
  position: "absolute",
  left: "calc(50% - 40px)",
  top: "calc(50% - 40px)",
  zIndex: "9",
  color: "#fff",
  fontSize: "50px",
  paddingLeft: "8px",
  width: "80px",
  height: "80px",
  borderRadius: "100%",
  border: "3px solid #fff",
  lineHeight: "80px",
  textAlign: "center",
  textShadow: "1px 1px 2px #000",
  transition: "all .25s",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

export const VideoPlayIcon = styled("span")({
  width: "0",
  height: "0",
  borderTop: "20px solid transparent",
  borderBottom: "20px solid transparent",
  borderLeft: "35px solid #fff",
  borderRadius: "0px",
  display: "block",
  position: "absolute",
  left: "26px",
  top: "17px",
});
