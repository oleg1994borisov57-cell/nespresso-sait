import { ColorLink, ColorsWrapper, Title } from "./styles";

export default function Colors({ colors, activeColor }) {
  const items = colors.map(({ color, product_id, color_name }) => {
    return (
      <ColorLink
        title={color_name}
        key={product_id}
        href={`/machine/${product_id}`}
        className={`${activeColor}` === `${product_id}` ? "current" : null}
        sx={{
          background: color,
        }}
      />
    );
  });

  return (
    <ColorsWrapper>
      <Title component={"div"}>Цвета</Title>
      {items}
    </ColorsWrapper>
  );
}
