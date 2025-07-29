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

export const addCategory = createAsyncThunk('category/addCategory', async (categoryName) => {
    console.log("categoryName==>>", categoryName);
    const response = await axios.post('http://localhost:8991/v2/categories/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.parse({
            Categoryname: categoryName,

        })
    })
    console.log("response from addCategory asyncThnk ===>>", response);
    return response.data;
})

export const updateCategoryById = createAsyncThunk('category/updateCategoryById', async ({ catId, catName }) => {
    try {
        // console.log("updateCategoryById===>>", catId);
        // console.log("updateCategoryById values==>>", JSON.parse(JSON.stringify(catName)));
        let categoryValues = JSON.parse(JSON.stringify(catName));
        console.log("categoryValues==>>", categoryValues);
        const response = await axios.put(`http://localhost:8991/V2/categories/edit?Categoryid=${catId}`, {
            header: {
                'Content-Type': 'application/json',
            },
            data: {
                Categoryname: categoryValues,
                Categorystatus: 1

            },
        });
        console.log("response ====>>", response);
        // return { catId, categoryValues };
    } catch (err) {
        console.log("err==>", err.message);
    }

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
            // console.log("id==>>", id);
            // console.log("state====>>", JSON.parse(JSON.stringify(state.value)));

            const found = state.value.find(item => item.catid == id);
            // console.log("found==>>", found);
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

            // Add categories
            .addCase(addCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false;
                // state.value.push(action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })















            //Update categories
            .addCase(updateCategoryById.pending, (state) => {
                state.error = null;
            })
            .addCase(updateCategoryById.fulfilled, (state, action) => {
                console.log("state==>>", state);
                console.log("action==>>", action);

                // const updatedCategory = action.payload;
                // const index = state.value.findIndex(item => item.catid === updatedCategory.catid);
                // if (index !== -1) {
                //     state.value[index] = updatedCategory;
                // }


            })
            .addCase(updateCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = null;
            })

    }
});

export const { getCategoryByIdReducer } = categorySlice.actions;
export default categorySlice.reducer;