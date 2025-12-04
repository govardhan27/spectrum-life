import { ThemeProvider } from "styled-components";
import { lightTheme } from "@theme/themes";
import { Input } from "@components/ui/Input/Input";
import { userEvent, screen, render } from "@test/utils/testUtils";

const renderInput = (props = {}) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      <Input {...props} />
    </ThemeProvider>
  );
};

describe("Input", () => {
  describe("rendering", () => {
    it("renders input element", () => {
      renderInput({ label: "Email" });

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it("renders label when provided", () => {
      renderInput({ label: "GP Name" });

      expect(screen.getByText(/gp name/i)).toBeInTheDocument();
    });

    it("renders placeholder when provided", () => {
      renderInput({ label: "Phone", placeholder: "+353 78876 0233" });

      expect(
        screen.getByPlaceholderText("+353 78876 0233")
      ).toBeInTheDocument();
    });

    it("renders with correct input type", () => {
      renderInput({ label: "Email", type: "email" });

      expect(screen.getByLabelText(/email/i)).toHaveAttribute("type", "email");
    });
  });

  describe("error state", () => {
    it("displays error message when provided", () => {
      renderInput({ label: "Email", error: "Invalid email format" });

      expect(screen.getByText("Invalid email format")).toBeInTheDocument();
    });

    it("error message has alert role", () => {
      renderInput({ label: "Email", error: "Invalid email" });

      expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
    });

    it("sets aria-invalid when error exists", () => {
      renderInput({ label: "Email", error: "Invalid email" });

      expect(screen.getByLabelText(/email/i)).toHaveAttribute(
        "aria-invalid",
        "true"
      );
    });

    it("associates error with input via aria-describedby", () => {
      renderInput({ label: "Email", error: "Invalid email" });

      const input = screen.getByLabelText(/email/i);
      const errorId = input.getAttribute("aria-describedby");

      expect(errorId).toBeTruthy();
      expect(screen.getByRole("alert")).toHaveAttribute("id", errorId);
    });
  });

  describe("user interactions", () => {
    it("allows user to type", async () => {
      const user = userEvent.setup();
      renderInput({ label: "Email" });

      await user.type(screen.getByLabelText(/email/i), "anna@gmail.com");

      expect(screen.getByLabelText(/email/i)).toHaveValue("anna@gmail.com");
    });

    it("calls onChange when value changes", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      renderInput({ label: "Email", onChange: handleChange });

      await user.type(screen.getByLabelText(/email/i), "a");

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("accessibility", () => {
    it("associates label with input", () => {
      renderInput({ label: "GP Name" });

      const input = screen.getByLabelText(/gp name/i);
      expect(input).toBeInTheDocument();
    });

    it("supports autocomplete attribute", () => {
      renderInput({ label: "Email", autoComplete: "email" });

      expect(screen.getByLabelText(/email/i)).toHaveAttribute(
        "autocomplete",
        "email"
      );
    });

    it("is focusable", async () => {
      const user = userEvent.setup();
      renderInput({ label: "Email" });

      await user.tab();

      expect(screen.getByLabelText(/email/i)).toHaveFocus();
    });

    it("generates id from label when not provided", () => {
      renderInput({ label: "GP Name" });

      expect(screen.getByLabelText(/gp name/i)).toHaveAttribute(
        "id",
        "input-gp-name"
      );
    });

    it("uses provided id", () => {
      renderInput({ label: "Email", id: "custom-email-id" });

      expect(screen.getByLabelText(/email/i)).toHaveAttribute(
        "id",
        "custom-email-id"
      );
    });
  });
});
