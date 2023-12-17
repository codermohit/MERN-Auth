import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: { isError: false, errorMsg: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = { isError: false, errorMsg: "" };
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      //payload => an object {isError:bool, errorMsg : string }
      state.error = {
        isError: action.payload.isError,
        errorMsg: action.payload.errorMsg || "",
      };
    },
  },
});

export const { signInStart, signInFailure, signInSuccess } = userSlice.actions;
export default userSlice.reducer;
