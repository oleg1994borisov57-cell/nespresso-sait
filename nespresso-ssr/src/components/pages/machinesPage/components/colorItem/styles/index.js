import { Box, styled } from "@mui/material";

const activeColorStyles = {
  boxShadow: "0px 0px 4px black",
  width: "20px",
  height: "20px",
  marginRight: "-1px",
  marginLeft: "4px",
};

export const Color = styled(Box)({
  transition: "all 0.1s",
  width: "18px",
  height: "18px",
  borderRadius: "100%",
  border: "1px solid rgba(0,0,0,0.2)",
  marginLeft: "5px",
  "&.current": activeColorStyles,
  "&:hover": activeColorStyles,
});
