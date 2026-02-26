import { useDispatch, useSelector } from "react-redux";
import CartModalItem from "../cartModalItem/CartModalItem";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { sendMetriks } from "../../utils/metriks";
import GiftLogo from "../../resources/icons/gift.svg";
import {
  ButtonWrapper,
  GiftIconWrapper,
  ModalCartBg,
  FormBox,
  ScrollBox,
} from "./styles";
import CoffeeService from "../../services/CoffeeService";
import getCartProducts from "../../utils/getCartProducts";
import formatPrice from "../../utils/formatPrice";
import Checkout from "../pages/checkoutPage/checkout/Checkout";
import { Box, Button, useMediaQuery } from "@mui/material";
import showCapsuleCountError from "../../utils/showCapsuleCountError";

const CartModal = () => {
  const [full, setFull] = useState(false);
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);

  const isMobile = useMediaQuery("(max-width:768px)");

  const formBoxRef = useRef(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const touchStartY = useRef(0);

  // Функция для определения свайпа в верхней зоне
  const handleTouchStart = useCallback(
    (e) => {
      if (!formBoxRef.current || !full) return;

      const touchY = e.touches[0].clientY;
      const { top, height } = formBoxRef.current.getBoundingClientRect();
      const topZoneHeight = height * 0.2; // Верхние 20% высоты

      if (touchY <= top + topZoneHeight) {
        setIsSwiping(true);
        touchStartY.current = touchY;
      }
    },
    [full]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!isSwiping || !formBoxRef.current) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchY - touchStartY.current;

      // Если свайп вниз больше 100px
      if (deltaY > 100) {
        onCheckoutClick(); // Закрываем расширенный режим
        setIsSwiping(false);
      }
    },
    [isSwiping]
  );

  const handleTouchEnd = () => {
    setIsSwiping(false);
  };

  const handleCartModalClose = useCallback((e) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      dispatch({ type: "menu/toggleCart" });
    }
  }, []);

  useEffect(() => {
    const html = document.querySelector("html");

    if (html) {
      html.style.overflow = "hidden";
    }

    const style = document.createElement("style");

    style.textContent = `
      * {
        scrollbar-width: none;
      }
    `;

    document.head.appendChild(style);

    return () => {
      html.style.overflow = null;
      style.remove();
    };
  }, []);

  const dispatch = useDispatch();
  const { pages, cartTotalPrice } = useSelector((state) => state.cart);

  const toggleFull = () => {
    setFull((isFull) => !isFull);
  };

  const onCheckoutClick = useCallback(() => {
    if (!showCapsuleCountError(cartTotalPrice)) {
      setFull(false);
      return;
    }

    if (full) {
      setIsAnimationStarted(true);
    }

    toggleFull();
  }, [cartTotalPrice, full]);

  const closeBasket = () => {
    dispatch({ type: "menu/toggleCart" });
  };

  useEffect(() => {
    const formBoxEl = formBoxRef.current;

    if (!formBoxEl) return;

    if (isAnimationStarted) {
      formBoxEl.addEventListener(
        "animationend",
        () => {
          setIsAnimationStarted(false);
        },
        { once: true }
      );
    }
  }, [isAnimationStarted]);

  const items = useMemo(() => {
    const items = [];

    for (let page in pages) {
      const products = pages[page].products;

      if (products.length) {
        const pageItems = products.map(
          ({
            id,
            img,
            title,
            price,
            count,
            total,
            originCount,
            cartPageName,
            page,
            color,
          }) => {
            return (
              <CartModalItem
                key={id}
                id={id}
                img={img}
                title={title}
                price={price}
                count={count}
                cartPageName={cartPageName}
                totalPrice={total}
                originCount={originCount}
                page={page}
                color={color}
              />
            );
          }
        );

        const pageItem = (
          <tbody key={page}>
            <tr>
              <th
                id="capsules_original"
                scope="colgroup"
                colSpan={3}
                className="MiniBasketItemCategory"
              >
                {pages[page].name}
                <span className="MiniBasketItemCategory__item-count">
                  ({pages[page].count})
                </span>
              </th>
            </tr>
            {pageItems}
          </tbody>
        );

        items.push(pageItem);
      }
    }

    return items;
  }, [pages]);

  const view =
    items.length >= 1 ? (
      <View
        items={items}
        cartTotalPrice={cartTotalPrice}
        toggleFull={onCheckoutClick}
        full={full}
      />
    ) : (
      <EmptyCart />
    );

  return (
    <div>
      <ModalCartBg>
        <Box
          className="cart-modal__wrapper"
          onClick={handleCartModalClose}
          sx={{
            display: isMobile ? "block" : "flex",
            height: "100vh",
            justifyContent: "flex-end",
          }}
        >
          {full || isAnimationStarted ? (
            <>
              <FormBox
                ref={formBoxRef}
                sx={{
                  position: isMobile ? "absolute" : null,
                  top: "0",
                  zIndex: isMobile ? "9999999999999" : 0,
                  transform: isMobile
                    ? `translateY(${full ? "0" : "100%"})`
                    : `translateX(${full ? "0" : "100%"})`,
                  animation: `${
                    isMobile
                      ? isAnimationStarted
                        ? "slideOutM"
                        : "slideInM"
                      : isAnimationStarted
                      ? "slideOut"
                      : "slideIn"
                  } 0.5s ease-out`,
                }}
                className="animationCartModal"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <ScrollBox>
                  {isMobile && full ? (
                    <Button
                      sx={{
                        display: "block",
                        margin: "0 auto",
                      }}
                      onClick={onCheckoutClick}
                    >
                      Назад в корзину
                    </Button>
                  ) : null}
                  <Checkout />
                </ScrollBox>
              </FormBox>
            </>
          ) : null}

          <div className="MiniBasketDropdown__dropdown MiniBasketDropdown__dropdown--is-open MiniBasketDropdown__open-close-transition-enter-done">
            <div className="MiniBasketDropdown__wrapper">
              <div className="MiniBasketDropdown__header">
                <button
                  id="ta-mini-basket__close"
                  className="Button ButtonIcon MiniBasketDropdown__close-button"
                  onClick={closeBasket}
                >
                  <i className="Glyph Glyph--cross MiniBasketDropdown__close-img" />
                </button>
                <Box
                  sx={{
                    ...(isMobile && { textAlign: "center" }),
                  }}
                  className="MiniBasketDropdown__header__title"
                  id="basket"
                >
                  ВАША КОРЗИНА
                </Box>
              </div>
              {view}
            </div>
          </div>
        </Box>
      </ModalCartBg>
    </div>
  );
};

