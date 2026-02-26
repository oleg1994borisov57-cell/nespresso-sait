import { alpha } from "@mui/material";
import { Link } from "./styles";

export default function BackLink({
  children,
  color,
  href,
  disableTextShadow,
  withoutBackArrow,
  sx,
}) {
  return (
    <Link
      color={color}
      sx={{
        "&::after": {
          color: alpha(color, 0.9),
          display: withoutBackArrow ? "none" : "block",
        },
        textShadow: !disableTextShadow ? "1px 1px 2px #000" : null,
        ...sx,
        color,
        textDecorationColor: color,
      }}
      href={href}
    >
      {children}
    </Link>
  );
}
