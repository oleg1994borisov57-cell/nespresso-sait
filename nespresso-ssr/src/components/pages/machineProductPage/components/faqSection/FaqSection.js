import { Container } from "react-bootstrap";
import { H1TextStyle } from "../../../../typography/styles";
import FaqItem from "../faqItem/FaqItem";
import { FaqItemsWrapper, FaqSectionWrapper } from "./styles";
import faqItems from "./faqItems";

export default function FaqSection() {
  const items = faqItems.map(({ ...values }, i) => {
    return <FaqItem {...values} key={i} />;
  });

  return (
    <FaqSectionWrapper id="faq">
      <Container className="ResponsiveContainer">
        <H1TextStyle component="h2">FAQ</H1TextStyle>
        <FaqItemsWrapper>{items}</FaqItemsWrapper>
      </Container>
    </FaqSectionWrapper>
  );
}
