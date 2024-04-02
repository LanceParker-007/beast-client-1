import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  testBuilds: [],
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
    setTestBuilds(state, action) {
      state.testBuilds = action.payload;
    },
  },
});

export const { setIsAuthenticated, setUser, setTestBuilds } = authSlice.actions;
const authSliceReducer = authSlice.reducer;
export default authSliceReducer;
