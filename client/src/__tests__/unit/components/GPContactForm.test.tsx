import {
  renderWithProviders,
  userEvent,
  screen,
  waitFor,
} from "@test/utils/testUtils";
import { GPContactForm } from "@components/forms/GPContactForm/GPContactForm";

describe("GPContactForm", () => {
  describe("rendering", () => {
    it("renders form heading", () => {
      renderWithProviders(<GPContactForm />);

      expect(
        screen.getByRole("heading", {
          name: /please confirm or add to the below gp contact details/i,
        })
      ).toBeInTheDocument();
    });

    it("renders all form fields", () => {
      renderWithProviders(<GPContactForm />);

      expect(screen.getByLabelText(/gp name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/contact number/i)).toBeInTheDocument();
    });

    it("renders Previous and Continue buttons", () => {
      renderWithProviders(<GPContactForm />);

      expect(
        screen.getByRole("button", { name: /previous/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /continue/i })
      ).toBeInTheDocument();
    });

    it("renders with initial data when provided", async () => {
      const initialData = {
        gpName: "Soho Square General Practice",
        email: "anna@gmail.com",
        contactNumber: "+353 78876 0233",
      };

      renderWithProviders(<GPContactForm initialData={initialData} />);

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

  describe("validation", () => {
    it("shows error when gpName is empty on blur", async () => {
      const user = userEvent.setup();
      renderWithProviders(<GPContactForm />);

      const gpNameInput = screen.getByLabelText(/gp name/i);
      await user.click(gpNameInput);
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/gp name is required/i)).toBeInTheDocument();
      });
    });

    it("shows error for invalid email on blur", async () => {
      const user = userEvent.setup();
      renderWithProviders(<GPContactForm />);

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, "invalid-email");
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/invalid/i)).toBeInTheDocument();
      });
    });

    it("shows error for contact number without country code", async () => {
      const user = userEvent.setup();
      renderWithProviders(<GPContactForm />);

      const contactInput = screen.getByLabelText(/contact number/i);
      await user.type(contactInput, "0789760233");
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/must start with \+/i)).toBeInTheDocument();
      });
    });
  });

  describe("user interactions", () => {
    it("allows user to fill out form", async () => {
      const user = userEvent.setup();
      renderWithProviders(<GPContactForm />);

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
        expect(screen.getByLabelText(/gp name/i)).toHaveValue(
          "Soho Square General Practice"
        );
        expect(screen.getByLabelText(/email/i)).toHaveValue("anna@gmail.com");
        expect(screen.getByLabelText(/contact number/i)).toHaveValue(
          "+353 78876 0233"
        );
      });
    });

    it("disables Continue button when form is invalid", () => {
      renderWithProviders(<GPContactForm />);

      expect(screen.getByRole("button", { name: /continue/i })).toBeDisabled();
    });
  });

  describe("accessibility", () => {
    it("form has accessible name via heading", () => {
      renderWithProviders(<GPContactForm />);

      expect(screen.getByRole("form")).toHaveAttribute(
        "aria-labelledby",
        "form-heading"
      );
    });

    it("buttons are grouped with accessible label", () => {
      renderWithProviders(<GPContactForm />);

      expect(
        screen.getByRole("group", { name: /form actions/i })
      ).toBeInTheDocument();
    });

    it("inputs have proper autocomplete attributes", () => {
      renderWithProviders(<GPContactForm />);

      expect(screen.getByLabelText(/gp name/i)).toHaveAttribute(
        "autocomplete",
        "name"
      );
      expect(screen.getByLabelText(/email/i)).toHaveAttribute(
        "autocomplete",
        "email"
      );
      expect(screen.getByLabelText(/contact number/i)).toHaveAttribute(
        "autocomplete",
        "tel"
      );
    });
  });
});
