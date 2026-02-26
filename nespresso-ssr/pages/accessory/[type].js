import Head from "next/head";
import CoffeeService from "../../src/services/CoffeeService";
import AccessoryProductPage from "../../src/components/pages/accessoryProductPage/AccessoryProductPage";
import getCurrUrl from "../../src/utils/getCurrUrl";
import { BreadcrumbJsonLd } from "../../src/components/seo/JsonLd";

const BASE_URL = "https://n-coffee.ru";

const { getAllAccessoriesProductsIds, getAccessoryProduct } =
  new CoffeeService();

export default function Accessory({ singleProduct }) {
  const description =
    singleProduct.description_tag ?? singleProduct.description ?? "";
  const title =
    singleProduct.title_tag && singleProduct.title_tag.length > 0
      ? singleProduct.title_tag
      : singleProduct.title ?? "Nespresso";

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <title>{title}</title>
        <meta property="keywords" content={singleProduct.keywords_tag ?? ""} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <link
          rel="canonical"
          href={`${getCurrUrl().url}/accessory/${singleProduct.id}`}
        />
        <meta property="og:image" content={singleProduct.img} />
      </Head>

      {/* JSON-LD для хлебных крошек аксессуара */}
      <BreadcrumbJsonLd items={[
        { name: "Главная", url: BASE_URL },
        { name: "Аксессуары", url: `${BASE_URL}/accessories` },
        { name: singleProduct.title, url: `${BASE_URL}/accessory/${singleProduct.id}` }
      ]} />

      <AccessoryProductPage product={singleProduct} />
    </>
  );
}

export async function getStaticPaths() {
  const res = await getAllAccessoriesProductsIds();

  const paths = res.map((id) => ({
    params: { type: id },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  try {
    const singleProduct = await getAccessoryProduct(params.type);

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        singleProduct,
      },
      revalidate: 120,
    };
  } catch {
    return {
      notFound: true,
      revalidate: 120,
    };
  }
}
