import { Fragment, /* useEffect, */ useMemo } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { /* useDispatch, */ useSelector } from "react-redux";
import { StyledListItemText } from "../styles";
// import { setDeliveryPrice } from "../../../../redux/slices/cartSlice";
import dayjs from "dayjs";
import PromotionsList from "../promotionsList/PromotionsList";
import formatPrice from "../../../../utils/formatPrice";
import PayLinkPage from "../payLinkPage/PayLinkPage";

export default function Review() {

  return(<PayLinkPage />)
  const { pages, cartTotalPrice, shippingAddress, deliveryPrice } = useSelector(
    (state) => state.cart
  );

  // const dispatch = useDispatch();

  const pagesArr = useMemo(() => {
    const pagesArr = [];

    Object.keys(pages).forEach((page) => {
      const currPage = pages[page];
      const currProducts = currPage.products;

      if (currProducts.length) {
        const pageObj = {
          count: currPage.count,
          products: currProducts,
          name: currPage.name,
        };

        pagesArr.push(pageObj);
      }
    });

    return pagesArr;
  }, [pages]);

  // useEffect(() => {
  //   if (
  //     (shippingAddress.mrr && cartTotalPrice < 20000) ||
  //     (!shippingAddress.mrr && cartTotalPrice > 20000)
  //   ) {
  //     dispatch(setDeliveryPrice(500));
  //   } else if (!shippingAddress.mrr && cartTotalPrice < 20000) {
  //     dispatch(setDeliveryPrice(1000));
  //   } else if (shippingAddress.mrr && cartTotalPrice > 20000) {
  //     dispatch(setDeliveryPrice(0));
  //   }
  // }, [shippingAddress]);

  const items = pagesArr.map(({ count, products, name }) => {
    const productItems = products.map((product, i) => (
      <ListItem key={i} sx={{ py: 1, px: 0 }}>
        <ListItemText primary={product.title} />
        <Typography variant="body2">
          {formatPrice(product.price, { currencySymbol: "₽" })} *{" "}
          {product.count}
        </Typography>
      </ListItem>
    ));

    return (
      <Fragment key={name}>
        <ListItem sx={{ py: 1, px: 0 }}>
          <StyledListItemText primary={`${name} (${count})`} />
        </ListItem>
        {productItems}
      </Fragment>
    );
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Ваш заказ:
      </Typography>

      <List disablePadding>
        {items}
        <PromotionsList />
        <ListItem sx={{ py: 1, px: 0 }}>
          <StyledListItemText primary="ИТОГО" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {formatPrice(cartTotalPrice, { currencySymbol: "₽" })}
          </Typography>
        </ListItem>
      </List>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Доставка
          </Typography>
          <Typography gutterBottom>ФИО: {shippingAddress.fullName}</Typography>
          <Typography gutterBottom>
            Адрес доставки: {`${shippingAddress.address}`}
          </Typography>
          <Typography gutterBottom>
            Город: {`${shippingAddress.city}`}
          </Typography>
          <Typography gutterBottom>
            Дата доставки:{" "}
            {`${dayjs(shippingAddress.date).format("DD.MM.YYYY")}`}{" "}
            {`(С ${shippingAddress.time})`}
          </Typography>
        </Grid>

        <Grid item container direction="column" xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Стоимость доставки: {deliveryPrice}₽
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
