import { useEffect, useState } from "react";

import Spinner from "../../../spinner/Spinner";

import { useDispatch, useSelector } from "react-redux";
// import {
//   nextStep,
//   setPromoId,
//   setPromoProductId,
//   setStatus as setCartStatus,
// } from "../../../../redux/slices/cartSlice";

import CoffeeService from "../../../../services/CoffeeService";

import PromotionsListForm from "./PromotionsListForm";
import getCartProducts from "../../../../utils/getCartProducts";

const { getAvailablePromotions } = new CoffeeService();

export default function PromotionsList() {
  const { pages } = useSelector((state) => state.cart);

  const [products, setProducts] = useState(null);

  const [promotions, setPromotions] = useState([]);
  const [status, setStatus] = useState("idle");

  // const { status: cartStatus } = useSelector((state) => state.cart);

  useEffect(() => {
    const productsObj = getCartProducts(pages);

    setProducts(productsObj);
  }, []);

  useEffect(() => {
    if (products) {
      setStatus("loading");
      getAvailablePromotions({ products })
        .then((res) => {
          setPromotions(res);
          setStatus("idle");
        })
        .catch(() => {
          setStatus("idle");
        });
    }
  }, [products]);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (cartStatus === "validating" && !promotions.length) {
  //     dispatch(setPromoId(null));
  //     dispatch(setPromoProductId(null));

  //     dispatch(setCartStatus("idle"));
  //     dispatch(nextStep());
  //   }
  // }, [cartStatus]);

  const view =
    status === "idle" && promotions.length ? (
      <View promotions={promotions} />
    ) : null;

  const loading = status === "loading" ? <Spinner /> : null;

  return (
    <>
      {loading}
      {view}
    </>
  );
}

const validationErrors = {
  promo: "Пожалуйста, выбирите акцию",
  promoProduct: "Пожалуйста, выбирите продукт",
};

function View({ promotions }) {
  const [currPromoId, setCurrPromoId] = useState("");
  const [currPromoItem, setCurrPromoItem] = useState(null);
  const [promoProductListItems, setPromoProductListItems] = useState([]);

  const promoList = promotions.map(({ title, id }) => {
    return {
      label: title,
      value: id,
    };
  });

  useEffect(() => {
    if (currPromoId && promotions) {
      const currPromo = promotions.find(({ id }) => id === currPromoId);

      setCurrPromoItem(currPromo);
    }
  }, [currPromoId, promotions]);

  const filtredByCurrPromoProductsList = currPromoItem?.gift_products;

  const currPromoProductsList = filtredByCurrPromoProductsList
    ? filtredByCurrPromoProductsList.map(({ product_id, title }) => {
        return {
          value: product_id,
          label: title,
        };
      })
    : null;

  useEffect(() => {
    if (!currPromoItem || !currPromoProductsList.length) return;

    const promoProductsCount = currPromoItem.gift_products_count;

    const formFields = new Array(promoProductsCount)
      .fill("undefined")
      .map((_, i) => {
        return {
          label: "Выберите продукт по акции",
          key: `promoProduct${i + 1}`,
          type: "select",
          value: "",
          errMsg: validationErrors.promoProduct,
          options: currPromoProductsList,
          onChange() {},
        };
      });

    setPromoProductListItems(formFields);
  }, [currPromoItem]);

  return (
    <PromotionsListForm
      formFields={[
        {
          label: "Вам доступна акция на выбор!",
          key: "promo",
          value: currPromoId,
          type: "select",
          errMsg: validationErrors.promo,
          options: promoList,
          onChange(e) {
            setCurrPromoId(e.target.value);
          },
        },
        ...promoProductListItems,
      ]}
    />
  );
}
