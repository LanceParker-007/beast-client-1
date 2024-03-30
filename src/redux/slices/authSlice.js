import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  testBuilds: [],
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setTestBuilds(state, action) {
      state.testBuilds = action.payload;
    },
  },
});

export const { setUser, setTestBuilds } = authSlice.actions;
const authSliceReducer = authSlice.reducer;
export default authSliceReducer;
