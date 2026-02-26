import Head from "next/head";
import ProductPage from "../../src/components/pages/productPage/ProductPage";
import CoffeeService from "../../src/services/CoffeeService";
import getCurrUrl from "../../src/utils/getCurrUrl";
import { ProductPageJsonLd, BreadcrumbJsonLd } from "../../src/components/seo/JsonLd";

const BASE_URL = "https://n-coffee.ru";

const { getSingleProduct, getAllProducts } = new CoffeeService();

export default function Product({ singleProduct }) {
  const description =
    singleProduct.description_tag && singleProduct.description_tag.length
      ? singleProduct.description_tag
      : singleProduct.details
      ? singleProduct["details"].descr
      : "";

  const title =
    singleProduct.title_tag && singleProduct.title_tag.length > 0
      ? singleProduct.title_tag
      : singleProduct.productName ?? "Nespresso";

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <title>{title}</title>
        <meta property="keywords" content={singleProduct.keywords_tag ?? ""} />
        <meta property="og:title" content={title} />
        <link
          rel="canonical"
          href={`${getCurrUrl().url}/product/${singleProduct.id}`}
        />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={singleProduct.productImg} />
      </Head>

      {/* JSON-LD разметка для товара */}
      <ProductPageJsonLd
        name={singleProduct.productName}
        description={description}
        image={singleProduct.productImg}
        sku={singleProduct.id}
        brand="Nespresso"
        price={singleProduct.price}
        currency="RUB"
        availability={singleProduct.inStock ? "InStock" : "OutOfStock"}
        url={`${getCurrUrl().url}/product/${singleProduct.id}`}
      />

      {/* JSON-LD для хлебных крошек товара */}
      <BreadcrumbJsonLd items={[
        { name: "Главная", url: BASE_URL },
        { name: "Капсулы", url: `${BASE_URL}/capsules` },
        { name: singleProduct.productName, url: `${BASE_URL}/product/${singleProduct.id}` }
      ]} />

      <ProductPage singleProduct={singleProduct} />
    </>
  );
}

export async function getStaticPaths() {
  const res = await getAllProducts();

  const paths = res.map((product) => ({
    params: { type: product.product_id },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  try {
    const singleProduct = await getSingleProduct(params.type);

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
