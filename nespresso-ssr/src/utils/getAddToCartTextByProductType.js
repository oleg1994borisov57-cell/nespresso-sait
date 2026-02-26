const CAPSULE_TEXT = "Введите количество упаковок";
const MACHINE_TEXT = "Введите количество";
const ACCESSORY_TEXT = "Введите количество";

const productTypeTextMap = {
  originalCapsules: CAPSULE_TEXT,
  vertuoCapsules: CAPSULE_TEXT,
  vertuo: MACHINE_TEXT,
  original: MACHINE_TEXT,
  accessories: ACCESSORY_TEXT,
};

export default function getAddToCartTextByProductType(productType) {
  return productTypeTextMap[productType] || ACCESSORY_TEXT;
}
