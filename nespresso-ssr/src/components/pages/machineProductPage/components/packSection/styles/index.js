import { Box, styled } from "@mui/material";
import { P3TextStyle } from "../../../../../typography/styles";

export const PackSectionWrapper = styled(Box)({
  padding: "50px 0",
  height: "auto",
});

export const Description = styled(P3TextStyle)({
  fontWeight: "400",
  textTransform: "none",
  marginTop: "25px",
});

export const PackImage = styled("img")({
  display: "block",
  margin: "5px auto",
  width: "100%",
  maxWidth: "640px",
  height: "auto",
});
