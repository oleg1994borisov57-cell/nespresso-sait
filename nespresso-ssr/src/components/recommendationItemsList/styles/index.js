import { styled } from "@mui/material";
import { H1TextStyle } from "../../typography/styles";

export const Title = styled(H1TextStyle)({
  marginTop: "10px",
  letterSpacing: "1.6px",
  fontWeight: "700",
  fontSize: "1rem",
  textTransform: "none",
});

export const List = styled("ul")({
  listStyle: "none",
  margin: "0",
  padding: "0",
  display: "flex",
  flexWrap: "wrap",
});
