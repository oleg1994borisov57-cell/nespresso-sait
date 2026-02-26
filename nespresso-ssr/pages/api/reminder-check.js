/**
 * API для проверки актуальности напоминания
 * GET /api/reminder-check?clientId=xxx&orderId=yyy
 * 
 * Проверяет, нужно ли отправлять напоминание:
 * - Если orderId совпадает с сохранённым → можно отправлять
 * - Если есть более новый заказ → пропускаем
 */

import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "reminders.json");

const readReminders = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return {};
  }
};

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Webhook-Secret");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Проверка секрета (опционально для GET, но рекомендуется)
  const secret = req.headers["x-webhook-secret"];
  const expectedSecret = process.env.NEXT_PUBLIC_N8N_WEBHOOK_SECRET || "";
  if (expectedSecret && secret !== expectedSecret) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { clientId, orderId } = req.query;

  if (!clientId || !orderId) {
    return res.status(400).json({
      error: "Missing required params: clientId, orderId",
    });
  }

  const reminders = readReminders();
  const reminder = reminders[clientId];

  // Нет напоминания вообще
  if (!reminder) {
    return res.status(200).json({
      shouldSend: false,
      reason: "reminder_not_found",
      message: "No reminder found for this client",
    });
  }

  // Проверяем, совпадает ли orderId
  if (reminder.orderId !== orderId) {
    return res.status(200).json({
      shouldSend: false,
      reason: "newer_order_exists",
      message: "Client has a newer order, skip this reminder",
      currentOrderId: reminder.orderId,
      requestedOrderId: orderId,
      newerOrderDate: reminder.createdAt,
    });
  }

  // Напоминание актуально
  return res.status(200).json({
    shouldSend: true,
    reminderDate: reminder.reminderDate,
    currentOrderId: reminder.orderId,
    customerData: reminder.customerData,
  });
}
