import BasicProductCard from "../productCards/basicProductCard/BasicProductCard";
import CapsuleProductCard from "../productCards/capsuleProductCard/CapsuleProductCard";
import MachineProductCard from "../productCards/machineProductCard/MachineProductCard";

export default function UniversalProductCardComponent({ product }) {
  function getProductCard(productCategory, product) {
    switch (productCategory) {
      case "machine":
        const machineProps = {
          cartPageSubname: "Machines",
          pageLink: "machine",
        };

        if ("variants" in product) {
          return (
            <MachineProductCard
              variants={product?.variants}
              {...machineProps}
            />
          );
        } else {
          return <MachineProductCard variants={[product]} {...machineProps} />;
        }
      case "capsule":
        return (
          <CapsuleProductCard
            {...product}
            id={product.product_id}
            badgeText={product.badge}
            badgeColor={product.badge_color}
            productType={product.page}
            page={"product"}
            cartPageSubname={"Capsules"}
          />
        );
      case "exclusive":
      case "accessory":
        return (
          <BasicProductCard
            {...product}
            badgeText={product.badge}
            badgeColor={product.badge_color}
            page={"accessory"}
            cartName={"accessories"}
          />
        );
      default:
        throw new Error("can't find that product category");
    }
  }

  return <>{getProductCard(product.product_type, product)}</>;
}
