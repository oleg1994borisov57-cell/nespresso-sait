import SmallUniversalProductPage from "../../productPages/smallUniversalProductPage/SmallUniversalProductPage";

export default function AccessoryProductPage({ product }) {
  return (
    <SmallUniversalProductPage
      cartPageName={"accessories"}
      page={"accessory"}
      product={product}
    />
  );
}
