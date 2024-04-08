import { configureStore } from "@reduxjs/toolkit";
import testGameSliceReducer from "../slices/testGameSlice";
import authSliceReducer from "../slices/authSlice";
import unityGameSliceReducer from "../slices/unityGameSlice";
import gamesSliceReducer from "../slices/gamesSlice";

const store = configureStore({
  reducer: {
    testGameSliceReducer,
    authSliceReducer,
    unityGameSliceReducer,
    gamesSliceReducer,
  },
});

export default store;
