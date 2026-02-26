import {
  Container,
  HeaderSection,
  InfoWrapper,
  ProductName,
  Wrapper,
} from "./styles";
import Slider from "../slider/Slider";
import InfoOptions from "../infoOptions/InfoOptions";
import Colors from "../colors/Colors";
import { useTheme } from "@mui/material";
import BackLinks from "../../../../backLinks/BackLinks";

export default function InfoMachineSection({
  variants,
  currId,
  product,
  breadcrumbs,
}) {
  const { title, images, key_features, alt_tag } = product ?? {};

  const theme = useTheme();

  return (
    <>
      {product ? (
        <HeaderSection>
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
                left: "5px",
              },
            }}
          />
          <Container className="ResponsiveContainer">
            <Wrapper>
              <Slider title={alt_tag ?? title} images={images} />
            </Wrapper>
            <Wrapper>
              <InfoWrapper>
                <ProductName component={"h1"} itemProp="name">
                  {title}
                </ProductName>
                <InfoOptions options={key_features} />
                <Colors colors={variants} activeColor={currId} />
              </InfoWrapper>
            </Wrapper>
          </Container>
        </HeaderSection>
      ) : null}
    </>
  );
}
