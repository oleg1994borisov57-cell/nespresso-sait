import { Box } from "@mui/material";
import AddButtonLarge from "../../../../addButtonLarge/AddButtonLarge";
import {
  CoffeeMachineTitle,
  TableCoffeeMachinePrice,
  TableColumn,
  TableFeature,
  TableSubtitle,
} from "./styles";
import formatPrice from "../../../../../utils/formatPrice";

export default function CompareTableMachineColumn({ product, className }) {
  const {
    title,
    descr_title,
    price,
    features: { options },
    preview_image,
    product_id,
    page,
    availability,
    color_name,
  } = product;

  const items = Object.values(options).map((value, i) => {
    return (
      <TableFeature key={i} className="value" component={"div"}>
        {value}
      </TableFeature>
    );
  });

  return (
    <TableColumn className={className}>
      <CoffeeMachineTitle component={"h3"}>{title}</CoffeeMachineTitle>
      <img src={preview_image} alt={title} />
      <TableSubtitle component={"div"}>{descr_title}</TableSubtitle>
      <TableCoffeeMachinePrice component={"div"}>
        {formatPrice(price)}
      </TableCoffeeMachinePrice>
      <Box
        sx={{
          width: "calc(100% - 30px) !important",
          margin: "25px auto",
          position: "relative",
        }}
      >
        <AddButtonLarge
          title={title}
          img={preview_image}
          price={price}
          outOfStock={!availability}
          page={`${page.toLowerCase()}Machines`}
          cartPageName={`${page.toLowerCase()}Machines`}
          id={product_id}
          count={1}
          color={color_name}
          withoutIcons
        />
      </Box>
      {items}
    </TableColumn>
  );
}
