import { configureStore } from "@reduxjs/toolkit";
import gameSliceReducer from "../slices/gameSlice";
import authSliceReducer from "../slices/authSlice";
import unityGameSliceReducer from "../slices/unityGameSlice";
import gamesSliceReducer from "../slices/gamesSlice";
import gameScreenSliceReducer from "../slices/gameScreenSlice";

const store = configureStore({
  reducer: {
    gameSliceReducer,
    authSliceReducer,
    unityGameSliceReducer,
    gamesSliceReducer,
    gameScreenSliceReducer,
  },
});

export default store;
