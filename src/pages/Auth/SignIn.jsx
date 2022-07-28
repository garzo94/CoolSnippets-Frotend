import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import useRequestAuth from "../hooks/useRequestAuth";
import Image from "../assets/Image.jpg";
import { theme } from "../../styles/createTheme";

require("react-dom");

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.linkedin.com/in/alexander-garzo/">
        Alexander Garzo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const validationSchema = yup.object({
  username: yup
    .string("Enter your email or username")

    .required("Email/Username is required"),
  password: yup
    .string("Enter your password")
    .min(4, "Password should be of minimum 4 characters length")
    .required("Password is required"),
});

export default function SignIn() {
  const navigate = useNavigate();
  const [valule, setValule] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const { login, register, loading } = useRequestAuth();
  const handleSubmit = (values) => {
    login(values, () => {
      setValule(1);
      navigate("/");
    });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Box
          component={Grid}
          item
          md={7}
          sm={6}
          sx={{
            display: { xs: "none", sm: "flex", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient( 45deg,#0277bd, #1f004d)",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontFamily: "Nanum Gothic Coding",
              fontSize: {
                lg: 60,
                md: 40,
                sm: 30,
              },

              fontWeight: "700",
              color: "white",
            }}
          >
            My Programing Notes
          </Typography>

          <Box
            component="img"
            sx={{
              maxHeight: { xs: 0, sm: 250, md: 300, lg: 350 },
              maxWidth: { xs: 0, sm: 300, md: 350, lg: 400 },
              borderRadius: "20px",
              boxShadow: "-3px -3px 5px #ffff",
              marginTop: "20px",
            }}
            alt="Side image"
            src={Image}
          />
        </Box>

        <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.dark" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" sx={{ color: "primary.dark" }}>
              Sign In
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ input: { color: "#0277bd" } }}
                color="primary"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Email/Username"
                name="username"
                autoComplete="email"
                autoFocus
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                sx={{ input: { color: "#0277bd" } }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={formik.handleChange}
                autoComplete="current-password"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "primary.light",
                  "&:hover": {
                    backgroundColor: "primary",
                  },
                }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
                <Grid item xs sx={{ ml: 20 }}>
                  <Link href="/password-reset">{"Forgot password?"}</Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
