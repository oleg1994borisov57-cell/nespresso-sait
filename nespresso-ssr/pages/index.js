import Head from "next/head";
import ShopPage from "../src/components/pages/shopPage/ShopPage";

import CoffeeService from "../src/services/CoffeeService";

import { urlsIds } from "../src/config/urlsIds.config";
import getCurrUrl from "../src/utils/getCurrUrl";

const { getCategories, getProducts, getPageDetails } = new CoffeeService();

const page = "original";

const Original = ({ preloadedCategories, title, description }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <link rel="canonical" href={getCurrUrl().url} />
        <title>{title}</title>
      </Head>
      <ShopPage page={page} categories={preloadedCategories} />
    </>
  );
};

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const categories = await getCategories(page);
  const categoriesWithProducts = await Promise.all(
    categories.map(async (category) => {
      const products = await getProducts(category.id, {
        intensity: 1,
        cupSize: 1,
      });

      return { ...category, products };
    })
  );

  const pageDetails = await getPageDetails(urlsIds.capsulesOriginal, "id");

  const title = pageDetails[0].title.replace("{page}", page);

  return {
    props: {
      preloadedCategories: categoriesWithProducts,
      title,
      description: pageDetails[0]?.description,
    },
    revalidate: 120,
  };
}

export default Original;
