import bookingReducer, {
  setGPContactDetails,
  confirmBooking,
  resetBooking,
  clearError,
  submitGPContactDetails,
} from "@features/booking/bookingSlice";
import { type BookingState } from "@features/booking/bookingTypes";

describe("bookingSlice", () => {
  const initialState: BookingState = {
    gpContactDetails: null,
    isConfirmed: false,
    isLoading: false,
    error: null,
  };

  describe("reducers", () => {
    it("returns initial state", () => {
      expect(bookingReducer(undefined, { type: "unknown" })).toEqual(
        initialState
      );
    });

    it("setGPContactDetails sets contact details", () => {
      const contactDetails = {
        gpName: "Soho Square General Practice",
        email: "anna@gmail.com",
        contactNumber: "+353 78876 0233",
      };

      const state = bookingReducer(
        initialState,
        setGPContactDetails(contactDetails)
      );

      expect(state.gpContactDetails).toEqual(contactDetails);
    });

    it("confirmBooking sets isConfirmed to true", () => {
      const state = bookingReducer(initialState, confirmBooking());

      expect(state.isConfirmed).toBe(true);
    });

    it("resetBooking returns to initial state", () => {
      const modifiedState: BookingState = {
        gpContactDetails: {
          gpName: "Soho Square General Practice",
          email: "anna@gmail.com",
        },
        isConfirmed: true,
        isLoading: false,
        error: "Some error",
      };

      const state = bookingReducer(modifiedState, resetBooking());

      expect(state.gpContactDetails).toBeNull();
      expect(state.isConfirmed).toBe(false);
      expect(state.error).toBeNull();
    });

    it("clearError clears error", () => {
      const stateWithError: BookingState = {
        ...initialState,
        error: "Something went wrong",
      };

      const state = bookingReducer(stateWithError, clearError());

      expect(state.error).toBeNull();
    });
  });

  describe("submitGPContactDetails async thunk", () => {
    it("sets isLoading true when pending", () => {
      const state = bookingReducer(
        initialState,
        submitGPContactDetails.pending("", {
          gpName: "Soho Square General Practice",
          email: "anna@gmail.com",
        })
      );

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("sets gpContactDetails and isConfirmed when fulfilled", () => {
      const contactDetails = {
        gpName: "Soho Square General Practice",
        email: "anna@gmail.com",
        contactNumber: "+353 78876 0233",
      };

      const state = bookingReducer(
        { ...initialState, isLoading: true },
        submitGPContactDetails.fulfilled(contactDetails, "", contactDetails)
      );

      expect(state.isLoading).toBe(false);
      expect(state.gpContactDetails).toEqual(contactDetails);
      expect(state.isConfirmed).toBe(true);
    });

    it("sets error when rejected", () => {
      const state = bookingReducer(
        { ...initialState, isLoading: true },
        submitGPContactDetails.rejected(
          null,
          "",
          {
            gpName: "Soho Square General Practice",
            email: "anna@gmail.com",
          },
          "Email already exists"
        )
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe("Email already exists");
    });
  });
});
