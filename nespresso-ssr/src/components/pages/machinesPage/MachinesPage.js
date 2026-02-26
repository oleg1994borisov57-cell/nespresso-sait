import ProductsPageLayout from "../../productsPageLayout/ProductsPageLayout";
import ShopNav from "../../shopNav/ShopNav";
import MachineCategoriesList from "./components/machineCategoriesList/MachineCategoriesList";

export default function MachinesPage({ page, preloadedCategories }) {
  return (
    <ProductsPageLayout>
      <div
        id="enriched_plp"
        className={`original grid ready_img ready_caps sticky`}
      >
        <ShopNav
          title="КОФЕ МАШИНЫ NESPRESSO"
          reduxSliceName="productsMachine"
          pageName="/machines"
          currPage={page}
        />
        <MachineCategoriesList
          preloadedCategories={preloadedCategories}
          page={page}
        />
      </div>
    </ProductsPageLayout>
  );
}
