import { configureStore } from "@reduxjs/toolkit";
import photosReducer from "../slices/photosSlice";

export const store = configureStore({
  reducer: {
    photos: photosReducer,
  },
});
