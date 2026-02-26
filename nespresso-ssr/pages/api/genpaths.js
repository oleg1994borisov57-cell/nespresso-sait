import { writeFileSync } from "fs";
import { join } from "path";

import getAllDynamicPaths from "../../lib/getAllDynamicPaths";
import getAllStaticPaths from "../../lib/getAllStaticPaths";

export default async function handler(req, res) {
  const dynamicPaths = await getAllDynamicPaths();
  const staticPaths = await getAllStaticPaths();

  const allPaths = [...dynamicPaths, ...staticPaths];

  const filePath = join(process.cwd(), "", "routes.json");

  writeFileSync(filePath, JSON.stringify(allPaths, null, 2));

  res.status(200).json({ message: "Routes generated successfully" });
}
export const config = {
  api: {
    bodyParser: false,
  },
};
