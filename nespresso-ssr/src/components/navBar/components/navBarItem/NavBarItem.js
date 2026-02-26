import { ItemWrapper, StyledLink } from "./styles";

export default function NavBarItem({
  href,
  onMouseEnter,
  onMouseLeave,
  onClick,
  children,
}) {
  return (
    <ItemWrapper
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {href ? <StyledLink href={href}>{children}</StyledLink> : <>{children}</>}
    </ItemWrapper>
  );
}
