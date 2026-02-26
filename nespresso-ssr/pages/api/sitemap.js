import fs from "fs";
import path from "path";

import getAllDynamicPaths from "../../lib/getAllDynamicPaths";
import getAllStaticPaths from "../../lib/getAllStaticPaths";
import getCurrUrl from "../../src/utils/getCurrUrl";

export default async function handler(req, res) {
  const dynamicPaths = await getAllDynamicPaths();
  const staticPaths = await getAllStaticPaths();

  const allPaths = [...dynamicPaths, ...staticPaths];

  // Определяем приоритеты по пути
  const getPriority = (path) => {
    if (path === "/") return "1.0";
    if (path.match(/^\/(capsules|machines|accessories|about|special-offers)$/)) return "0.9";
    if (path.match(/^\/(product|machine|accessory)\//)) return "0.8";
    if (path.match(/^\/(exclusive|vertuo)\//)) return "0.7";
    return "0.6";
  };

  // Определяем частоту изменений
  const getChangeFreq = (path) => {
    if (path === "/") return "daily";
    if (path.match(/^\/(product|machine|accessory)\//)) return "weekly";
    return "monthly";
  };

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPaths
      .map((path) => {
        return `
          <url>
            <loc>${`${getCurrUrl().url}${path}`}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>${getChangeFreq(path)}</changefreq>
            <priority>${getPriority(path)}</priority>
          </url>
        `;
      })
      .join("")}
  </urlset>`;

  const filePath = path.join(process.cwd(), "public", "sitemap.xml");

  fs.writeFileSync(filePath, sitemap);

  res.status(200).json({ message: "Sitemap generated successfully" });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
