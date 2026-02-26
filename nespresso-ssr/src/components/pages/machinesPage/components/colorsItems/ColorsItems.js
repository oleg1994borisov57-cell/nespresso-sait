import ColorItem from "../colorItem/ColorItem";
import { ColorsList } from "./styles";

export default function ColorsItems({ colors, activeColor, onColorClick }) {
  const items = colors.map(({ color }, i) => {
    return (
      <ColorItem
        key={i}
        hex={color}
        onClick={(e) => onColorClick(e, i)}
        isActive={i === activeColor ? true : false}
      />
    );
  });

  return <ColorsList>{items}</ColorsList>;
}
