import { Box, styled } from "@mui/material";

export const ColorsList = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginLeft: "auto !important",
  marginRight: "auto !important",
  ".list &": {
    display: "flex",
    alignItems: "center",
  },
});
