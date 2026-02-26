import { urlsIds } from "../src/config/urlsIds.config";
import store from "../src/redux/store";
import CoffeeService from "../src/services/CoffeeService";

const { getAllPages, getSections } = new CoffeeService();

export default async function getAllStaticPaths() {
  const pagePaths = await getAllPages();

  const paths = [];

  await Promise.all(
    pagePaths.map(async ({ url, id }) => {
      const route = url.replace("/", "");

      if (id === urlsIds.about) {
        const sections = await getSections();

        sections.forEach(({ section }) => {
          paths.push(`/${route}/${section}`);
        });
        return;
      }

      paths.push(`/${route}`);
    })
  );

  // Преобразуем пути к роутам
  return paths;
}
