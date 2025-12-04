import {
  renderWithProviders,
  userEvent,
  screen,
  waitFor,
} from "@test/utils/testUtils";
import BookingConfirmation from "@pages/BookingConfirmation/BookingConfirmation";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("BookingConfirmation", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe("rendering", () => {
    it("renders success icon", () => {
      const preloadedState = {
        booking: {
          gpContactDetails: {
            gpName: "Soho Square General Practice",
            email: "anna@gmail.com",
          },
          isConfirmed: false,
          isLoading: false,
          error: null,
        },
      };

      renderWithProviders(<BookingConfirmation />, { preloadedState });

      const svgIcons = screen.getAllByTestId("svg-mock");
      expect(svgIcons.length).toBeGreaterThanOrEqual(1);
    });

    it("renders confirmation heading", () => {
      const preloadedState = {
        booking: {
          gpContactDetails: {
            gpName: "Soho Square General Practice",
            email: "anna@gmail.com",
          },
          isConfirmed: false,
          isLoading: false,
          error: null,
        },
      };

      renderWithProviders(<BookingConfirmation />, { preloadedState });

      expect(
        screen.getByRole("heading", { name: /booking confirmed/i })
      ).toBeInTheDocument();
    });

    it("renders email confirmation message", () => {
      const preloadedState = {
        booking: {
          gpContactDetails: {
            gpName: "Soho Square General Practice",
            email: "anna@gmail.com",
          },
          isConfirmed: false,
          isLoading: false,
          error: null,
        },
      };

      renderWithProviders(<BookingConfirmation />, { preloadedState });

      expect(
        screen.getByText(/you should soon receive an email/i)
      ).toBeInTheDocument();
    });

    it("renders calendar navigation instruction", () => {
      const preloadedState = {
        booking: {
          gpContactDetails: {
            gpName: "Soho Square General Practice",
            email: "anna@gmail.com",
          },
          isConfirmed: false,
          isLoading: false,
          error: null,
        },
      };

      renderWithProviders(<BookingConfirmation />, { preloadedState });

      expect(
        screen.getByText(/clicking the calendar icon/i)
      ).toBeInTheDocument();
    });

    it("renders important note alert", () => {
      const preloadedState = {
        booking: {
          gpContactDetails: {
            gpName: "Soho Square General Practice",
            email: "anna@gmail.com",
          },
          isConfirmed: false,
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

    it("renders Return to Home button", () => {
      const preloadedState = {
        booking: {
          gpContactDetails: {
            gpName: "Soho Square General Practice",
            email: "anna@gmail.com",
          },
          isConfirmed: false,
          isLoading: false,
          error: null,
        },
      };

      renderWithProviders(<BookingConfirmation />, { preloadedState });

      expect(
        screen.getByRole("button", { name: /return to home/i })
      ).toBeInTheDocument();
    });
  });

  describe("redirects", () => {
    it("redirects to gp-contact when no GP details exist", async () => {
      const preloadedState = {
        booking: {
          gpContactDetails: null,
          isConfirmed: false,
          isLoading: false,
          error: null,
        },
      };

      renderWithProviders(<BookingConfirmation />, { preloadedState });

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/gp-contact");
      });
    });

    it("does not redirect when GP details exist", () => {
      const preloadedState = {
        booking: {
          gpContactDetails: {
            gpName: "Soho Square General Practice",
            email: "anna@gmail.com",
          },
          isConfirmed: false,
          isLoading: false,
          error: null,
        },
      };

      renderWithProviders(<BookingConfirmation />, { preloadedState });

      expect(mockNavigate).not.toHaveBeenCalledWith("/gp-contact");
    });
  });

  describe("user interactions", () => {
    it("navigates to home when Return to Home is clicked", async () => {
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

      renderWithProviders(<BookingConfirmation />, { preloadedState });

      await user.click(screen.getByRole("button", { name: /return to home/i }));

      expect(mockNavigate).toHaveBeenCalledWith("/home");
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

  describe("accessibility", () => {
    it("Return to Home button has correct type", () => {
      const preloadedState = {
        booking: {
          gpContactDetails: {
            gpName: "Soho Square General Practice",
            email: "anna@gmail.com",
          },
          isConfirmed: false,
          isLoading: false,
          error: null,
        },
      };

      renderWithProviders(<BookingConfirmation />, { preloadedState });

      expect(
        screen.getByRole("button", { name: /return to home/i })
      ).toHaveAttribute("type", "button");
    });
  });
});
