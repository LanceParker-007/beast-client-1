import { createSlice } from "@reduxjs/toolkit";
import { getGame } from "../actions/gameScreenActions";

const initialState = {
  // Game data
  gamename: "",
  dataFile: "",
  frameworkFile: "",
  loaderFile: "",
  wasmFile: "",

  // Video Id if any the youtuber wants to paste
  videoId: "",

  //   Viewers
  viewers: {},
  // isLoading Game or Video/Stream
  isLoading: false,
  successMessage: false,
  failMessage: false,
};

const gameScreenSlice = createSlice({
  name: "gameScreenSlice",
  initialState,
  reducers: {
    setViewers(state, action) {
      state.viewers = action.payload;
    },
    setGameFilesEmpty(state, action) {
      state.dataFile = "";
      state.frameworkFile = "";
      state.loaderFile = "";
      state.wasmFile = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGame.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gamename = action.payload.gamename;
        state.dataFile = action.payload.dataFile;
        state.frameworkFile = action.payload.frameworkFile;
        state.loaderFile = action.payload.loaderFile;
        state.wasmFile = action.payload.wasmFile;
        state.successMessage = action.payload.message;
      })
      .addCase(getGame.rejected, (state, action) => {
        state.isLoading = false;
        state.failMessage = action.payload;
      });
  },
});

export const { setViewers, setGameFilesEmpty } = gameScreenSlice.actions;
const gameScreenSliceReducer = gameScreenSlice.reducer;
export default gameScreenSliceReducer;
