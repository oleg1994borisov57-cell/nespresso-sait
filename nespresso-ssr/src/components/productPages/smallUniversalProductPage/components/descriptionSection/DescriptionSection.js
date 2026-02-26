import replaceSpacesWithBr from "../../../../../utils/replaceSpacesWithBr";
import { Description, SectionWrapper } from "./styles";

export default function DescriptionSection({ description }) {
  return (
    <SectionWrapper>
      <div className="ResponsiveContainer">
        <Description
          dangerouslySetInnerHTML={{ __html: replaceSpacesWithBr(description) }}
        />
      </div>
    </SectionWrapper>
  );
}
