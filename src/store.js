import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import dealsReducer from "./redux/dealsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    deals: dealsReducer,
  },
});

export default store;
