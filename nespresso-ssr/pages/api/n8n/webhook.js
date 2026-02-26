/**
 * API endpoint для приёма данных от n8n
 * И для отправки webhook-уведомлений
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Webhook-Secret");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Проверка секрета (если настроен)
  const secret = req.headers["x-webhook-secret"];
  const expectedSecret = process.env.N8N_WEBHOOK_SECRET || "";

  if (expectedSecret && secret !== expectedSecret) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { event, data, clientId, timestamp } = req.body;

  if (!event) {
    return res.status(400).json({ error: "Event type required" });
  }

  // Логируем событие (в продакшене — в базу или аналитику)
  console.log("[N8N Webhook]", {
    event,
    clientId: clientId?.slice(0, 8) + "...",
    timestamp,
    dataSummary: summarizeData(event, data),
  });

  // Ответ для n8n
  res.status(200).json({
    success: true,
    received: true,
    event,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Суммарная информация для логов
 */
function summarizeData(event, data) {
  switch (event) {
    case "add_to_cart":
      return `${data.productName} x${data.quantity}`;
    case "product_view":
      return `${data.productName} (view #${data.viewCount})`;
    case "abandoned_cart":
      return `${data.items?.length || 0} items, ${data.abandonedMinutes}min ago`;
    case "purchase":
      return `Order ${data.orderId}, ${data.total}₽`;
    default:
      return "...";
  }
}
