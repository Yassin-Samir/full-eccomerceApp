import { createSlice } from "@reduxjs/toolkit";

const credentialsSlice = createSlice({
  name: "credentials",
  initialState: {
    LoggedIn: true,
    user: null,
  },
  reducers: {
    LogIn: (state, action) => {
      state.LoggedIn = true;
      state.user = action.payload;
    },
    LogOut: (state) => {
      state.LoggedIn = false;
      state.user = null;
    },
  },
});

export const { LogIn, LogOut } = credentialsSlice.actions;
export default credentialsSlice.reducer;
