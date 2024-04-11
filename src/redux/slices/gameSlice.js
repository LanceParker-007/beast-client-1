import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataFile: null,
  frameworkFile: null,
  loaderFile: null,
  wasmFile: null,
  buildFolder: false,

  // WIR: Shift it from here only game files should be handled here
  messageFromUnity: "",
};

const gameSlice = createSlice({
  name: "gameSlice",
  initialState,
  reducers: {
    setDataFile(state, action) {
      state.dataFile = action.payload;
    },
    setFrameworkFile(state, action) {
      state.frameworkFile = action.payload;
    },
    setLoaderFile(state, action) {
      state.loaderFile = action.payload;
    },
    setWasmFile(state, action) {
      state.wasmFile = action.payload;
    },
    setBuildFolder(state, action) {
      state.buildFolder = action.payload;
    },
    setMessageFromUnity(state, action) {
      state.messageFromUnity = action.payload;
    },
  },
});

export const {
  setDataFile,
  setFrameworkFile,
  setLoaderFile,
  setWasmFile,
  setBuildFolder,
  setMessageFromUnity,
} = gameSlice.actions;

const gameSliceReducer = gameSlice.reducer;
export default gameSliceReducer;
