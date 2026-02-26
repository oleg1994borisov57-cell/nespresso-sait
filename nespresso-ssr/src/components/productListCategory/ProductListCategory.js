import ProductListItem from "../productListItem/ProductListItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import Spinner from "../spinner/Spinner";
import CoffeeService from "../../services/CoffeeService";
import { removeCategory } from "../../redux/slices/productListSlice";
import { replaceSpacesWithUnderscore } from "../../utils/replaceSpacesWithUnderscore";
import Image from "next/image";
import { memo } from "react";
import isEqual from "lodash.isequal";
import { sendEcommerceData } from "../../utils/metriks";

const { getProducts } = new CoffeeService();

const ProductListCategory = ({
  id,
  bg,
  title,
  subtitle,
  descr,
  preloadedProducts,
  disableCartCountView,
  categoryPosition,
}) => {
  const [products, setProducts] = useState(preloadedProducts ?? []);
  const [status, setStatus] = useState("idle");

  const dispatch = useDispatch();

  const filters = useSelector((state) => state.shopFilter.filters);

  useEffect(() => {
    if (products.length) {
      sendEcommerceData(
        "impressions",
        products.map(({ product_id, title, price }) => {
          return { id: product_id, name: title, price };
        })
      );
    }
  }, []);

  useEffect(() => {
    if (preloadedProducts) {
      setProducts(preloadedProducts);
      return;
    }

    const filtersData = {};

    filters.forEach(({ name, activeFilterId }) => {
      filtersData[name] = activeFilterId;
    });

    setStatus("loading");
    getProducts(id, filtersData)
      .then((data) => {
        if (data.length === 0) {
          dispatch(removeCategory(id));
        }
        setProducts(data);
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
    // eslint-disable-next-line
  }, [filters]);

  const items = useMemo(() => {
    if (products.length >= 1) {
      return products.map(({ product_id, page, ...values }) => {
        return (
          <ProductListItem
            key={product_id}
            page={page}
            product={{ ...values, id: product_id, disableCartCountView }}
          />
        );
      });
    }

    return null;
  }, [products, disableCartCountView]);
  const loading = status === "loading" ? <Spinner /> : null;

  return (
    <div className="range product_range top_40 blur skuready">
      <div className="range_id" id={replaceSpacesWithUnderscore(title)} />{" "}
      <Image
        priority={categoryPosition === 0}
        className="bg lazyload"
        width={800}
        height={288}
        src={bg}
        alt={title}
      />
      <p className="h1 font-normal ptop_20">{title}</p>
      <h2 className="h3 font-bold top_20">{subtitle}</h2>
      <p className="p3 top_20">{descr}</p>
      <div className="articles">
        {items}
        {loading}
      </div>
    </div>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (!isEqual(prevProps.disableCartCountView, nextProps.disableCartCountView))
    return false;

  let result = isEqual(
    prevProps.preloadedProducts,
    nextProps.preloadedProducts
  );

  return result;
};

export default memo(ProductListCategory, areEqual);
