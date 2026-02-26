/**
 * API для сохранения напоминаний менеджеру
 * POST /api/reminders - создать/обновить напоминание
 * GET /api/reminders?clientId=xxx - получить напоминание клиента
 */

import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "reminders.json");

// Убедиться что файл существует
const ensureFile = () => {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({}));
  }
};

// Прочитать все напоминания
const readReminders = () => {
  ensureFile();
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return {};
  }
};

// Сохранить напоминания
const writeReminders = (data) => {
  ensureFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Webhook-Secret");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Проверка секрета
  const secret = req.headers["x-webhook-secret"];
  const expectedSecret = process.env.NEXT_PUBLIC_N8N_WEBHOOK_SECRET || "";
  if (expectedSecret && secret !== expectedSecret) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    const { clientId } = req.query;
    if (!clientId) {
      return res.status(400).json({ error: "clientId required" });
    }

    const reminders = readReminders();
    const reminder = reminders[clientId];

    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }

    return res.status(200).json({
      success: true,
      reminder,
    });
  }

  if (req.method === "POST") {
    const { clientId, orderId, reminderDate, customerData } = req.body;

    if (!clientId || !orderId || !reminderDate) {
      return res.status(400).json({
        error: "Missing required fields: clientId, orderId, reminderDate",
      });
    }

    const reminders = readReminders();

    // Сохраняем/обновляем напоминание
    reminders[clientId] = {
      orderId,
      reminderDate,
      customerData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    writeReminders(reminders);

    return res.status(200).json({
      success: true,
      reminderId: `${clientId}-${orderId}`,
      message: "Reminder saved",
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
