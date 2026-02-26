import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ShopFilterSelect from "./shopFilterSelect/ShopFilterSelect";
import {
  addActiveFilter,
  changeView,
  clearFilters,
} from "../../redux/slices/shopFilterSlice";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  fetchCategories,
  setCategories,
} from "../../redux/slices/productListSlice";
import {
  EmptySpace,
  FilterList,
  FilterSwitch,
  FilterSwitchWrapper,
  FiltersWrapper,
  ResetFilters,
} from "./styles";
import { useMediaQuery } from "@mui/material";

function isDefaultFilterParams(params) {
  let isDefaultFilterParams = true;

  params.forEach((paramOptionId) => {
    if (paramOptionId === "1") return;

    isDefaultFilterParams = false;
  });

  return isDefaultFilterParams;
}

const ShopFilters = ({ preloadedCategories, page }) => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const dispatch = useDispatch();
  const { filters, view } = useSelector((state) => state.shopFilter);

  const isMobile = useMediaQuery("(max-width:995px)");

  const filtersWrapperRef = useRef(null);

  const [isFiltersHidden, setFiltersHidden] = useState(false);
  const [isFiltersOnTop, setFiltersOnTop] = useState(false);

  const onFiltersSwitchPos = useCallback((isOnTop) => {
    setFiltersHidden(true);

    setTimeout(() => {
      setFiltersOnTop(isOnTop);
      setFiltersHidden(false);
    }, 400);
  }, []);

  const onFiltersOnTop = () => {
    if (isFiltersOnTop) return;

    onFiltersSwitchPos(true);
  };

  const onFiltersNotOnTop = () => {
    if (!isFiltersOnTop) return;

    onFiltersSwitchPos(false);
  };

  useEffect(() => {
    if (!isMobile) return;

    setFiltersOnTop(false);
  }, [isMobile]);

  useEffect(() => {
    if (!filtersWrapperRef.current || isMobile) return;

    const onElementOnTop = () => {
      if (filtersWrapperRef.current?.offsetTop - window.scrollY <= 0) {
        onFiltersOnTop();
      } else {
        onFiltersNotOnTop();
      }
    };

    window.addEventListener("scroll", onElementOnTop);

    return () => {
      window.removeEventListener("scroll", onElementOnTop);
    };
  }, [filtersWrapperRef.current, isFiltersOnTop]);

  useEffect(() => {
    if (searchParams.size && !isDefaultFilterParams(searchParams)) {
      searchParams.forEach((paramOptionId, paramFilterName) => {
        dispatch(
          addActiveFilter({
            optionId: +paramOptionId,
            filterName: paramFilterName,
          })
        );
      });
      dispatch(fetchCategories(page));
    } else {
      dispatch(setCategories(preloadedCategories));
      dispatch(clearFilters());
    }
  }, [searchParams]);

  const onSetOption = useCallback(
    (name, value) => {
      let isAllParamsFind = false;
      let params = {};

      if (searchParams.size > 0) {
        searchParams.forEach((paramValue, key) => {
          if (name === key) {
            params[name] = value;
            isAllParamsFind = true;
            return;
          }

          params[key] = paramValue;
        });
      }

      if (!isAllParamsFind) {
        params[name] = value;
      }

      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, ...params },
        },
        undefined,
        { shallow: true }
      );
    },
    [searchParams]
  );

  const items = useMemo(() => {
    return filters.map((item) => (
      <ShopFilterSelect
        key={item.id}
        filterId={item.id}
        activeFilterId={item.activeFilterId}
        onSetOption={onSetOption}
        name={item.name}
        viewName={item.viewName}
        options={item.id === 2 ? item[`${page}Options`] : item.options}
      />
    ));
  }, [page, filters]);

  const onChangeView = (e) => {
    dispatch(changeView(e.currentTarget.getAttribute("data-view")));
  };

  return (
    <>
      {isFiltersOnTop ? <EmptySpace className="top-20" /> : null}

      <FiltersWrapper
        id={isFiltersOnTop ? "enriched_topline" : null}
        className={`top_20${isFiltersHidden ? " hide " : ""}`}
        ref={filtersWrapperRef}
        style={{ top: "80px" }}
      >
        <ResetFilters id="enriched_reset_filters" className="p4 reset_filters">
          Reset filters
        </ResetFilters>
        <FilterList id="enriched_filters" className="p4">
          {items}
          <FilterSwitchWrapper id="enriched_switch" className="p5">
            <FilterSwitch
              onClick={onChangeView}
              className={
                view === "grid" ? "enriched_switch selected" : "enriched_switch"
              }
              data-view="grid"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width={16}
                height={16}
                id="filters_datalayout_grids"
              >
                <path d="M0 20V0h20v20H0zm1-1h8.5v-9H1v9zm18-9h-8.5v9H19v-9zM1 9h8.5V1H1v8zm18-8h-8.5v8H19V1z" />
              </svg>
              <span>Сетка</span>
            </FilterSwitch>
            <FilterSwitch
              onClick={onChangeView}
              className={
                view === "list" ? "enriched_switch selected" : "enriched_switch"
              }
              data-view="list"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 21 18"
                width={16}
                height={16}
                id="filters_datalayout_rows"
                className=""
              >
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M2.5 13.5c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm18 1.5v1H6.76557434v-1H20.5zm-18-8c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm18 1.5v1H6.76557434v-1H20.5zm-18-8c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm18 1.5v1H6.76557434V2H20.5z"
                />
              </svg>
              <span>Список</span>
            </FilterSwitch>
          </FilterSwitchWrapper>
        </FilterList>
      </FiltersWrapper>
    </>
  );
};

export default ShopFilters;
