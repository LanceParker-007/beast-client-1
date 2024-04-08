import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userGameId: "",
  lobbyCode: "",
};

const unityGameSlice = createSlice({
  name: "unityGameSlice",
  initialState,
  reducers: {
    setUserGameId(state, action) {
      state.userGameId = action.payload;
    },
    setLobbyCode(state, action) {
      state.lobbyCode = action.payload;
    },
  },
});

export const { setUserGameId, setLobbyCode } = unityGameSlice.actions;
const unityGameSliceReducer = unityGameSlice.reducer;
export default unityGameSliceReducer;
