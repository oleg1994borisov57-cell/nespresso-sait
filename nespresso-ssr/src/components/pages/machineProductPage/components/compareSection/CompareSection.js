import bg from "../../../../../resources/img/coffeeMachinePage/compare-bg.png";

import CompareTable from "../compareTable/CompareTable";
import {
  CompareBg,
  ComparePaper,
  ComparePaperBg,
  ComparePaperTitle,
  CompareWrapper,
  Strong,
} from "./styles";

export default function CompareSection({ product }) {
  return (
    <CompareWrapper id="compare">
      <CompareBg src={bg.src} alt="Nespresso range - CitiZ Platinum C Titan" />
      <ComparePaper>
        <ComparePaperBg />
        <ComparePaperTitle component={"h2"}>
          СРАВНИТЕ КОФЕМАШИНУ С ДРУГИМИ <Strong>NESPRESSO</Strong> КОФЕМАШИНАМИ
        </ComparePaperTitle>
        <CompareTable product={product} />
      </ComparePaper>
    </CompareWrapper>
  );
}
