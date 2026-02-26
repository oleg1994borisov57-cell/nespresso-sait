import { useEffect } from "react";
import MachineProduct from "../machineProduct/MachineProduct";
import CategoryComponent from "../../../../categoryComponent/CategoryComponent";
import { sendEcommerceData } from "../../../../../utils/metriks";

export default function MachineCategory({
  bg,
  title,
  subtitle,
  desc,
  className,
  categoryPos,
  products,
}) {
  const items = products
    ? products.map((product) => {
        if (product.variants) {
          return (
            <MachineProduct
              key={product.variants[0].product_id}
              variants={product.variants}
            />
          );
        } else {
          return (
            <MachineProduct key={product.product_id} variants={[product]} />
          );
        }
      })
    : null;

  useEffect(() => {
    if (products && products.length) {
      sendEcommerceData(
        "impressions",
        products.map(({ product_id, title, price }) => {
          return { id: product_id, name: title, price };
        })
      );
    }
  }, []);

  return (
    <CategoryComponent
      bg={bg}
      categoryPos={categoryPos}
      title={title}
      subtitle={subtitle}
      desc={desc}
      className={className}
    >
      {items}
    </CategoryComponent>
  );
}
