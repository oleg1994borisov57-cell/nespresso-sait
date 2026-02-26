import SmallUniversalProductPage from "../../productPages/smallUniversalProductPage/SmallUniversalProductPage";

export default function AccessoryProductPage({ product }) {
  return (
    <SmallUniversalProductPage
      cartPageName={"exclusive"}
      page={"exclusive"}
      product={product}
    />
  );
}
