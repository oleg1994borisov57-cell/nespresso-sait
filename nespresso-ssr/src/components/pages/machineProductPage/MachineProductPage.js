import { useEffect } from "react";
import { sendEcommerceData } from "../../../utils/metriks";
import AboutSection from "./components/aboutSection/AboutSection";
import BuySection from "./components/buySection/BuySection";
import CompareSection from "./components/compareSection/CompareSection";
import FaqSection from "./components/faqSection/FaqSection";
import FeaturesSection from "./components/featuresSection/FeaturesSection";
import InfoMachineSection from "./components/headerMachineSection/HeaderMachineSection";
import PackSection from "./components/packSection/PackSection";
import SustainabilitySection from "./components/sustainabilitySection/SustainabilitySection";
import VideoSection from "./components/videoSection/VideoSection";

import { ProductPageWrapper } from "./styles";

import { useRouter } from "next/router";

export default function MachineProductPage({
  variants,
  currProduct,
  breadcrumbs,
}) {
  const {
    query: { type: id },
  } = useRouter();

  const view =
    currProduct && variants ? (
      <View
        variants={variants}
        breadcrumbs={breadcrumbs}
        currProduct={currProduct}
        currId={id}
      />
    ) : null;

  return <>{view}</>;
}

const View = ({ variants, currId, currProduct, breadcrumbs }) => {
  const { title, price, id } = currProduct;

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
    <ProductPageWrapper>
      <InfoMachineSection
        currId={currId}
        product={currProduct}
        breadcrumbs={breadcrumbs}
        variants={variants}
      />
      <BuySection product={currProduct} />
      <AboutSection product={currProduct} />
      <FeaturesSection product={currProduct} />
      <CompareSection product={currProduct} />
      <PackSection product={currProduct} />
      <VideoSection product={currProduct} />
      <FaqSection />
      <SustainabilitySection />
    </ProductPageWrapper>
  );
};
