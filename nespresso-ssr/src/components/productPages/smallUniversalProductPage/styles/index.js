import { Box, styled } from "@mui/material";

export const ProductPageWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down(997)]: {
    paddingTop: "47px",
  },
}));
