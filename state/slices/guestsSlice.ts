import { Guest, GuestDto } from "@/schemas/guest.schema";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ApiErrorResponse } from "@/types/error";
import axios from "axios";

export const fetchGuests = createAsyncThunk<Guest[], void, { rejectValue: ApiErrorResponse }>(
    "guests/fetchGuests",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get<Guest[]>("/api/guests");
        
            return res.data;
        } catch(err) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || { message: err.message });
            }
            
            return rejectWithValue({ message: (err as Error).message });
        }
    }
);

export const addGuest = createAsyncThunk<Guest, GuestDto, { rejectValue: ApiErrorResponse }>(
    "guests/addGuest",
    async (guest, { rejectWithValue }) => {
        try {
            const res = await axios.post<Guest>("/api/guests", guest);
        
            return res.data;
        } catch(err) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || { message: err.message });
            }
            
            return rejectWithValue({ message: (err as Error).message });
        }
    }
);

interface IState {
    guests: Guest[],
    isLoading: boolean,
    error: ApiErrorResponse | null | undefined
}

const initialState: IState = {
    guests: [],
    isLoading: false,
    error: null
}

const guestsSlice = createSlice({
    name: "guests",
    initialState,
    reducers: {
        
    },
    extraReducers(builder) {
        builder
            // fetchGuests
            .addCase(fetchGuests.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchGuests.fulfilled, (state, action) => {
                state.isLoading = false;
                state.guests = action.payload;
            })
            .addCase(fetchGuests.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? { message: "Unknown error" };
            })

            // addGuest
            .addCase(addGuest.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addGuest.fulfilled, (state, action) => {
                state.isLoading = false;
                state.guests.push(action.payload);
            })
            .addCase(addGuest.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? { message: "Unknown error" };
            })
    },
});

// export {  } = guestsSlice.actions;
export default guestsSlice.reducer;