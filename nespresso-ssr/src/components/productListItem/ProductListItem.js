import CapsuleProductCard from "../productCards/capsuleProductCard/CapsuleProductCard";

const ProductListItem = ({ product, page }) => {
  return (
    <CapsuleProductCard
      {...product}
      badgeText={product.badge}
      badgeColor={product.badge_color}
      page={"product"}
      productType={page}
      cartPageSubname={`Capsules`}
    />
  );
};

export default ProductListItem;
