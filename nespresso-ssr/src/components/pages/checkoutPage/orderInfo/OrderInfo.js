import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  clearCartOnlyLocalStorage,
} from "../../../../redux/slices/cartSlice";
import { Container, Paper, Typography } from "@mui/material";
import isServerRender from "../../../../utils/isServerRender";
import { sendEcommerceData } from "../../../../utils/metriks";
import getCartProducts from "../../../../utils/getCartProducts";
import useNavigate from "../../../../utils/useNavigate";

const OrderInfo = () => {
  const dispatch = useDispatch();

  const { shippingAddress, orderNumber, pages } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(clearCartOnlyLocalStorage());

    return () => {
      dispatch(clearCart());
    };
  }, []);

  useEffect(() => {
    const productsObj = getCartProducts(pages);

    Object.keys(productsObj).forEach((key) => {
      productsObj[key] = productsObj[key].map(({ count, ...product }) => {
        return { ...product, quantity: count };
      });
    });

    sendEcommerceData("purchase", {
      actionField: { id: orderNumber },
      products: [
        ...productsObj.coffee,
        ...productsObj.machines,
        ...productsObj.accessories,
      ],
    });
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  const { email } = shippingAddress;

  // useEffect(() => {
  //   if (orderNumber || email) {
  //     openNewWindow(tgUrl);
  //   }
  // }, []);

  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [isOrderNumberAvailable, setIsOrderNumberAvailable] = useState(false);

  useEffect(() => {
    if (email && email.length) {
      setIsEmailAvailable(true);
    } else {
      setIsEmailAvailable(false);
    }

    if (orderNumber) {
      setIsOrderNumberAvailable(true);
    } else {
      setIsOrderNumberAvailable(false);
    }
  }, [email, orderNumber]);

  useEffect(() => {
    if (email || orderNumber || isServerRender()) return;

    navigate("/");
  }, [email, orderNumber]);

  const messages = {
    emailAddress: isEmailAvailable
      ? `Мы отправили подтверждение на вашу эл. почту - ${email}, в течении 10 минут. При необходимости проверьте папку "Спам".`
      : null,
    orderNumber: isOrderNumberAvailable
      ? `Ваш номер заказа: ${orderNumber}`
      : "Мы свяжемся с вами по указанному вами номеру телефона в течение дня.",
  };

  const view =
    isEmailAvailable || isOrderNumberAvailable ? (
      <>
        <Container
          sx={{
            paddingTop: "30px",
          }}
          maxWidth="md"
        >
          <Paper
            variant="outlined"
            sx={{ my: { xs: 1, md: 1 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component={"div"} variant="h5" gutterBottom>
              Спасибо за заказ!
            </Typography>
            <Typography component={"div"} variant="subtitle1">
              {messages.orderNumber}
            </Typography>
            <Typography component={"div"} variant="subtitle1">
              {messages.emailAddress}
            </Typography>
          </Paper>
        </Container>
      </>
    ) : null;

  return <>{view}</>;
};

export default OrderInfo;
