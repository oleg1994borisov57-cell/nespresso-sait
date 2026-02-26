// import { Box } from "@mui/material";
// import {
//   BuyWrapper,
//   Price,
//   Product,
//   ProductImg,
//   ProductImgWrapper,
//   ProductName,
//   StyledLink,
//   Title,
// } from "./styles";
// import AddButton from "../../../../addButton/AddButton";
import BasicProductCard from "../../../../productCards/basicProductCard/BasicProductCard";

export default function ExclusiveProduct({ product }) {
  const {
    id,
    img,
    title,
    price,
    alt_tag,
    old_price,
    availability,
    badge_color,
    badge,
  } = product;
  return (
    <BasicProductCard
      id={id}
      img={img}
      title={title}
      price={price}
      alt_tag={alt_tag}
      old_price={old_price}
      availability={availability}
      page={"exclusive"}
      cartName={"exclusive"}
      badgeText={badge}
      badgeColor={badge_color}
    />
    // <Product>
    //   <StyledLink href={`/exclusive/${id}`}>
    //     <ProductImgWrapper>
    //       <ProductImg
    //         src={img}
    //         alt={alt_tag ?? title}
    //         width="120"
    //         height="120"
    //       />
    //     </ProductImgWrapper>

    //     <Box
    //       className="top_10"
    //       sx={{
    //         ".list &": {
    //           width: "calc(100% - 190px) !important",
    //           marginRight: "-40px !important",
    //           padding: "10px 10px 0px 10px !important",
    //           display: "flex !important",
    //           flexDirection: "column !important",
    //           justifyContent: "flex-start !important",
    //           marginBottom: "30px !important",
    //         },
    //       }}
    //     >
    //       <ProductName>
    //         <Title itemProp="name">{title}</Title>
    //       </ProductName>
    //     </Box>

    //     <BuyWrapper itemProp="offers" itemType="https://schema.org/Offer">
    //       <Price color={old_price ? "red" : null}>
    //         {old_price ? (
    //           <span className="oldPrice">{old_price} Р.</span>
    //         ) : null}
    //         {price} Р.
    //       </Price>
    //       <Box
    //         style={{
    //           position: "relative",
    //         }}
    //       >
    //         <AddButton
    //           outOfStock={!availability}
    //           id={id}
    //           img={img}
    //           title={title}
    //           price={price}
    //           count={1}
    //           cartPageName={"exclusive"}
    //           page={"exclusive"}
    //         />
    //       </Box>
    //     </BuyWrapper>
    //   </StyledLink>
    // </Product>
  );
}
