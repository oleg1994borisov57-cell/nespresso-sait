import { H1TextStyle } from "../../../../typography/styles";
import FeaturesItems from "../featuresItems/FeaturesItems";
import { Container, FeaturesImage, FeaturesSectionWrapper } from "./styles";

export default function FeaturesSection({ product }) {
  const { title, alt_tag, features } = product ?? {};
  return (
    <FeaturesSectionWrapper id="features">
      <Container className="ResponsiveContainer">
        <H1TextStyle component={"h2"}>Характеристики кофемашины</H1TextStyle>
        <FeaturesItems features={features.options} />
        <FeaturesImage
          alt={`${alt_tag ?? title} Dimensions`}
          src={features.img}
        />
      </Container>
    </FeaturesSectionWrapper>
  );
}
