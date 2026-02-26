import ExclusiveCategoriesList from "./components/exclusiveCategoriesList/ExclusiveCategoriesList";
import ProductsPageLayout from "../../productsPageLayout/ProductsPageLayout";

export default function ExclusivePage({ preloadedCategories }) {
  return (
    <ProductsPageLayout>
      <div
        id="enriched_plp"
        className={`original grid ready_img ready_caps sticky`}
      >
        <ExclusiveCategoriesList preloadedCategories={preloadedCategories} />
      </div>
    </ProductsPageLayout>
  );
}