const { getAvailablePromotions } = new CoffeeService();

const View = ({ items, cartTotalPrice, toggleFull, full }) => {
  const [isGiftAvailable, setIsGiftAvailable] = useState(false);
  const [products, setProducts] = useState(null);

  const { pages } = useSelector((state) => state.cart);

  useEffect(() => {
    const productsObj = getCartProducts(pages);

    setProducts(productsObj);
  }, [pages]);

  useEffect(() => {
    if (products) {
      getAvailablePromotions({ products })
        .then((res) => {
          if (res.length) {
            setIsGiftAvailable(true);
          }
        })
        .catch(() => {
          setIsGiftAvailable(false);
        });
    }
  }, [products]);

  return (
    <>
      <div className="MiniBasketDropdown__content-wrapper">
        <div className="MiniBasketDropdown__content-filled MiniBasketDropdown__content-filled--no-credit">
          <table className="MiniBasketDropdown__content-categories">
            {items}
            {isGiftAvailable ? (
              <tr>
                <td
                  colSpan={2}
                  className="MiniBasketTotalTable__cartDisclamerMessage-label MiniBasketTotalTable__cartDisclamerMessage-label-bold"
                >
                  Вам доступен подарок при оформлении заказа.
                </td>
              </tr>
            ) : null}
          </table>
        </div>
      </div>
      <div className="MiniBasketFooter">
        <table className="MiniBasketTotalTable">
          <caption className="MiniBasketTotalTable__caption">
            Сумма заказа указана без учёта доставки
          </caption>
          <tbody>
            <tr aria-hidden="true" className="custom_MiniSB_delivery_cost">
              <td colSpan={2}>
                <hr className="MiniBasketTotalTable__spacer--horizontal" />
              </td>
            </tr>
            <tr className="MiniBasketTotalTable__totalPrice">
              <th
                scope="row"
                className="MiniBasketTotalTable__totalPrice-label"
              >
                Итого
              </th>
              <td className="MiniBasketTotalTable__totalPrice-value">
                {full || formatPrice(cartTotalPrice)}
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
                className="MiniBasketTotalTable__cartDisclamerMessage-label MiniBasketTotalTable__cartDisclamerMessage-label-bold"
              >
                *Акции доступны при оформлении заказа
              </td>
            </tr>
          </tbody>
        </table>

        <ButtonWrapper>
          {isGiftAvailable ? (
            <GiftIconWrapper>
              <GiftLogo />
            </GiftIconWrapper>
          ) : null}

          <button
            id="ta-mini-basket__checkout"
            className="ElementWithChevron CheckoutActionButton MiniBasketFooter__button-checkout"
            onClick={() => {
              if (!full) {
                sendMetriks("reachGoal", "create-order");
              }

              toggleFull();
            }}
          >
            {!full ? "ОФОРМИТЬ ЗАКАЗ" : "ВЕРНУТЬСЯ В КОРЗИНУ"}
          </button>
        </ButtonWrapper>
      </div>
    </>
  );
};

const EmptyCart = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="MiniBasketDropdown__content-wrapper">
        <div className="MiniBasketDropdown__content-empty">
          <div className="MiniBasketDropdown__content__title">
            Ваша корзина пуста.
          </div>
          <div className="MiniBasketDropdown__shopLinks">
            <Link
              href="/"
              id="ta-mini-basket__start-shopping"
              onClick={() => {
                dispatch({ type: "menu/toggleCart" });
              }}
              className="AccessibleLink ElementWithChevron CheckoutActionButton MiniBasketDropdown__Link-shopping"
            >
              Заказать
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModal;
