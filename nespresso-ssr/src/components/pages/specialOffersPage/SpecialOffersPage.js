import { useEffect } from "react";

import SpecialOfferCategoryComponent from "./components/specialOfferCategoryComponent/SpecialOfferCategoryComponent";
import ProductsPageLayout from "../../productsPageLayout/ProductsPageLayout";

import { useMediaQuery } from "@mui/material";

const SpecialOffersPage = ({ preloadedCategories }) => {
  const isMobile = useMediaQuery("(max-width:995px)");

  const categories = preloadedCategories
    ? preloadedCategories.map(({ place_number, ...item }) => {
        return (
          <SpecialOfferCategoryComponent
            categoryPos={+place_number - 1}
            {...item}
          />
        );
      })
    : null;

  return (
    <ProductsPageLayout>
      <div
        id="enriched_plp"
        className={`original grid ready_img ready_caps sticky special${
          isMobile ? " list" : " "
        }`}
      >
        {categories}
      </div>
    </ProductsPageLayout>
  );
};

export default SpecialOffersPage;

// [
//   {
//     bg: "https://nestle-nespresso.ru/img/products/57a65bdb-a702-4738-bd55-cde26583ffc1.jpeg",
//     desc: "Погрузитесь в самое сердце нашего наследия с этой линейкой кофе, рожденной в 1986 году и являющейся плодом инноваций и качества Nespresso .\n\n",
//     id: "d2752b52-ff42-4fd8-8836-10052db8599c",
//     page: "original",
//     place_number: 1,
//     shortlink_bg:
//       "https://nestle-nespresso.ru/img/products/0a5b87ad-c687-4b0a-ad1c-e19ef96bae87.png",
//     shortlink_img:
//       "https://nestle-nespresso.ru/img/products/db38c788-fc8a-4649-9dab-13335bb435ce.png",
//     subtitle: "Оригинальная коллекция натурального кофе в капсулах Nespresso",
//     title: "The Original Collection",
//     products: [
//       {
//         productType: "capsule",
//         alt_tag: "Capriccio",
//         availability: true,
//         category_id: "d2752b52-ff42-4fd8-8836-10052db8599c",
//         count: 10,
//         desc: "Злаковый",
//         description_tag:
//           "Кофе Capriccio коллекции The Original - это зерна Arabica и Robusta в капсулах типа Original для кофемашин Nespresso. Количество кофе в капсуле идеально для приготовления одной чашки Espresso. Злаковый вкус уже ждет Вас! Быстрая доставка по Москве и области. Звоните сейчас!",
//         img: "https://nestle-nespresso.ru/img/products/72655009-70ed-41f9-bbcb-08a83f0b8f42.png",
//         infos: {
//           cups: ["espresso"],
//           intensity: 5,
//         },
//         keywords_tag: "",
//         old_price: 0,
//         page: "original",
//         place_number: 1,
//         price: 970,
//         product_id: "kapsuly-original-capriccio",
//         title: "Capriccio",
//         title_tag:
//           "Заказать капсулы Capriccio, тип Original | Оригинал из Швейцарии, быстрая доставка (Москва и МО)",
//       },
//       {
//         productType: "accessory",
//         id: "kapuchinator-aeroccino-4-nespresso",
//         title: "Капучинатор Aeroccino 4",
//         img: "https://nestle-nespresso.ru/img/products/939524e9-17bb-4b46-a84c-24c346f54d23.png",
//         price: 17200,
//         count: 1,
//         page: "all",
//         place_number: 1,
//         alt_tag: "Aeroccino 4",
//         description_tag:
//           "Aeroccino 4 - это профессиональный капучинатор из коллекции Nespresso. Курьерская доставка по Москве и МО, СДЭК по России. Звоните сейчас!",
//         old_price: 0,
//         title_tag:
//           "Купить фирменный капучинатор Aeroccino 4 (Nespresso) . Отличная цена, быстро доставляем (Москва и вся РФ)",
//         keywords_tag: "Aeroccino 4",
//         availability: true,
//       },
//       {
//         productType: "machine",
//         id: 1,
//         bg: "https://nestle-nespresso.ru/img/products/fb17b219-3067-4e23-979b-cb16e57f8aa6.jpeg",
//         title: "The Essenza range",
//         hide: 0,
//         subtitle: "Кофе и многое другое",
//         desc: "Высококлассный дизайн и компактный стиль, удовлетворяющий любой ваш каприз. Простые в использовании машины, которые готовят эспрессо и лунго непревзойденного качества в каждой чашке.",
//         page: "original",
//         shortlink_bg:
//           "https://nestle-nespresso.ru/img/products/36429269-2cb3-4bae-b717-ba5d00b32825.png",
//         shortlink_img:
//           "https://nestle-nespresso.ru/img/products/b0ea2d79-5006-42f4-980f-4d3860528340.png",
//         place_number: 1,
//         alt_tag: null,
//         products: [
//           {
//             variants: [
//               {
//                 product_id: "essenza-mini-nespresso-black",
//                 page: "original",
//                 title: "Essenza Mini",
//                 img: "https://nestle-nespresso.ru/img/products/3d45865d-3bbb-4aef-92b8-5e8465482147.png",
//                 description:
//                   "Эта миниатюрная машина проста в использовании и подарит восхитительные минуты кофе (треугольная версия).",
//                 price: 20500,
//                 color: "#000000",
//                 color_name: "черный",
//                 place_number: 1,
//                 alt_tag: "Essenza Mini",
//                 description_tag:
//                   "Оригинальная кофемашина Nespresso Essenza Mini (Black) для фирменных капсул. Быстро доставим курьером по Москве и области и СДЭК по всей России. Звоните сейчас!",
//                 old_price: 0,
//                 title_tag:
//                   "Капсульная кофемашина Essenza Mini (Black), оригинал Nespresso. Отличная цена, быстро доставляем (Москва и вся РФ)",
//                 keywords_tag: "",
//                 availability: false,
//               },
//               {
//                 product_id: "essenza-mini-nespresso-red",
//                 page: "original",
//                 title: "Essenza Mini",
//                 img: "https://nestle-nespresso.ru/img/products/30fb20c1-6906-4c14-bec6-9d504364c93a.png",
//                 description:
//                   "Эта миниатюрная машина проста в использовании и подарит восхитительные минуты кофе (треугольная версия).",
//                 price: 19500,
//                 color: "#ff0000",
//                 color_name: "красный",
//                 place_number: 1,
//                 alt_tag: "Essenza Mini",
//                 description_tag:
//                   "Оригинальная кофемашина Nespresso Essenza Mini (Red) для фирменных капсул. Быстро доставим курьером по Москве и области и СДЭК по всей России. Звоните сейчас!",
//                 old_price: 0,
//                 title_tag:
//                   "Капсульная кофеварка Essenza Mini (Red), оригинал Nespresso (Швейцария). Отличная цена, быстро доставляем (Москва и вся РФ)",
//                 keywords_tag: "",
//                 availability: 0,
//               },
//             ],
//           },
//           {
//             productType: "machine",
//             product_id: "nespresso-essenza-mini-30",
//             page: "original",
//             title: "ESSENZA MINI C30",
//             img: "https://nestle-nespresso.ru/img/products/57adceaf-1ff0-440a-bc7a-4b31173e9a7e.png",
//             description: "МАЛЕНЬКАЯ МАШИНА, ОТЛИЧНЫЙ КОФЕ.",
//             price: 21500,
//             color: "#000000",
//             color_name: "черный",
//             place_number: 1,
//             alt_tag: "ESSENZA MINI C30",
//             description_tag:
//               "Оригинальная кофемашина Nespresso Essenza Mini 30 (Black) для фирменных капсул. Быстро доставим курьером по Москве и области и СДЭК по всей России. Звоните сейчас!",
//             old_price: 0,
//             title_tag:
//               "Кофеварка капсульная Essenza Mini 30 (Black), оригинал Nespresso. Отличная цена, быстро доставляем (Москва и вся РФ)",
//             keywords_tag: "",
//             availability: true,
//           },
//         ],
//       },
//     ],
//   },
// ];
