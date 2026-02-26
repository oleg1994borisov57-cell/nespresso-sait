import { useEffect, useState } from "react";
import AddButton from "../addButton/AddButton";
import {
  ProductArticle,
  ProductBuyWrapper,
  ProductImg,
  ProductInformationWrapper,
  ProductLink,
  ProductName,
  ProductPrice,
  ProductWrapper,
} from "./styles";
import Image from "next/image";

const RecommendationItem = ({
  img,
  name,
  title,
  alt_tag,
  id,
  count,
  price,
  page,
  href,
  cartPageName,
}) => {
  const [isServerRender, setIsServerRender] = useState(true);

  useEffect(() => {
    setIsServerRender(false);
  }, []);

  const addButtonWithoutCount = isServerRender ? (
    <AddButton
      id={id}
      img={img}
      title={name}
      count={count}
      price={price}
      cartPageName={cartPageName}
      page={page}
      disableCartCountView
    />
  ) : null;

  const addButtonWithCount = !isServerRender ? (
    <AddButton
      id={id}
      img={img}
      title={name}
      count={count}
      price={price}
      cartPageName={cartPageName}
      page={page}
    />
  ) : null;

  return (
    <ProductWrapper>
      <ProductArticle>
        <ProductImg>
          <ProductLink href={`${href}`}>
            <Image
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100px", height: "auto" }}
              src={img}
              alt={alt_tag ?? name ?? title}
            />
          </ProductLink>
        </ProductImg>
        <ProductLink
          href={href}
          data-product-code="7188.20"
          data-product-item-id="7188.20"
          data-product-section="Recommendation"
          data-product-position={1}
        >
          <ProductName>{name ?? title}</ProductName>
        </ProductLink>
        <ProductInformationWrapper>
          <div className="ProductPush__details">
            <ProductPrice>Р. {price}</ProductPrice>
          </div>
          <ProductBuyWrapper>
            <div id="AddToBagButton__button-CremaComponentId-2">
              {addButtonWithoutCount}
              {addButtonWithCount}
            </div>
          </ProductBuyWrapper>
        </ProductInformationWrapper>
      </ProductArticle>
    </ProductWrapper>
  );
};

export default RecommendationItem;
