import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

import {
  getOrderPrice,
  getPaymentLink,
  sendDeliveryInfo,
} from "../../../../redux/slices/cartSlice";
import {
  AlertTitle,
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";
import { sendMetriks } from "../../../../utils/metriks";
import showCapsuleCountError from "../../../../utils/showCapsuleCountError";
import { useRouter } from "next/router";
import getCartProducts from "../../../../utils/getCartProducts";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import useNavigate from "../../../../utils/useNavigate";

const mobileChooseBtnStyle = {
  width: "100%",
  mt: "10px",
};

function toRegularPrice(price) {
  return price / 100;
}

const tgUrl = "https://t.me/n_coffee_ru";

const PayLinkPage = () => {
  const [paymentHref, setPaymentHref] = useState(null);
  const [products, setProducts] = useState(null);
  const [orderPrice, setOrderPrice] = useState(null);

  const [isPayByCard, setIsPayByCard] = useState(false);

  const dispatch = useDispatch();
  const {
    pages,
    shippingAddress,
    status,
    step,
    cartTotal,
    promotionId,
    promoProductId,
    cartTotalPrice,
  } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  useEffect(() => {
    if (step === 0) {
      navigate("/checkout");
    }

    if (!showCapsuleCountError(cartTotalPrice)) {
      navigate("/");
    }
  }, [step]);

  useEffect(() => {
    if (cartTotal >= 1) {
      sendMetriks("reachGoal", "confirm-order");
    }
  }, []);

  useEffect(() => {
    const productsObj = getCartProducts(pages);

    setProducts(productsObj);

    dispatch(
      getPaymentLink({
        products: productsObj,
        shippingAddress: {
          ...shippingAddress,
          date: dayjs(shippingAddress.date).format("DD.MM.YYYY"),
        },
        promotionId: promotionId,
        giftProductId: promoProductId,
        isPayByCard,
      })
    )
      .unwrap()
      .then((res) => setPaymentHref(res));

    dispatch(
      getOrderPrice({
        products: productsObj,
        shippingAddress: {
          ...shippingAddress,
          date: dayjs(shippingAddress.date).format("DD.MM.YYYY"),
        },
        promotionId: promotionId,
        giftProductId: promoProductId,
        isPayByCard,
      })
    )
      .unwrap()
      .then((res) => setOrderPrice(toRegularPrice(res.order_amount)));
    // eslint-disable-next-line
  }, [isPayByCard]);

  const view =
    status !== "error" ? (
      <>
        <Typography variant="h6">Адрес: {shippingAddress.address}</Typography>
        <Typography variant="h6">ФИО: {shippingAddress.fullName}</Typography>
        <Typography variant="h6">
          Дата Доставки: {shippingAddress.date}
        </Typography>
        <Typography variant="h6">
          Время доставки: {shippingAddress.time}
        </Typography>
        <Typography variant="h4" gutterBottom>
          Итого к оплате: {status === "loading" ? "Загрузка..." : orderPrice}₽
        </Typography>
        <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-around"}>
          <Button
            onClick={() => {
              setIsPayByCard(false);
            }}
            sx={(theme) => ({
              textTransform: "uppercase",
              fontFamily: "Roboto, serif",
              width: "250px",
              borderRadius: "5px",
              textAlign: "center",
              backgroundColor: "inherit",
              border: "1px black solid",
              color: "black",
              height: "40px",
              fontSize: "0.875rem",

              "& > span": {
                display: "inherit !important",
              },
              [theme.breakpoints.down(769)]: mobileChooseBtnStyle,
            })}
            startIcon={
              !isPayByCard ? (
                <RadioButtonCheckedIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )
            }
          >
            {shippingAddress.isIndividual
              ? "Оплата при получении"
              : "Выставить счёт"}
          </Button>

          <Button
            component={"a"}
            // fullWidth
            sx={(theme) => ({
              // mt: "40px",
              width: "250px",
              textTransform: "uppercase",
              fontFamily: "Roboto, serif",
              borderRadius: "5px",
              textAlign: "center",
              backgroundColor: "inherit",
              border: "1px black solid",
              color: "black",
              height: "40px",
              fontSize: "0.875rem",
              "& > span": {
                display: "inherit !important",
              },
              [theme.breakpoints.down(769)]: mobileChooseBtnStyle,
            })}
            onClick={() => {
              setIsPayByCard(true);
            }}
            startIcon={
              isPayByCard ? (
                <RadioButtonCheckedIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )
            }
          >
            Оплатить сейчас
          </Button>
        </Box>

        {shippingAddress.isIndividual ? (
          <Alert
            sx={{
              marginTop: "10px",
              borderRadius: "10px",
            }}
            severity="info"
          >
            <AlertTitle>Важно!!!</AlertTitle>
            {isPayByCard
              ? "При онлайн-оплате картой применяется стандартная цена без скидки"
              : "Скидка действуюет при оплате наличными или банковским переводом при получении товара"}
          </Alert>
        ) : null}
      </>
    ) : null;

  // const loading = status === "loading" ? <Spinner /> : null;

  const error =
    status === "error" ? (
      <Typography variant="h5" gutterBottom>
        Something went wrong
      </Typography>
    ) : null;

  return (
    <Container maxWidth={false}>
      {view}
      {error}
      {/* {loading} */}
      <Button
        sx={{
          width: "100%",
          background: "#000", // очень светлый синий (Пиздёж)
          color: "#f1f1f1", // синий цвет текста для контраста
          padding: "12px 24px",
          borderRadius: "8px", // немного больше скругление
          border: "1px solid #bbdefb", // легкая граница
          fontSize: "16px",
          fontWeight: 600, // полужирный
          cursor: "pointer",
          marginTop: "10px",
          transition: "background 0.3s ease", // плавный переход
          "&:hover": {
            background: "#222", // светлый синий при наведении
          },
        }}
        target="_blank"
        rel="noopener noreferrer"
        LinkComponent={"a"}
        href={isPayByCard ? paymentHref : tgUrl}
        onClick={() => {
          if (isPayByCard) return;

          dispatch(
            sendDeliveryInfo({
              products: products,
              shippingAddress: {
                ...shippingAddress,
                date: dayjs(shippingAddress.date).format("DD.MM.YYYY"),
              },
              promotion_id: promotionId,
              promotion_item_id: promoProductId,
              isPayByCard,
            })
          )
            .unwrap()
            .then(() => {
              dispatch({ type: "menu/toggleCart" });
              navigate("/complete");
            });
        }}
      >
        {status === "loading" ? (
          <CircularProgress
            sx={{
              display: "inline !important",
            }}
            size={35}
          />
        ) : (
          "Оформить заказ"
        )}
      </Button>
    </Container>
  );
};

export default PayLinkPage;
