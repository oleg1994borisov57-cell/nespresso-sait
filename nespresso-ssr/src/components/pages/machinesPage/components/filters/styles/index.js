import { Box, ButtonBase, Container, InputBase, styled } from "@mui/material";

export const FiltersSection = styled(Box)({
  position: "relative",
  marginTop: "20px",
});

export const FiltersWrapper = styled(Box)({
  height: "60px",
  borderRadius: "2px",
  width: "100%",
  backgroundColor: "#f0f0f0",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});

export const StyledContainer = styled(Container)({
  position: "relative",
  padding: "0",
  maxWidth: "996px",
});

export const StyledButton = styled(ButtonBase)({
  fontFamily: "NESPRESSOLUCAS",
  height: "40px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#000",
  color: "white",
  lineHeight: "40px",
  display: "flex",
  alignItems: "center",
  width: "100px",
  padding: "0px 5px",
  textTransform: "uppercase",
  fontWeight: "300",
  "&:hover": {
    boxShadow: "0 3px 3px 0 rgb(0 0 0 / 30%)",
  },
});

export const StyledInput = styled(InputBase)({
  height: "40px",
  width: "calc(100% - 295px)",

  background: "#FFF",
  color: "black",
  fontFamily: "NespressoLucas,Helvetica,Arial,sans-serif",
  border: "1px solid #d5d5d5",
  fontSize: "8px",
  padding: "10px 6px",
  borderRadius: "3px",
  "&::placeholder": {
    color: "#656565",
  },
});
