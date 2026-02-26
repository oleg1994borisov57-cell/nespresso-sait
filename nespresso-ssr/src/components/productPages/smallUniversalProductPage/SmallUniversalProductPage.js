import { useEffect } from "react";
import RecommendationItemsList from "../../recommendationItemsList/RecommendationItemsList";
import DescriptionSection from "./components/descriptionSection/DescriptionSection";
import HeaderSection from "./components/headerSection/HeaderSection";
import { ProductPageWrapper } from "./styles";
import { sendEcommerceData } from "../../../utils/metriks";

export default function SmallUniversalProductPage({
  product,
  page,
  cartPageName,
}) {
  const view = product ? (
    <View {...product} page={page} cartPageName={cartPageName} />
  ) : null;

  return <ProductPageWrapper>{view}</ProductPageWrapper>;
}

function View({
  title,
  price,
  images,
  img,
  description,
  recommendations,
  id,
  alt_tag,
  availability,
  breadcrumbs,
  page,
  cartPageName,
}) {
  const changedRecommendations = recommendations.map((item) => ({
    ...item,
    page,
    cartPageName,
  }));

  useEffect(() => {
    sendEcommerceData("detail", {
      products: [
        {
          id,
          name: title,
          price,
        },
      ],
    });
  }, []);

  return (
    <>
      <HeaderSection
        title={title}
        price={price}
        count={1}
        breadcrumbs={breadcrumbs}
        availability={availability}
        generalImg={img}
        page={page}
        cartPageName={cartPageName}
        altTag={alt_tag}
        id={id}
        images={images}
      />
      <DescriptionSection description={description} />
      <RecommendationItemsList
        productPageName={page}
        items={changedRecommendations}
      />
    </>
  );
}
