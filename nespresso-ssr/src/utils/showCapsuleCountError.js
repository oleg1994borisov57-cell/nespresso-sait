import { handleOpen } from "../redux/slices/alertSlice";
import store from "../redux/store/";
const { dispatch } = store;

const MIN_ORDER = 2640;
const VERTUO_MIN_ORDER = 5950;
const ORIGINAL_MIN_ORDER = 2640; // поменять на original и от общей суммы корзины
const PRO_MIN_ORDER = 13500;

const showError = (pageName) => {
  switch (pageName) {
    case "vertuoCapsules":
      dispatch(
        handleOpen({
          title: "Произошла ошибка",
          message: `Минимальная сумма для заказа капсул vertuo: ${VERTUO_MIN_ORDER}р.`,
        })
      );
      break;
    case "originalCapsules":
      dispatch(
        handleOpen({
          title: "Произошла ошибка",
          message: `Минимальная сумма для заказа капсул original: ${ORIGINAL_MIN_ORDER}р.`,
        })
      );
      break;
    case "proCapsules":
      dispatch(
        handleOpen({
          title: "Произошла ошибка",
          message: `Минимальная сумма для заказа капсул pro: ${PRO_MIN_ORDER}р.`,
        })
      );
      break;
    case "totalPrice": {
      dispatch(
        handleOpen({
          title: "Произошла ошибка",
          message: `Минимальная сумма для заказа: ${MIN_ORDER}р.`,
        })
      );
    }
    default:
    // console.log("No errors was found");
  }
};

const showCapsuleCountError = (cartTotal) => {
  let isBuyAllowed = true;

  const onShowError = (pageName) => {
    showError(pageName);
  };

  if (cartTotal < MIN_ORDER) {
    isBuyAllowed = false;
    onShowError("totalPrice");
  }

  // if (
  //   pages.vertuoCapsules.sum > 0 &&
  //   pages.vertuoCapsules.sum < VERTUO_MIN_ORDER
  // ) {
  //   isBuyAllowed = false;
  //   onShowError("vertuoCapsules");
  // }

  // if (
  //   pages.originalCapsules.sum > 0 &&
  //   pages.originalCapsules.sum < ORIGINAL_MIN_ORDER
  // ) {
  //   isBuyAllowed = false;
  //   onShowError("originalCapsules");
  // }

  // if (pages.proCapsules.sum > 0 && pages.proCapsules.sum < PRO_MIN_ORDER) {
  //   isBuyAllowed = false;
  //   onShowError("proCapsules");
  // }

  return isBuyAllowed;
};

export default showCapsuleCountError;
