import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchSubCategories = createAsyncThunk('subcategory/fetchSubCategories', async () => {
    const response = await axios.get('http://localhost:8991/V2/subcategories')
    console.log("response ==>>", response);

    return response.data.data;
})

export const subCategoriesSlice = createSlice({
    name: 'subcategory',
    initialState: {
        subCategory: [],
        loading: false,
        error: null
    },
    reducer: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.subCategory = action.payload;
            })
            .addCase(fetchSubCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }


})

export default subCategoriesSlice.reducer;