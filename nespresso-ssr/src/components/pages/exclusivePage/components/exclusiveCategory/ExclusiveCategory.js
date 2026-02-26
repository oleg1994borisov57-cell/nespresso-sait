import { useEffect } from "react";
import CategoryComponent from "../../../../categoryComponent/CategoryComponent";
import ExclusiveProduct from "../exclusiveProduct/ExclusiveProduct";
import { sendEcommerceData } from "../../../../../utils/metriks";

export default function ExclusiveCategory({
  bg,
  title,
  subtitle,
  desc,
  className,
  categoryPos,
  products,
}) {
  const items = products
    ? products
        .filter(({ availability }) => availability)
        .map(({ id, ...props }) => {
          return <ExclusiveProduct key={id} product={{ ...props, id }} />;
        })
    : null;

  useEffect(() => {
    if (products && products.length) {
      sendEcommerceData(
        "impressions",
        products.map(({ id, title, price }) => {
          return { id: id, name: title, price };
        })
      );
    }
  }, []);

  return (
    <CategoryComponent
      bg={bg}
      title={title}
      subtitle={subtitle}
      desc={desc}
      categoryPos={categoryPos}
      className={className}
    >
      {items}
    </CategoryComponent>
  );
}
