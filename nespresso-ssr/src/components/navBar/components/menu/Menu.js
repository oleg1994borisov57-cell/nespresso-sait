import { Box, useMediaQuery } from "@mui/material";
import NavBarItem from "../navBarItem/NavBarItem";

import { ItemTitle } from "../../styles";
import { CloseButton, MenuBg, MenuWrapper } from "./styles";

export default function Menu({ sx, onClose, isOpen, children }) {
  const isMobile = useMediaQuery("(max-width:995px)");

  return (
    <>
      {isMobile && isOpen ? <MenuBg onClick={onClose} /> : null}
      <MenuWrapper
        component={"ul"}
        sx={{
          ...sx,
          marginLeft: isMobile ? (isOpen ? "0 !important" : "-85vw") : "0",
        }}
      >
        {isMobile ? (
          <NavBarItem>
            <ItemTitle component="div">Меню</ItemTitle>
            <CloseButton onClick={onClose} component="button">
              ✕
            </CloseButton>
          </NavBarItem>
        ) : null}
        {children}
      </MenuWrapper>
    </>
  );
}
