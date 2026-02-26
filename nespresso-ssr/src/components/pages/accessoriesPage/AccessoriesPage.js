import AccessoriesCategoriesList from "./components/accessoriesCategoriesList/AccessoriesCategoriesList";
import ProductsPageLayout from "../../productsPageLayout/ProductsPageLayout";

export default function AccessoriesPage({ preloadedCategories }) {
  return (
    <ProductsPageLayout>
      <div
        id="enriched_plp"
        className={`original grid ready_img ready_caps sticky`}
      >
        <AccessoriesCategoriesList preloadedCategories={preloadedCategories} />
      </div>
    </ProductsPageLayout>
  );
}
