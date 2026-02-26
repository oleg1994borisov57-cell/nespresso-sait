import { useMemo } from "react";

import Cups from "../../cups/Cups";
import Intencity from "../../intencity/Intencity";

import AddButton from "../../addButton/AddButton";
import Link from "next/link";
import Image from "next/image";
import ProductBadge from "../../productBadge/ProductBadge";
import formatPrice from "../../../utils/formatPrice";

const CapsuleProductCard = ({
  img,
  title,
  desc,
  price,
  old_price,
  count,
  infos,
  id,
  productType,
  page,
  alt_tag,
  disableCartCountView,
  availability,
  cartPageSubname,
  badgeText,
  badgeColor,
}) => {
  const infosTypes = useMemo(() => {
    return {
      cups: <Cups cupsizes={infos ? infos["cups"] : null} />,
      intencity: <Intencity count={infos ? infos["intensity"] : null} />,
    };
    // eslint-disable-next-line
  }, []);

  const cups = infos && infos.cups ? infosTypes.cups : null;
  const intencity = infos && infos.intensity ? infosTypes.intencity : null;

  const serverAddButton = disableCartCountView ? (
    <AddButton
      id={id}
      img={img}
      outOfStock={!availability}
      title={title}
      price={price}
      count={count}
      cartPageName={`${productType}${cartPageSubname}`}
      disableCartCountView={disableCartCountView}
      page={productType}
    />
  ) : null;

  const clientAddButton = !disableCartCountView ? (
    <AddButton
      id={id}
      img={img}
      outOfStock={!availability}
      title={title}
      price={price}
      count={count}
      cartPageName={`${productType}${cartPageSubname}`}
      page={productType}
    />
  ) : null;

  return (
    <article
      className="article coffee top_20 ProductListElement ProductListElement__capsule highlighted"
      itemType="http://schema.org/Product"
    >
      {badgeText && badgeColor ? (
        <ProductBadge title={badgeText} hexColor={badgeColor} />
      ) : null}

      <Link href={`/${page}/${id}`}>
        <meta itemProp="image" content={img} />
        <div className="product_img original">
          <Image
            className="img lazyload original"
            src={img}
            alt={alt_tag ?? title}
            width={120}
            height={50}
          />
        </div>
        <div className="description">
          <h3 itemProp="name" className="h3 top_10 ProductListElement__name">
            {title}
          </h3>
          <p itemProp="description" className="aromatic p4">
            {desc}
          </p>
          <div className="infos p5">
            {intencity}
            {cups}
          </div>
        </div>
        <div
          itemProp="offers"
          itemType="https://schema.org/Offer"
          className="offer"
        >
          <meta itemProp="priceCurrency" content="CHF" />
          <meta itemProp="price" className="pricedata" content={price} />
          <meta
            itemProp="availability"
            className="pricestock"
            content="InStock"
          />
          <div
            style={{ color: old_price ? "red" : null }}
            className="price product_price p4"
          >
            {old_price ? (
              <span className="product_old_price" itemProp="price">
                {formatPrice(old_price)}
              </span>
            ) : null}{" "}
            {formatPrice(price)}
          </div>
          <div className="add">
            <div className="addtobag AddToBagButton" id="add_to_bag_139062">
              <div
                className="add-to-bag"
                data-product-id={139062}
                data-button-size="small"
                data-initialized="true"
              >
                <div className="AddToBagButton__container">
                  {clientAddButton}
                  {serverAddButton}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default CapsuleProductCard;
