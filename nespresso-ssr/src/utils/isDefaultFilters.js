export default function isDefaultFilters(filters) {
  let isDefaultFilters = true;

  for (let value of filters) {
    if (value["activeFilterId"] !== 1) {
      isDefaultFilters = false;
      break;
    }
  }

  return isDefaultFilters;
}
