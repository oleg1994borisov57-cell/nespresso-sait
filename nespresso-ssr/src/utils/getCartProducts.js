export default function getCartProducts(cart) {
  const productsObj = {
    // coffee: [],
    // machines: [],
    // accessories: [],
    // exclusive: [],
  };

  Object.keys(cart).forEach((page) => {
    const currPage = cart[page];

    const count = currPage.count;
    const productVariant = currPage.dbName;
    const products = currPage.products;

    if (!productsObj[productVariant]) {
      productsObj[productVariant] = [];
    }

    if (count) {
      productsObj[productVariant].push(...products);
    }
  });

  return productsObj;
}
