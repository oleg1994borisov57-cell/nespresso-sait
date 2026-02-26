import { Typography, Paper, StepLabel, Button, Box } from "@mui/material";

import AddressForm from "../addressForm/AddressForm";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../../../redux/slices/cartSlice";

import { StyledButton, StyledStep, StyledStepper } from "../styles";
import { useEffect, useMemo, useState } from "react";
import PayLinkPage from "../payLinkPage/PayLinkPage";
import showCapsuleCountError from "../../../../utils/showCapsuleCountError";

const steps = ["Адрес доставки", "Оплата"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PayLinkPage />;
    default:
      // console.log(step);
      throw new Error("Unknown step", step);
  }
}

export default function Checkout() {
  const { pages, cartTotalPrice } = useSelector((state) => state.cart);

  const [isThereProductsInCart, setIsThereProductsInCart] = useState(false);

  const dispatch = useDispatch();

  const items = useMemo(() => {
    let items = [];
    for (let page in pages) {
      Object.keys(pages[page]).forEach((key) => {
        const currProperty = pages[page][key];

        if (Array.isArray(currProperty) && currProperty.length) {
          items.push(...currProperty);
        }
      });
    }

    return items;
  }, [pages]);

  useEffect(() => {
    if (items.length > 0) {
      setIsThereProductsInCart(true);
    } else {
      setIsThereProductsInCart(false);
    }
  }, [items]);

  useEffect(() => {
    if (showCapsuleCountError(cartTotalPrice)) return;

    dispatch({ type: "menu/toggleCart" });
  }, [cartTotalPrice]);

  const view = isThereProductsInCart ? (
    <View />
  ) : (
    <ErrorPage text="Ваша корзина пуста" />
  );

  return (
    <Box
      component={"div"}
      sx={{
        background: "#fff",
        margin: "0 auto",
        width: "99%",
      }}
      maxWidth="md"
    >
      {view}
    </Box>
  );
}

const View = () => {
  const { step, status } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <>
      <Paper
        variant="outlined"
        component="div"
        sx={{ my: { xs: 1, md: 1 }, p: { xs: 2, md: 3 } }}
      >
        <StyledStepper activeStep={step} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <StyledStep key={label}>
              <StepLabel>{label}</StepLabel>
            </StyledStep>
          ))}
        </StyledStepper>
        {step === steps.length ? null : (
          <>
            {getStepContent(step)}
            <Box
              component="div"
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              {step > 0 && (
                <Button
                  onClick={() => {
                    dispatch({ type: "cart/prevStep" });
                  }}
                  sx={{ color: "black", mt: 3, ml: 1 }}
                >
                  Назад
                </Button>
              )}

              {!(step === 1) ? (
                <StyledButton
                  variant="contained"
                  onClick={() => {
                    dispatch(setStatus("validating"));
                  }}
                  disabled={status === "validating"}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Далее
                </StyledButton>
              ) : null}
            </Box>
          </>
        )}
      </Paper>
    </>
  );
};

const ErrorPage = ({ text }) => {
  return (
    <Typography
      variant="h6"
      sx={{ textAlign: "center", color: "black" }}
      gutterBottom
    >
      {text}
    </Typography>
  );
};
