import { render, screen, waitFor } from "@test/utils/testUtils";
import App from "@/App";

describe("App", () => {
  it("renders without crashing", async () => {
    render(<App />);

    await waitFor(() => {
      expect(document.body).toBeInTheDocument();
    });
  });

  it("renders layout with header", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });
  });

  it("redirects to gp-contact by default", async () => {
    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText(
          /please confirm or add to the below gp contact details/i
        )
      ).toBeInTheDocument();
    });
  });
});
