import { urlsIds } from "../src/config/urlsIds.config";
import store from "../src/redux/store";
import CoffeeService from "../src/services/CoffeeService";

const {
  getPageDetails,
  getMachineCategories,
  getMachineProducts,
  getAccessoryCategories,
  getAccessoryProducts,
  getSingleSectionContent,
  getSections,
  getExclusiveCategories,
  getExclusiveProductsByCategory,
  getSpecialOffersCategories,
  getSpecialOffersProducts,
} = new CoffeeService();

const { getState } = store;

const notFoundObj = {
  notFound: true,
  revalidate: 120,
};

async function getAndBindProductsToCategory(getProductsCallback, categories) {
  return await Promise.all(
    categories.map(async (category) => {
      const products = await getProductsCallback(category.id);

      return { ...category, products };
    })
  );
}

async function getProductPageProps(
  getCategoriesCallback,
  getProductsCallback,
  pageDetails,
  pagePath,
  revalidate,
  page = null
) {
  const categories = page
    ? await getCategoriesCallback(page)
    : await getCategoriesCallback();
  const categoriesWithProducts = await getAndBindProductsToCategory(
    getProductsCallback,
    categories
  );

  return {
    props: {
      preloadedCategories: categoriesWithProducts,
      title: pageDetails.title,
      id: pageDetails.id,
      type: page,
      description: pageDetails.description,
      path: pagePath,
    },
    revalidate,
  };
}

export default async function getCurrPathProps(path, type) {
  try {
    const currPage = await getPageDetails(path);
    const newType = type ?? "original";

    if (
      currPage[0]?.id === urlsIds.machinesOriginal ||
      currPage[0]?.id === urlsIds.machinesVertuo
    ) {
      const { pages } = getState().productsMachine;

      if (!pages.some(({ name }) => name === newType) || type === "original")
        throw new Error("Incorrect type");

      return getProductPageProps(
        getMachineCategories,
        getMachineProducts,
        currPage[0],
        path,
        120,
        newType
      );
    } else if (currPage[0]?.id === urlsIds.exclusive) {
      if (newType !== "original") throw new Error("incorrect type");

      return getProductPageProps(
        getExclusiveCategories,
        getExclusiveProductsByCategory,
        currPage[0],
        path,
        120,
        newType
      );
    } else if (currPage[0]?.id === urlsIds.accessories) {
      if (newType !== "original") throw new Error("incorrect type");

      return getProductPageProps(
        getAccessoryCategories,
        getAccessoryProducts,
        currPage[0],
        path,
        120,
        newType
      );
    } else if (currPage[0]?.id === urlsIds.about) {
      const singleSectionContent = await getSingleSectionContent(type);
      const sections = await getSections();

      return {
        props: {
          singleSectionContent,
          sections,
          title: currPage[0].title,
          id: currPage[0].id,
          type: newType,
          description: currPage[0].description,
          path,
        },
        revalidate: 120,
      };
    } else if (currPage[0]?.id === urlsIds.specialOffers) {
      // const categories = await getSpecialOffersCategories();
      // const categoriesWithProducts = await Promise.all(
      //   categories.map(async (category) => {
      //     const products = await getSpecialOffersProducts(category.id);
      //     console.log(products);

      //     return { ...category, products };
      //   })
      // );

      return getProductPageProps(
        getSpecialOffersCategories,
        getSpecialOffersProducts,
        currPage[0],
        path,
        120
      );

      // By returning { props: { posts } }, the Blog component
      // will receive `posts` as a prop at build time
      // return {
      //   props: {
      //     preloadedCategories: categoriesWithProducts,
      //     title: currPage[0].title,
      //     id: currPage[0].id,
      //     description: currPage[0].description,
      //     path,
      //   },
      //   revalidate: 120,
      // };
    } else {
      return notFoundObj;
    }
  } catch (e) {
    return notFoundObj;
  }
}
