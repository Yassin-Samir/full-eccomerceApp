import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
export const LogIn = createAsyncThunk("credentials/LogIn", async (action) => {
  const { uid, displayName, email } = action;
  const UserDoc = doc(db, "users", uid);
  try {
    (await getDoc(UserDoc)).exists()
      ? null
      : await CreateUserDocument({ docRef: UserDoc, displayName, email });
    return { uid, displayName, email };
  } catch (error) {
    throw error;
  }
});
async function CreateUserDocument({ docRef, displayName, email }) {
  try {
    const createUserDoc = await setDoc(docRef, {
      displayName,
      email,
      orders: [],
    });
    return;
  } catch (error) {
    console.log({ userError: error });
    throw error.message;
  }
}

const credentialsSlice = createSlice({
  name: "credentials",
  initialState: {
    LoggedIn: true,
    user: null,
    error: "",
  },
  reducers: {
    LogOut: (state) => {
      state.LoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LogIn.rejected, (state, action) => {
      console.log({ errorRejected: action.error });
      state.error = action.error.message;
    });
    builder.addCase(LogIn.fulfilled, (state, action) => {
      state.LoggedIn = true;
      state.user = action.payload;
    });
  },
});

export const { LogOut } = credentialsSlice.actions;
export default credentialsSlice.reducer;
