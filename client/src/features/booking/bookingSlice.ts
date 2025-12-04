import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import type { GPContactFormData } from "@types";
import type { BookingState, APIResponse } from "./bookingTypes";

import { API_BASE_URL } from "@config/api";

// Async thunk for submitting GP contact details
export const submitGPContactDetails = createAsyncThunk<
  GPContactFormData,
  GPContactFormData,
  { rejectValue: string }
>("booking/submitGPContactDetails", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gp-contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gpName: data.gpName,
        email: data.email,
        ...(data.contactNumber && { contactNumber: data.contactNumber }),
      }),
    });

    const result: APIResponse = await response.json();

    if (!result.success) {
      // API returns { success: false, error: "Email already exists" }
      return rejectWithValue(result.error);
    }

    // API returns { success: true, data: GPContact }
    return {
      gpName: result.data.gpName,
      email: result.data.email,
      contactNumber: result.data.contactNumber ?? undefined,
    };
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Network error occurred"
    );
  }
});

const initialState: BookingState = {
  gpContactDetails: null,
  isConfirmed: false,
  isLoading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setGPContactDetails: (state, action: PayloadAction<GPContactFormData>) => {
      state.gpContactDetails = action.payload;
    },
    confirmBooking: (state) => {
      state.isConfirmed = true;
    },
    resetBooking: (state) => {
      state.gpContactDetails = null;
      state.isConfirmed = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitGPContactDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitGPContactDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gpContactDetails = action.payload;
        state.isConfirmed = true;
      })
      .addCase(submitGPContactDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "An unexpected error occurred";
      });
  },
});

export const { setGPContactDetails, confirmBooking, resetBooking, clearError } =
  bookingSlice.actions;
export default bookingSlice.reducer;
