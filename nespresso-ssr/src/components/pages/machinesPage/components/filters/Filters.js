import View from "../view/View";
import {
  FiltersSection,
  FiltersWrapper,
  StyledButton,
  StyledContainer,
  StyledInput,
} from "./styles";

import TuneIcon from "@mui/icons-material/Tune";

export default function Filters() {
  return (
    <FiltersSection>
      <StyledContainer>
        <FiltersWrapper>
          <StyledButton>
            Фильтр <TuneIcon sx={{ ml: "4px" }} />
          </StyledButton>
          <StyledInput placeholder="Введите название продукта" />
          <View />
        </FiltersWrapper>
      </StyledContainer>
    </FiltersSection>
  );
}
