import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { store } from "@app/store";
import { lightTheme } from "@theme";
import { GlobalStyles } from "./GlobalStyles";
import { Layout } from "@components/layout/Layout/Layout";
import { Loading } from "@components/ui";

// Lazy load pages
const Home = lazy(() => import("@pages/Home/Home"));
const Services = lazy(() => import("@pages/Services/Services"));
const GPContactDetails = lazy(
  () => import("@pages/GPContactDetails/GPContactDetails")
);
const BookingConfirmation = lazy(
  () => import("@pages/BookingConfirmation/BookingConfirmation")
);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <Router>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/gp-contact" element={<GPContactDetails />} />
                <Route path="/confirmation" element={<BookingConfirmation />} />
                <Route
                  path="/"
                  element={<Navigate to="/gp-contact" replace />}
                />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
