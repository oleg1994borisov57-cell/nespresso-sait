import axios from "axios";
import getCurrUrl from "../utils/getCurrUrl";

class CoffeeService {
  _url = `${getCurrUrl().server}/api/`;

  categoriesController = new AbortController();

  getCategories = async (page) => {
    if (this.categoriesController) {
      this.categoriesController.abort();
    }

    this.categoriesController = new AbortController();

    const response = await axios.get(this._url + "get/categories/" + page, {
      signal: this.categoriesController.signal,
    });
    return response.data;
  };

  getMachineCategories = async (page) => {
    const response = await axios.get(
      `${this._url}get/${page}/machineCategories`
    );
    return response.data;
  };

  getAllMachineProductsIds = async () => {
    const response = await axios.get(this._url + `machines/all`);
    return response.data;
  };

  getMachineProducts = async (categoryId) => {
    const response = await axios.get(
      `${this._url}get/${categoryId}/machineProducts`
    );
    return response.data;
  };

  getMachineProduct = async (id) => {
    const response = await axios.get(`${this._url}get/${id}/machine`);
    return response.data;
  };

  getSections = async () => {
    const response = await axios.get(this._url + "get/sections");
    return response.data;
  };

  getSingleSectionContent = async (id) => {
    const response = await axios.get(this._url + `get/${id}/content`);
    return response.data;
  };

  getPageDetails = async (searchTerm, searchParam = "url") => {
    const response = await axios.get(
      this._url + `page?${searchParam}=${searchTerm}`
    );
    return response.data;
  };

  getAllPages = async () => {
    const response = await axios.get(this._url + `page`);
    return response.data;
  };

  getProducts = async (category, filters) => {
    const response = await axios.post(
      this._url + `get/products/${category}/filter`,
      {
        intensity: filters.intensity,
        cupSize: filters.cupSize,
      }
    );
    return response.data;
  };

  getAllProducts = async () => {
    const response = await axios.get(this._url + "get/products");
    return response.data;
  };

  getSingleProduct = async (id) => {
    const response = await axios.get(this._url + "get/item/" + id);
    return response.data;
  };

  sendDeliveryInfo = async (info) => {
    const response = await axios.post(this._url + "post/sendOrder", info);
    return response.data;
  };

  getPaymentLink = async (info) => {
    const response = await axios.post(this._url + "initPayment", info);
    return response.data;
  };

  getOrderPrice = async (info) => {
    const response = await axios.post(
      this._url + "order/calculate-price",
      info
    );
    return response.data;
  };

  getAccessoryCategories = async () => {
    const response = await axios.get(
      this._url + `get/accessories/categories/all/user`
    );
    return response.data;
  };

  getAllAccessoriesProductsIds = async () => {
    const response = await axios.get(this._url + `accessories/all`);
    return response.data;
  };

  getAccessoryProducts = async (categoryId) => {
    const response = await axios.get(
      this._url + `get/accessories/${categoryId}/user`
    );
    return response.data;
  };

  getAccessoryProduct = async (accessoryId) => {
    const response = await axios.get(
      this._url + `get/accessories/item/${accessoryId}/user`
    );
    return response.data;
  };

  getExclusiveCategories = async () => {
    const response = await axios.get(
      this._url + `products/exclusive/categories?page=all&user_type=user`
    );
    return response.data;
    // return [
    //   {
    //     id: "d1f1bcc6-8737-4a3d-b097-57ae2055b738",
    //     bg: "https://nestle-nespresso.ru/img/products/17f2ea2d-777d-457b-a8ab-a36a199dd61f.jpeg",
    //     title: "Фирменные аксессуары Nespresso",
    //     subtitle: "ОСВЕТИТЕ СВОЙ ЕЖЕДНЕВНЫЙ КОФЕЙНЫЙ РИТУАЛ",
    //     desc: "Коллекции, вдохновленные Nespresso , включают аксессуары и чашки, роскошный шоколад,  дозаторы  капсул, напоминающие  о Вашем любимом кофе.",
    //     page: "all",
    //     hide: "0",
    //     place_number: 1,
    //     alt_tag: "accessories",
    //     shortlink_bg:
    //       "https://nestle-nespresso.ru/img/products/b9ad7335-e40b-4a49-b8a7-b44b9880608b.png",
    //     shortlink_img:
    //       "https://nestle-nespresso.ru/img/products/b9ad7335-e40b-4a49-b8a7-b44b9880608b.png",
    //   },
    // ];
  };

