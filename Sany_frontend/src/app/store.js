import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from '../features/categories/categorySlice';
import dealerReducer from '../features/dealers/dealersSlice';
import subcategoryReducer from '../features/subCategory/subCategorySlice';
import modelReducer from '../features/model/modelSlice';

export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        dealers: dealerReducer,
        subCategory: subcategoryReducer,
        model: modelReducer

    },
});