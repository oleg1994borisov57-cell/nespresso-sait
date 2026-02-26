import { Box, styled } from "@mui/material";

export const FiltersWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "996px",
  margin: "auto",
  padding: "5px 10px",
  background: "white",
  transition: "opacity 0.3s",
  "&.hide": {
    opacity: "0 !important",
  },
  [theme.breakpoints.down(996)]: {
    padding: "0 2%",
    background: "#fff",
    boxShadow: "none",
  },
}));

export const EmptySpace = styled(Box)({
  paddingTop: "70px",
});

export const ResetFilters = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "20px",
  top: "20px",
  marginBottom: "0",
  textAlign: "center",
  textTransform: "uppercase",
  cursor: "pointer",
  color: "#8f6d54",
  opacity: "0",
  transition: "all 0.75s",
  maxHeight: "0",
  "&:hover": {
    textDecoration: "underline",
  },
  [theme.breakpoints.down(996)]: {
    transition: "all 0s",
  },
}));

export const FilterList = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  background: "#fff",
  position: "relative",
  [theme.breakpoints.down(996)]: {
    width: "100%",
    flexWrap: "wrap",
    marginTop: "-10px",
    marginBottom: "-10px",
  },
  [theme.breakpoints.down(768)]: {
    justifyContent: "center",
    marginTop: "0",
  },
}));

export const FilterSwitchWrapper = styled(Box)(({ theme }) => ({
  width: "auto",
  display: "flex",
  borderRadius: "2rem",
  padding: "5px 15px",
  marginTop: "-5px",
  marginBottom: "-5px",
  marginLeft: "auto",
  [theme.breakpoints.down(996)]: {
    display: "none",
  },
}));

export const FilterSwitch = styled(Box)(({}) => ({
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  opacity: "0.6",
  transition: "all 0.2s",
  "&.selected, &:hover": {
    opacity: "1",
  },
  "&:last-of-type": {
    borderLeft: "1px solid #666",
    paddingLeft: "10px",
    marginLeft: "10px",
  },
  "& > *": {
    margin: "auto",
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  "& svg": {
    width: "20px",
    height: "20px",
    marginTop: "4px",
  },
}));
