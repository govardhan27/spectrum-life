import { ThemeProvider } from "styled-components";
import { lightTheme } from "@theme/themes";
import { Button } from "@components/ui/Button/Button";
import { userEvent, screen, render } from "@test/utils/testUtils";

const renderButton = (props = {}) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      <Button {...props}>Click me</Button>
    </ThemeProvider>
  );
};

describe("Button", () => {
  describe("rendering", () => {
    it("renders children correctly", () => {
      renderButton();

      expect(
        screen.getByRole("button", { name: /click me/i })
      ).toBeInTheDocument();
    });

    it("renders as primary variant by default", () => {
      renderButton();

      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders with specified type", () => {
      renderButton({ type: "button" });

      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });
  });

  describe("variants", () => {
    it("renders primary variant", () => {
      renderButton({ variant: "primary" });

      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders secondary variant", () => {
      renderButton({ variant: "secondary" });

      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("states", () => {
    it("can be disabled", () => {
      renderButton({ disabled: true });

      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("sets aria-disabled when disabled", () => {
      renderButton({ disabled: true });

      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-disabled",
        "true"
      );
    });

    it("sets aria-busy when loading", () => {
      renderButton({ isLoading: true });

      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    });
  });

  describe("user interactions", () => {
    it("calls onClick when clicked", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      renderButton({ onClick: handleClick, type: "button" });

      await user.click(screen.getByRole("button"));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      renderButton({ onClick: handleClick, disabled: true, type: "button" });

      await user.click(screen.getByRole("button"));

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("accessibility", () => {
    it("is focusable", async () => {
      const user = userEvent.setup();
      renderButton({ type: "button" });

      await user.tab();

      expect(screen.getByRole("button")).toHaveFocus();
    });

    it("is not focusable when disabled", async () => {
      const user = userEvent.setup();
      renderButton({ disabled: true, type: "button" });

      await user.tab();

      expect(screen.getByRole("button")).not.toHaveFocus();
    });
  });
});
