import invert from "invert-color";
import { BadgeWrapper } from "./styles";

export default function ProductBadge({ title, hexColor }) {
  return (
    <BadgeWrapper bgcolor={hexColor} color={invert(hexColor, true)}>
      {title}
    </BadgeWrapper>
  );
}
