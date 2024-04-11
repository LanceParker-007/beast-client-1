import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getGame = createAsyncThunk(
  "getGame",
  async ({ gameId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/v1/games/get-game`,
        {
          gameId: gameId,
        }
      );
      if (data.success) {
        return data.data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
