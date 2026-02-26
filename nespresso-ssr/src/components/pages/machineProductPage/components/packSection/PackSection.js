import { Container } from "react-bootstrap";
import { Description, PackImage, PackSectionWrapper } from "./styles";
import { H1TextStyle } from "../../../../typography/styles";

export default function PackSection({ product }) {
  const { packImg, title, alt_tag } = product ?? {};

  return (
    <PackSectionWrapper id="pack">
      <Container className="ResponsiveContainer">
        <H1TextStyle component={"h2"}>Что в упаковке?</H1TextStyle>
        <Description component={"p"}>
          Внутри пакета вы найдете элементы, изображенные на картинке ниже:
        </Description>
        <PackImage src={packImg} alt={`${alt_tag ?? title} - pack`} />
      </Container>
    </PackSectionWrapper>
  );
}
