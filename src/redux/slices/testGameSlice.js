import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataFile: null,
  frameworkFile: null,
  loaderFile: null,
  wasmFile: null,
  buildFolder: false,

  messageFromUnity: "",
};

const testGameSlice = createSlice({
  name: "testGameSlice",
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
} = testGameSlice.actions;

const testGameSliceReducer = testGameSlice.reducer;
export default testGameSliceReducer;
