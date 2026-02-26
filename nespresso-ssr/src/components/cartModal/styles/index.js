import { Box, styled } from "@mui/material";

export const ButtonWrapper = styled(Box)({
  position: "relative",
});

export const GiftIconWrapper = styled(Box)({
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "999",
  right: "-10px",
  top: "-10px",
  width: "35px",
  height: "35px",
  borderRadius: "20px",
  fontSize: "18px",
  background: "#70bd35",
});

export const ModalCartBg = styled(Box)({
  display: "block !important",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.7)",
  zIndex: 99,
  overflow: "auto",
});

export const CartBox = styled(Box)(({ theme, full }) => ({
  width: full ? "100%" : "30%",
  maxWidth: "none",
  height: "100%",
  margin: "0 auto",
  padding: theme.spacing(2.5),
  backgroundColor: theme.palette.background.paper,
}));

export const ScrollBox = styled(Box)(({ theme }) => ({
  height: "100%",
  overflowY: "scroll",
  scrollbarWidth: "none",
}));

export const FormBox = styled(Box)(({ theme }) => ({
  flex: "1",
  touchAction: "pan-y",
  padding: "10px 0",
  height: "100%",
  width: "100%",
  backgroundColor: theme.palette.background.paper,

  "@keyframes slideIn": {
    "0%": {
      transform: "translateX(+100%)",
    },
    "100%": {
      transform: "translateX(0)",
    },
  },
  "@keyframes slideOut": {
    "0%": {
      transform: "translateX(0%)",
    },
    "100%": {
      transform: "translateX(100%)",
    },
  },
  "@keyframes slideInM": {
    "0%": {
      transform: "translateY(+100%)",
    },
    "100%": {
      transform: "translateY(0)",
    },
  },
  "@keyframes slideOutM": {
    "0%": {
      transform: "translateY(0%)",
    },
    "100%": {
      transform: "translateY(100%)",
    },
  },
}));
