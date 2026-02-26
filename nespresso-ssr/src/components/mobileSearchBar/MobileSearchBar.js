import { useDispatch } from "react-redux";
import SearchBar from "../searchBar/SearchBar";
import { useEffect } from "react";

const MobileSearchBar = () => {
  const isMobile = false;

  const dispatch = useDispatch();

  const closeSearchBar = () => {
    dispatch({ type: "menu/toggleSearchBar" });
  };

  useEffect(() => {
    if (!isMobile) return;
    const html = document.querySelector("html");

    if (html) {
      html.style.overflow = "hidden";
    }

    return () => {
      html.style.overflow = "auto";
    };
  }, [isMobile]);

  return (
    <div className="mobile-dialog">
      <div className="cv-header-title">SEARCH</div>
      <div id="search-box-modal-close" onClick={closeSearchBar}>
        <svg
          width={48}
          height={49}
          viewBox="0 0 48 49"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="0.5" width={48} height={48} rx={24} fill="#C5C5C5" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.5382 24.5L15 16.9618L16.4618 15.5L24 23.0382L31.5382 15.5L33 16.9618L25.4618 24.5L33 32.0382L31.5382 33.5L24 25.9618L16.4618 33.5L15 32.0382L22.5382 24.5Z"
            fill="#17171A"
          />
        </svg>
      </div>
      <SearchBar />
    </div>
  );
};

export default MobileSearchBar;
