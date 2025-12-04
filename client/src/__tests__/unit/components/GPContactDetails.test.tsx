import { renderWithProviders, screen, waitFor } from "@test/utils/testUtils";
import GPContactDetails from "@pages/GPContactDetails/GPContactDetails";

describe("GPContactDetails", () => {
  describe("rendering", () => {
    it("renders GPContactForm", () => {
      renderWithProviders(<GPContactDetails />);

      expect(
        screen.getByRole("heading", {
          name: /please confirm or add to the below gp contact details/i,
        })
      ).toBeInTheDocument();
    });

    it("renders form fields", () => {
      renderWithProviders(<GPContactDetails />);

      expect(screen.getByLabelText(/gp name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/contact number/i)).toBeInTheDocument();
    });

    it("renders with empty form when no existing data", () => {
      renderWithProviders(<GPContactDetails />);

      expect(screen.getByLabelText(/gp name/i)).toHaveValue("");
      expect(screen.getByLabelText(/email/i)).toHaveValue("");
      expect(screen.getByLabelText(/contact number/i)).toHaveValue("");
    });

    it("renders with existing data from store", async () => {
      const preloadedState = {
        booking: {
          gpContactDetails: {
            gpName: "Soho Square General Practice",
            email: "anna@gmail.com",
            contactNumber: "+353 78876 0233",
          },
          isConfirmed: false,
          isLoading: false,
          error: null,
        },
      };

      renderWithProviders(<GPContactDetails />, { preloadedState });

      await waitFor(() => {
        expect(screen.getByLabelText(/gp name/i)).toHaveValue(
          "Soho Square General Practice"
        );
        expect(screen.getByLabelText(/email/i)).toHaveValue("anna@gmail.com");
        expect(screen.getByLabelText(/contact number/i)).toHaveValue(
          "+353 78876 0233"
        );
      });
    });
  });
});
