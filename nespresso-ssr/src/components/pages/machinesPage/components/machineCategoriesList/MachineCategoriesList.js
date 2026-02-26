import { useSelector } from "react-redux";
import MachineCategory from "../machineCategory/MachineCategory";
import Spinner from "../../../../spinner/Spinner";
import Alert from "react-bootstrap/Alert";
import { useMediaQuery } from "@mui/material";

export default function MachineCategoriesList({ preloadedCategories }) {
  const match = useMediaQuery("(max-width:997px)");

  const { status } = useSelector((state) => state.productsMachine);

  const items = preloadedCategories.length
    ? preloadedCategories.map(({ id, ...values }, i) => {
        return (
          <MachineCategory
            className={match ? "list" : null}
            categoryPos={i}
            id={id}
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
      {items}
      {loading}
      {error}
    </div>
  );
}
