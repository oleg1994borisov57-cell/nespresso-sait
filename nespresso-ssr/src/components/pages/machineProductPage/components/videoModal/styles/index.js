import { Box, styled } from "@mui/material";

export const VideoModalBox = styled(Box)({
  position: "fixed",
  zIndex: "99999",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
});

export const VideoModalBg = styled(Box)({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.8)",
});

export const VideoModalWrapper = styled(Box)(({ theme }) => ({
  margin: "auto",
  width: "100%",
  maxWidth: "800px",
  height: "0",
  paddingBottom: "calc(1080% * 100 / 2560)",
  position: "absolute",
  top: "-9999px",
  bottom: "-9999px",
  left: "-9999px",
  right: "-9999px",
  overflow: "visible",
  background: "black",
  [theme.breakpoints.down(997)]: {
    width: "92%",
  },
}));

export const VideoModalCloseButton = styled(Box)({
  position: "absolute",
  color: "#fff",
  zIndex: "9",
  top: "-20px",
  right: "-20px",
  background: "rgba(0,0,0,0.5)",
  width: "40px",
  height: "40px",
  borderRadius: "100%",
  lineHeight: "40px",
  textAlign: "center",
  cursor: "pointer",
  fontSize: "16px",
});

export const VideoIframe = styled("iframe")({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  border: "0px",
});
