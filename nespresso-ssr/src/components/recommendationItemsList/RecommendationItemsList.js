import RecommendationItem from "../recommendationItem/RecommendationItem";
import { List, Title } from "./styles";

export default function RecommendationItemsList({ items, productPageName }) {
  const recItems = items.map(({ id, page, ...props }) => (
    <RecommendationItem
      key={id}
      id={id}
      href={`/${productPageName}/${id}`}
      page={page}
      {...props}
    />
  ));

  return (
    <div className="ProductDetailsReferenceOrder">
      <div className="ResponsiveContainer">
        <Title component="div">Рекомендации</Title>
        <List>{recItems}</List>
      </div>
    </div>
  );
}
