import { useRouter } from "next/router";
import Head from "next/head";

import CoffeeService from "../../src/services/CoffeeService";
import getPageContent from "../../lib/getPageContent";
import getCurrPathProps from "../../lib/getPathProps";
import { unsupportedUrls } from "../../src/config/dynamicPages.config";
import { OrganizationJsonLd, WebsiteJsonLd, BreadcrumbJsonLd } from "../../src/components/seo/JsonLd";
import getCurrUrl from "../../src/utils/getCurrUrl";

const BASE_URL = "https://n-coffee.ru";

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

    return (
      <>
        <Head>
          <meta name="description" content={description} />
          <title>{title}</title>
          <link rel="canonical" href={`${getCurrUrl().url}/${path}`} />
        </Head>

        {/* JSON-LD разметка */}
        <OrganizationJsonLd />
        <WebsiteJsonLd />

        {/* JSON-LD для хлебных крошек категории */}
        <BreadcrumbJsonLd items={[
          { name: "Главная", url: BASE_URL },
          { name: title, url: `${BASE_URL}/${path}` }
        ]} />

        {content}
      </>
    );
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
