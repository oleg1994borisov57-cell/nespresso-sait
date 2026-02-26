import { useCallback, useEffect, useRef, useState } from "react";
import AddBtnModal from "../addBtnModal/AddBtnModal";
import { useSelector } from "react-redux";

const AddButton = ({
  img,
  title,
  price,
  id,
  count,
  page,
  color,
  cartPageName,
  outOfStock = false,
  disableCartCountView,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cartCount = !disableCartCountView
    ? useSelector(
        (state) =>
          state.cart.pages[cartPageName].products.find((item) => item.id === id)
            ?.count
      )
    : null;

  const modalRef = useRef(null);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    function handleOutsideClick(e) {
      e.preventDefault();
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
  }, [isModalOpen]);

  return (
    <>
      <div
        id="quantitySelector_bg"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsModalOpen(false);
        }}
        className={isModalOpen ? "active" : null}
      ></div>
      <div id={`AddToCartButton-product-${id}`}>
        <button
          disabled={outOfStock}
          title={!outOfStock ? "Добавить в корзину" : "Нет в наличии"}
          className={
            isModalOpen
              ? "AddToBagButton AddToBagButtonSmall active"
              : "AddToBagButton AddToBagButtonSmall"
          }
          data-focus-id={`AddToCartButton-product-${id}`}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsModalOpen(true);
          }}
        >
          <div aria-hidden="true" className="AddToBagButtonSmall__quantity">
            {cartCount ?? (
              <i
                aria-hidden="true"
                className="Glyph Glyph--plus AddToBagButtonSmall__icon-sign"
              />
            )}
          </div>
        </button>
        {isModalOpen ? (
          <AddBtnModal
            closeModal={closeModal}
            page={page}
            ref={modalRef}
            img={img}
            title={title}
            price={price}
            id={id}
            count={count}
            cartPageName={cartPageName}
            color={color}
          />
        ) : null}
      </div>
    </>
  );
};

export default AddButton;
