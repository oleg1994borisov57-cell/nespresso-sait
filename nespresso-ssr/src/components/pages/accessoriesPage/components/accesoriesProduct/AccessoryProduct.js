import BasicProductCard from "../../../../productCards/basicProductCard/BasicProductCard";

export default function AccessoryProduct({ product }) {
  const {
    id,
    img,
    title,
    price,
    alt_tag,
    old_price,
    availability,
    badge,
    badge_color,
  } = product;

  return (
    <BasicProductCard
      id={id}
      img={img}
      title={title}
      price={price}
      alt_tag={alt_tag}
      old_price={old_price}
      availability={availability}
      page={"accessory"}
      cartName={"accessories"}
      badgeText={badge}
      badgeColor={badge_color}
    />
  );
}
