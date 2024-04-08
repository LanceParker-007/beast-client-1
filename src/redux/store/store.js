import { configureStore } from "@reduxjs/toolkit";
import gameSliceReducer from "../slices/gameSlice";
import authSliceReducer from "../slices/authSlice";
import unityGameSliceReducer from "../slices/unityGameSlice";
import gamesSliceReducer from "../slices/gamesSlice";

const store = configureStore({
  reducer: {
    gameSliceReducer,
    authSliceReducer,
    unityGameSliceReducer,
    gamesSliceReducer,
  },
});

export default store;
