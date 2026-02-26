import { Container } from "react-bootstrap";
import {
  AboutDescription,
  AboutDescriptionWrapper,
  AboutMenu,
  AboutSectionWrapper,
  AboutTitle,
  MenuLink,
  MenuLinksWrapper,
} from "./styles";
import replaceSpacesWithBr from "../../../../../utils/replaceSpacesWithBr";
import menuLinks from "./menuLinks";

export default function AboutSection({ product }) {
  const { descr, descr_title } = product ?? {};

  const replacedWithBrDescr = replaceSpacesWithBr(descr);

  const items = menuLinks.map(({ title, elementId }) => {
    return (
      <MenuLink
        scrollOptions={{ block: "nearest" }}
        key={elementId}
        selector={elementId}
      >
        {title}
      </MenuLink>
    );
  });

  return (
    <AboutSectionWrapper>
      <AboutMenu>
        <Container
          className="ResponsiveContainer"
          style={{ marginBottom: "0px" }}
        >
          <MenuLinksWrapper>{items}</MenuLinksWrapper>
        </Container>
      </AboutMenu>
      <Container className="ResponsiveContainer">
        <AboutTitle component={"h2"}>{descr_title}</AboutTitle>
        <AboutDescriptionWrapper>
          <AboutDescription
            dangerouslySetInnerHTML={{ __html: replacedWithBrDescr }}
          />
          <AboutDescription
            style={{
              marginTop: "30px",
            }}
          >
            PRICE INCL. VAT.
          </AboutDescription>
        </AboutDescriptionWrapper>
      </Container>
    </AboutSectionWrapper>
  );
}
