import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPublicGames = createAsyncThunk(
  "fetchAllPublicGames",
  async ({}, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/v1/games/get-all-public-games`
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
