import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchSubCategories = createAsyncThunk('subcategory/fetchSubCategories', async () => {
    const response = await axios.get('http://localhost:8991/V2/subcategories')
    console.log("response ==>>", response);

    return response.data.data;
})

export const deleteSubCategories = createAsyncThunk('subcategory/deleteSubCategories', async (SubCategoryId) => {
    const response = await axios.delete(`http://localhost:8991/V2/subcategories/delete?SubCategoryid=${SubCategoryId}`)
    console.log("response ==>", response.data);
    return SubCategoryId;
})

export const addSubCategories = createAsyncThunk('subcategory/addSubCategories', async (values) => {
    console.log("addSubCategories values ==>>", values);

    const response = await axios.post('http://localhost:8991/v2/subcategories/create', {
        headers: {
            'Content-Type': 'application/json',
        },

        Categoryname: values.category,
        SubCategoryname: values.subCategoryName


    })
    console.log("addSubCategories response ==>", response);
    return response.data;
})

export const subCategoriesSlice = createSlice({
    name: 'subcategory',
    initialState: {
        subCategory: [],
        loading: false,
        error: null,
        subcategoryName: '',
        categoryName: ''
    },
    reducers: {

        getSubCategoryByIdReducer: (state, action) => {
            const id = action.payload;

            const found = state.subCategory.find(item => item.subcatid == id);
            console.log("found ===>>", found);
            if (found) {
                state.subcategoryName = found.subcatname;
                state.categoryName = found.catname;
            } else {
                state.subcategoryName = ""; // clear if not found
            }
        }

    },
    extraReducers: (builder) => {
        builder
            //Fetch sub-categories

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

            // delete sub categories
            .addCase(deleteSubCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSubCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.subCategory = state.subCategory.filter((item) => item.SubCategoryId !== action.payload)
            })
            .addCase(deleteSubCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //add sub categories
            .addCase(addSubCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addSubCategories.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(addSubCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }


})

export const { getSubCategoryByIdReducer } = subCategoriesSlice.actions;
export default subCategoriesSlice.reducer;