import React, { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  setIsAuthenticated,
  setUser,
  setUserToken,
} from "../redux/slices/authSlice";

const PrivateRoutes = () => {
  const { user, userToken, isAuthenticated } = useSelector(
    (state) => state.authSliceReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const userToken = Cookies.get("userToken");
    const userInfo = Cookies.get("userInfo");
    if (userInfo) {
      dispatch(setUser(JSON.parse(userInfo)));
      dispatch(setUserToken(userToken));
      setIsAuthenticated(true);
    } else {
      toast({
        title: "Please login",
        position: "top",
        status: "error",
      });
      setUser(null);
      setIsAuthenticated(false);
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userToken, isAuthenticated]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
