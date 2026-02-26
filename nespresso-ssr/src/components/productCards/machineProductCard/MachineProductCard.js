import { useCallback, useMemo, useState } from "react";

import { Box } from "@mui/material";
import {
  BuyWrapper,
  Description,
  Price,
  Product,
  ProductColors,
  ProductDescriptionWrapper,
  ProductImg,
  ProductImgWrapper,
  ProductName,
  StyledLink,
  Title,
} from "./styles";

import ColorsItems from "../../pages/machinesPage/components/colorsItems/ColorsItems";
import AddButton from "../../addButton/AddButton";
import ProductBadge from "../../productBadge/ProductBadge";
import formatPrice from "../../../utils/formatPrice";

export default function MachineProductCard({
  variants,
  pageLink,
  cartPageSubname,
}) {
  const [activeColor, setActiveColor] = useState(0);

  const {
    img,
    title,
    description,
    price,
    product_id,
    page,
    alt_tag,
    color_name,
    old_price,
    availability,
    badge_color: badgeColor,
    badge: badgeText,
  } = useMemo(() => {
    return variants[activeColor];
  }, [activeColor, variants]);

  const onColorClick = useCallback((e, index) => {
    e.preventDefault();
    setActiveColor(index);
  }, []);

  return (
    <Product>
      {badgeText && badgeColor ? (
        <ProductBadge title={badgeText} hexColor={badgeColor} />
      ) : null}
      <StyledLink href={`/${pageLink}/${product_id}`}>
        <ProductImgWrapper>
          <ProductImg
            src={img}
            alt={alt_tag ?? title}
            width={120}
            height={120}
          />
        </ProductImgWrapper>

        <Box
          className="top_10"
          sx={{
            ".list &": {
              width: "calc(100% - 190px) !important",
              marginRight: "-40px !important",
              padding: "10px 10px 0px 10px !important",
              display: "flex !important",
              flexDirection: "column !important",
              justifyContent: "flex-start !important",
              marginBottom: "50px !important",
            },
          }}
        >
          <ProductName>
            <Title itemProp="name">{title}</Title>
          </ProductName>

          <ProductDescriptionWrapper>
            <Description itemProp="description">{description}</Description>
          </ProductDescriptionWrapper>

          <ProductColors>
            <ColorsItems
              activeColor={activeColor}
              onColorClick={onColorClick}
              colors={variants}
            />
          </ProductColors>
        </Box>

        <BuyWrapper itemProp="offers" itemType="https://schema.org/Offer">
          <Price color={old_price ? "red" : null}>
            {old_price ? (
              <span className="oldPrice">{formatPrice(old_price)}</span>
            ) : null}
            {formatPrice(price)}
          </Price>
          <Box
            style={{
              position: "relative",
            }}
          >
            <AddButton
              id={product_id}
              img={img}
              outOfStock={!availability}
              title={title}
              price={price}
              color={color_name}
              count={1}
              cartPageName={`${page}${cartPageSubname}`}
              page={page}
            />
          </Box>
        </BuyWrapper>
      </StyledLink>
    </Product>
  );
}
