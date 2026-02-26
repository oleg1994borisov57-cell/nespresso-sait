import getCartProducts from "./getCartProducts";

export default function findCartProduct(pages, productId) {
  const productsObj = getCartProducts(pages);

  const isTargetProduct = ({ id }) => id === productId;

  const targetProduct =
    productsObj.accessories.find(isTargetProduct) ||
    productsObj.coffee.find(isTargetProduct) ||
    productsObj.machines.find(isTargetProduct);

  return targetProduct;
}
