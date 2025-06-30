import { useDispatch, useSelector } from "react-redux";
import { fetchProfileAction } from "../store/actions/user.action";
import { clearMessage } from "../store/reducers/user.reducers";
import type { AppDispatch, RootState } from "../store";

const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    loading,
    error,
    message,
    apiName,
    alertType,
    profile
  } = useSelector((state:RootState) => state.user); 

  const getProfile = async () => {
    await dispatch(fetchProfileAction());
  };

  const closeAlert = () => {
    dispatch(clearMessage());
  };

  return {
    loading,
    error,
    message,
    apiName,
    alertType,
    profile,
    getProfile,
    closeAlert,
  };
};

export default useUser;
