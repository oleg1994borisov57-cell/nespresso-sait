import { useRouter } from "next/router";

import CoffeeService from "../../src/services/CoffeeService";
import getPageContent from "../../lib/getPageContent";
import getCurrPathProps from "../../lib/getPathProps";
import { unsupportedUrls } from "../../src/config/dynamicPages.config";

const { getAllPages } = new CoffeeService();

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

  const newPaths = paths
    .filter(({ id }) => !unsupportedUrls.includes(id))
    .map(({ url }) => {
      return { params: { slug: url } };
    });

  return { paths: newPaths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  return getCurrPathProps(slug);
}
