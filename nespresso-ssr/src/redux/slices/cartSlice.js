import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CoffeeService from "../../services/CoffeeService";
import {
  trackAddToCart,
  trackRemoveFromCart,
  trackBeginCheckout,
  trackPurchase,
  updateCartActivity,
} from "../../utils/n8n";

const initialState = {
  pages:
    typeof localStorage !== "undefined" && localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {
          originalCapsules: {
            name: "Капсулы 'Original'",
            dbName: "coffee",
            count: 0,
            sum: 0,
            products: [],
          },
          vertuoCapsules: {
            name: "Капсулы 'Vertuo'",
            dbName: "coffee",
            count: 0,
            sum: 0,
            products: [],
          },
          vertuoMachines: {
            name: "Кофемашины 'Vertuo'",
            dbName: "machines",
            count: 0,
            sum: 0,
            products: [],
          },
          originalMachines: {
            name: "Кофемашины 'Original'",
            dbName: "machines",
            count: 0,
            sum: 0,
            products: [],
          },
          proCapsules: {
            name: "'Pro' капсулы",
            dbName: "coffee",
            count: 0,
            sum: 0,
            products: [],
          },
          accessories: {
            name: "Аксессуары",
            dbName: "accessories",
            count: 0,
            sum: 0,
            products: [],
          },
          exclusive: {
            name: "Экслюзивные товары",
            dbName: "exclusive",
            count: 0,
            sum: 0,
            products: [],
          },
        },
  shippingAddress:
    typeof localStorage !== "undefined" &&
    localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
  shippingAddressesList:
    typeof localStorage !== "undefined" &&
    localStorage.getItem("shippingAddressesList")
      ? JSON.parse(localStorage.getItem("shippingAddressesList"))
      : [],
  promotionId:
    typeof localStorage !== "undefined" && localStorage.getItem("promoId")
      ? JSON.parse(localStorage.getItem("promoId"))
      : null,
  promoProductId:
    typeof localStorage !== "undefined" &&
    localStorage.getItem("promoProductId")
      ? JSON.parse(localStorage.getItem("promoProductId"))
      : null,
  deliveryPrice: 0,
  cartTotal:
    typeof localStorage !== "undefined" && localStorage.getItem("cartTotal")
      ? JSON.parse(localStorage.getItem("cartTotal"))
      : 0,
  cartTotalPrice:
    typeof localStorage !== "undefined" &&
    localStorage.getItem("cartTotalPrice")
      ? JSON.parse(localStorage.getItem("cartTotalPrice"))
      : 0,
  step:
    typeof localStorage !== "undefined" && localStorage.getItem("step")
      ? JSON.parse(localStorage.getItem("step"))
      : 0,
  status: "idle",
  orderNumber: null,
};

const {
  getPaymentLink: coffeeGetPaymentLink,
  getOrderPrice: coffeeGetOrderPrice,
  sendDeliveryInfo: coffeeSendDeliveryInfo,
} = new CoffeeService();

export const getPaymentLink = createAsyncThunk(
  "cart/getPaymentLink",
  async (data) => {
    const response = await coffeeGetPaymentLink(data);
    return response;
  }
);

export const getOrderPrice = createAsyncThunk(
  "cart/getOrderPrice",
  async (data) => {
    const response = await coffeeGetOrderPrice(data);
    return response;
  }
);

export const sendDeliveryInfo = createAsyncThunk(
  "cart/sendDeliveryInfo",
  async (data) => {
    const response = await coffeeSendDeliveryInfo(data);
    return response;
  }
);

