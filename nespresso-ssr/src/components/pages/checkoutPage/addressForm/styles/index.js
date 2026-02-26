import { alpha, styled } from "@mui/material";

const buttonGeneralColor = "#9e9e9e",
  buttonSecondColor = "green";

export const ChooseButtonLeft = styled("button")({
  position: "relative",
  overflow: "hidden",
  color: "white",
  fontWeight: "500",
  fontSize: "15px",
  backgroundColor: buttonGeneralColor,
  padding: "10px",
  borderTopLeftRadius: "30px",
  borderBottomLeftRadius: "30px",
  transition: "all .3s",
  zIndex: "1",
  "&:after": {
    position: "absolute",
    content: '""',
    top: "0",
    zIndex: "-1",
    right: "0",
    width: "0",
    height: "100%",
    backgroundColor: buttonSecondColor,
    transition: "all .35s",
  },
  "&:disabled:after": {
    width: "100%",
  },
  "&:hover": {
    backgroundColor: alpha(buttonGeneralColor, 0.9),
  },
});
export const ChooseButtonRight = styled(ChooseButtonLeft)({
  borderRadius: "0",
  borderTopRightRadius: "30px",
  borderBottomRightRadius: "30px",
  "&:after": {
    left: "0",
  },
});
