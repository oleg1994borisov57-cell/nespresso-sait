import { Box, styled } from "@mui/material";

export const Image = styled("img")({
  display: "block",
  width: "45%",
  height: "auto",
  margin: "10px auto",
  border: "1.5px solid #000",
  borderRadius: "100%",
});

export const OptionItemWrapper = styled(Box)({
  height: "120px",
  width: "25%",
  position: "relative",
  textTransform: "uppercase",
});

export const Title = styled("span")({
  display: "block",
  fontFamily: "NespressoLucas,Helvetica,Arial,sans-serif",
  fontWeight: "600",
  textAlign: "center",
  color: "#17171a",
});
