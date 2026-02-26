/**
 * N8N Webhook utilities
 * Отправка событий в n8n для автоматизации
 */

import isServerRender from "./isServerRender";

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "";
const N8N_WEBHOOK_SECRET = process.env.NEXT_PUBLIC_N8N_WEBHOOK_SECRET || "";

/**
 * Отправить событие в n8n
 * @param {string} event - тип события
 * @param {object} data - данные события
 * @param {object} meta - метаданные (clientId, timestamp, etc)
 */
export const sendN8NEvent = async (event, data = {}, meta = {}) => {
  if (isServerRender() || !N8N_WEBHOOK_URL) return;

  const payload = {
    event,
    timestamp: new Date().toISOString(),
    clientId: getClientId(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    ...meta,
    data,
  };

  try {
    // Отправляем в фоне, не блокируем UI
    fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Secret": N8N_WEBHOOK_SECRET,
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Игнорируем ошибки — не мешаем пользователю
    });
  } catch (e) {
    // Silent fail
  }
};

/**
 * Получить или создать ID клиента
 */
const getClientId = () => {
  if (isServerRender()) return null;

  let clientId = localStorage.getItem("n8n_client_id");
  if (!clientId) {
    clientId = generateUUID();
    localStorage.setItem("n8n_client_id", clientId);
  }
  return clientId;
};

/**
 * Генератор UUID v4
 */
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// ============================================
// ГОТОВЫЕ СОБЫТИЯ ДЛЯ ИСПОЛЬЗОВАНИЯ В КОДЕ
// ============================================

/**
 * Товар добавлен в корзину
 */
export const trackAddToCart = (product, quantity, cartTotal) => {
  sendN8NEvent("add_to_cart", {
    productId: product.id,
    productName: product.title || product.productName,
    price: product.price,
    quantity,
    cartTotal,
    category: product.category || "unknown",
  });
};

/**
 * Товар удалён из корзины
 */
export const trackRemoveFromCart = (product, cartTotal) => {
  sendN8NEvent("remove_from_cart", {
    productId: product.id,
    productName: product.title || product.productName,
    price: product.price,
    cartTotal,
  });
};

/**
 * Начало оформления заказа
 */
export const trackBeginCheckout = (cart, total) => {
  sendN8NEvent("begin_checkout", {
    items: cart,
    total,
    itemCount: cart.length,
  });
};

/**
 * Просмотр товара
 */
export const trackProductView = (product) => {
  const viewKey = `view_${product.id}`;
  const views = parseInt(sessionStorage.getItem(viewKey) || "0") + 1;
  sessionStorage.setItem(viewKey, views.toString());

  sendN8NEvent("product_view", {
    productId: product.id,
    productName: product.title || product.productName,
    price: product.price,
    viewCount: views,
    category: product.category || "unknown",
  });

  // Если просмотрели 2+ раза — отдельное событие для n8n
  if (views === 2) {
    sendN8NEvent("product_viewed_twice", {
      productId: product.id,
      productName: product.title || product.productName,
      price: product.price,
    });
  }
};

/**
 * Покупка завершена
 */
export const trackPurchase = (orderData) => {
  sendN8NEvent("purchase", {
    orderId: orderData.orderId,
    total: orderData.total,
    items: orderData.items,
    email: orderData.email,
    phone: orderData.phone,
  });
};

/**
 * Брошенная корзина (запускается при уходе со страницы)
 * @param {object} cart - содержимое корзины
 * @param {number} minutesAgo - через сколько минут считать брошенной
 */
export const trackAbandonedCart = (cart, minutesAgo = 60) => {
  if (!cart || cart.length === 0) return;

  const lastActivity = localStorage.getItem("n8n_last_cart_activity");
  const now = Date.now();

  if (lastActivity) {
    const diffMinutes = (now - parseInt(lastActivity)) / (1000 * 60);
    if (diffMinutes >= minutesAgo) {
      sendN8NEvent("abandoned_cart", {
        items: cart,
        abandonedMinutes: Math.floor(diffMinutes),
        cartTotal: cart.reduce((sum, item) => sum + item.total, 0),
      });
    }
  }

  localStorage.setItem("n8n_last_cart_activity", now.toString());
};

/**
 * Обновить время активности корзины
 */
export const updateCartActivity = () => {
  localStorage.setItem("n8n_last_cart_activity", Date.now().toString());
};

export default {
  sendN8NEvent,
  trackAddToCart,
  trackRemoveFromCart,
  trackBeginCheckout,
  trackProductView,
  trackPurchase,
  trackAbandonedCart,
  updateCartActivity,
};
