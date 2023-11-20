import { createSlice } from "@reduxjs/toolkit";
import { BaseCard } from "../scripts/types";

export const userCardsSlice = createSlice({
  name: "userCards",
  initialState: [] as BaseCard[],
  reducers: {
    saveUserCards: (state, action) => {
      return action.payload;
    },
  },
});

export default userCardsSlice.reducer;
export const { saveUserCards } = userCardsSlice.actions;
