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
        errorMsg:
          action.payload.errorMsg || "Something went wrong while signing in!",
      };
    },
    updateUserStart: (state) => {
      state.loading = true;
      state.error = { isError: false, errorMsg: "" };
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      //payload => an object {isError:bool, errorMsg : string
      state.error = {
        isError: false,
        errorMsg:
          action.payload.errorMsg ||
          "Something went wrong while updating the user",
      };
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = { isError: false, errorMsg: "" };
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      //payload => an object {isError:bool, errorMsg : string
      state.error = {
        isError: false,
        errorMsg:
          action.payload.errorMsg ||
          "Something went wrong while updating the user",
      };
    },
    signOutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.error = { isError: false, errorMsg: "" };
    },
  },
});

export const {
  signInStart,
  signInFailure,
  signInSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutSuccess,
} = userSlice.actions;
export default userSlice.reducer;
