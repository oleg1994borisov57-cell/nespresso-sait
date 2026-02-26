import { useCallback, useEffect, useRef, useState } from "react";
import AddBtnModal from "../addBtnModal/AddBtnModal";

const AddButtonLarge = ({
  title,
  img,
  price,
  id,
  count,
  page,
  cartPageName,
  withoutIcons = false,
  outOfStock = false,
  color,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef(null);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    }

    if (isModalOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };

    // eslint-disable-next-line
  }, [isModalOpen]);

  return (
    <div id="largeBtnWrapper">
      <div
        id="quantitySelector_bg"
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(false);
        }}
        className={isModalOpen ? "active" : null}
      ></div>
      <button
        id={`ta-product-details__add-to-bag-button-${id}`}
        disabled={outOfStock}
        title={!outOfStock ? "Добавить в корзину" : "Нет в наличии"}
        className={
          isModalOpen
            ? "AddToBagButton AddToBagButtonLarge active"
            : "AddToBagButton AddToBagButtonLarge"
        }
        style={withoutIcons ? { width: "100%", minWidth: "0px" } : null}
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
      >
        {!withoutIcons ? (
          <span className="AddToBagButtonLarge__basketIcon">
            <i aria-hidden="true" className="Glyph Glyph--basket" />
          </span>
        ) : null}
        <span className="AddToBagButtonLarge__label" aria-hidden="true">
          {!outOfStock ? "ДОБАВИТЬ В КОРЗИНУ" : "НЕТ В НАЛИЧИИ"}
        </span>
        {!withoutIcons ? (
          <i
            aria-hidden="true"
            className="Glyph Glyph--plus AddToBagButtonLarge__plusIcon"
          />
        ) : null}
      </button>
      {isModalOpen ? (
        <AddBtnModal
          closeModal={closeModal}
          ref={modalRef}
          img={img}
          title={title}
          price={price}
          id={id}
          count={count}
          page={page}
          cartPageName={cartPageName}
          color={color}
        />
      ) : null}
    </div>
  );
};

export default AddButtonLarge;
