import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import DeliveryForm from "../deliveryForm/DeliveryForm";
import EntityDeliveryForm from "../entityDeliveryForm/EntityDeliveryForm";
import SelectOldAddress from "../selectOldAddress/SelectOldAddress";
import { ChooseButtonLeft, ChooseButtonRight } from "./styles";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import PromotionsList from "../promotionsList/PromotionsList";

dayjs.locale("ru");

export default function AddressForm() {
  const { shippingAddress } = useSelector((state) => state.cart);

  const isIndividual =
    typeof shippingAddress?.isIndividual === "undefined"
      ? "individual"
      : shippingAddress?.isIndividual
      ? "individual"
      : "entity";

  const [currPage, setCurrPage] = useState(isIndividual);
  const [isShippingAddressUpdating, setIsShippingAddressUpdating] =
    useState(true);

  useEffect(() => {
    if (shippingAddress) {
      setIsShippingAddressUpdating(true);
      setTimeout(() => {
        setIsShippingAddressUpdating(false);
      }, 10);
    }
  }, [shippingAddress]);

  const individual =
    currPage === "individual" && !isShippingAddressUpdating ? (
      <ViewAddressForm />
    ) : null;
  const entity =
    currPage === "entity" && !isShippingAddressUpdating ? (
      <EntityViewForm />
    ) : null;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ChooseButtonLeft
          variant="contained"
          onClick={() => {
            setCurrPage("individual");
          }}
          disabled={currPage === "individual"}
        >
          Для физ лиц
        </ChooseButtonLeft>
        <ChooseButtonRight
          variant="contained"
          onClick={() => {
            setCurrPage("entity");
          }}
          disabled={currPage === "entity"}
        >
          Для юр лиц
        </ChooseButtonRight>
      </Box>

      <SelectOldAddress />

      <div className="checkout-form__wrapper">
        {individual}
        {entity}
      </div>
      <PromotionsList />
    </>
  );
}

const EntityViewForm = () => {
  return (
    <>
      <EntityDeliveryForm />
    </>
  );
};

const ViewAddressForm = () => {
  return <DeliveryForm />;
};
