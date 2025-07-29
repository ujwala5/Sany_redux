import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchModels = createAsyncThunk('model/fetchModels', async () => {
    const response = await axios.get('http://localhost:8991/V2/showmodels');
    console.log("response ==>>", response.data.data);
    return response.data.data;
})

export const deleteModels = createAsyncThunk('model/deleteModels', async (modelId) => {
    const response = await axios.delete(`http://localhost:8991/V2/models/delete?Modelid=${modelId}`)
    console.log("response ===>>", response.data);
    return modelId;
})

export const modelSlice = createSlice({
    name: "model",
    initialState: {
        model: [],
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            //Fetch Model

            .addCase(fetchModels.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchModels.fulfilled, (state, action) => {
                state.loading = false;
                state.model = action.payload;
            })
            .addCase(fetchModels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //delete model

            .addCase(deleteModels.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteModels.fulfilled, (state, action) => {
                state.loading = false;
                state.model = state.model.filter((item) => item.modelId !== action.payload)
            })
            .addCase(deleteModels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default modelSlice.reducer;