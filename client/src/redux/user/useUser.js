import { useMemo } from "react";
import useActions from "../../utils/useAction.js";
import {
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
} from "./userSlice.js";
import { useSelector } from "react-redux";

export const useUser = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const actions = useActions({
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
  });
  return useMemo(() => {
    return { currentUser, loading, error, ...actions };
  }, [currentUser, loading, error, actions]);
};
