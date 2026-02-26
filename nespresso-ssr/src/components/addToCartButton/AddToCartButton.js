import { cloneElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/slices/cartSlice";
import { sendEcommerceData, sendMetriks } from "../../utils/metriks";
import findCartProduct from "../../utils/findCartProduct";

const AddToCartButton = ({
  children,
  img,
  title,
  price,
  count,
  id,
  originCount,
  cartPageName,
  page,
  closeModal,
  color,
}) => {
  const { pages } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleChildClick = (e) => {
    e.preventDefault();

    if (count >= 1) {
      const product = {
        id,
        title,
        img,
        price,
        count,
        originCount,
        cartPageName,
        page,
      };

      if (color) {
        product.color = color;
      }

      closeModal();
      dispatch(addProductToCart(product));

      const currProduct = findCartProduct(pages, product.id);

      if (currProduct) {
        sendEcommerceData("remove", {
          products: [
            {
              id: product.id,
              name: product.title,
              price: product.price,
              quantity: currProduct.count,
            },
          ],
        });
      }

      sendEcommerceData("add", {
        products: [
          {
            id: product.id,
            name: product.title,
            price: product.price,
            variant: product.color ?? "",
            quantity: +product.count,
          },
        ],
      });
      sendMetriks("reachGoal", "add-to-basket");
    }
  };

  const items = cloneElement(children, { onClick: handleChildClick });

  return <>{items}</>;
};

export default AddToCartButton;