const setFirstStep = (state) => {
  state.step = 0;
  localStorage.setItem("step", JSON.stringify(state.step));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      setFirstStep(state);
      const {
        id,
        title,
        img,
        price,
        count,
        originCount,
        page,
        cartPageName,
        color,
      } = action.payload;

      // N8N: трекинг добавления в корзину
      if (+count > 0) {
        trackAddToCart(
          { id, title, price, category: cartPageName },
          +count,
          state.cartTotalPrice + price * count
        );
        updateCartActivity();
      }

      let productIndex = null;

      const currPage = state.pages[cartPageName];
      const products = currPage.products;

      const product = products.find((item, i) => {
        if (item.id === id) {
          productIndex = i;
          return true;
        } else {
          return false;
        }
      });

      const productCount = product?.count ?? 0;
      const productTotal = product?.total ?? 0;

      state.cartTotal -= +productCount;
      state.cartTotalPrice -= +productTotal;
      state.pages[cartPageName].count -= +productCount;
      state.pages[cartPageName].sum -= +productTotal;

      if (+count === 0 && product) {
        const filtredProducts = products.filter((item) => item.id !== id);

        state.pages[cartPageName].products = filtredProducts;
      } else if (+count !== 0) {
        if (product) {
          product.count = +count;
          product.total = +price * +count;

          state.pages[cartPageName].products[productIndex] = product;
        } else {
          const newProduct = {
            id,
            title,
            img,
            price: +price,
            count: +count,
            originCount: +originCount,
            total: +price * +count,
            page,
            cartPageName,
            color,
          };

          state.pages[cartPageName].products.push(newProduct);
        }
        state.cartTotal += +count;
        state.cartTotalPrice += +price * +count;

        state.pages[cartPageName].count += +count;
        state.pages[cartPageName].sum += +price * +count;
      }
      localStorage.setItem("cart", JSON.stringify(state.pages));
      localStorage.setItem("cartTotal", JSON.stringify(state.cartTotal));
      localStorage.setItem(
        "cartTotalPrice",
        JSON.stringify(state.cartTotalPrice)
      );
    },
    setDeliveryPrice: (state, action) => {
      state.deliveryPrice = action.payload;
    },
    setPromoId: (state, action) => {
      state.promotionId = action.payload;

      localStorage.setItem("promoId", JSON.stringify(action.payload));
    },
    setPromoProductId: (state, action) => {
      state.promoProductId = action.payload;

      localStorage.setItem("promoProductId", JSON.stringify(action.payload));
    },
    clearCart: (state) => {
      for (let page in state.pages) {
        state.pages[page].count = 0;
        state.pages[page].sum = 0;
        state.pages[page].products = [];
      }

      state.cartTotal = 0;
      state.cartTotalPrice = 0;
      state.shippingAddress = {};
      state.step = 0;
      state.promotionId = null;
      state.promoProductId = null;

      localStorage.removeItem("cart");
      localStorage.removeItem("cartTotal");
      localStorage.removeItem("cartTotalPrice");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("promoId");
      localStorage.removeItem("promoProductId");
    },
    clearCartOnlyLocalStorage: () => {
      localStorage.removeItem("cart");
      localStorage.removeItem("cartTotal");
      localStorage.removeItem("cartTotalPrice");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("promoId");
      localStorage.removeItem("promoProductId");
    },
    deleteProduct: (state, action) => {
      setFirstStep(state);

      const { id, cartPageName } = action.payload;

      const currPage = state.pages[cartPageName];
      const products = currPage.products;

      const product = products.find((item) => item.id === id);

      if (product) {
        // N8N: трекинг удаления из корзины
        trackRemoveFromCart(
          { id: product.id, title: product.title, price: product.price },
          state.cartTotalPrice - product.total
        );
        updateCartActivity();

        const productCount = product.count;
        const productTotal = product.total;

        const products = state.pages[cartPageName].products.filter(
          (item) => item.id !== id
        );

        state.cartTotal -= +productCount;
        state.cartTotalPrice -= +productTotal;

        state.pages[cartPageName].count -= +productCount;
        state.pages[cartPageName].sum -= +productTotal;

        state.pages[cartPageName].products = products;
      }

      localStorage.setItem("cart", JSON.stringify(state.pages));
      localStorage.setItem("cartTotal", JSON.stringify(state.cartTotal));
      localStorage.setItem(
        "cartTotalPrice",
        JSON.stringify(state.cartTotalPrice)
      );
    },
    setShippingAddress: (state, action) => {
      const currAddress = action.payload;
      state.shippingAddress = currAddress;

      const filtredCurrAddresses = state.shippingAddressesList.filter(
        ({ id }) => id !== currAddress?.id
      );

      filtredCurrAddresses.push(currAddress);

      localStorage.setItem(
        "shippingAddressesList",
        JSON.stringify(filtredCurrAddresses)
      );
      localStorage.setItem("shippingAddress", JSON.stringify(currAddress));
    },
    nextStep: (state) => {
      state.step += 1;
      localStorage.setItem("step", JSON.stringify(state.step));

      // N8N: начало оформления заказа (на шаге 1)
      if (state.step === 1) {
        const cartItems = Object.values(state.pages)
          .flatMap((page) => page.products)
          .filter((p) => p.count > 0);
        trackBeginCheckout(
          cartItems,
          state.cartTotalPrice
        );
      }
    },
    prevStep: (state) => {
      if (state.step !== 0) {
        state.step -= 1;
        localStorage.setItem("step", JSON.stringify(state.step));
      }
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPaymentLink.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getPaymentLink.fulfilled, (state) => {
      state.status = "idle";
    });
    builder.addCase(getPaymentLink.rejected, (state) => {
      state.status = "error";
    });
    builder.addCase(getOrderPrice.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getOrderPrice.fulfilled, (state) => {
      state.status = "idle";
    });
    builder.addCase(getOrderPrice.rejected, (state) => {
      state.status = "error";
    });
    builder.addCase(sendDeliveryInfo.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(sendDeliveryInfo.fulfilled, (state, action) => {
      state.status = "idle";
      state.orderNumber = action.payload;

      // N8N: трекинг успешной покупки
      const cartItems = Object.values(state.pages)
        .flatMap((page) => page.products)
        .filter((p) => p.count > 0);
      trackPurchase({
        orderId: action.payload,
        total: state.cartTotalPrice,
        items: cartItems,
        email: state.shippingAddress?.email,
        phone: state.shippingAddress?.phone,
      });
    });
    builder.addCase(sendDeliveryInfo.rejected, (state) => {
      state.status = "error";
    });
  },
});

const { actions, reducer } = cartSlice;

export default reducer;
export const {
  addProductToCart,
  clearCart,
  setShippingAddress,
  setPromoProductId,
  nextStep,
  prevStep,
  setStatus,
  deleteProduct,
  setDeliveryPrice,
  setPromoId,
  clearCartOnlyLocalStorage,
} = actions;
