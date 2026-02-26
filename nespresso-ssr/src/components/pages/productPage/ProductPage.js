import World from "../../../resources/img/world.svg";

import logoAAA from "../../../resources/icons/logo-aaa-en.png";
import logoRainForest from "../../../resources/icons/logo-rainforest.png";

import VertuoImg from "../../../resources/icons/coffeeSystem/vertuo.svg";
import DefaultImg from "../../../resources/icons/coffeeSystem/default.svg";

import originSectionBg from "../../../resources/img/productPage/origin_bg.jpg";
import roastingSectionBg from "../../../resources/img/productPage/roasting_bg.jpg";

import { useEffect, useState } from "react";

import CoffeeService from "../../../services/CoffeeService";
import AddButtonLarge from "../../addButtonLarge/AddButtonLarge";
import Cups from "../../cups/Cups";
import AromaticPoints from "../../aromaticPoints/AromaticPoints";
import LocationItem from "../../locationItem/LocationItem";
import Spinner from "../../spinner/Spinner";
import SingleProductIntensity from "../../singleProductIntensity/SingleProductIntensity";
import RecommendationItem from "../../recommendationItem/RecommendationItem";
import { Alert } from "react-bootstrap";
import PopUpInfo from "../../popUpInfo/PopUpInfo";
import replaceSpacesWithBr from "../../../utils/replaceSpacesWithBr";
import { useRouter } from "next/router";
import Image from "next/image";
import isServerRender from "../../../utils/isServerRender";
import BackLinks from "../../backLinks/BackLinks";
import { sendEcommerceData } from "../../../utils/metriks";
import formatPrice from "../../../utils/formatPrice";
// import Link from "next/link";

const { getSingleProduct } = new CoffeeService();

const ProductPage = ({ singleProduct }) => {
  const {
    query: { type },
  } = useRouter();

  const [product, setProduct] = useState(singleProduct);

  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (singleProduct) {
      setStatus("loading");
      setProduct(singleProduct);
      setStatus("idle");
    } else {
      setStatus("loading");
      getSingleProduct(type)
        .then((data) => {
          setProduct(data);
          setStatus("idle");
        })
        .catch(() => {
          setStatus("error");
        });
    }

    // eslint-disable-next-line
  }, [singleProduct, type]);

  const view = status === "idle" ? <View product={product} /> : null;
  const loading = status === "loading" ? <Spinner /> : null;
  const error =
    status === "error" ? (
      <Alert
        style={{ width: 500, height: 100, margin: "10px auto" }}
        variant="danger"
      >
        Error
      </Alert>
    ) : null;

  return (
    <div className="enrichedPDP">
      {view}
      {loading}
      {error}
    </div>
  );
};

