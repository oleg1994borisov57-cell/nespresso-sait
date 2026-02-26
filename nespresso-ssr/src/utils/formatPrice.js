/**
 * Formats a price value with standard formatting
 * @param {number} price - The price to format
 * @param {Object} options - Formatting options
 * @param {boolean} options.useSymbol - Whether to include the currency symbol
 * @param {string} options.currencySymbol - The currency symbol to use ("Р." or "₽")
 * @param {boolean} options.addSpace - Whether to add a space before the currency symbol
 * @returns {string} - The formatted price string
 */
export default function formatPrice(price, options = {}) {
  const { useSymbol = true, currencySymbol = "Р.", addSpace = true } = options;

  if (price === undefined || price === null) {
    return "";
  }

  const formattedPrice = price.toLocaleString(undefined, {
    minimumFractionDigits: 0,
  });

  if (!useSymbol) {
    return formattedPrice;
  }

  return `${formattedPrice}${addSpace ? " " : ""}${currencySymbol}`;
}
