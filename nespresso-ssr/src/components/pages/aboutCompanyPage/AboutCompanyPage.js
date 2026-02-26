import { Container } from "react-bootstrap";

import AboutContent from "./components/aboutContent/AboutContent";
import AboutMenu from "./components/aboutMenu/AboutMenu";

import { AboutCompanySection, AboutCompanyWrapper } from "./styles";

const AboutCompanyPage = ({
  sections,
  singleSectionContent: { body: content, title },
}) => {
  return (
    <AboutCompanySection>
      <Container
        style={{
          position: "relative",
        }}
        className="ResponsiveContainer"
      >
        <AboutCompanyWrapper>
          <AboutMenu sections={sections} title={title} />
          <AboutContent content={content}></AboutContent>
        </AboutCompanyWrapper>
      </Container>
    </AboutCompanySection>
  );
};

export default AboutCompanyPage;
