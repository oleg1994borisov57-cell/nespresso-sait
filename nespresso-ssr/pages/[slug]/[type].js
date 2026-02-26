import { useRouter } from "next/router";

import CoffeeService from "../../src/services/CoffeeService";
import getCurrPathProps from "../../lib/getPathProps";
import getPageContent from "../../lib/getPageContent";
import { urlsIds } from "../../src/config/urlsIds.config";
import { unsupportedUrls } from "../../src/config/dynamicPages.config";

const { getSections, getAllPages } = new CoffeeService();

export default function DynamicPage({
  id,
  title,
  description,
  type,
  path,
  ...values
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if ((id, title)) {
    const content = getPageContent(id, title, description, type, path, values);

    return <>{content}</>;
  }
}

export async function getStaticPaths() {
  const paths = await getAllPages();

  const newPaths = [];

  await Promise.all(
    paths
      .filter(({ id }) => !unsupportedUrls.includes(id))
      .map(async ({ url, id }) => {
        if (id === urlsIds.about) {
          const res = await getSections();

          res.forEach(({ section }) => {
            newPaths.push({
              params: { type: section, slug: url },
            });
          });
        } else {
          const pageType = url.match(/^(?:[^/]*\/){2}([^/]+)/);
          const pageUrl = url.match(/^(?:\/?)([^\/]+)\/[^\/]+/);
          if (pageUrl) {
            return {
              params: {
                slug: pageUrl[0],
                type: pageType ? pageType[1] : "original",
              },
            };
          } else {
            return {
              params: {
                slug: pageUrl,
                type: "original",
              },
            };
          }
        }
      })
  );

  return { paths: newPaths, fallback: "blocking" };
}

const typesWithDifferentInfo = {
  vertuo: true,
  pro: true,
};

export async function getStaticProps({ params }) {
  const { slug, type } = params;

  if (typesWithDifferentInfo[type]) {
    return getCurrPathProps(`/${slug}/${type}`, type);
  }

  return getCurrPathProps(slug, type);
}
