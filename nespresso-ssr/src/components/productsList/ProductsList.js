import ProductListCategory from "../productListCategory/ProductListCategory";
import { useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import Spinner from "../spinner/Spinner";
import Alert from "react-bootstrap/Alert";
import { useRouter } from "next/router";
import isDefaultFilters from "../../utils/isDefaultFilters";

const ProductList = ({ preloadedCategories }) => {
  const [isJSActive, setIsJSActive] = useState(false);

  useEffect(() => {
    setIsJSActive(true);
  }, []);

  const { categories, status } = useSelector((state) => state.productList);
  const { filters } = useSelector((state) => state.shopFilter);

  const router = useRouter();

  const clearParams = () => {
    router.replace(router.pathname, undefined, { shallow: true });
  };

  const loading = status === "loading" ? <Spinner /> : null;

  const serverItems = useMemo(() => {
    if (
      preloadedCategories &&
      !categories.length &&
      isDefaultFilters(filters)
    ) {
      return preloadedCategories.map((category, i) => {
        return (
          <ProductListCategory
            id={category.id}
            key={category.id}
            bg={category.bg}
            title={category.title}
            subtitle={category.subtitle}
            descr={category.desc}
            disableCartCountView
            categoryPosition={i}
            preloadedProducts={category.products}
          />
        );
      });
    } else if (status === "idle") {
      return categories.map((category, i) => {
        return (
          <ProductListCategory
            id={category.id}
            key={category.id}
            bg={category.bg}
            title={category.title}
            subtitle={category.subtitle}
            descr={category.desc}
            categoryPosition={i}
            preloadedProducts={category.products}
          />
        );
      });
    }

    return null;
  }, [categories, filters, status]);

  const noResults =
    serverItems &&
    serverItems.length === 0 &&
    isJSActive &&
    status === "idle" ? (
      <div id="enriched_noresults" className="p3 top_40">
        К сожалению, мы не смогли найти кофе, соответствующий вашему выбору.
        Пожалуйста, попробуйте удалить некоторые фильтры или{" "}
        <span className="reset_filters" onClick={clearParams}>
          сбросьте фильтры
        </span>
        .
      </div>
    ) : null;

  const error =
    status === "error" ? (
      <Alert
        style={{ width: 500, height: 100, margin: "10px auto" }}
        variant="danger"
      >
        Error
      </Alert>
    ) : null;

  return (
    <div id="plp-productlist" className="ProductList">
      {serverItems}
      {loading}
      {noResults}
      {error}
    </div>
  );
};

export default ProductList;
