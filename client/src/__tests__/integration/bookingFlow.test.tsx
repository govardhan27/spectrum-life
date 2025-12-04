import {
  renderWithProviders,
  userEvent,
  screen,
  waitFor,
} from "@test/utils/testUtils";
import { GPContactForm } from "@components/forms/GPContactForm/GPContactForm";
import BookingConfirmation from "@pages/BookingConfirmation/BookingConfirmation";

// Mock fetch for API calls
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("Booking Flow Integration", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe("GPContactForm submission", () => {
    it("submits form and updates store on success", async () => {
      const user = userEvent.setup();

      mockFetch.mockResolvedValueOnce({
        json: async () => ({
          success: true,
          data: {
            id: "123",
            gpName: "Soho Square General Practice",
            email: "anna@gmail.com",
            contactNumber: "+353 78876 0233",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        }),
      });

      const { store } = renderWithProviders(<GPContactForm />);

      await user.type(
        screen.getByLabelText(/gp name/i),
        "Soho Square General Practice"
      );
      await user.type(screen.getByLabelText(/email/i), "anna@gmail.com");
      await user.type(
        screen.getByLabelText(/contact number/i),
        "+353 78876 0233"
      );

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /continue/i })
        ).not.toBeDisabled();
      });

      await user.click(screen.getByRole("button", { name: /continue/i }));

      await waitFor(() => {
        const state = store.getState();
        expect(state.booking.isConfirmed).toBe(true);
        expect(state.booking.gpContactDetails).toEqual({
          gpName: "Soho Square General Practice",
          email: "anna@gmail.com",
          contactNumber: "+353 78876 0233",
        });
      });
    });

    it("displays error message on API failure", async () => {
      const user = userEvent.setup();

      mockFetch.mockResolvedValueOnce({
        json: async () => ({
          success: false,
          error: "Email already exists",
        }),
      });

      const initialData = {
        gpName: "Soho Square General Practice",
        email: "anna@gmail.com",
      };

      const { store } = renderWithProviders(
        <GPContactForm initialData={initialData} />
      );

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /continue/i })
        ).not.toBeDisabled();
      });

      await user.click(screen.getByRole("button", { name: /continue/i }));

      await waitFor(() => {
        const state = store.getState();
        expect(state.booking.error).toBe("Email already exists");
        expect(state.booking.isLoading).toBe(false);
      });
    });

    it("shows loading state during submission", async () => {
      const user = userEvent.setup();

      let resolvePromise: (value: unknown) => void;
      mockFetch.mockImplementation(
        () =>
          new Promise((resolve) => {
            resolvePromise = resolve;
          })
      );

      const initialData = {
        gpName: "Soho Square General Practice",
        email: "anna@gmail.com",
      };

      const { store } = renderWithProviders(
        <GPContactForm initialData={initialData} />
      );

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /continue/i })
        ).not.toBeDisabled();
      });

      await user.click(screen.getByRole("button", { name: /continue/i }));

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /submitting/i })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: /submitting/i })
        ).toBeDisabled();
      });

      resolvePromise!({
        json: async () => ({
          success: true,
          data: {
            id: "123",
            gpName: "Soho Square General Practice",
            email: "anna@gmail.com",
            contactNumber: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        }),
      });

      await waitFor(() => {
        const state = store.getState();
        expect(state.booking.isLoading).toBe(false);
      });
    });
  });

  describe("BookingConfirmation", () => {
    it("displays confirmation when booking is confirmed", () => {
      const preloadedState = {
        booking: {
          gpContactDetails: {
            gpName: "Soho Square General Practice",
            email: "anna@gmail.com",
            contactNumber: "+353 78876 0233",
          },
          isConfirmed: true,
          isLoading: false,
          error: null,
        },
      };

      renderWithProviders(<BookingConfirmation />, { preloadedState });

      expect(
        screen.getByRole("heading", { name: /booking confirmed/i })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/you should soon receive an email/i)
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /return to home/i })
      ).toBeInTheDocument();
    });

    it("displays important note alert", () => {
      const preloadedState = {
        booking: {
          gpContactDetails: {
            gpName: "Soho Square General Practice",
            email: "anna@gmail.com",
          },
          isConfirmed: true,
          isLoading: false,
          error: null,
        },
      };

      renderWithProviders(<BookingConfirmation />, { preloadedState });

      expect(screen.getByText(/important note/i)).toBeInTheDocument();
      expect(
        screen.getByText(/clinicians do not call users directly/i)
      ).toBeInTheDocument();
    });

    it("resets booking state when Return to Home is clicked", async () => {
      const user = userEvent.setup();

      const preloadedState = {
        booking: {
          gpContactDetails: {
            gpName: "Soho Square General Practice",
            email: "anna@gmail.com",
          },
          isConfirmed: true,
          isLoading: false,
          error: null,
        },
      };

      const { store } = renderWithProviders(<BookingConfirmation />, {
        preloadedState,
      });

      await user.click(screen.getByRole("button", { name: /return to home/i }));

      await waitFor(() => {
        const state = store.getState();
        expect(state.booking.gpContactDetails).toBeNull();
        expect(state.booking.isConfirmed).toBe(false);
      });
    });
  });
});
