import bg from "../../../../../../resources/img/coffeeMachinePage/sustainability-bg.png";

import { Box, styled } from "@mui/material";
import {
  H1TextStyle,
  H3TextStyle,
  P3TextStyle,
} from "../../../../../typography/styles";

export const SustainabilitySectionBgWrapper = styled(Box)({
  position: "relative",
  overflow: "hidden",
  padding: "50px 0",
  background: `url(${bg.src}) center center / cover no-repeat`,
});

export const SustainabilityInfoWrapper = styled(Box)({
  maxWidth: "996px",
  margin: "0 auto",
  textAlign: "center",
});

export const SustainabilityInfoTitle = styled(H1TextStyle)({
  color: "white",
});

export const SustainabilityInfoSubtitle = styled(P3TextStyle)({
  color: "white",
  marginTop: "25px",
  fontWeight: "700",
  letterSpacing: "1px",
  lineHeight: "24px",
});

export const InfoItemsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",

  [theme.breakpoints.down(997)]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const InfoItem = styled(P3TextStyle)(({ theme }) => ({
  marginTop: "50px",
  width: "calc((100% - 200px) / 3)",
  [theme.breakpoints.down(997)]: {
    width: "100%",
  },
}));

export const ItemImg = styled("img")({
  width: "60px",
  height: "auto",
  margin: "auto",
});

export const ItemTitle = styled(H3TextStyle)({
  marginTop: "10px",
  color: "white",
});

export const ItemSubtitle = styled(P3TextStyle)({
  marginTop: "10px",
  fontWeight: "400",
  color: "white",
  textTransform: "none",
  fontSize: "16px",
  letterSpacing: "1px",
  lineHeight: "24px",
});
