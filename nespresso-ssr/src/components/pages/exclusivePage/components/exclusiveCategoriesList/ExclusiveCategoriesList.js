import { useSelector } from "react-redux";

import Spinner from "../../../../spinner/Spinner";

import Alert from "react-bootstrap/Alert";

import { useMediaQuery } from "@mui/material";

import ExclusiveCategory from "../exclusiveCategory/ExclusiveCategory";
import isServerRender from "../../../../../utils/isServerRender";

export default function ExclusiveCategoriesList({ preloadedCategories }) {
  const match = !isServerRender() ? useMediaQuery("(max-width:997px)") : false;

  const { status } = useSelector((state) => state.accesories);

  const serverItems = preloadedCategories
    ? preloadedCategories.map(({ id, ...values }, i) => {
        return (
          <ExclusiveCategory
            className={match ? "list" : null}
            id={id}
            categoryPos={i}
            key={id}
            {...values}
          />
        );
      })
    : null;

  const loading = status === "loading" ? <Spinner /> : null;

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
      {loading}
      {serverItems}
      {error}
    </div>
  );
}
