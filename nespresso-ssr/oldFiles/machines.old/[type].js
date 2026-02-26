import Head from "next/head";
import { useRouter } from "next/router";
import MachinesPage from "../../src/components/pages/machinesPage/MachinesPage";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import store from "../../src/redux/store";

const { getState } = store;

import CoffeeService from "../../src/services/CoffeeService";

const { getMachineCategories, getMachineProducts } = new CoffeeService();

const Machines = ({ preloadedCategories }) => {
  const router = useRouter();

  const {
    query: { type },
  } = router;

  const { pages } = useSelector((state) => state.productsMachine);

  useEffect(() => {
    const currPage = pages.find(({ href }) => {
      return type === href;
    });

    if (!currPage) {
      router.replace("/404");
    }
  }, [type]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Закажите кофе Nespresso с легкостью и насладитесь подлинным опытом благодаря большому выбору кофе. Дешёвая и быстрая доставка."
        />
        <title>{`Главная страница | Кофе машины ${type}`}</title>
      </Head>
      <MachinesPage preloadedCategories={preloadedCategories} page={type} />
    </>
  );
};

export async function getStaticPaths() {
  const { pages } = getState().productsMachine;

  const paths = pages.map(({ name }) => ({
    params: { type: name },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const categories = await getMachineCategories(params.type);
  const categoriesWithProducts = await Promise.all(
    categories.map(async (category) => {
      const products = await getMachineProducts(category.id);

      return { ...category, products };
    })
  );

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      preloadedCategories: categoriesWithProducts,
    },
    revalidate: 10,
  };
}

export default Machines;
