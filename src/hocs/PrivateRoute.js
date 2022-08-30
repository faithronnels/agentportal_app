import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useIdleTimer } from "react-idle-timer";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "../redux/selectors";
import { logoutUser } from "../redux/actions/authAction.js";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const authState = useAuthState();
  // timer for 30 minutes before logout
  const timeout = 30 * 60 * 1000;

  const [isIdle, setIsIdle] = useState(false);

  const handleOnActive = () => {
    setIsIdle(false);
  };
  const handleOnIdle = () => {
    setIsIdle(true);
  };
  // eslint-disable-next-line no-empty-pattern
  const {} = useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle,
  });

  useEffect(() => {
    if (isIdle) {
      dispatch(logoutUser());
    }
  }, [dispatch, isIdle]);

  const { isAuthenticated } = authState;

  if (isAuthenticated) {
    if (isIdle) {
      dispatch(logoutUser());
      return <Navigate to="/signin" state={{ from: location }} replace />;
    }
    return children;
  }
  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default PrivateRoute;
