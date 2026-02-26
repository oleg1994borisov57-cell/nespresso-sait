import fs from "fs";
import path from "path";

import getAllDynamicPaths from "../../lib/getAllDynamicPaths";
import getAllStaticPaths from "../../lib/getAllStaticPaths";
import getCurrUrl from "../../src/utils/getCurrUrl";

export default async function handler(req, res) {
  const dynamicPaths = await getAllDynamicPaths();
  const staticPaths = await getAllStaticPaths();

  const allPaths = [...dynamicPaths, ...staticPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPaths
      .map((path) => {
        return `
          <url>
            <loc>${`${getCurrUrl().url}${path}`}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
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