const View = ({ product }) => {
  const [isMobile, setIsMobile] = useState(false);

  const {
    id,
    productImg,
    productName,
    productSubName,
    infos,
    productPrice,
    productCount,
    details,
    aromatic,
    locations,
    roastingDescr,
    productStyleColor,
    recomendation,
    productBg,
    originsDescr,
    netWeight,
    alt_tag,
    old_price,
    availability,
    breadcrumbs,
  } = product;

  useEffect(() => {
    sendEcommerceData("detail", {
      products: [
        {
          id,
          name: productName,
          price: productPrice,
        },
      ],
    });
  }, []);

  const [descrHtml, setDescrHtml] = useState();
  const [coffeeTypeHtml, setCoffeeTypeHtml] = useState();

  useEffect(() => {
    const descr = replaceSpacesWithBr(details.descr);
    const coffeeTypeHtml = replaceSpacesWithBr(infos.coffeeType);
    setDescrHtml(descr);
    setCoffeeTypeHtml(coffeeTypeHtml);

    // eslint-disable-next-line
  }, [details.descr, infos.coffeeType]);

  const coffeeSystem =
    infos.coffeeSystem[0].toUpperCase() +
    infos.coffeeSystem.slice(1).toLowerCase();

  const recItems = recomendation
    .filter(({ availability }) => availability)
    .map(({ id, page, ...props }) => (
      <RecommendationItem
        key={id}
        id={id}
        cartPageName={`${page}Capsules`}
        href={`/product/${id}`}
        page={`${infos.coffeeSystem.toLowerCase()}Capsules`}
        {...props}
      />
    ));

  useEffect(() => {
    if (isServerRender()) return;

    if (window.matchMedia("(max-width: 995px)").matches) {
      setIsMobile(true);
    }

    const onResize = () => {
      if (window.matchMedia("(max-width: 995px)").matches) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section id="product_page">
      <div
        id="respProductDetailPDPCapsule-8797219497744-a56b97f7-09e9-4acb-b92e-e2c5b884762a"
        className="crema-ui-container "
      >
        <div
          style={{
            top: 232,
          }}
          className="main-media-product"
        >
          <Image
            className="main-media-product imgfor_718920"
            width={250}
            height={200}
            style={{
              width: "auto",
              height: "auto",
            }}
            src={productImg}
            alt={alt_tag ?? productName}
          />
        </div>
        {/* <Image
          className="background-product"
          height={464}
          width={800}
          loading="eager"
          src={`${productBg}`}
          style={{
            height: 464,
            width: "100%",
          }}
        /> */}
        <div className="ProductDetails" itemType="http://schema.org/Product">
          <div className="ProductDetails__header" style={{ height: 497 }}>
            <div className="ResponsiveContainer ProductDetails__display">
              <BackLinks
                color={"#fff"}
                links={breadcrumbs}
                sx={{
                  left: "0px",
                  top: "60px",
                  zIndex: "1",
                }}
              />

              <div
                className={
                  isMobile
                    ? "ProductDetails__information"
                    : "ProductDetails__information sticky"
                }
                style={{ top: 407 }}
              >
                <div className="ProductDetails__information__inner">
                  <div className="ProductDetails__leftinformation">
                    <h1 itemProp="name" className="ProductDetails__name">
                      {productName}
                    </h1>
                    <div className="product-headline">{productSubName}</div>
                  </div>
                  <div
                    className="product-sustainability-info"
                    style={{ borderRight: "1px solid rgb(45, 117, 79)" }}
                  >
                    <svg
                      style={{
                        marginTop: "-3px",
                        marginBottom: 3,
                        transform: "scale(0.9)",
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      height={28}
                      width={28}
                    >
                      <path
                        d="M22.465 17.983l-3.499-6.088 5.612-3.239 2.849 4.98c.11.237.188.479.234.727a2.82 2.82 0 0 1-.468 2.226c-.075.139-.176.28-.303.424-.011.011-.02.023-.026.035l-3.845 6.097c-.098.15-.242.3-.433.45-.387.3-.808.447-1.264.442l-3.239-.043-.043 2.512-3.179-5.526 3.196-5.915-.069 2.884zm4.399-.935l-.286.26c-.543.479-1.163.71-1.862.693l-2.252-.017M8.808 1.433a2.83 2.83 0 0 1 2.148-.745l.502.087 7.266.078.615.139c.456.173.797.456 1.022.849l1.645 2.797 2.174-1.264-3.083 5.577-6.72.329 2.512-1.429-2.269-3.854-3.421 6.158-5.681-3.126 2.789-5.023a3.37 3.37 0 0 1 .502-.572zM6.236 17.758l2.234-3.863 2.468 1.498-3.533-5.716H1.022l2.165 1.29-1.654 2.789c-.237.393-.32.828-.251 1.308.035.237.092.436.173.598l3.412 6.417a3.83 3.83 0 0 1-.104-.407c-.139-.704-.029-1.354.329-1.949l1.143-1.966h7.006l.009 6.487H7.812c-.317.017-.67-.043-1.057-.182a2.81 2.81 0 0 1-1.68-1.507 2.41 2.41 0 0 1-.208-.476M11.458.775l.416.069a2.68 2.68 0 0 1 1.533 1.247l1.212 1.905"
                        strokeMiterlimit={6}
                        stroke={productStyleColor}
                        fill="white"
                        strokeWidth={1}
                      />
                    </svg>
                    <div className="sustainability-label">
                      {infos.aluminumProcent} recycled aluminium
                    </div>
                    <PopUpInfo
                      title={`${infos.aluminumProcent} recycled aluminium`}
                    >
                      <div>
                        <svg
                          style={{
                            marginTop: "-3px",
                            marginBottom: 3,
                            transform: "scale(0.9)",
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          height={28}
                          width={28}
                        >
                          <path
                            d="M22.465 17.983l-3.499-6.088 5.612-3.239 2.849 4.98c.11.237.188.479.234.727a2.82 2.82 0 0 1-.468 2.226c-.075.139-.176.28-.303.424-.011.011-.02.023-.026.035l-3.845 6.097c-.098.15-.242.3-.433.45-.387.3-.808.447-1.264.442l-3.239-.043-.043 2.512-3.179-5.526 3.196-5.915-.069 2.884zm4.399-.935l-.286.26c-.543.479-1.163.71-1.862.693l-2.252-.017M8.808 1.433a2.83 2.83 0 0 1 2.148-.745l.502.087 7.266.078.615.139c.456.173.797.456 1.022.849l1.645 2.797 2.174-1.264-3.083 5.577-6.72.329 2.512-1.429-2.269-3.854-3.421 6.158-5.681-3.126 2.789-5.023a3.37 3.37 0 0 1 .502-.572zM6.236 17.758l2.234-3.863 2.468 1.498-3.533-5.716H1.022l2.165 1.29-1.654 2.789c-.237.393-.32.828-.251 1.308.035.237.092.436.173.598l3.412 6.417a3.83 3.83 0 0 1-.104-.407c-.139-.704-.029-1.354.329-1.949l1.143-1.966h7.006l.009 6.487H7.812c-.317.017-.67-.043-1.057-.182a2.81 2.81 0 0 1-1.68-1.507 2.41 2.41 0 0 1-.208-.476M11.458.775l.416.069a2.68 2.68 0 0 1 1.533 1.247l1.212 1.905"
                            strokeMiterlimit={6}
                            stroke="#000"
                            fill="none"
                            strokeWidth={1}
                          />
                        </svg>
                        <p>
                          Our <strong>{coffeeSystem}</strong> capsules are made
                          using {infos.aluminumProcent} recycled aluminium*,
                          requiring significantly less energy than than the
                          production of virgin aluminium.
                          <br />
                          <br />* With the exception of{" "}
                          <strong>{coffeeSystem}</strong> Carafes, Limited
                          Editions, Alto and Cold Brew capsules.
                        </p>
                      </div>
                    </PopUpInfo>
                  </div>
                  <div className="product-techno-info">
                    {infos.coffeeSystem === "vertuo" ? (
                      <VertuoImg color={productStyleColor} />
                    ) : (
                      <DefaultImg color={productStyleColor} />
                    )}
                    <div className="techno-label">{coffeeSystem}</div>
                    <PopUpInfo title={`${coffeeSystem}`}>
                      <div>
                        {infos.coffeeSystem === "vertuo" ? (
                          <VertuoImg color="#000" />
                        ) : (
                          <DefaultImg color="#000" />
                        )}
                        <p>
                          Create your favourite coffee with{" "}
                          <strong>{coffeeSystem}</strong>, through the
                          innovative combination of Centrifusion™ technology and
                          the full range of coffees in different capsule sizes.
                          Enjoy your perfect cup of coffee, topped with a silky
                          and generous crema, with just one touch.
                        </p>
                      </div>
                    </PopUpInfo>
                  </div>
                  <div
                    className="product-specie-info"
                    style={{ borderLeft: "1px solid #2D754F" }}
                  >
                    <svg
                      className="cupsvg"
                      xmlns="http://www.w3.org/2000/svg"
                      width={100}
                      height={100}
                      viewBox="0 0 26.458 26.458"
                      version="1.1"
                    >
                      <g
                        transform="matrix(.04639 0 0 .04699 17.87 10)"
                        strokeWidth={25}
                        strokeMiterlimit={4}
                        fill="white"
                        stroke={productStyleColor}
                        strokeOpacity={1}
                      >
                        <ellipse
                          cx="-99.959"
                          cy="122.409"
                          rx="123.906"
                          ry="180.746"
                          fillRule="evenodd"
                          stopColor={productStyleColor}
                        />
                        <path
                          d="M-133.913-45.892s10.051 39.016 12.35 62.463c1.357 13.836-.5 36.227-2.539 49.98-5.314 35.832-19.621 68.049-24.321 103.967-2.682 20.495-2.738 40.386-.535 60.937 1.96 18.277 10.557 59.602 10.557 59.602M-113.222-53.442s32.696 61.488 34.995 84.935c1.357 13.836 4.414 29.801 2.375 43.553-5.315 35.833-8.932 47.694-21.164 75.418-8.295 18.8-22.596 75.24-21.432 96.305 1.03 18.632-1.05 32.15 3.442 54.467"
                          strokeLinecap="butt"
                          strokeLinejoin="miter"
                        />
                      </g>
                    </svg>
                    <div
                      className="product-specie-label"
                      dangerouslySetInnerHTML={{ __html: coffeeTypeHtml }}
                    ></div>
                    <PopUpInfo title={infos.coffeeType}>
                      <div>
                        <svg
                          className="cupsvg"
                          xmlns="http://www.w3.org/2000/svg"
                          width={100}
                          height={100}
                          viewBox="0 0 26.458 26.458"
                          version="1.1"
                        >
                          <g
                            transform="matrix(.04639 0 0 .04699 17.87 10)"
                            strokeWidth={25}
                            strokeMiterlimit={4}
                            fill="none"
                            stroke="#000000"
                            strokeOpacity={1}
                          >
                            <ellipse
                              cx="-99.959"
                              cy="122.409"
                              rx="123.906"
                              ry="180.746"
                              fillRule="evenodd"
                              stopColor="#000000"
                            />
                            <path
                              d="M-133.913-45.892s10.051 39.016 12.35 62.463c1.357 13.836-.5 36.227-2.539 49.98-5.314 35.832-19.621 68.049-24.321 103.967-2.682 20.495-2.738 40.386-.535 60.937 1.96 18.277 10.557 59.602 10.557 59.602M-113.222-53.442s32.696 61.488 34.995 84.935c1.357 13.836 4.414 29.801 2.375 43.553-5.315 35.833-8.932 47.694-21.164 75.418-8.295 18.8-22.596 75.24-21.432 96.305 1.03 18.632-1.05 32.15 3.442 54.467"
                              strokeLinecap="butt"
                              strokeLinejoin="miter"
                            />
                          </g>
                        </svg>
                        <p>
                          {infos.coffeeType.match(/^[^\s]+/)[0]} выращивается в
                          основном на больших высотах, что позволяет ей
                          уникальную округлость и прекрасное ароматическое
                          разнообразие при умеренном содержании кофеина.
                        </p>
                      </div>
                    </PopUpInfo>
                  </div>
                  {infos.cups ? (
                    <div
                      className="product-cupsizes-info"
                      style={{
                        width: infos.cups.length * 70,
                        borderLeft: "1px solid rgb(45, 117, 79)",
                        borderRight: "1px solid rgb(45, 117, 79)",
                      }}
                    >
                      <Cups
                        color={productStyleColor}
                        cupsizes={infos.cups}
                        isProductPage
                      />
                    </div>
                  ) : null}
                  {infos.intensity ? (
                    <div className="product-intensity-info">
                      <SingleProductIntensity
                        color={productStyleColor}
                        count={infos.intensity}
                      />
                    </div>
                  ) : null}
                  <div className="ProductDetails__rightprice">
                    <span itemProp="offers" itemType="http://schema.org/Offer">
                      <span
                        className="ProductDetails__price"
                        style={{ color: old_price ? "red" : null }}
                      >
                        {old_price ? (
                          <>
                            <span className="ProductDetails__old__price">
                              {formatPrice(old_price)}
                            </span>{" "}
                          </>
                        ) : null}
                        {formatPrice(productPrice)}
                        <span
                          style={{
                            color: "#666",
                            fontFamily:
                              "NespressoLucas-Regular, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans,  Tahoma, sans-serif",
                            whiteSpace: "nowrap",
                          }}
                        >
                          ({productCount}&nbsp;
                          {infos.coffeeSystem === "vertuo" ? (
                            <svg
                              height="12px"
                              width="16px"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 23.67 14.97"
                              style={{ marginBottom: "-1px" }}
                            >
                              <title>capsules</title>
                              <line
                                y1="14.5"
                                x2="23.67"
                                y2="14.5"
                                style={{
                                  fill: "none",
                                  stroke: "#666",
                                  strokeWidth: 2,
                                  strokeLinejoin: "bevel",
                                }}
                              />
                              <path
                                d="M21.16,14.25V11.11A12.75,12.75,0,0,0,20.8,8C19.7,3.61,16.42.5,11.84.5h0C7.4.5,4.26,3.4,3,7.55a13.14,13.14,0,0,0-.5,3.69v3"
                                style={{
                                  fill: "none",
                                  stroke: "#666",
                                  strokeWidth: 2,
                                  strokeLinejoin: "bevel",
                                }}
                              />
                              <line
                                x1="11.84"
                                y1="3.55"
                                x2="11.84"
                                y2="14.5"
                                style={{
                                  fill: "none",
                                  stroke: "#000",
                                  strokeLinejoin: "bevel",
                                }}
                              />
                              <path
                                d="M6,14.25s.11-8.56,1.14-9"
                                style={{
                                  fill: "none",
                                  stroke: "#000",
                                  strokeLinejoin: "bevel",
                                }}
                              />
                              <path
                                d="M17.63,14.25s0-8.56-1-9"
                                style={{
                                  fill: "none",
                                  stroke: "#000",
                                  strokeLinejoin: "bevel",
                                }}
                              />
                            </svg>
                          ) : (
                            <svg
                              height="12px"
                              width="12px"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18.09 15.05"
                              style={{ marginBottom: "-1px" }}
                            >
                              <title>capsules</title>
                              <line
                                style={{
                                  fill: "none",
                                  stroke: "#666",
                                  strokeWidth: 2,
                                  strokeLinejoin: "bevel",
                                }}
                                y2="14.55"
                                x2="18.09"
                                y1="14.55"
                              />
                              <polyline
                                points="16.34 14.55 15.75 13.1 14 2.89 11.38 0.55 6.71 0.55 4.09 2.89 2.34 13.1 1.75 14.55"
                                style={{
                                  fill: "none",
                                  stroke: "#666",
                                  strokeWidth: 2,
                                  strokeLinejoin: "bevel",
                                }}
                              />
                            </svg>
                          )}
                          )
                        </span>
                      </span>
                      <meta itemProp="priceCurrency" content="CHF" />
                      <meta itemProp="price" content={productPrice} />
                    </span>
                    <div className="ProductDetails__add-to-basket">
                      <div className="AddToBagButton__container">
                        <AddButtonLarge
                          img={productImg}
                          outOfStock={!availability}
                          title={productName}
                          id={id}
                          price={productPrice}
                          cartPageName={`${infos.coffeeSystem.toLowerCase()}Capsules`}
                          count={productCount}
                          page={infos.coffeeSystem.toLowerCase()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="ProductDetailsBody">
              <div className="ResponsiveContainer">
                <div className="ProductDetailsBodyInformation">
                  <div className="coffeProfileTitle">Кофейный профиль</div>
                  <h2 className="coffeProfileTitleValue">{details.title}</h2>
                  <div
                    className="ProductDetailsBodyInformation__description"
                    itemProp="description"
                  >
                    <div className="FreeHTML">
                      <p dangerouslySetInnerHTML={{ __html: descrHtml }}></p>
                    </div>
                  </div>
                </div>
                <Image
                  className="coffeecuppicture"
                  src={details.img}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <div className="clearer" />
              </div>
            </div>
            <div id="ProductDetails" className="ProductDetails" />
            <div className="ProductDetailsBody PDParomaticSection">
              <div className="darkoverlay" />
              <Image
                fetchPriority="high"
                src={productBg}
                objectFit="fill"
                width={800}
                height={777}
                loading="eager"
                style={{
                  width: "100%",
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  height: "100%",
                }}
              />
              <div className="ResponsiveContainer">
                <div className="strs.aromaticFamily">
                  Ароматические свойства
                </div>
                <h2 className="aromaticProfileTitleValue">{aromatic.title}</h2>
                <p className="PDParomaticSectionDescription">
                  {aromatic.descr}
                </p>
                <div className="product-features">
                  <Image
                    className={`aromaticProfilePicture ${infos.coffeeSystem.toLowerCase()}`}
                    src={aromatic.img}
                    alt={productName}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      height: "auto",
                    }}
                  />
                  <div className="product-feature-bitterness">
                    <PopUpInfo title={"Горчинка"}>
                      <div>
                        <p>
                          По вкусу напоминает какао или темный шоколад.
                          <br />
                          Ощущается во рту на задней поверхности языка.
                        </p>
                      </div>
                    </PopUpInfo>
                    <div className="product-feature-title">Горчинка</div>
                    <AromaticPoints count={aromatic.brightness} />
                  </div>
                  <div className="product-feature-acidity">
                    <PopUpInfo title={"Кислинка"}>
                      <div>
                        <p>
                          Ощущение сухости во рту, напоминающее лимон.
                          <br />
                          Обычно ощущается по бокам языка.
                        </p>
                      </div>
                    </PopUpInfo>
                    <div className="product-feature-title">Кислинка</div>
                    <AromaticPoints count={aromatic.acidity} />
                  </div>
                  <div className="product-feature-body">
                    <PopUpInfo title={"Плотность"}>
                      <div>
                        <p>
                          Соответствует весу и текстуре кофе, воспринимаемым во
                          рту.
                          <br />
                          Полнотелый кофе обладает силой и создает впечатление
                          впечатление полноты во рту.
                        </p>
                      </div>
                    </PopUpInfo>
                    <div className="product-feature-title">Плотность</div>
                    <AromaticPoints count={aromatic.body} />
                  </div>
                  <div className="product-feature-roasting">
                    <PopUpInfo title={"Обжарка"}>
                      <div>
                        <p>
                          Соответствует интенсивности обжарки кофейных зерен.
                          <br />
                          Как правило, интенсивность составляет от 170 до 230
                          градусов в течение 7 до 15 минут.
                        </p>
                      </div>
                    </PopUpInfo>
                    <div className="product-feature-title">Обжарка</div>
                    <AromaticPoints count={aromatic.roasting} />
                  </div>
                </div>
                <h2 className="strs.ingredientsAllergens">
                  Состав и аллергены
                </h2>
                <ul className="attributeslist">
                  <li className="enrichedPack_li">
                    {infos.coffeeSystem === "vertuo" ? (
                      <svg
                        style={{ marginTop: 10 }}
                        className="product-techno-info-picto"
                        width="50px"
                        height="40px"
                        enableBackground="new 0 0 28 28"
                        version="1.1"
                        viewBox="0 0 28 28"
                        xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g transform="matrix(0.29787234,0,0,0.29787234,-0.89361702,-5.9574468)">
                          <path
                            d="M 3 75 L 3 79 L 97 79 L 97 75 L 3 75 z"
                            fill="#fff"
                          />
                          <path
                            d="M 50 20 C 31.536364 20 18.179937 32.173158 13.083984 49.125 L 13.083984 49.128906 C 11.620044 54.043563 11 59.135953 11 64.199219 L 11 76 L 15 76 L 15 64.199219 C 15 59.463773 15.58073 54.759634 16.916016 50.275391 C 21.620063 34.627233 33.263636 24 50 24 C 67.306227 24 79.440247 35.392842 83.662109 51.896484 C 84.610579 55.695327 85 59.733273 85 63.699219 L 85 76 L 89 76 L 89 63.699219 C 89 59.469137 88.590474 55.111895 87.541016 50.914062 L 87.537109 50.904297 C 82.958971 33.007939 69.093773 20 50 20 z "
                            fill="#fff"
                          />
                          <path
                            d="M 48 34 L 48 77 L 52 77 L 52 34 L 48 34 z "
                            fill="#fff"
                          />
                          <path
                            d="M 30.658203 38.685547 C 29.131162 39.3932 28.72368 40.595559 28.251953 41.882812 C 27.780227 43.170066 27.418419 44.720003 27.099609 46.494141 C 26.461991 50.042415 26.025739 54.463593 25.716797 58.820312 C 25.098912 67.533752 25 75.976562 25 75.976562 L 29 76.023438 C 29 76.023438 29.099916 67.665076 29.707031 59.103516 C 30.010589 54.822735 30.44465 50.489225 31.035156 47.203125 C 31.330409 45.560075 31.672898 44.173684 32.007812 43.259766 C 32.342727 42.345848 32.843838 42.0818 32.341797 42.314453 L 30.658203 38.685547 z "
                            fill="#fff"
                          />
                          <path
                            d="M 69.757812 38.693359 L 68.041016 42.306641 C 67.510684 42.054733 68.017397 42.317538 68.337891 43.232422 C 68.658384 44.147306 68.980735 45.533751 69.255859 47.177734 C 69.806109 50.4657 70.19289 54.802505 70.453125 59.083984 C 70.973594 67.646943 71 76.005859 71 76.005859 L 75 75.994141 C 75 75.994141 74.976796 67.553838 74.447266 58.841797 C 74.1825 54.485776 73.794672 50.063987 73.201172 46.517578 C 72.904422 44.744374 72.561928 43.196444 72.111328 41.910156 C 71.660728 40.623869 71.288145 39.420267 69.757812 38.693359 z "
                            fill="#fff"
                          />
                        </g>
                      </svg>
                    ) : (
                      <>
                        <svg
                          version="1.1"
                          width="50px"
                          height="50px"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 50 40"
                          style={{ enableBackground: "new 0 0 50 40" }}
                          xmlSpace="preserve"
                        >
                          <g>
                            <path
                              fill="#ffffff"
                              className="st0"
                              d="M47.5,37.9l-1.9-3.6L41.1,7l-0.4-0.6l-8-6.2L32.1,0H19.6L19,0.2l-8,6.2L10.6,7L6.1,34.3l-1.9,3.6l-4.2,0v2 l50,0v-2L47.5,37.9z M8,35.1l0.1-0.3l4.4-27.1L19.9,2h11.8l7.4,5.7l4.4,27.1l0.1,0.3l1.5,2.8l-38.8,0L8,35.1z"
                            />
                          </g>
                        </svg>
                        <span className="enrichedPack_qty">{productCount}</span>
                      </>
                    )}
                    <br />
                    {productCount} капсулы жареного и молотого кофе для{" "}
                    устройства <strong>Nespresso</strong>
                  </li>
                  <li>
                    <svg
                      version="1.1"
                      width="50px"
                      height="50px"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 50 50"
                      style={{ enableBackground: "new 0 0 50 50" }}
                      xmlSpace="preserve"
                    >
                      <path
                        className="st0"
                        d="M41.6,13.9L41.6,13.9l-0.8-0.8L40.7,13H28.6c1.6-1.1,2.7-3,2.7-5.1c0-3.4-2.8-6.2-6.2-6.2s-6.2,2.8-6.2,6.2 c0,2.1,1.1,4,2.7,5.1h-12H9.4l-0.8,0.7L0.5,47.6l0,0l0.1,0.2l0.7,0.7l0.1,0.1h47h0.1l0.8-0.7l0.1-0.2L41.6,13.9z M25,3.7 c2.3,0,4.2,1.9,4.2,4.2s-1.9,4.2-4.2,4.2s-4.2-1.9-4.2-4.2S22.7,3.7,25,3.7z M47.4,46.8H2.6l7.7-31.9h29.4L47.4,46.8z"
                      />
                      <text
                        transform="matrix(1 0 0 1 10 40)"
                        className="st0 st1 st2"
                        style={{ letterSpacing: "0.01em" }}
                      >
                        {netWeight} г
                      </text>
                    </svg>
                    <br />
                    Масса нетто {netWeight} г
                    <br />
                    (для {productCount} капсул)
                  </li>
                  <li>
                    <svg
                      version="1.1"
                      width="50px"
                      height="50px"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 48 48"
                      style={{ enableBackground: "new 0 0 48 48" }}
                      xmlSpace="preserve"
                    >
                      <g>
                        <path
                          fill="#ffffff"
                          className="st0"
                          d="M8.7,23.4c-0.1,0.1-0.2,0.2-0.3,0.3c-0.8,1.4,0.5,7.7,3.3,10.6c1.7,1.7,3.9,2.3,5.7,2.3c1.5,0,2.8-0.4,3.3-0.9 c0.7-0.7,0.9-2.1,0.9-3.2c0-1.3-0.3-3.8-2.3-5.8C16.4,23.8,10,22.5,8.7,23.4z M19.4,34.4c-0.4,0.4-4,1.1-6.4-1.4 c-2.2-2.2-3.1-6.6-3.1-8.1c1.5,0,5.9,0.9,8.1,3C20.5,30.4,19.8,33.9,19.4,34.4z"
                        />
                        <path
                          fill="#ffffff"
                          className="st0"
                          d="M24,0.7C11.1,0.7,0.7,11.1,0.7,24c0,12.9,10.5,23.3,23.3,23.3S47.3,36.9,47.3,24C47.3,11.1,36.9,0.7,24,0.7z M45.5,24c0,5.5-2.1,10.6-5.6,14.4l-3.9-3.9c0.1-0.1,0.2-0.2,0.3-0.2c2.9-2.9,4.1-9.3,3.3-10.6c-0.1-0.2-0.3-0.3-0.5-0.4 c-0.4-0.1-0.8-0.2-1.2-0.2c-2,0-6.7,1.1-9.2,3.6c-0.1,0.1-0.2,0.2-0.2,0.3l-2-2c1.7-1.1,3.4-3.4,3.4-6.3c0-4-3.7-9.3-5.3-9.6 c-0.1,0-0.3,0-0.4,0c-1.4,0.3-4.6,4.7-5.2,8.5L9.6,8c3.8-3.4,8.9-5.6,14.4-5.6C35.9,2.5,45.5,12.1,45.5,24z M28.9,29.5l4.6,4.6 c-2.2,1.1-4.5,0.6-4.9,0.3C28.3,34,27.8,31.6,28.9,29.5z M29.8,28.2c0.1-0.1,0.1-0.2,0.2-0.3c2-2,6.2-3,8-3c0,0,0.1,0,0.1,0 c0,1.5-0.9,5.9-3,8.1c-0.1,0.1-0.2,0.2-0.3,0.2L29.8,28.2z M20.8,19.2c0-0.2,0-0.4,0-0.6c0-3,2.7-6.8,3.7-7.7 c1,0.9,3.7,4.7,3.7,7.7c0,2.5-1.8,4.3-2.9,5L20.8,19.2z M2.5,24c0-5.8,2.3-11.1,6-14.9L19,19.6c0.5,3.8,3.9,6.2,5.4,6.2 c0.2,0,0.4,0,0.6-0.1l2.5,2.5c-1.8,3-1.2,6.5-0.2,7.5c0,0,0,0,0,0c0.5,0.5,1.8,0.9,3.3,0.9c1.3,0,2.8-0.3,4.2-1.1l4.1,4.1 c-3.9,3.7-9.1,6-14.9,6C12.1,45.5,2.5,35.9,2.5,24z"
                        />
                      </g>
                    </svg>
                    <br />
                    <p>Отсутствие аллергенов</p>
                    <p>Упакованы в защитной атмосфере</p>
                  </li>
                  <li>
                    <svg
                      version="1.1"
                      width="50px"
                      height="50px"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 44 44"
                      style={{ enableBackground: "new 0 0 44 44" }}
                      xmlSpace="preserve"
                    >
                      <g>
                        <path
                          fill="#ffffff"
                          className="st0"
                          d="M0.3,0.3v43.3h43.3V0.3H0.3z M42,42H2V2H42V42z"
                        />
                        <path
                          fill="#ffffff"
                          className="st0"
                          d="M17.8,35.3H27v-8.8h8.8v-9.2H27V8.7h-9.2v8.8H9.1v9.2h8.8V35.3z M10.8,24.9v-5.8h8.8v-8.8h5.8v8.8H34v5.8h-8.8 v8.8h-5.8v-8.8H10.8z"
                        />
                      </g>
                    </svg>
                    <br />
                    Сделано в Швейцарии
                  </li>
                </ul>
                <p style={{ clear: "both" }} />
              </div>
            </div>
            <div
              className="PDPoriginSection"
              style={{
                backgroundImage: `url(${originSectionBg.src})`,
              }}
            >
              <div className="ResponsiveContainer">
                <div className="map-container">
                  <World className="mapOrigin" />
                  {locations.map((location, index) => (
                    <LocationItem name={location} key={index} />
                  ))}
                </div>
                <h2 className="strs.originTitle ">Истоки</h2>
                <p className="originDescription">{originsDescr}</p>
                <div className="originCertifications">
                  <Image
                    src={logoRainForest}
                    height="120px"
                    alt="Rainforest alliance certified"
                  />
                  <Image
                    src={logoAAA}
                    height="120px"
                    alt="AAA Sustainable quality program since 2003"
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                backgroundImage: `url('${roastingSectionBg.src}')`,
              }}
              className="PDProastingSection"
            >
              <div className="darkoverlay" />
              <div className="ResponsiveContainer">
                <h2 className="strs.roastingTitle ">Обжаривание</h2>
                <p className="roastingDescription">{roastingDescr}</p>
              </div>
            </div>
            <div className="ProductDetailsReferenceOrder">
              <div className="ResponsiveContainer">
                <h3 className="ProductDetailsReferenceOrder__title">
                  Рекомендации
                </h3>
                <ul className="ProductDetailsReferenceOrder__list">
                  {recItems}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="block-8826150901237" className="free-html" data-label="">
        <div
          className="popup"
          id="swissness-promo-pdp"
          style={{ display: "none" }}
        >
          <div className="popup-content txt-m">
            <div className="popup-content-text-swisspack" />{" "}
            <span className="popup-btn-close" />{" "}
          </div>
        </div>
      </div>
      <div id="page-builder-6dc182d9-c07c-cc78-332f-927c9863a75d">
        <nb-search-bar
          search_page_url="/search"
          search_box_modal_title="SEARCH"
          coveo_copywriting='{"add-sources":"Add content sources or wait for your newly created sources to finish indexing.","all-categories":"All Categories","and-up":"& up","apply":"Apply","approx_day":"About a day","approx_month":"About a month","approx_month_plural":"About {{count}} months","approx_year":"About a year","approx_year_plural":"About {{count}} years","author":"Author","between-parentheses":"({{text}})","between-quotations":"“{{text}}”","calendar-last-day":"[Yesterday]","calendar-last-week":"[Last] dddd","calendar-next-day":"[Tomorrow]","calendar-next-week":"dddd","calendar-same-day":"[Today]","cancel":"Cancel","cancel-last-action":"Cancel last action","cannot-access":"Your organization {{org}} cannot be accessed.","check-spelling":"Check the spelling of your keywords.","check-your-connection":"Your query couldn&apos;t be sent to the following URL: {{url}}. Verify your connection.","clear":"Clear","clear-all-filters":"Clear All Filters","clear-filters":"Clear filter","clear-filters-for-facet":"Clear {{count}} filter for the {{label}} facet","clear-filters-for-facet_plural":"Clear {{count}} filters for the {{label}} facet","clear-filters_plural":"Clear {{count}} filters","clear-recent-searches":"Clear recent searches","close":"Close","collapse-facet":"Collapse the {{label}} facet","collapse-results":"Collapse results","collapsed-uri-parts":"Collapsed URI parts","coveo-online-help":"Coveo Online Help","cta_add_to_cart":"Add to cart","cta_update_cart":"Update cart","cup-volume-format":"{{cup_size}} ({{volume}})","date-input-apply":"Apply custom start and end dates for the {{label}} facet","date-input-end":"Enter an end date for the {{label}} facet","date-input-start":"Enter a start date for the {{label}} facet","day_plural":"About {{count}} days","did-you-mean":"Did you mean: {{query}}","disconnected":"No access.","edit-insight":"Edit insight","end":"End","expand-facet":"Expand the {{label}} facet","facet-search":"Search for values in the {{label}} facet","facet-search-input":"Search","facet-search-results":"Values found for {{query}} in the {{label}} facet","facet-value":"Inclusion filter on {{value}}; {{count}} result","facet-value_plural":"Inclusion filter on {{value}}; {{count}} results","facet-values":"Values for the {{label}} facet","file-type":"File type","filters":"Filters","if-problem-persists":"If the problem persists contact the administrator.","in":"in","in-seconds":"in {{count}} second","in-seconds_plural":"in {{count}} seconds","in_prd_tecnology":"In {{prd_technology}}","insight-history":"Insight action history","insight-related-cases":"Insights related to this case","instant-results-suggestion-label":"{{title}},instant result","invalid-token":"Ensure that the token is valid.","keywords-highlight":"Keywords highlight","language":"Language","left":"Left","load-all-results":"Load all results","load-more-results":"Load more results","loading-results":"Loading new results","max":"Max","min":"Min","minimize":"Minimize","money-amount":"Fr. {{amount}}","more-info":"Learn more","more-matches-for":"More matches for {{query}}","most-recent":"Most recent","n-more":"{{value}} more...","next":"Next","next-day":"Next day","next-day_plural":"Next {{count}} days","next-hour":"Next hour","next-hour_plural":"Next {{count}} hours","next-month":"Next month","next-month_plural":"Next {{count}} months","next-quarter":"Next quarter","next-quarter_plural":"Next {{count}} quarters","next-week":"Next week","next-week_plural":"Next {{count}} weeks","next-year":"Next year","next-year_plural":"Next {{count}} years","no":"No","no-documents-related":"No documents are related to this one.","no-endpoints":"Your organization {{org}} has no available content.","no-label":"No label","no-matches-found-for":"No matches found for {{query}}","no-results":"No results","no-results-for":"We couldn&apos;t find anything for {{query}}","no-title":"No title","no-values-found":"No values found.","notification-n":"Notification {{n}}: {{text}}","notifications":"Notifications","number-input-apply":"Apply custom numerical values for the {{label}} facet","number-input-maximum":"Enter a maximum numerical value for the {{label}} facet","number-input-minimum":"Enter a minimum numerical value for the {{label}} facet","only":"only","organization-is-paused":"Your organization {{org}} is paused due to inactivity and search is currently unavailable.","organization-will-resume":"Your organization is resuming and will be available shortly.","page-number":"Page {{page}}","pagination":"Pagination","past-day":"Past day","past-day_plural":"Past {{count}} days","past-hour":"Past hour","past-hour_plural":"Past {{count}} hours","past-month":"Past month","past-month_plural":"Past {{count}} months","past-quarter":"Past quarter","past-quarter_plural":"Past {{count}} quarters","past-week":"Past week","past-week_plural":"Past {{count}} weeks","past-year":"Past year","past-year_plural":"Past {{count}} years","popover":"Popover menu for the {{label}} facet","preview-result":"Preview the result","previous":"Previous","previous_price":"was {{previous_price}}","price_per_sleeve":"<strong>{{sleeve_price}} /</strong> Sleeve of {{sleeve_size}}","printable-uri":"Source path of the result","qs_add":"Add","qs_button_ok":"Ok","qs_choose_quantity":"Choose a quantity","qs_custom_description":"You can select a custom quantity using the field below. To validate press SPACE or ENTER key","qs_custom_quantity":"Choose a custom quantity","qs_description":"Select a product quantity to add to your basket. To exit this quantity selector press ESCAPE key","qs_label":"Quantity selector","qs_predefined_description":"You can select predefined quantities using the buttons list below","qs_predefined_quantity":"Choose a predefined quantity","query-auto-corrected-to":"Query was automatically corrected to {{query}}","query-result-summary":"{{count}} search result for","query-result-summary_plural":"{{count}} search results for","query-suggestion-label":"“{{query}}”","query-suggestion-list":"Search suggestions. Select one to search.","query-suggestions-available":"{{count}} search suggestion available.","query-suggestions-available_plural":"{{count}} search suggestions are available.","query-suggestions-unavailable":"There are no search suggestions.","quickview":"Quick View","quickview-add-word":"Add highlights","quickview-loaded":"Quickview for result {{title}} loaded. {{first}} out of {{last}} available.","quickview-loading":"Loading new quickview","quickview-navigate-keywords":"Navigate between {{occurrences}} occurrences of {{keyword}}","quickview-next":"Next quickviewprice_per_sleeve","quickview-previous":"Previous quickview","quickview-remove-word":"Remove highlights","quickview-toggle-navigation":"Toggle keywords navigation","rating":"Rating","recent-query-suggestion-label":"“{{query}}”,recent query","recent-searches":"Recent searches","relevance":"Relevance","remove-filter-on":"Remove inclusion filter on {{value}}","result-summary":"{{count}} search result","result-summary_plural":"{{count}} search results","results-per-page":"Results per page","right":"Right","search":"Search","search-box":"Input field to perform a search. Insert a query. To send, press Enter.","search-box-with-suggestions":"Search field with suggestions. To begin navigating suggestions, while focused, press Down Arrow. To send, press Enter.","search-box-with-suggestions-keyboardless":"Search field with suggestions. Suggestions may be available under this field. To send, press Enter.","search-box-with-suggestions-macos":"Search field with suggestions. Suggestions may be available under this field. To send, press Enter.","search-ellipsis":"undefined","search-instead-for":"Search instead for {{query}}","search-suggestion-button":"{{label}}. Button","search-suggestion-double-list":"{{label}}. {{position}} of {{count}}. In {{side}} list.","search-suggestion-single-list":"{{label}}. {{position}} of {{count}}.","search-suggestions-double-list":"Two lists of search box suggestions side-by-side. To navigate between suggestions, press Up Arrow or Down Arrow. To toggle between the two lists, press Left Arrow or Right Arrow. To select a suggestion, press Enter.","search-suggestions-single-list":"Search suggestions. To navigate between suggestions, press Up Arrow or Down Arrow. To select a suggestion, press Enter.","search-tips":"You may want to try using different keywords, deselecting filters, or checking for spelling mistakes.","select-fewer-filters":"Select fewer filters to broaden your search.","show-all-results":"See all results","show-less":"Show less","show-less-facet-values":"Show less values for the {{label}} facet","show-more":"Show more","show-more-facet-values":"Show more values for the {{label}} facet","show-n-more-filters":"Show {{value}} more filters","showing-results-for":"Showing results for {{query}}","showing-results-of":"Result {{first}} of {{total}}","showing-results-of-load-more":"Showing {{last}} of {{total}} results","showing-results-of-with-query":"Result {{first}} of {{total}} for {{query}}","showing-results-of-with-query_plural":"Results {{first}}-{{last}} of {{total}} for {{query}}","showing-results-of_plural":"Results {{first}}-{{last}} of {{total}}","smart-snippet":"Potential answer to your question","smart-snippet-feedback-details":"Details","smart-snippet-feedback-explain-why":"Explain why","smart-snippet-feedback-inquiry":"Was this information useful?","smart-snippet-feedback-reason-does-not-answer":"This didn&apos;t answer my question at all","smart-snippet-feedback-reason-other":"Other","smart-snippet-feedback-reason-partially-answers":"This only partially answered my question","smart-snippet-feedback-reason-was-not-a-question":"My request wasn&apos;t meant to be perceived as a question","smart-snippet-feedback-select-reason":"Select the reason","smart-snippet-feedback-send":"Send feedback","smart-snippet-feedback-thanks":"Thank you for your feedback!","smart-snippet-people-also-ask":"People also ask","smart-snippet-source":"Source of the answer","something-went-wrong":"Something went wrong.","sort":"Sort","sort-and-filter":"Sort & Filter","sort-by":"Sort by","source":"Source","stars":"one star out of {{max}}","stars-only":"only {{count}} stars out of {{count}}","stars-range":"{{value}} out of {{count}} stars & up","stars_plural":"{{count}} stars out of {{max}}","start":"Start","tab-search":"Search for values in the {{label}} tab.","to":"{{- start}} to {{- end}}","try-using-fewer-keywords":"Try using fewer, different or more general keywords.","under":"{{child}} under {{parent}}","view-results":"View results","with-colon":"{{text}}:","yes":"Yes"}'
          id="nb-search-bar-54ceb264-6631-e24a-61a1-45c766b54135"
          name="Global_searchbar"
          creative="before_search_bar"
          position="middle"
          data-wc-order={0}
          data='{"copywriting":{"search_page_url":"/search","search_box_modal_title":"SEARCH"},"coveo_copywriting":"{\"add-sources\":\"Add content sources or wait for your newly created sources to finish indexing.\",\"all-categories\":\"All Categories\",\"and-up\":\"& up\",\"apply\":\"Apply\",\"approx_day\":\"About a day\",\"approx_month\":\"About a month\",\"approx_month_plural\":\"About {{count}} months\",\"approx_year\":\"About a year\",\"approx_year_plural\":\"About {{count}} years\",\"author\":\"Author\",\"between-parentheses\":\"({{text}})\",\"between-quotations\":\"“{{text}}”\",\"calendar-last-day\":\"[Yesterday]\",\"calendar-last-week\":\"[Last] dddd\",\"calendar-next-day\":\"[Tomorrow]\",\"calendar-next-week\":\"dddd\",\"calendar-same-day\":\"[Today]\",\"cancel\":\"Cancel\",\"cancel-last-action\":\"Cancel last action\",\"cannot-access\":\"Your organization {{org}} cannot be accessed.\",\"check-spelling\":\"Check the spelling of your keywords.\",\"check-your-connection\":\"Your query couldn&apos;t be sent to the following URL: {{url}}. Verify your connection.\",\"clear\":\"Clear\",\"clear-all-filters\":\"Clear All Filters\",\"clear-filters\":\"Clear filter\",\"clear-filters-for-facet\":\"Clear {{count}} filter for the {{label}} facet\",\"clear-filters-for-facet_plural\":\"Clear {{count}} filters for the {{label}} facet\",\"clear-filters_plural\":\"Clear {{count}} filters\",\"clear-recent-searches\":\"Clear recent searches\",\"close\":\"Close\",\"collapse-facet\":\"Collapse the {{label}} facet\",\"collapse-results\":\"Collapse results\",\"collapsed-uri-parts\":\"Collapsed URI parts\",\"coveo-online-help\":\"Coveo Online Help\",\"cta_add_to_cart\":\"Add to cart\",\"cta_update_cart\":\"Update cart\",\"cup-volume-format\":\"{{cup_size}} ({{volume}})\",\"date-input-apply\":\"Apply custom start and end dates for the {{label}} facet\",\"date-input-end\":\"Enter an end date for the {{label}} facet\",\"date-input-start\":\"Enter a start date for the {{label}} facet\",\"day_plural\":\"About {{count}} days\",\"did-you-mean\":\"Did you mean: {{query}}\",\"disconnected\":\"No access.\",\"edit-insight\":\"Edit insight\",\"end\":\"End\",\"expand-facet\":\"Expand the {{label}} facet\",\"facet-search\":\"Search for values in the {{label}} facet\",\"facet-search-input\":\"Search\",\"facet-search-results\":\"Values found for {{query}} in the {{label}} facet\",\"facet-value\":\"Inclusion filter on {{value}}; {{count}} result\",\"facet-value_plural\":\"Inclusion filter on {{value}}; {{count}} results\",\"facet-values\":\"Values for the {{label}} facet\",\"file-type\":\"File type\",\"filters\":\"Filters\",\"if-problem-persists\":\"If the problem persists contact the administrator.\",\"in\":\"in\",\"in-seconds\":\"in {{count}} second\",\"in-seconds_plural\":\"in {{count}} seconds\",\"in_prd_tecnology\":\"In {{prd_technology}}\",\"insight-history\":\"Insight action history\",\"insight-related-cases\":\"Insights related to this case\",\"instant-results-suggestion-label\":\"{{title}},instant result\",\"invalid-token\":\"Ensure that the token is valid.\",\"keywords-highlight\":\"Keywords highlight\",\"language\":\"Language\",\"left\":\"Left\",\"load-all-results\":\"Load all results\",\"load-more-results\":\"Load more results\",\"loading-results\":\"Loading new results\",\"max\":\"Max\",\"min\":\"Min\",\"minimize\":\"Minimize\",\"money-amount\":\"Fr. {{amount}}\",\"more-info\":\"Learn more\",\"more-matches-for\":\"More matches for {{query}}\",\"most-recent\":\"Most recent\",\"n-more\":\"{{value}} more...\",\"next\":\"Next\",\"next-day\":\"Next day\",\"next-day_plural\":\"Next {{count}} days\",\"next-hour\":\"Next hour\",\"next-hour_plural\":\"Next {{count}} hours\",\"next-month\":\"Next month\",\"next-month_plural\":\"Next {{count}} months\",\"next-quarter\":\"Next quarter\",\"next-quarter_plural\":\"Next {{count}} quarters\",\"next-week\":\"Next week\",\"next-week_plural\":\"Next {{count}} weeks\",\"next-year\":\"Next year\",\"next-year_plural\":\"Next {{count}} years\",\"no\":\"No\",\"no-documents-related\":\"No documents are related to this one.\",\"no-endpoints\":\"Your organization {{org}} has no available content.\",\"no-label\":\"No label\",\"no-matches-found-for\":\"No matches found for {{query}}\",\"no-results\":\"No results\",\"no-results-for\":\"We couldn&apos;t find anything for {{query}}\",\"no-title\":\"No title\",\"no-values-found\":\"No values found.\",\"notification-n\":\"Notification {{n}}: {{text}}\",\"notifications\":\"Notifications\",\"number-input-apply\":\"Apply custom numerical values for the {{label}} facet\",\"number-input-maximum\":\"Enter a maximum numerical value for the {{label}} facet\",\"number-input-minimum\":\"Enter a minimum numerical value for the {{label}} facet\",\"only\":\"only\",\"organization-is-paused\":\"Your organization {{org}} is paused due to inactivity and search is currently unavailable.\",\"organization-will-resume\":\"Your organization is resuming and will be available shortly.\",\"page-number\":\"Page {{page}}\",\"pagination\":\"Pagination\",\"past-day\":\"Past day\",\"past-day_plural\":\"Past {{count}} days\",\"past-hour\":\"Past hour\",\"past-hour_plural\":\"Past {{count}} hours\",\"past-month\":\"Past month\",\"past-month_plural\":\"Past {{count}} months\",\"past-quarter\":\"Past quarter\",\"past-quarter_plural\":\"Past {{count}} quarters\",\"past-week\":\"Past week\",\"past-week_plural\":\"Past {{count}} weeks\",\"past-year\":\"Past year\",\"past-year_plural\":\"Past {{count}} years\",\"popover\":\"Popover menu for the {{label}} facet\",\"preview-result\":\"Preview the result\",\"previous\":\"Previous\",\"previous_price\":\"was {{previous_price}}\",\"price_per_sleeve\":\"<strong>{{sleeve_price}} /</strong> Sleeve of {{sleeve_size}}\",\"printable-uri\":\"Source path of the result\",\"qs_add\":\"Add\",\"qs_button_ok\":\"Ok\",\"qs_choose_quantity\":\"Choose a quantity\",\"qs_custom_description\":\"You can select a custom quantity using the field below. To validate press SPACE or ENTER key\",\"qs_custom_quantity\":\"Choose a custom quantity\",\"qs_description\":\"Select a product quantity to add to your basket. To exit this quantity selector press ESCAPE key\",\"qs_label\":\"Quantity selector\",\"qs_predefined_description\":\"You can select predefined quantities using the buttons list below\",\"qs_predefined_quantity\":\"Choose a predefined quantity\",\"query-auto-corrected-to\":\"Query was automatically corrected to {{query}}\",\"query-result-summary\":\"{{count}} search result for\",\"query-result-summary_plural\":\"{{count}} search results for\",\"query-suggestion-label\":\"“{{query}}”\",\"query-suggestion-list\":\"Search suggestions. Select one to search.\",\"query-suggestions-available\":\"{{count}} search suggestion available.\",\"query-suggestions-available_plural\":\"{{count}} search suggestions are available.\",\"query-suggestions-unavailable\":\"There are no search suggestions.\",\"quickview\":\"Quick View\",\"quickview-add-word\":\"Add highlights\",\"quickview-loaded\":\"Quickview for result {{title}} loaded. {{first}} out of {{last}} available.\",\"quickview-loading\":\"Loading new quickview\",\"quickview-navigate-keywords\":\"Navigate between {{occurrences}} occurrences of {{keyword}}\",\"quickview-next\":\"Next quickviewprice_per_sleeve\",\"quickview-previous\":\"Previous quickview\",\"quickview-remove-word\":\"Remove highlights\",\"quickview-toggle-navigation\":\"Toggle keywords navigation\",\"rating\":\"Rating\",\"recent-query-suggestion-label\":\"“{{query}}”,recent query\",\"recent-searches\":\"Recent searches\",\"relevance\":\"Relevance\",\"remove-filter-on\":\"Remove inclusion filter on {{value}}\",\"result-summary\":\"{{count}} search result\",\"result-summary_plural\":\"{{count}} search results\",\"results-per-page\":\"Results per page\",\"right\":\"Right\",\"search\":\"Search\",\"search-box\":\"Input field to perform a search. Insert a query. To send, press Enter.\",\"search-box-with-suggestions\":\"Search field with suggestions. To begin navigating suggestions, while focused, press Down Arrow. To send, press Enter.\",\"search-box-with-suggestions-keyboardless\":\"Search field with suggestions. Suggestions may be available under this field. To send, press Enter.\",\"search-box-with-suggestions-macos\":\"Search field with suggestions. Suggestions may be available under this field. To send, press Enter.\",\"search-ellipsis\":\"undefined\",\"search-instead-for\":\"Search instead for {{query}}\",\"search-suggestion-button\":\"{{label}}. Button\",\"search-suggestion-double-list\":\"{{label}}. {{position}} of {{count}}. In {{side}} list.\",\"search-suggestion-single-list\":\"{{label}}. {{position}} of {{count}}.\",\"search-suggestions-double-list\":\"Two lists of search box suggestions side-by-side. To navigate between suggestions, press Up Arrow or Down Arrow. To toggle between the two lists, press Left Arrow or Right Arrow. To select a suggestion, press Enter.\",\"search-suggestions-single-list\":\"Search suggestions. To navigate between suggestions, press Up Arrow or Down Arrow. To select a suggestion, press Enter.\",\"search-tips\":\"You may want to try using different keywords, deselecting filters, or checking for spelling mistakes.\",\"select-fewer-filters\":\"Select fewer filters to broaden your search.\",\"show-all-results\":\"See all results\",\"show-less\":\"Show less\",\"show-less-facet-values\":\"Show less values for the {{label}} facet\",\"show-more\":\"Show more\",\"show-more-facet-values\":\"Show more values for the {{label}} facet\",\"show-n-more-filters\":\"Show {{value}} more filters\",\"showing-results-for\":\"Showing results for {{query}}\",\"showing-results-of\":\"Result {{first}} of {{total}}\",\"showing-results-of-load-more\":\"Showing {{last}} of {{total}} results\",\"showing-results-of-with-query\":\"Result {{first}} of {{total}} for {{query}}\",\"showing-results-of-with-query_plural\":\"Results {{first}}-{{last}} of {{total}} for {{query}}\",\"showing-results-of_plural\":\"Results {{first}}-{{last}} of {{total}}\",\"smart-snippet\":\"Potential answer to your question\",\"smart-snippet-feedback-details\":\"Details\",\"smart-snippet-feedback-explain-why\":\"Explain why\",\"smart-snippet-feedback-inquiry\":\"Was this information useful?\",\"smart-snippet-feedback-reason-does-not-answer\":\"This didn&apos;t answer my question at all\",\"smart-snippet-feedback-reason-other\":\"Other\",\"smart-snippet-feedback-reason-partially-answers\":\"This only partially answered my question\",\"smart-snippet-feedback-reason-was-not-a-question\":\"My request wasn&apos;t meant to be perceived as a question\",\"smart-snippet-feedback-select-reason\":\"Select the reason\",\"smart-snippet-feedback-send\":\"Send feedback\",\"smart-snippet-feedback-thanks\":\"Thank you for your feedback!\",\"smart-snippet-people-also-ask\":\"People also ask\",\"smart-snippet-source\":\"Source of the answer\",\"something-went-wrong\":\"Something went wrong.\",\"sort\":\"Sort\",\"sort-and-filter\":\"Sort & Filter\",\"sort-by\":\"Sort by\",\"source\":\"Source\",\"stars\":\"one star out of {{max}}\",\"stars-only\":\"only {{count}} stars out of {{count}}\",\"stars-range\":\"{{value}} out of {{count}} stars & up\",\"stars_plural\":\"{{count}} stars out of {{max}}\",\"start\":\"Start\",\"tab-search\":\"Search for values in the {{label}} tab.\",\"to\":\"{{- start}} to {{- end}}\",\"try-using-fewer-keywords\":\"Try using fewer, different or more general keywords.\",\"under\":\"{{child}} under {{parent}}\",\"view-results\":\"View results\",\"with-colon\":\"{{text}}:\",\"yes\":\"Yes\"}","campaign":{"id":"Global_searchbar","name":"Global_searchbar","creative":"before_search_bar","position":"middle"},"id":"nb-search-bar-54ceb264-6631-e24a-61a1-45c766b54135","data-wc-order":"0"}'
        />
      </div>
      <div className="vertuo_tag_popin" id="popin_vnext_only">
        <div className="bg" />
        <div className="popin">
          <div className="popinclose">×</div>
          <svg
            className="vertuo_only_tag vnext_only"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <defs>
              <clipPath id="a" clipPathUnits="userSpaceOnUse">
                <path d="M0 100h100V0H0Z" />
              </clipPath>
              <clipPath id="b" clipPathUnits="userSpaceOnUse">
                <path d="M0 100h100V0H0Z" />
              </clipPath>
            </defs>
            <g
              style={{ lineHeight: "1.25", whiteSpace: "pre" }}
              textAnchor="middle"
            >
              <path
                fill="#666"
                d="m1531.1 393.7 3-3 .8.7-1.9 2 1.1 1.1 1.4-1.4.9.8-1.4 1.5 1.3 1.1 2-2.1.8.8-3 3.2zm9.5-4.4-3.9-1.2 1.4-1.1 2.6 1-.2-2.8 1.3-1 .2 4 4 1.4-1.3 1-2.7-1 .2 3-1.4 1zm10.3-2.3q-1 .6-2 .6-.9 0-1.6-.6-.8-.5-1.2-1.4-.5-1-.5-1.8 0-1 .6-1.7.5-.8 1.4-1.3l1-.4h1l.6 1.2h-1l-.9.3q-.6.3-.9.8-.3.5-.3 1 0 .6.3 1.2t.8 1l1 .2q.6 0 1.2-.3.5-.2.8-.6l.6-.7.7 1.3-.6.6-1 .7zm2.4-8.5 1.4-.5 1.7 5.4 2.9-.9.3 1.2-4.2 1.3zm11.5 4.3q-1.4.2-2.2-.4-.8-.5-1-2l-.5-4 1.4-.3.5 3.8.3 1q.1.3.4.5.3.2.9.2.5-.1.8-.4l.3-.7v-1l-.6-3.7 1.4-.2.6 4q.2 1.5-.4 2.3-.6.7-2 1zm7.4-.4q-1 0-1.9-.5v-1.4l.9.5 1 .2q.4 0 .7-.2.2-.2.2-.5l-.2-.6-.8-.4-.8-.5q-.4-.3-.6-.7-.2-.4-.2-1 0-1 .6-1.4.6-.6 1.7-.5h1l.6.3v1.4l-.8-.3-.7-.2q-.5 0-.7.2-.2.1-.2.5 0 .3.2.5l.8.5.8.5q.4.2.6.6.2.4.2 1 0 1-.7 1.5-.6.5-1.7.5zm6.1-6.4 1.5.2-1 6.7-1.5-.2zm4.9.8 1.6.4.4 4.4 3-3.3 1.4.4-5.2 5.7zm9.8 3.4 3.8 2-.5 1-2.5-1.3-.7 1.4 1.7 1-.5 1-1.8-.9-.7 1.5 2.6 1.3-.6 1.1-3.9-2zm7 4 1.3.8-3.3 4.6 2.5 1.8-.7 1-3.7-2.6zm4.4 8.8 1.2-4.7 1.1 1.1-.8 3.2 3.1-1 1.1 1.2-4.6 1.2-2 2-1-1.1z"
                transform="matrix(.189 0 0 .189 -286.9 -71)"
              />
            </g>
            <g
              style={{ lineHeight: 56, whiteSpace: "pre" }}
              textAnchor="middle"
            >
              <path
                d="m1527 423-5.5-.3v-2l9.8.6v.2l-6 5.7 5.5.4-.2 2-9.7-.7v-.1zm4 10.2 1.2 5.8-1.6.4-.8-3.9-2.1.5.5 2.7-1.6.3-.6-2.7-2.3.5.8 4-1.6.3-1.2-6zm1.5 8.3 1.1 2-3.7 4.5 6-.3.1.2-3.5 4.8 5.9-.5 1 1.9-10.6.8-.1-.1 3.6-5-6.2.3v-.1zm10.7 28.2q-1.4-1-2-2.1-.5-1.2-.3-2.5.2-1.2 1-2.3.9-1.2 2-1.8 1.2-.5 2.4-.4 1.3.1 2.5 1 1 .6 1.5 1.3l.6 1-1.1 1.7q-.2-.6-.7-1.2-.5-.7-1.2-1.2t-1.5-.6q-.7-.1-1.5.2-.7.4-1.2 1.2-.6.8-.7 1.6-.1.7.2 1.4.4.7 1 1.2.9.6 1.7.5.8 0 1.4-.9l-2-1.5.8-1.3 3.8 2.6-.2.4q-1.3 1.8-3 2.5-1.5.6-3.5-.8zm12-4.3 5.6 2-.5 1.5-3.7-1.3-.8 2 2.6 1-.5 1.6-2.6-1-.8 2.3 3.8 1.4-.5 1.6-5.8-2zm10.5 7-.4 5.5-2-.1.8-9.8h.1l5.7 6.2.4-5.5 2 .2-.8 9.7h-.1zm10.3-3.9 5.8-1 .3 1.6-3.8.7.4 2.1 2.7-.4.3 1.6-2.7.5.4 2.3 4-.7.3 1.7-6 1zm20 3.5-2.3 1-3.2-2-.9.3 1.4 3-1.9.9-4-8.8 2.7-1.2q1.6-.7 3-.6 1.2.2 2 1.8.4 1 .3 2-.2.8-.8 1.4zm-6.5-2.4q1-.4 1.4-1 .3-.5 0-1.3-.4-.8-1-.8-.7 0-1.6.3l-.6.3 1.2 2.8zm7.7-10.3.2-.1 9.5 4.8-1.7 1.4-1.4-.8-2.7 2.2.4 1.5-1.7 1.3zm5.1 4.4-2.5-1.3.8 2.8zm2.1-9.1-1.6 2.1-1.3-1 4.4-5.8 1.3 1-1.6 2.1 6.3 4.9-1.2 1.6zm3.2-7.9.9-1.8 8.6 4.1-.9 1.9zm13.1-7.7q-.4 1.4-1.2 2.4-.9 1-2.1 1.3-1.2.3-2.6 0-1.5-.3-2.4-1.1-1-.9-1.3-2.2-.4-1.2 0-2.7.2-1.4 1-2.4 1-1 2.2-1.3 1.2-.3 2.6 0 1.4.3 2.4 1.2 1 .8 1.3 2 .4 1.3 0 2.8zm-1.8-.5V437q-.3-.7-1-1.2-.5-.5-1.4-.7-1-.3-1.7 0-.8.2-1.3.8-.5.5-.7 1.3-.2.8 0 1.5.3.7.9 1.2.6.6 1.5.8 1 .2 1.7 0 .8-.3 1.3-.8.5-.6.7-1.4zm-2.7-11.8 5.5-.4.2 2-9.7.7v-.1l5.1-6.6-5.5.4-.1-2 9.7-.7v.2z"
                transform="matrix(.189 0 0 .189 -286.9 -71)"
              />
            </g>
            <path fill="none" d="M0 0h20v20H0z" opacity=".6" />
            <g
              fill="none"
              fillOpacity={0}
              stroke="#000"
              strokeLinejoin="bevel"
              strokeWidth="1.2"
              clipPath="url(#a)"
              transform="matrix(.209 0 0 -.209 -5 21.9)"
            >
              <path d="M68.5 38H50v3h18.5zm-8 18H58v2.5h2.5zm-.2 14h-2v2h2z" />
              <path d="M63 74h-7.5l-5.8-3.3v-6.5h19v6.5zm-13.3-4h19m.1-7.9h-19v-3.6h19Zm-19.1-3.6a5.2 5.2 0 0 0 2.6-4.6v-13h14v13c0 2 1 3.8 2.5 4.6Z" />
            </g>
            <g
              fill="none"
              fillOpacity={0}
              stroke="#000"
              strokeLinejoin="bevel"
              strokeWidth="1.2"
              clipPath="url(#b)"
              transform="matrix(.209 0 0 -.209 0 20)"
            >
              <path d="M68.5 28.7H50v3h18.5zm-8 27.3H58v2.5h2.5zm-.2 14h-2v2h2z" />
              <path d="M63 74h-7.5l-5.8-3.3v-6.5h19v6.5zm-13.3-4h19m.1-7.9h-19v-3.6h19Zm-19.1-3.6a5.2 5.2 0 0 0 2.6-4.6V31.8h14v22c0 2.2 1 4 2.5 4.7Z" />
            </g>
          </svg>{" "}
          Only compatible with Vertuo Next Generation machines (
          <strong>Vertuo Next</strong>,<strong>Vertuo Creatista</strong> &amp;{" "}
          <strong>Vertuo Lattissima</strong>).
          <br />
          Excludes <strong>Vertuo Plus</strong> &amp;{" "}
          <strong>Vertuo Pop</strong> machines.{" "}
        </div>
      </div>
      <div className="vertuo_tag_popin" id="popin_vgen_only">
        <div className="bg" />
        <div className="popin">
          <div className="popinclose">×</div>
          <svg
            className="vertuo_only_tag vgen_only"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <defs>
              <clipPath id="a" clipPathUnits="userSpaceOnUse">
                <path d="M0 100h100V0H0Z" />
              </clipPath>
              <clipPath id="b" clipPathUnits="userSpaceOnUse">
                <path d="M0 100h100V0H0Z" />
              </clipPath>
            </defs>
            <g
              style={{ lineHeight: "1.25", whiteSpace: "pre" }}
              textAnchor="middle"
            >
              <path
                fill="#666"
                d="m1531.1 393.7 3-3 .8.7-1.9 2 1.1 1.1 1.4-1.4.9.8-1.4 1.5 1.3 1.1 2-2.1.8.8-3 3.2zm9.5-4.4-3.9-1.2 1.4-1.1 2.6 1-.2-2.8 1.3-1 .2 4 4 1.4-1.3 1-2.7-1 .2 3-1.4 1zm10.3-2.3q-1 .6-2 .6-.9 0-1.6-.6-.8-.5-1.2-1.4-.5-1-.5-1.8 0-1 .6-1.7.5-.8 1.4-1.3l1-.4h1l.6 1.2h-1l-.9.3q-.6.3-.9.8-.3.5-.3 1 0 .6.3 1.2t.8 1l1 .2q.6 0 1.2-.3.5-.2.8-.6l.6-.7.7 1.3-.6.6-1 .7zm2.4-8.5 1.4-.5 1.7 5.4 2.9-.9.3 1.2-4.2 1.3zm11.5 4.3q-1.4.2-2.2-.4-.8-.5-1-2l-.5-4 1.4-.3.5 3.8.3 1q.1.3.4.5.3.2.9.2.5-.1.8-.4l.3-.7v-1l-.6-3.7 1.4-.2.6 4q.2 1.5-.4 2.3-.6.7-2 1zm7.4-.4q-1 0-1.9-.5v-1.4l.9.5 1 .2q.4 0 .7-.2.2-.2.2-.5l-.2-.6-.8-.4-.8-.5q-.4-.3-.6-.7-.2-.4-.2-1 0-1 .6-1.4.6-.6 1.7-.5h1l.6.3v1.4l-.8-.3-.7-.2q-.5 0-.7.2-.2.1-.2.5 0 .3.2.5l.8.5.8.5q.4.2.6.6.2.4.2 1 0 1-.7 1.5-.6.5-1.7.5zm6.1-6.4 1.5.2-1 6.7-1.5-.2zm4.9.8 1.6.4.4 4.4 3-3.3 1.4.4-5.2 5.7zm9.8 3.4 3.8 2-.5 1-2.5-1.3-.7 1.4 1.7 1-.5 1-1.8-.9-.7 1.5 2.6 1.3-.6 1.1-3.9-2zm7 4 1.3.8-3.3 4.6 2.5 1.8-.7 1-3.7-2.6zm4.4 8.8 1.2-4.7 1.1 1.1-.8 3.2 3.1-1 1.1 1.2-4.6 1.2-2 2-1-1.1z"
                transform="matrix(.189 0 0 .189 -286.9 -71)"
              />
            </g>
            <g
              style={{ lineHeight: 56, whiteSpace: "pre" }}
              textAnchor="middle"
            >
              <path
                d="m1527 423-5.5-.3v-2l9.8.6v.2l-6 5.7 5.5.4-.2 2-9.7-.7v-.1zm4 10.2 1.2 5.8-1.6.4-.8-3.9-2.1.5.5 2.7-1.6.3-.6-2.7-2.3.5.8 4-1.6.3-1.2-6zm1.5 8.3 1.1 2-3.7 4.5 6-.3.1.2-3.5 4.8 5.9-.5 1 1.9-10.6.8-.1-.1 3.6-5-6.2.3v-.1zm10.7 28.2q-1.4-1-2-2.1-.5-1.2-.3-2.5.2-1.2 1-2.3.9-1.2 2-1.8 1.2-.5 2.4-.4 1.3.1 2.5 1 1 .6 1.5 1.3l.6 1-1.1 1.7q-.2-.6-.7-1.2-.5-.7-1.2-1.2t-1.5-.6q-.7-.1-1.5.2-.7.4-1.2 1.2-.6.8-.7 1.6-.1.7.2 1.4.4.7 1 1.2.9.6 1.7.5.8 0 1.4-.9l-2-1.5.8-1.3 3.8 2.6-.2.4q-1.3 1.8-3 2.5-1.5.6-3.5-.8zm12-4.3 5.6 2-.5 1.5-3.7-1.3-.8 2 2.6 1-.5 1.6-2.6-1-.8 2.3 3.8 1.4-.5 1.6-5.8-2zm10.5 7-.4 5.5-2-.1.8-9.8h.1l5.7 6.2.4-5.5 2 .2-.8 9.7h-.1zm10.3-3.9 5.8-1 .3 1.6-3.8.7.4 2.1 2.7-.4.3 1.6-2.7.5.4 2.3 4-.7.3 1.7-6 1zm20 3.5-2.3 1-3.2-2-.9.3 1.4 3-1.9.9-4-8.8 2.7-1.2q1.6-.7 3-.6 1.2.2 2 1.8.4 1 .3 2-.2.8-.8 1.4zm-6.5-2.4q1-.4 1.4-1 .3-.5 0-1.3-.4-.8-1-.8-.7 0-1.6.3l-.6.3 1.2 2.8zm7.7-10.3.2-.1 9.5 4.8-1.7 1.4-1.4-.8-2.7 2.2.4 1.5-1.7 1.3zm5.1 4.4-2.5-1.3.8 2.8zm2.1-9.1-1.6 2.1-1.3-1 4.4-5.8 1.3 1-1.6 2.1 6.3 4.9-1.2 1.6zm3.2-7.9.9-1.8 8.6 4.1-.9 1.9zm13.1-7.7q-.4 1.4-1.2 2.4-.9 1-2.1 1.3-1.2.3-2.6 0-1.5-.3-2.4-1.1-1-.9-1.3-2.2-.4-1.2 0-2.7.2-1.4 1-2.4 1-1 2.2-1.3 1.2-.3 2.6 0 1.4.3 2.4 1.2 1 .8 1.3 2 .4 1.3 0 2.8zm-1.8-.5V437q-.3-.7-1-1.2-.5-.5-1.4-.7-1-.3-1.7 0-.8.2-1.3.8-.5.5-.7 1.3-.2.8 0 1.5.3.7.9 1.2.6.6 1.5.8 1 .2 1.7 0 .8-.3 1.3-.8.5-.6.7-1.4zm-2.7-11.8 5.5-.4.2 2-9.7.7v-.1l5.1-6.6-5.5.4-.1-2 9.7-.7v.2z"
                transform="matrix(.189 0 0 .189 -286.9 -71)"
              />
            </g>
            <path fill="none" d="M0 0h20v20H0z" opacity=".6" />
            <g
              fill="none"
              fillOpacity={0}
              stroke="#000"
              strokeLinejoin="bevel"
              strokeWidth="1.2"
              clipPath="url(#a)"
              transform="matrix(.209 0 0 -.209 -5 21.9)"
            >
              <path d="M68.5 38H50v3h18.5zm-8 18H58v2.5h2.5zm-.2 14h-2v2h2z" />
              <path d="M63 74h-7.5l-5.8-3.3v-6.5h19v6.5zm-13.3-4h19m.1-7.9h-19v-3.6h19Zm-19.1-3.6a5.2 5.2 0 0 0 2.6-4.6v-13h14v13c0 2 1 3.8 2.5 4.6Z" />
            </g>
            <g
              fill="none"
              fillOpacity={0}
              stroke="#000"
              strokeLinejoin="bevel"
              strokeWidth="1.2"
              clipPath="url(#b)"
              transform="matrix(.209 0 0 -.209 0 20)"
            >
              <path d="M68.5 28.7H50v3h18.5zm-8 27.3H58v2.5h2.5zm-.2 14h-2v2h2z" />
              <path d="M63 74h-7.5l-5.8-3.3v-6.5h19v6.5zm-13.3-4h19m.1-7.9h-19v-3.6h19Zm-19.1-3.6a5.2 5.2 0 0 0 2.6-4.6V31.8h14v22c0 2.2 1 4 2.5 4.7Z" />
            </g>
          </svg>{" "}
          Only compatible with Vertuo Next Generation machines (
          <strong>Vertuo Next</strong>, <strong>Vertuo Pop</strong>,{" "}
          <strong>Vertuo Creatista</strong> &amp;{" "}
          <strong>Vertuo Lattissima</strong>
          ).
          <br />
          Excludes <strong>Vertuo Plus</strong> machines.{" "}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
