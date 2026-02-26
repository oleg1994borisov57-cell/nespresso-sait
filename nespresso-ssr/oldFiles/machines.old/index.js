import Head from "next/head";
import MachinesPage from "../../src/components/pages/machinesPage/MachinesPage";
import CoffeeService from "../../src/services/CoffeeService";

const { getMachineCategories, getMachineProducts } = new CoffeeService();

const Machines = ({ preloadedCategories }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Закажите кофе Nespresso с легкостью и насладитесь подлинным опытом благодаря большому выбору кофе. Дешёвая и быстрая доставка."
        />
        <title>Главная страница | Кофе машины original</title>
      </Head>
      <MachinesPage
        preloadedCategories={preloadedCategories}
        page={"original"}
      />
    </>
  );
};

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const categories = await getMachineCategories("original");
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
