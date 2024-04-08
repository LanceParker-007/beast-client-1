import { createSlice } from "@reduxjs/toolkit";
import { fetchAllPublicGames } from "../actions/gamesSliceActions";

const initialState = {
  publicGames: [],

  isLoading: false,
  successMessage: "",
  failMessage: "",
};

const gamesSlice = createSlice({
  name: "gamesSlice",
  initialState,
  reducers: {
    setPublicGames(state, action) {
      state.publicGames = action.payload;
    },
    setMessageEmpty(state, action) {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPublicGames.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPublicGames.fulfilled, (state, action) => {
        state.isLoading = true;
        state.publicGames = action.payload;
        state.successMessage = "Fetched all games successfully.";
      })
      .addCase(fetchAllPublicGames.rejected, (state, action) => {
        state.isLoading = true;
        state.failMessage = "Failed to fetch all public games!";
      });
  },
});

export const { setPublicGames, setMessageEmpty } = gamesSlice.actions;
const gamesSliceReducer = gamesSlice.reducer;
export default gamesSliceReducer;
