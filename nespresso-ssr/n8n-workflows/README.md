# N8N Интеграция для N-Coffee

## Быстрый старт

### 1. Регистрация в n8n

**Вариант A: Облако (проще)**
- https://n8n.io/cloud
- 14 дней бесплатно, потом $20/мес
- Не нужен сервер

**Вариант B: Самостоятельный хостинг**
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```
Открыть http://localhost:5678

---

### 2. Настройка окружения сайта

Добавить в `.env.local` (или в переменные окружения хостинга):

```env
# URL webhook'а n8n (заменить на свой)
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n.app.n8n.cloud/webhook/n-coffee

# Секрет для проверки подлинности (придумать случайный)
NEXT_PUBLIC_N8N_WEBHOOK_SECRET=your-secret-key-here
```

**Пересобрать и задеплоить сайт после изменений!**

---

### 3. Импорт workflow в n8n

1. Открыть n8n → Workflows → Import from File
2. Загрузить по очереди:
   - `abandoned-cart.json` — брошенные корзины
   - `product-interest.json` — повторные просмотры
   - `new-order.json` — новые заказы

---

### 4. Настройка credentials

#### Telegram (для уведомлений)
1. Написать @BotFather → создать бота
2. Получить токен вида `123456:ABC-DEF...`
3. n8n → Settings → Credentials → Add Credential → Telegram
4. Вставить токен
5. Узнать свой chat_id: написать боту @userinfobot
6. В каждом workflow в поле Chat ID вставить: `{{ $env.TELEGRAM_CHAT_ID }}`
7. В n8n Settings → Variables добавить: `TELEGRAM_CHAT_ID=ваш_chat_id`

#### Email SMTP (опционально)
1. n8n → Settings → Credentials → Add Credential → SMTP
2. Настройки для популярных сервисов:
   - **Yandex**: smtp.yandex.ru:465, SSL
   - **Gmail**: smtp.gmail.com:465, SSL (нужен App Password)
   - **Mail.ru**: smtp.mail.ru:465, SSL

---

### 5. Получение webhook URL

В каждом workflow:
1. Открыть первый узел "Webhook"
2. Скопировать "Webhook URL" (HTTP POST)
3. Он будет вида: `https://your-n8n.app.n8n.cloud/webhook/abandoned-cart`

---

### 6. Тестирование

**Проверка через curl:**
```bash
curl -X POST https://your-n8n.app.n8n.cloud/webhook/abandoned-cart \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: your-secret-key" \
  -d '{
    "event": "abandoned_cart",
    "clientId": "test-123",
    "timestamp": "2024-01-01T00:00:00Z",
    "data": {
      "items": [{"title": "Roma", "count": 2, "total": 1200}],
      "cartTotal": 1200,
      "abandonedMinutes": 65
    }
  }'
```

**Проверка через сайт:**
1. Открыть любой товар
2. Добавить в корзину
3. Подождать 1 час (или изменить таймер в коде)
4. Проверить уведомление в Telegram

---

## События и их описание

| Событие | Когда срабатывает | Данные |
|---------|-------------------|--------|
| `add_to_cart` | Товар добавлен в корзину | productId, productName, price, quantity, cartTotal |
| `remove_from_cart` | Товар удалён из корзины | productId, productName, price, cartTotal |
| `begin_checkout` | Начат процесс оформления | items[], total |
| `product_view` | Просмотр товара | productId, productName, price, viewCount |
| `product_viewed_twice` | Товар просмотрен 2+ раза | productId, productName, price |
| `purchase` | Заказ успешно оформлен | orderId, total, items[], email, phone |
| `abandoned_cart` | Корзина не оформлена 60+ мин | items[], cartTotal, abandonedMinutes |

---

## Дополнительные возможности

### Добавить Google Sheets (логирование)

1. Создать таблицу с колонками: timestamp, event, clientId, data
2. n8n → Credentials → Google Sheets OAuth2
3. Добавить узел Google Sheets после webhook → Append

### Добавить задержку перед уведомлением

В workflow "Брошенная корзина" добавить узел **Wait** перед Telegram:
- Wait → Specific time
- Time: 1 hour

Это даст клиенту время вернуться самому.

### Фильтрация по сумме корзины

Добавить узел **If** перед уведомлением:
```
Condition: {{ $json.cartTotal }}
Operation: Greater Than
Value: 2000
```
Уведомлять только о крупных корзинах.

---

## Troubleshooting

**События не приходят в n8n:**
- Проверить `NEXT_PUBLIC_N8N_WEBHOOK_URL` в .env
- Проверить CORS в браузере (F12 → Network)
- Убедиться что сайт пересобран после изменений .env

**Ошибка 401 Unauthorized:**
- Проверить `X-Webhook-Secret` в заголовках
- Убедиться что секреты совпадают

**Telegram не отправляет:**
- Проверить токен бота
- Убедиться что боту писали личное сообщение
- Проверить chat_id

**Email не отправляет:**
- Проверить SMTP credentials
- Для Gmail использовать App Password, не пароль аккаунта
- Проверить папку Спам получателя

---

## API Reference

### POST /api/n8n/webhook

Принимает события от сайта и пересылает в n8n.

**Headers:**
```
Content-Type: application/json
X-Webhook-Secret: your-secret
```

**Body:**
```json
{
  "event": "add_to_cart",
  "timestamp": "2024-01-01T00:00:00Z",
  "clientId": "uuid-v4",
  "url": "https://n-coffee.ru/product/...",
  "userAgent": "Mozilla/5.0...",
  "data": { ... }
}
```

**Response:**
```json
{
  "success": true,
  "received": true,
  "event": "add_to_cart"
}
```

---

## Контакты и поддержка

Если что-то не работает — проверьте:
1. Логи в n8n (Execution list)
2. Консоль браузера (F12)
3. Network tab в DevTools

Успехов! ☕
