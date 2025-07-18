import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from '../features/categories/categorySlice';

export const store = configureStore({
    reducer: {
        categories : categoryReducer
    },
});