import { configureStore } from "@reduxjs/toolkit";
import jewellery from "./slices/jewellery";
import credentials from "./slices/credentials";
import cart from "./slices/cart";
const store = configureStore({
  reducer: {
    jewellery,
    credentials,
    cart,
  },
});
export default store;
