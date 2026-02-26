import {
  BuyButtonWrapper,
  Container,
  SectionWrapper,
  InfoWrapper,
  ProductName,
  ProductPrice,
  Wrapper,
} from "./styles";
import Slider from "../../../../pages/machineProductPage/components/slider/Slider";
import { Box, useTheme } from "@mui/material";
import AddButtonLarge from "../../../../addButtonLarge/AddButtonLarge";
import BackLinks from "../../../../backLinks/BackLinks";
import formatPrice from "../../../../../utils/formatPrice";

export default function HeaderSection({
  title,
  images,
  price,
  id,
  generalImg,
  count,
  altTag,
  availability,
  breadcrumbs,
  page,
  cartPageName,
}) {
  const theme = useTheme();

  return (
    <>
      <SectionWrapper>
        <BackLinks
          disableTextShadow
          color={"#000"}
          links={breadcrumbs}
          sx={{
            position: "absolute",
            left: "80px",
            top: "50px",
            [theme.breakpoints.down(996)]: {
              top: "-32px",
              left: "20px",
            },
          }}
        />
        <Container className="ResponsiveContainer">
          <Wrapper>
            <Slider title={altTag ?? title} images={images} />
          </Wrapper>
          <Wrapper>
            <InfoWrapper>
              <ProductName component={"h1"} itemProp="name">
                {title}
              </ProductName>
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    position: "relative",
                  }}
                >
                  <ProductPrice>{formatPrice(price)}</ProductPrice>
                </Box>
                <BuyButtonWrapper>
                  <AddButtonLarge
                    outOfStock={!availability}
                    title={title}
                    img={generalImg}
                    price={price}
                    id={id}
                    count={count}
                    page={page}
                    cartPageName={cartPageName}
                  />
                </BuyButtonWrapper>
              </Box>
            </InfoWrapper>
          </Wrapper>
        </Container>
      </SectionWrapper>
    </>
  );
}
