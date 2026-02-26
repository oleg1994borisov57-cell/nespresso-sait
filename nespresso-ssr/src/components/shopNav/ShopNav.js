import { useSelector } from "react-redux";
import Link from "next/link";
import getPageIcon from "../../utils/getPageIcon";
import { NavHeader, NavMenu } from "./styles";

const ShopNav = ({ reduxSliceName, title, pageName, currPage }) => {
  const { pages } = useSelector((state) => state[reduxSliceName]);

  return (
    <NavHeader id="enriched_header">
      <h1 className="h1 top_20">
        <strong>{title}</strong>
      </h1>
      <NavMenu id="enriched_techno" className="top_20 p3">
        {pages.map(({ name, href }) => {
          return (
            <div
              data-techno={name}
              className={currPage === name ? "active" : null}
              key={name}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
                href={pageName ? `${pageName}/${href}` : `/${href}`}
              >
                {getPageIcon(name)}
                {name.toUpperCase()}
              </Link>
            </div>
          );
        })}
      </NavMenu>
    </NavHeader>
  );
};

export default ShopNav;
