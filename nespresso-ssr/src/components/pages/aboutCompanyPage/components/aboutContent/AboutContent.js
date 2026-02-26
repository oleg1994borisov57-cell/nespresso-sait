import replaceSpacesWithBr from "../../../../../utils/replaceSpacesWithBr";
import { AboutContentWrapper } from "./styles";

const AboutContent = ({ content }) => {
  return (
    <AboutContentWrapper
      component="div"
      dangerouslySetInnerHTML={{ __html: replaceSpacesWithBr(content) }}
    ></AboutContentWrapper>
  );
};

export default AboutContent;
