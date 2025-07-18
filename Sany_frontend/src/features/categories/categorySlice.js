import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


export const fetchCategories = createAsyncThunk('/category/fetchCategories', async () => {
    const response = await axios.get('http://localhost:8991/V2/categories');
    return response.data.data;

})

export const deleteCategory = createAsyncThunk('category/delCategory', async (catId) => {
    // console.log("catId==>", catId);
    const response = await axios.delete(`http://localhost:8991/V2/categories/delete?Categoryid=${catId}`);
    console.log("response ===>>", response.data);
    return catId;
})

export const updateCategoryById = createAsyncThunk('category/updateCategoryById', async (catId) => {
    const response = await axios.put(`http://localhost:8991/V2/categories/edit?Categoryid=${catId}`);
    console.log("response ====>>", response.data);
    return catId;
})

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        value: [],
        loading: false,
        error: null,
        category_name: ""
    },
    reducers: {
        getCategoryByIdReducer: (state, action) => {
            const id = action.payload;
            console.log("id==>>", id);
            console.log("state====>>", JSON.parse(JSON.stringify(state.value)));

            const found = state.value.find(item => item.catid == id);
            console.log("found==>>", found);
            if (found) {
                state.category_name = found.catname;
            } else {
                state.category_name = ""; // clear if not found
            }
        }
    },
    extraReducers: (builder) => {
        builder
            //Fetch categories
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.value = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //Delete Categories
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.value = state.value.filter((item) => item.catid !== action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            //Update categories
            .addCase(updateCategoryById.pending, (state) => {
                state.error = null;
            })
            .addCase(updateCategoryById.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(updateCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = null;
            })

    }
});

export const { getCategoryByIdReducer } = categorySlice.actions;
export default categorySlice.reducer;