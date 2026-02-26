import { Box, styled } from "@mui/material";

export const HeaderSection = styled(Box)({
  paddingTop: "68px",
  paddingBottom: "3px",
});

export const Container = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
});

export const Wrapper = styled(Box)({
  width: "calc(50% - 50px)",
});

export const ProductPageWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down(997)]: {
    paddingTop: "47px",
  },
}));
