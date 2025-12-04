import { ThemeProvider } from "styled-components";
import { lightTheme } from "@theme/themes";
import { PageContainer } from "@components/layout/PageContainer/PageContainer";
import { screen, render } from "@test/utils/testUtils";

const renderPageContainer = (props = {}) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      <PageContainer {...props}>
        <div>Test content</div>
      </PageContainer>
    </ThemeProvider>
  );
};

describe("PageContainer", () => {
  describe("rendering", () => {
    it("renders children", () => {
      renderPageContainer();

      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("renders as main element", () => {
      renderPageContainer();

      expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("contains children within main element", () => {
      renderPageContainer();

      expect(screen.getByRole("main")).toHaveTextContent("Test content");
    });
  });
});
