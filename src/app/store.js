import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";

// THE GLOBAL STORE SETUP REDUX/TOOLKIT
export const store = configureStore({
	reducer: {
		basket: basketReducer,
	},
});
