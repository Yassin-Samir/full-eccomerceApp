import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadStripe } from "@stripe/stripe-js";
export const addItem = createAsyncThunk("cart/addItem", async (action) => {
  await new Promise((res, rej) => setTimeout(res, 1500));
  return action;
});
const stripePromise = loadStripe(
  "pk_test_51MW4YXAQqTLhXS8keuq7k5CBqJFUdiptkXELRmCUUE4ti3jlZYPE309w5DAc4usOf3lQx7BC7wJx4W70uwPCcTQJ00j5wqVa4t"
);
export const checkOut = createAsyncThunk("cart/Checkout", async (action) => {
  const Stripe = await stripePromise;
  Stripe.redirectToCheckout({
    mode: "payment",
    lineItems: action.lineItems,
    successUrl: `${window.location.origin}/checkout/success`,
    cancelUrl: window.location.origin,
    customerEmail: action.email,
  });
  return null;
});
const CalculateTotal = (accumulator, { price, quantity }) =>
  (accumulator += price * quantity);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    isAddingItem: false,
    total: 0,
  },
  reducers: {
    increment(state, action) {
      const JewelIndex = state.cartItems.findIndex(
        ({ name }) => name === action.payload.name
      );
      if (JewelIndex === -1) return;
      state.cartItems[JewelIndex].quantity++;
      state.total = state.cartItems.reduce(CalculateTotal, 0);
    },
    decrement(state, action) {
      const JewelIndex = state.cartItems.findIndex(
        ({ name }) => name === action.payload.name
      );
      if (JewelIndex === -1) return;
      state.cartItems[JewelIndex].quantity === 1
        ? (state.cartItems = state.cartItems.filter(
            ({ name }) => name !== action.payload.name
          ))
        : state.cartItems[JewelIndex].quantity--;
      state.total = state.cartItems.reduce(CalculateTotal, 0);
    },
    remove(state, action) {
      state.cartItems = state.cartItems.filter(
        ({ name }) => name !== action.payload.name
      );
      state.total = state.cartItems.reduce(CalculateTotal, 0);
    },
  },
  extraReducers(builder) {
    builder.addCase(addItem.pending, (state) => {
      state.isAddingItem = true;
    });
    builder.addCase(addItem.fulfilled, (state, action) => {
      state.isAddingItem = false;
      if (
        state.cartItems.findIndex(
          ({ name }) => name === action.payload.name
        ) === -1
      )
        state.cartItems = [...state.cartItems, action.payload];
      state.total = state.cartItems.reduce(CalculateTotal, 0);
    });
  },
});
export const { decrement, increment, remove } = cartSlice.actions;
export default cartSlice.reducer;
