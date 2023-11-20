import { configureStore } from "@reduxjs/toolkit";
import userCards from "../feature/userCards";

export default configureStore({
  reducer: {
    userCards,
  },
});
