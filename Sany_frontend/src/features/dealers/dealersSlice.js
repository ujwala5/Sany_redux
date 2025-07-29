import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchDealers = createAsyncThunk('dealer/fetchDealers', async () => {
    const response = await axios.get('http://localhost:8991/V2/showdealers');
    console.log("fetch dealer ==>", response.data.data);
    return response.data.data;
});

export const deleteDealers = createAsyncThunk('dealer/deleteDealers', async (dealerId) => {
    const response = await axios.delete(`http://localhost:8991/V2//dealers/delete?Dealerid=${dealerId}`);
    console.log(response.data);
    return dealerId;
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

            //delete dealer

            .addCase(deleteDealers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteDealers.fulfilled, (state, action) => {
                state.loading = false;
                state.dealers = action.payload;
            })
            .addCase(deleteDealers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
})


export default dealerSlice.reducer;