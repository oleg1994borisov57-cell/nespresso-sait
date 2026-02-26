import {
  InfoItem,
  InfoItemsWrapper,
  ItemImg,
  ItemSubtitle,
  ItemTitle,
  SustainabilityInfoSubtitle,
  SustainabilityInfoTitle,
  SustainabilityInfoWrapper,
  SustainabilitySectionBgWrapper,
} from "./styles";
import sustainabilityItems from "./sustainabilityItems";

export default function SustainabilitySection() {
  const items = sustainabilityItems.map(({ title, descr, img }, i) => {
    return (
      <InfoItem component={"div"} key={i}>
        <ItemImg src={img} alt={title} />
        <ItemTitle component={"h3"}>{title}</ItemTitle>
        <ItemSubtitle component={"p"}>{descr}</ItemSubtitle>
      </InfoItem>
    );
  });

  return (
    <SustainabilitySectionBgWrapper id="sustainability">
      <SustainabilityInfoWrapper component={"div"}>
        <SustainabilityInfoTitle component={"h2"}>
          КАКОВО ВЛИЯНИЕ СИСТЕМЫ NESPRESSO ORIGINAL НА ВЫБРОСЫ УГЛЕКИСЛОГО ГАЗА?
        </SustainabilityInfoTitle>
        <SustainabilityInfoSubtitle component={"p"}>
          ПОЧЕМУ ЧАШКА ОРИГИНАЛЬНОГО КОФЕ NESPRESSO ПРОИЗВОДИТ МЕНЬШЕ ВЫБРОСОВ
          УГЛЕКИСЛОГО ГАЗА ПО СРАВНЕНИЮ С ЧАШКОЙ КОФЕ, ПРИГОТОВЛЕННОГО С ПОМОЩЬЮ
          АВТОМАТИЧЕСКОЙ КОФЕМАШИНЫ?
        </SustainabilityInfoSubtitle>
        <InfoItemsWrapper>{items}</InfoItemsWrapper>
      </SustainabilityInfoWrapper>
    </SustainabilitySectionBgWrapper>
  );
}
