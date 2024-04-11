import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: "",
  userToken: "",
  testBuilds: [],

  isLoading: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserToken(state, action) {
      state.userToken = action.payload;
    },
    setTestBuilds(state, action) {
      state.testBuilds = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setIsAuthenticated,
  setUser,
  setUserToken,
  setTestBuilds,
  setIsLoading,
} = authSlice.actions;
const authSliceReducer = authSlice.reducer;
export default authSliceReducer;
