import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchDealers = createAsyncThunk('dealer/fetchDealers', async () => {
    const response = await axios.get('http://localhost:8991/V2/showdealers');
    console.log("fetch dealer ==>", response.data.data);
    return response.data.data;
})

export const dealerSlice = createSlice({
    name: "dealer",
    initialState: {
        dealers: [],
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder

            //fetch dealers

            .addCase(fetchDealers.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchDealers.fulfilled, (state, action) => {
                state.loading = false;
                state.dealers = action.payload;

            })
            .addCase(fetchDealers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }
})


export default dealerSlice.reducer;