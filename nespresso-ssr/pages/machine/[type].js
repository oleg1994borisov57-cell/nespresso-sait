import Head from "next/head";
import MachineProductPage from "../../src/components/pages/machineProductPage/MachineProductPage";

import CoffeeService from "../../src/services/CoffeeService";
import getCurrUrl from "../../src/utils/getCurrUrl";

const { getAllMachineProductsIds, getMachineProduct } = new CoffeeService();

export default function Product({ currProduct, variants, breadcrumbs }) {
  const description = currProduct.description_tag ?? currProduct.description;
  const title =
    currProduct.title_tag && currProduct.title_tag.length
      ? currProduct.title_tag
      : currProduct.title;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <title>{title}</title>
        <meta name="keywords" content={currProduct.keywords_tag ?? ""} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <link
          rel="canonical"
          href={`${getCurrUrl().url}/machine/${currProduct.product_id}`}
        />
        <meta property="og:image" content={currProduct.productImg} />
      </Head>
      <MachineProductPage
        breadcrumbs={breadcrumbs}
        currProduct={currProduct}
        variants={variants}
      />
    </>
  );
}

export async function getStaticPaths() {
  const res = await getAllMachineProductsIds();

  const paths = res.map((id) => ({
    params: { type: `${id}` },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  try {
    const singleProduct = await getMachineProduct(params.type);

    let variants;

    if (singleProduct.variants) {
      variants = singleProduct.variants;
    } else {
      variants = [singleProduct];
    }

    const product = variants.find(
      ({ product_id }) => `${product_id}` === `${params.type}`
    );
    return {
      props: {
        currProduct: product,
        variants: variants,
        breadcrumbs: singleProduct.breadcrumbs,
      },
      revalidate: 120,
    };
  } catch {
    return {
      notFound: true,
      revalidate: 120,
    };
  }

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
}
