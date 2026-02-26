import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const ShopFilterSelect = ({
  options,
  activeFilterId,
  name,
  onSetOption,
  viewName,
}) => {
  const [selectedOption, setSelectedOption] = useState(viewName);

  const [isShowModal, setIsShowModal] = useState(false);

  const filters = useSelector((state) => state.shopFilter.filters);

  const selectElements = useMemo(() => {
    setSelectedOption(viewName);

    return options.map((optionItem) => {
      if (optionItem.id === activeFilterId) {
        if (optionItem.id !== 1) {
          setSelectedOption(optionItem.name);
        } else {
          setSelectedOption(viewName);
        }
      }
      return (
        <span
          key={optionItem.id}
          onClick={(e) => onOptionClick(e, optionItem)}
          className={activeFilterId === optionItem.id ? "active" : null}
        >
          {optionItem.name}
          {optionItem.value ? <span>{optionItem.value}</span> : null}
        </span>
      );
    });

    // eslint-disable-next-line
  }, [filters, options]);

  const onOptionClick = (e, optionItem) => {
    e.preventDefault();

    if (optionItem.id !== 1) {
      setSelectedOption(optionItem.name);
      onSetOption(name, optionItem.id);
    } else {
      setSelectedOption(viewName);
      onSetOption(name, 1);
    }

    setTimeout(() => {
      hideModal();
    }, 1);
  };

  const hideModal = () => {
    setIsShowModal(false);
  };

  const showModal = () => {
    setIsShowModal(true);
  };

  const onSelectClick = (e) => {
    if (
      window.matchMedia("(max-width: 996px)").matches &&
      e.target.nodeName !== "SPAN"
    ) {
      showModal();
    }
  };

  return (
    <>
      {isShowModal ? (
        <div
          id="enriched_filters_bg"
          onClick={hideModal}
          className="active"
        ></div>
      ) : null}

      <div className="enriched_filter">
        <div
          className={isShowModal ? "select active" : "select"}
          onMouseEnter={() => setIsShowModal(true)}
          onClick={onSelectClick}
        >
          <p className="filter_title">{selectedOption}</p>
          {isShowModal ? (
            <div>
              <span className="close">×</span>
              {selectElements}
            </div>
          ) : null}
        </div>
        <div className="reset">×</div>
      </div>
    </>
  );
};

export default ShopFilterSelect;
