import SignIn from "./pages/Auth/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./pages/App/Dashboard";
import { SnackbarProvider } from "notistack";
import React from "react";
import RequireNotAuth from "./components/RequireNotAuth";
import SignUp from "./pages/Auth/SignUp";
import AuthContextProvider, {
  AuthContext,
} from "./context/AuthContextProvider";
import BaseLayout from "./components/BaseLayout";
import RequireAuth from "./components/RequireAuth";
import { Box } from "@mui/material";
import { theme } from "./styles/createTheme";
import { ThemeProvider } from "@mui/material/styles";
import CreateNote from "./pages/App/CreateNote/CreateNote";
import { Provider } from "./pages/App/CreateNote/Context";
import RequestResetPassword from "./pages/Auth/RequestResetPassword";

const App = () => {
  return (
    <Provider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthContextProvider>
          <SnackbarProvider>
            <Router>
              <Box
                sx={{
                  minHeight: "100vh",
                  width: "100%",
                }}
              >
                <Routes>
                  <Route element={<RequireAuth />}>
                    <Route element={<BaseLayout />}>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/create-note" element={<CreateNote />} />
                      <Route
                        path="/create-note/edit/:id"
                        element={<CreateNote />}
                      />
                    </Route>
                  </Route>

                  <Route element={<RequireNotAuth />}>
                    {/* <Route path="/" element={<Dashboard />} /> */}
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                      path="/password-reset"
                      element={<RequestResetPassword />}
                    />
                  </Route>
                </Routes>
              </Box>
            </Router>
          </SnackbarProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </Provider>
  );
};

document.documentElement.setAttribute("data-color-mode", "dark");

export default App;