  getExclusiveProductsByCategory = async (categoryId) => {
    const response = await axios.get(
      this._url + `products/exclusive?category_id=${categoryId}&user_type=user`
    );
    return response.data;
    // return [
    //   {
    //     id: "kapuchinator-aeroccino-4-nespresso",
    //     title: "Капучинатор Aeroccino 4",
    //     img: "https://nestle-nespresso.ru/img/products/939524e9-17bb-4b46-a84c-24c346f54d23.png",
    //     price: 17200,
    //     count: 1,
    //     page: "all",
    //     place_number: 1,
    //     alt_tag: "Aeroccino 4",
    //     description_tag:
    //       "Aeroccino 4 - это профессиональный капучинатор из коллекции Nespresso. Курьерская доставка по Москве и МО, СДЭК по России. Звоните сейчас!",
    //     old_price: 0,
    //     title_tag:
    //       "Купить фирменный капучинатор Aeroccino 4 (Nespresso) . Отличная цена, быстро доставляем (Москва и вся РФ)",
    //     keywords_tag: "Aeroccino 4",
    //     availability: true,
    //   },
    // ];
  };

  getExclusiveProduct = async (exclusiveProductId) => {
    const response = await axios.get(
      this._url + `products/exclusive/item/${exclusiveProductId}/user`
    );
    return response.data;

    // return {
    //   id: "kapuchinator-aeroccino-4-nespresso",
    //   title: "Капучинатор Aeroccino 4",
    //   category_id: "d1f1bcc6-8737-4a3d-b097-57ae2055b738",
    //   img: "https://nestle-nespresso.ru/img/products/939524e9-17bb-4b46-a84c-24c346f54d23.png",
    //   price: 17200,
    //   count: 1,
    //   alt_tag: "Aeroccino 4",
    //   page: "all",
    //   description:
    //     "Превратите любой кофе в пенистое наслаждение, а любое пенистое наслаждение — в кофе.\n\nЧувствуете молочное настроение? Раскройте свой творческий потенциал с помощью соевых, миндальных или овсяных напитков.\n\nВспениватель молока Nespresso Aeroccino 4 создан для тех, кто любит выбирать, когда дело доходит до напитков с кофе и молоком. Благодаря двум различным типам горячей молочной пены для создания восхитительных капучино и латте маккиато, а также опциям для холодной пены и горячего молока.",
    //   images: [
    //     "https://nestle-nespresso.ru/img/products/613a2239-64c1-4b1e-9faf-3ee87e438db4.png",
    //   ],
    //   hide: false,
    //   place_number: 1,
    //   recommendations: [],
    //   description_tag:
    //     "Aeroccino 4 - это профессиональный капучинатор из коллекции Nespresso. Курьерская доставка по Москве и МО, СДЭК по России. Звоните сейчас!",
    //   old_price: 0,
    //   title_tag:
    //     "Купить фирменный капучинатор Aeroccino 4 (Nespresso) . Отличная цена, быстро доставляем (Москва и вся РФ)",
    //   keywords_tag: "Aeroccino 4",
    //   availability: true,
    //   breadcrumbs: [
    //     {
    //       text: "Аксесуары Неспрессо",
    //       href: "/accessories",
    //     },
    //     {
    //       text: "все",
    //       href: "/accessories",
    //     },
    //     {
    //       text: "Серия Фирменные аксессуары Nespresso",
    //       href: "/accessories#Фирменные_аксессуары_Nespresso",
    //     },
    //   ],
    // };
  };

  getAllExclusiveProductsIds = async () => {
    const response = await axios.get(this._url + "products/exclusive/all");
    return response.data;
  };

  getAvailablePromotions = async (products) => {
    const response = await axios.post(
      this._url + "get/availablePromotions",
      products
    );
    return response.data;
  };

  getSpecialOffersCategories = async () => {
    const response = await axios.get(
      this._url + `products/special_offers/category`
    );
    return response.data;
  };

  getSpecialOffersProducts = async (categoryId) => {
    const response = await axios.get(
      this._url + `products/special_offers/products?category_id=${categoryId}`
    );
    return response.data;
  };

  getBanner = async () => {
    const response = await axios.get(this._url + "get/banner");
    return response.data;
  };
}

export default CoffeeService;
