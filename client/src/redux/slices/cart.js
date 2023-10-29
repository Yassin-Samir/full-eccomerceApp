import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const addItem = createAsyncThunk("cart/addItem", async (action) => {
  await new Promise((res, rej) => setTimeout(res, 1500));
  return action;
});
export const CheckoutAction = createAsyncThunk(
  "cart/Checkout",
  async (action) => {
    try {
      const getCheckoutUrl = await (
        await fetch("https://full-eccomerce-app-server.vercel.app/checkoutSession", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            checkoutData: {
              line_items: action.lineItems,
              success_url: `${window.location.origin}/checkout/success`,
              cancel_url: window.location.origin,
              customer_email: action.email,
            },
            uid: action.uid,
          }),
        })
      ).json();
      window.location.href = getCheckoutUrl.url;
    } catch (error) {
      throw error.message;
    }
    return null;
  }
);
const CalculateTotal = (accumulator, { price, quantity }) =>
  (accumulator += price * quantity);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    isAddingItem: false,
    total: 0,
    error: "",
    IsLoading: false,
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
    builder.addCase(CheckoutAction.pending, (state, action) => {
      state.IsLoading = true;
    });
    builder.addCase(CheckoutAction.rejected, (state, action) => {
      state.IsLoading = false;
      state.error = action.error.message;
    });
  },
});
export const { decrement, increment, remove } = cartSlice.actions;
export default cartSlice.reducer;
