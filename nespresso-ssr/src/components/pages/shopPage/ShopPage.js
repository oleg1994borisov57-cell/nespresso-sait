import { useSelector } from "react-redux";
import ProductList from "../../productsList/ProductsList";
import ShopFilters from "../../shopFilters/ShopFilters";
import ShopNav from "../../shopNav/ShopNav";
import ShortLinkList from "../../shortLinkList/ShortLinkList";

import UpButton from "../../upButton/UpButton";
import ProductsPageLayout from "../../productsPageLayout/ProductsPageLayout";

const ShopPage = ({ page, categories }) => {
  const view = useSelector((state) => state.shopFilter.view);

  return (
    <ProductsPageLayout>
      <div
        id="enriched_plp"
        className={`original grid ready_img ready_caps sticky ${view}`}
      >
        <ShopNav
          title={`КОФЕ КАПСУЛЫ NESPRESSO ${page}`}
          reduxSliceName="productList"
          currPage={page}
        />
        <ShopFilters page={page} preloadedCategories={categories} />
        <ShortLinkList preloadedCategories={categories} />
        <ProductList preloadedCategories={categories} />
        <UpButton />
      </div>
    </ProductsPageLayout>
  );
};

export default ShopPage;
