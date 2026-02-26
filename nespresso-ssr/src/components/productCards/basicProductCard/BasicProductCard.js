import { Box } from "@mui/material";
import {
  BuyWrapper,
  Price,
  Product,
  ProductImg,
  ProductImgWrapper,
  ProductName,
  StyledLink,
  Title,
} from "./styles";
import AddButton from "../../addButton/AddButton";
import ProductBadge from "../../productBadge/ProductBadge";
import formatPrice from "../../../utils/formatPrice";

export default function BasicProductCard({
  id,
  img,
  title,
  price,
  alt_tag,
  old_price,
  availability,
  page,
  cartName,
  badgeText,
  badgeColor,
}) {
  return (
    <Product>
      {badgeText && badgeColor ? (
        <ProductBadge title={badgeText} hexColor={badgeColor} />
      ) : null}
      <StyledLink href={`/${page}/${id}`}>
        <ProductImgWrapper>
          <ProductImg
            src={img}
            alt={alt_tag ?? title}
            width="120"
            height="120"
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
              marginBottom: "30px !important",
            },
          }}
        >
          <ProductName>
            <Title itemProp="name">{title}</Title>
          </ProductName>
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
              outOfStock={!availability}
              id={id}
              img={img}
              title={title}
              price={price}
              count={1}
              cartPageName={cartName}
              page={cartName}
            />
          </Box>
        </BuyWrapper>
      </StyledLink>
    </Product>
  );
}
