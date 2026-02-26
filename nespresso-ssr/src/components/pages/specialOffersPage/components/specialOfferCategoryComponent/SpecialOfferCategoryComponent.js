import { useEffect } from "react";
import CategoryComponent from "../../../../categoryComponent/CategoryComponent";
import { sendEcommerceData } from "../../../../../utils/metriks";
import UniversalProductCardComponent from "../../../../universalProductCardComponent/UniversalProductCardComponent";

export default function SpecialOfferCategoryComponent({
  bg,
  title,
  subtitle,
  desc,
  className,
  categoryPos,
  products,
}) {
  const items = products
    ? products.map((product, i) => {
        if ("variants" in product) {
          return (
            <UniversalProductCardComponent
              key={product.variants[0]?.product_id}
              product={product}
            />
          );
        } else {
          const productId = product?.id ?? product?.product_id ?? i;

          return (
            <UniversalProductCardComponent
              key={productId}
              product={{ ...product }}
            />
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
