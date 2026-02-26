import { TableColumn, TableFeature, TableWrapper } from "./styles";
import CompareTableMachineColumn from "./CompareTableMachineColumn";
import { useEffect, useState } from "react";
import CoffeeService from "../../../../../services/CoffeeService";
import Spinner from "../../../../spinner/Spinner";
import { Alert } from "react-bootstrap";

const { getMachineProduct, getAllMachineProductsIds } = new CoffeeService();

export default function CompareTable({ product }) {
  const [firstCompareProduct, setFirstCompareProduct] = useState([]);
  const [secondCompareProduct, setSecondCompareProduct] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");
    getAllMachineProductsIds().then((data) => {
      getMachineProduct(data[0])
        .then((machine) => {
          if (machine.variants) {
            setFirstCompareProduct(machine.variants[0]);
          } else {
            setFirstCompareProduct(machine);
          }

          getMachineProduct(data[8])
            .then((machine) => {
              if (machine.variants) {
                setSecondCompareProduct(machine.variants[0]);
              } else {
                setSecondCompareProduct(machine);
              }

              setStatus("idle");
            })
            .catch(() => {
              setStatus("error");
            });
        })
        .catch(() => {
          setStatus("error");
        });
    });
  }, []);

  const view =
    status === "idle" && firstCompareProduct && secondCompareProduct ? (
      <View
        product={product}
        firstCompareProduct={firstCompareProduct}
        secondCompareProduct={secondCompareProduct}
      />
    ) : null;

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
    <TableWrapper>
      {error}
      {loading}
      {view}
    </TableWrapper>
  );
}

const View = ({ product, firstCompareProduct, secondCompareProduct }) => {
  const {
    features: { options },
  } = product;

  const items = Object.keys(options).map((key, i) => {
    return (
      <TableFeature key={i} component={"div"}>
        {key}
      </TableFeature>
    );
  });

  return (
    <>
      <TableColumn>{items}</TableColumn>
      <CompareTableMachineColumn product={product} className="current" />
      <CompareTableMachineColumn product={firstCompareProduct} />
      <CompareTableMachineColumn product={secondCompareProduct} />
    </>
  );
};
