import isServerRender from "./isServerRender";

export const sendMetriks = async (type, target) => {
  if (isServerRender() || !window.ym) return;
  window.ym(95807004, type, target);
};

export const sendEcommerceData = async (type, data) => {
  const interval = setInterval(() => {
    if (isServerRender()) return;

    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    window.dataLayer.push({
      ecommerce: {
        currencyCode: "RUB",
        [type]: data,
      },
    });

    clearInterval(interval);
  }, 1000);
};
