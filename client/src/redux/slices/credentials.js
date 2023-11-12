import { createSlice } from "@reduxjs/toolkit";
const credentialsSlice = createSlice({
  name: "credentials",
  initialState: {
    LoggedIn: false,
    user: null,
    error: "",
    orders: [],
  },
  reducers: {
    LogOut(state) {
      state.LoggedIn = false;
      state.user = null;
    },
    LogIn(state, action) {
      state.LoggedIn = true;
      state.user = action.payload;
    },
    addOrders(state, action) {
      state.orders = action.payload;
    },
  },
});

export const { LogOut, LogIn, addOrders } = credentialsSlice.actions;
export default credentialsSlice.reducer;
