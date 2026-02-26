import { Step, styled, Button, ListItemText, Stepper } from "@mui/material";

export const StyledStep = styled(Step)(() => ({
  ".Mui-active": {
    circle: {
      color: "#3b4754",
    },
  },
  ".Mui-completed": {
    svg: {
      color: "#3b4754",
    },
  },
}));

export const StyledStepper = styled(Stepper)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const StyledButton = styled(Button)(() => ({
  backgroundColor: "#3b4754",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#3b4740",
  },
}));

export const StyledListItemText = styled(ListItemText)(() => ({
  span: {
    fontWeight: 700,
  },
}));
