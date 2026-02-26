import { Box } from "@mui/material";
import { BuyWrapper, Divider, Text } from "./styles";
import AddButtonLarge from "../../../../addButtonLarge/AddButtonLarge";
import formatPrice from "../../../../../utils/formatPrice";

export default function BuySection({ product }) {
  const {
    title,
    price,
    page,
    product_id,
    preview_image,
    color_name,
    old_price,
    availability,
  } = product ?? {};

  return (
    <>
      {product ? (
        <BuyWrapper>
          <Box>
            <Text>{title}</Text>
          </Box>
          <Divider />
          <Box
            sx={{
              flexDirection: "row !important",
              alignItems: "center",
              justifyContent: "center !important",
              gap: "10px",
            }}
          >
            {old_price ? (
              <Text component={"h2"} className="price oldPrice">
                {formatPrice(old_price)}
              </Text>
            ) : null}
            <Text
              sx={{
                color: old_price ? "red !important" : null,
              }}
              component={"h2"}
              className="price"
            >
              {formatPrice(price)}
            </Text>
          </Box>
          <Divider />
          <Box>
            <Box
              sx={{
                position: "relative",
              }}
            >
              <AddButtonLarge
                outOfStock={!availability}
                title={title}
                img={preview_image}
                price={price}
                id={product_id}
                count={1}
                page={`${page.toLowerCase()}Machines`}
                cartPageName={`${page.toLowerCase()}Machines`}
                color={color_name}
              />
            </Box>
          </Box>
        </BuyWrapper>
      ) : null}
    </>
  );
}
