import { useDispatch } from "react-redux";
import AddButton from "../addButton/AddButton";
import { deleteProduct } from "../../redux/slices/cartSlice";
import { sendEcommerceData } from "../../utils/metriks";
import formatPrice from "../../utils/formatPrice";

const CartModalItem = ({
  img,
  title,
  price,
  id,
  count,
  totalPrice,
  originCount,
  cartPageName,
  page,
  color,
}) => {
  const dispatch = useDispatch();

  const onDeleteButtonClick = () => {
    dispatch(deleteProduct({ id, cartPageName }));
    sendEcommerceData("remove", {
      products: [
        {
          id,
          name: title,
          price,
          quantity: count,
        },
      ],
    });
  };

  return (
    <tr className="MiniBasketItem">
      <th
        headers="capsules_original"
        className="MiniBasketItem__image-container"
        scope="row"
      >
        <img
          width={58}
          height={58}
          src={img}
          className="ResponsiveImage MiniBasketItem__image"
          alt={title}
        />
      </th>
      <td
        headers="capsules_original n-20-exclusive-coffee-capsules"
        className="MiniBasketItem__title"
      >
        <span aria-hidden="true">{title}</span>
        <span aria-hidden="true" className="MiniBasketItemPriceAndName__price">
          <strong>{formatPrice(totalPrice)}</strong>
          <span className="MiniBasketItemPriceAndName__price-calc">
            ({count} × {formatPrice(price)})
          </span>
        </span>
        <span className="delete_button" onClick={onDeleteButtonClick}>
          Удалить из корзины
        </span>
      </td>
      <td
        headers="capsules_original n-20-exclusive-coffee-capsules"
        className="MiniBasketItem__button-container"
      >
        <div className="MiniBasketItem__addToBagButton AddToBagButton__container">
          <AddButton
            id={id}
            img={img}
            title={title}
            price={price}
            count={originCount}
            cartPageName={cartPageName}
            color={color}
            page={page}
          />
        </div>
      </td>
    </tr>
  );
};

export default CartModalItem;
