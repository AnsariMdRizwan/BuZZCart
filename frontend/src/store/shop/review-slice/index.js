import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    reviews: []
}

export const addReview = createAsyncThunk(
    '/add/addReview',
    async (formData) => {
        const result = await axios.post(`http://localhost:4000/api/shop/review/add`, formData

        )

        return result.data;

    }
)
export const getProductReview = createAsyncThunk(
    '/review/getProductReview',
    async (id) => {
        const result = await axios.get(`http://localhost:4000/api/shop/review/${id}`)

        return result.data;

    }
)



const reviewSlice = createSlice({
    name: 'reviewSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductReview.pending, (state) => {
            state.isLoading = true
        }).addCase(getProductReview.fulfilled, (state, action) => {
            state.isLoading = false,
            state.reviews = action.payload.data
        }).addCase(getProductReview.rejected, (state) => {
            state.isLoading = false
            state.reviews = []
        })
    }
})

export default reviewSlice.reducer
