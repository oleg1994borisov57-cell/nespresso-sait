// import Logo from "../../resources/icons/logo-white.svg";
import SearchBarUniversal from "../searchBarUniversal/SearchBarUniversal";
import { useDispatch, useSelector } from "react-redux";
import CartModal from "../cartModal/CartModal";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { sendMetriks } from "../../utils/metriks";
import { useRouter } from "next/router";
// import Link from "next/link";
import isServerRender from "../../utils/isServerRender";

const Menu = () => {
  const isMobile = useMediaQuery("(max-width:995px)");

  const { pathname } = useRouter();

  useEffect(() => {
    if (isServerRender()) return;
    sendMetriks("hit", window.location.href);
  }, [pathname]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { isSearchBarOpen, isCartOpen } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  const basketCount = useSelector((state) => state.cart.cartTotal);

  const onSearchClick = () => {
    dispatch({ type: "menu/toggleSearchBar" });
  };

  const onBasketClick = () => {
    dispatch({ type: "menu/toggleCart" });
  };

  return (
    <>
      <header
        id="top"
        className={pathname.includes("product") ? "product" : null}
      >
        <div id="header" className="clearfix" role="banner">
          <div className="crema-ui-container ">
            <div className="Header">
              <div className="ResponsiveContainer">
                <div className="Header__top-wrapper">
                  <div className="Header__top">
                    {/* <Link
                      href={"/"}
                      title="Go to home page"
                      className="Header__logo"
                    >
                      <h6 style={{ fontSize: "2em" }}>продукция Nespresso</h6>
                    </Link> */}
                    <div className="Header__customer">
                      <div className="cv-search-host">
                        <div
                          id="searchbox"
                          search-hub="Nespresso_CH_Search"
                          analytics=""
                          language="en"
                          reflect-state-in-url=""
                          scroll-container="atomic-search-interface"
                          language-assets-path="./lang"
                          icon-assets-path="./assets"
                          enable-relevance-inspector=""
                          className="hydrated"
                          pipeline=""
                        >
                          <div
                            className="hydrated"
                            style={{
                              position: "absolute",
                              display: "block",
                              height: 0,
                              overflow: "hidden",
                              margin: 0,
                            }}
                          >
                            <div
                              id="aria-live-es51l-search-box"
                              aria-live="polite"
                              role="status"
                            />
                            <div
                              id="aria-live-es51l-search-suggestions"
                              aria-live="assertive"
                              role="status"
                            />
                          </div>
                          <div>
                            <div className="hydrated"></div>
                            {isSearchBarOpen ? (
                              <SearchBarUniversal />
                            ) : (
                              <button
                                id="search-bar-button"
                                className="search-bar-button"
                                onClick={onSearchClick}
                              >
                                <svg
                                  width={30}
                                  height={29}
                                  viewBox="0 0 30 29"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="11.8151"
                                    cy="11.652"
                                    r="10.8182"
                                    fill="white"
                                  />
                                  <path
                                    d="M19.9718 21.9014C19.5812 21.5109 19.5812 20.8778 19.9718 20.4872L20.6789 19.7801C21.0694 19.3896 21.7026 19.3896 22.0931 19.7801L28.1035 25.7905C28.6893 26.3763 28.6893 27.3261 28.1035 27.9119V27.9119C27.5177 28.4976 26.5679 28.4976 25.9822 27.9119L19.9718 21.9014Z"
                                    fill="white"
                                  />
                                </svg>
                                <span>Поиск</span>
                              </button>
                            )}
                            <div
                              id="cv-faq-modal"
                              data-atomic-rendered="true"
                              data-atomic-loaded="true"
                              className="dialog hydrated"
                              boundary="page"
                              aria-hidden="true"
                              tabIndex={-1}
                              data-js-focus-visible=""
                            >
                              <div slot="header">
                                <div className="cv-header-title" />
                                <div id="cv-faq-modal-close">
                                  <svg
                                    width={48}
                                    height={49}
                                    viewBox="0 0 48 49"
                                    fill="black"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      y="0.5"
                                      width={48}
                                      height={48}
                                      rx={24}
                                      fill="white"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M22.5382 24.5L15 16.9618L16.4618 15.5L24 23.0382L31.5382 15.5L33 16.9618L25.4618 24.5L33 32.0382L31.5382 33.5L24 25.9618L16.4618 33.5L15 32.0382L22.5382 24.5Z"
                                      fill="#17171A"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div slot="body" id="cv-faq-modal-body" />
                              <div slot="footer">
                                <button id="cv-faq-modal-close-btn-done">
                                  Закрыть
                                </button>
                              </div>
                            </div>
                            <div
                              id="search-box-modal"
                              data-atomic-rendered="true"
                              data-atomic-loaded="true"
                              className="fullscreen hydrated"
                              fullscreen=""
                              boundary="page"
                              aria-hidden="true"
                              tabIndex={-1}
                              data-js-focus-visible=""
                            >
                              <div slot="header">
                                <div className="cv-header-title">ПОИСК</div>
                                <div id="search-box-modal-close">
                                  <svg
                                    width={48}
                                    height={49}
                                    viewBox="0 0 48 49"
                                    fill="black"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      y="0.5"
                                      width={48}
                                      height={48}
                                      rx={24}
                                      fill="#C5C5C5"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M22.5382 24.5L15 16.9618L16.4618 15.5L24 23.0382L31.5382 15.5L33 16.9618L25.4618 24.5L33 32.0382L31.5382 33.5L24 25.9618L16.4618 33.5L15 32.0382L22.5382 24.5Z"
                                      fill="#17171A"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div slot="body" />
                              <div slot="footer" />
                            </div>
                          </div>
                        </div>
                      </div>
                      {isClient ? (
                        <div className="MiniBasketDropdown">
                          <button
                            id="ta-mini-basket__open"
                            className="MiniBasketButton"
                            onClick={onBasketClick}
                          >
                            <i
                              aria-hidden="true"
                              className="Glyph Glyph--basket MiniBasketButton__basketIcon"
                            />
                            {!isMobile ? (
                              <span className="notranslate">
                                КОРЗИНА ({basketCount ?? 0})
                              </span>
                            ) : (
                              <span
                                className="MiniBasketButton__quantity"
                                aria-hidden="true"
                              >
                                {basketCount}
                              </span>
                            )}
                          </button>
                          {isCartOpen && <CartModal />}
                        </div>
                      ) : null}

                      <div className="PhoneNumber">
                        <a
                          id="ta-mini-basket__open"
                          className="PhoneNumberButton"
                          href="tel:+79804508000"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21.384,17.752a2.108,2.108,0,0,1-.522,3.359,7.543,7.543,0,0,1-5.476.642C10.5,20.523,3.477,13.5,2.247,8.614a7.543,7.543,0,0,1,.642-5.476,2.108,2.108,0,0,1,3.359-.522L8.333,4.7a2.094,2.094,0,0,1,.445,2.328A3.877,3.877,0,0,1,8,8.2c-2.384,2.384,5.417,10.185,7.8,7.8a3.877,3.877,0,0,1,1.173-.781,2.092,2.092,0,0,1,2.328.445Z" />
                          </svg>
                          <span className="notranslate">
                            +7 (980) 450-80-00
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* {isCartOpen && <CartModal />} */}
    </>
  );
};

export default Menu;
