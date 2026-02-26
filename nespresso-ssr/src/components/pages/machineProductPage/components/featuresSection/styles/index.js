import { Box, styled } from "@mui/material";

export const FeaturesSectionWrapper = styled(Box)({
  padding: "50px 0",
  height: "auto",
});

export const FeaturesImage = styled("img")(({ theme }) => ({
  position: "absolute",
  top: "-9999px",
  bottom: "-9999px",
  right: "-230px",
  height: "450px",
  width: "auto",
  margin: "auto",
  [theme.breakpoints.down(997)]: {
    position: "initial",
    width: "80%",
    minWidth: "300px",
    height: "auto",
    margin: "auto",
    marginTop: "30px",
    display: "block",
  },
}));

export const Container = styled(Box)(({ theme }) => ({
  position: "relative",
  [theme.breakpoints.down(997)]: {
    paddingLeft: "4%",
    paddingRight: "4%",
  },
}));
