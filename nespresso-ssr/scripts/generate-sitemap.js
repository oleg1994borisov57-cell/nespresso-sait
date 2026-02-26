/**
 * Скрипт для генерации sitemap.xml
 * Запуск: node scripts/generate-sitemap.js
 */

const fs = require("fs");
const path = require("path");

const BASE_URL = "https://n-coffee.ru";

// Статические страницы
const staticPaths = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/capsules", priority: "0.9", changefreq: "weekly" },
  { path: "/machines", priority: "0.9", changefreq: "weekly" },
  { path: "/accessories", priority: "0.9", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/special-offers", priority: "0.8", changefreq: "weekly" },
  { path: "/vertuo", priority: "0.7", changefreq: "weekly" },
  { path: "/exclusive", priority: "0.7", changefreq: "weekly" },
];

// Динамические страницы — заглушки для примера
// В реальности нужно получать из API
const dynamicPaths = [];

async function fetchDynamicPaths() {
  try {
    // Здесь можно добавить fetch к API для получения всех ID
    // Пока оставляем пустым — API endpoint обновит при запросе
    return [];
  } catch (e) {
    console.error("Error fetching dynamic paths:", e);
    return [];
  }
}

async function generateSitemap() {
  const dynamic = await fetchDynamicPaths();
  const allPaths = [...staticPaths, ...dynamic];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths
  .map(
    ({ path, priority, changefreq }) => `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  const publicDir = path.join(process.cwd(), "public");
  const filePath = path.join(publicDir, "sitemap.xml");

  fs.writeFileSync(filePath, sitemap.trim());
  console.log(`✅ Sitemap generated: ${filePath}`);
  console.log(`📄 Total URLs: ${allPaths.length}`);
}

generateSitemap().catch(console.error);
