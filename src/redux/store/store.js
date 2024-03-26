import { configureStore } from "@reduxjs/toolkit";
import testGameSliceReducer from "../slices/testGameSlice";
import authSliceReducer from "../slices/authSlice";

const store = configureStore({
  reducer: {
    testGameSliceReducer,
    authSliceReducer,
  },
});

export default store;
