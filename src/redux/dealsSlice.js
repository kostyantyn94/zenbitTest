import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllDeals = createAsyncThunk(
  "deals/fetchAlleals",
  async () => {
    const { data } = await axios.get("http://localhost:3001/deals");
    return data;
  }
);

const initialState = {
  data: [],
};

export const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchAllDeals.fulfilled, (state, action) => {
      const uniqueArray = action.payload.filter(
        (obj, index, self) =>
          index === self.findIndex((t) => t.name === obj.name)
      );
      state.data = uniqueArray;
    });
  },
});

export default dealsSlice.reducer;
