import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NotFound from "./Pages/NotFound";
import Auth from "./Pages/Auth";
import UploadPage from "./Pages/UploadPage";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#00bcd4",
    },
  },
});

function Layout({ children }) {
  const location = useLocation();

  // Hide Header and Footer for /auth route
  const isAuthPage = location.pathname === "/auth";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "linear-gradient(130deg, #000 40%, #FE5F78 100%)",
      }}
    >
      {!isAuthPage && <Header />}
      <main style={{ flexGrow: 1 }}>{children}</main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
