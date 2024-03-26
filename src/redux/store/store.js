import { configureStore } from "@reduxjs/toolkit";
import testGameSliceReducer from "../slices/testGameSlice";

const store = configureStore({
  reducer: {
    testGameSliceReducer,
  },
});

export default store;
