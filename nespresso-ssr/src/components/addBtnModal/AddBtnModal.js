import TextField from "@mui/material/TextField";
import { forwardRef, useMemo, useState } from "react";
import AddToCartButton from "../addToCartButton/AddToCartButton";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import getAddToCartTextByProductType from "../../utils/getAddToCartTextByProductType";

const AddBtnModal = forwardRef(function AddBtnModal(props, ref) {
  const [value, setValue] = useState("");

  const {
    img,
    title,
    price,
    id,
    count,
    page,
    closeModal,
    color,
    cartPageName,
  } = props;

  const items = useMemo(() => {
    const items = [];

    for (let i = 1; i <= 10; i++) {
      items.push(
        <li key={i} className="PredefinedQuantityList__quantity">
          <button
            className="PredefinedQuantityList__quantity-button"
            onClick={(e) => {
              e.preventDefault();
              setValue(i);
            }}
          >
            <span aria-hidden="true" className="notranslate">
              {i}
            </span>
          </button>
        </li>
      );
    }

    return items;
  }, []);

  return (
    <>
      <div
        className="QuantitySelector"
        id="QuantitySelector__wrapper"
        role="dialog"
      >
        <div
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="QuantitySelector__container"
        >
          <div
            className={
              window.matchMedia("(max-width: 955px)").matches
                ? "QuantitySelector__popin"
                : "QuantitySelector__popin QuantitySelector__popin--top"
            }
          >
            <ul className="PredefinedQuantityList">{items}</ul>
            <div style={{ textAlign: "start" }}>
              {getAddToCartTextByProductType(cartPageName)}
            </div>
            <form className="QuantitySelectorCustomField__container">
              <TextField
                value={value}
                onChange={(e) => {
                  const productQuantity = e.target.value;

                  if (
                    typeof +productQuantity === "number" &&
                    !isNaN(+productQuantity)
                  ) {
                    setValue(productQuantity);
                  }
                }}
                id="outlined-basic"
                size="small"
                sx={{
                  "& .MuiInputBase-input": {
                    height: "100% !important",
                  },
                }}
                fullWidth
                variant="outlined"
              />
              <AddToCartButton
                closeModal={closeModal}
                page={page}
                cartPageName={cartPageName}
                img={img}
                title={title}
                price={price}
                originCount={count}
                count={value}
                id={id}
                color={color}
              >
                <button className="QuantitySelectorCustomField__button-ok">
                  <ShoppingCartIcon fontSize="small" />
                </button>
              </AddToCartButton>
            </form>
          </div>
        </div>
      </div>
    </>
  );
});

export default AddBtnModal;
