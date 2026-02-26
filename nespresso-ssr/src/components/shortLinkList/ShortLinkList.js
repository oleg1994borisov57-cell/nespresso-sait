import { useSelector } from "react-redux";
import ShortLinkItem from "../shortLinkItem/ShortLinkItem";
import { useMemo } from "react";
import isDefaultFilters from "../../utils/isDefaultFilters";

const ShortLinkList = ({ preloadedCategories }) => {
  const shortLinks = useSelector((state) => state.productList.categories);
  const { filters } = useSelector((state) => state.shopFilter);

  const items = useMemo(() => {
    if (shortLinks.length) {
      return shortLinks
        .filter((item, i) => item.shortlink_img && item.shortlink_bg && i <= 20)
        .map((item) => (
          <ShortLinkItem
            key={item.id}
            img={item.shortlink_img}
            bg={item.shortlink_bg}
            name={item.title}
            selector={item.title}
          />
        ));
    } else if (preloadedCategories.length && isDefaultFilters(filters)) {
      return preloadedCategories
        .filter((item, i) => item.shortlink_img && item.shortlink_bg && i <= 20)
        .map((item) => (
          <ShortLinkItem
            key={item.id}
            img={item.shortlink_img}
            bg={item.shortlink_bg}
            name={item.title}
            selector={item.title}
          />
        ));
    }

    return null;
  }, [shortLinks]);
  return (
    <div id="enriched_shortlinks_bg">
      <div id="enriched_shortlinks" className="top_20 original">
        {items}
      </div>
    </div>
  );
};

export default ShortLinkList;
