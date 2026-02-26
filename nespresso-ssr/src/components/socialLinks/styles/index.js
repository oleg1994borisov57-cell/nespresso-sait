import { Box, styled } from "@mui/material";
import Image from "next/image";

import { socialItems } from "../socialItems";

export const SocialImage = styled(Image)({
  width: "50px",
  height: "50px",
  transition: "all .3s ease",
  "&:hover": {
    opacity: ".9",
  },
});

export const SocialsWrapper = styled(Box)(({ theme }) => ({
  zIndex: "999",
  position: "fixed",
  bottom: "23px",
  right: "20px",
  width: "50px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-end",
  height: `${socialItems.length * 55}px`,
  [theme.breakpoints.down("sm")]: {
    width: `${socialItems.length * 55}px`,
  },
}));
