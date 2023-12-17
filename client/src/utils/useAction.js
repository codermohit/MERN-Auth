/**
 * Binds action creators with dispatch
 * @param actions object of actions
 * @returns actions bind with dispatch
 */

import { bindActionCreators } from "redux";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

const useActions = (actions) => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, [actions, dispatch]);
};

export default useActions;
