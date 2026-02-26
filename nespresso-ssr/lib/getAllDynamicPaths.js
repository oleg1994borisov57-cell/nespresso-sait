import CoffeeService from "../src/services/CoffeeService";

const {
  getAllProducts,
  getAllMachineProductsIds,
  getAllAccessoriesProductsIds,
  getAllExclusiveProductsIds,
} = new CoffeeService();

export default async function getAllDynamicPaths() {
  const capsulesProducts = await getAllProducts();
  const machinesIds = await getAllMachineProductsIds();
  const accessoriesIds = await getAllAccessoriesProductsIds();
  const exclusiveProductsIds = await getAllExclusiveProductsIds();

  const capsulesPaths = capsulesProducts.map(({ product_id }) => {
    return `/product/${product_id}`;
  });

  const machinesPaths = machinesIds.map((id) => {
    return `/machine/${id}`;
  });

  const accessoriesPaths = accessoriesIds.map((id) => {
    return `/accessory/${id}`;
  });

  const exclusivePaths = exclusiveProductsIds.map((id) => {
    return `/exclusive/${id}`;
  });

  return [
    ...capsulesPaths,
    ...accessoriesPaths,
    ...machinesPaths,
    ...exclusivePaths,
  ];
}
