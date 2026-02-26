import {
  /* Box, Container, IconButton,  */ useMediaQuery,
} from "@mui/material";
import NavBarItem from "./components/navBarItem/NavBarItem";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IconWrapper, ItemTitle, MenuButton, MenuWrapper, Nav } from "./styles";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "./components/menu/Menu";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
// import links from "./links";

export default function NavBar({ links }) {
  const [hoveredElement, setHoveredElement] = useState(-1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isCartOpen } = useSelector((state) => state.menu);

  const dispatch = useDispatch();

  const handleOpenMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const onNavBarItemClick = useCallback(() => {
    handleCloseMenu();

    if (isCartOpen) {
      dispatch({ type: "menu/toggleCart" });
    }
  }, [isCartOpen]);

  const items = useMemo(() => {
    return links.map(({ id, title, icon, href }, i) => {
      const index = i + 1;

      const iconClassName = id === "promotions" ? "pulse" : null;

      return (
        <NavBarItem
          onMouseEnter={() => setHoveredElement(index)}
          onMouseLeave={() => setHoveredElement(-1)}
          onClick={onNavBarItemClick}
          href={href}
          key={id}
        >
          <IconWrapper
            height={"20px"}
            component="span"
            className={iconClassName}
            sx={{
              height: "23px",
              width: "30px",
            }}
          >
            <Image
              style={{ height: "100%", width: "auto" }}
              alt={id}
              src={icon}
            />
          </IconWrapper>
          <ItemTitle component="div">{title}</ItemTitle>
        </NavBarItem>
      );
    });
  }, [links, isCartOpen]);

  return (
    <Nav>
      {!isMenuOpen ? (
        <MenuButton onClick={handleOpenMenu} size="medium">
          <MenuIcon color="black" fontSize="medium" />
        </MenuButton>
      ) : null}
      <Menu
        onClose={handleCloseMenu}
        isOpen={isMenuOpen}
        sx={{
          [`& li:nth-of-type(${hoveredElement}) > a`]: {
            "&::before": {
              display: "none",
            },
          },
          [`& li:nth-of-type(${hoveredElement + 1}) > a`]: {
            "&::before": {
              display: "none",
            },
          },
        }}
      >
        {items}
      </Menu>
    </Nav>
  );
}
