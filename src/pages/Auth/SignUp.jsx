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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import useRequestAuth from "../hooks/useRequestAuth";
import Image from "../assets/Image.jpg";
import { lightBlue, deepPurple } from "@mui/material/colors";

require("react-dom");

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: lightBlue[800],
      light: lightBlue[600],
      dark: lightBlue[900],
    },
    secondary: {
      main: deepPurple[700],
      light: deepPurple[500],
      dark: deepPurple[900],
    },
  },
});

const validationSchema = yup.object({
  username: yup
    .string("Enter your email or username")
    .required("Username is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: yup
    .string("Enter your password")
    .min(4, "Password should be of minimum 4 characters length")
    .required("Password is required"),
  password2: yup
    .string("Confirm your password")
    .min(4, "Password should be of minimum 4 characters length")
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});

export default function SignUp() {
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const { login, register, loading } = useRequestAuth();
  const handleSubmit = (values) => {
    register(values, () => {
      navigate("/signin");
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
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to right,#19334d,#290066)",
          position: "relative",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
          <LockOutlinedIcon />
        </Avatar>

        <div
          className="div"
          style={{
            left: "5.6rem",
            top: "7rem",
            position: "absolute",
          }}
        >
          <h4
            style={{
              margin: "0",
              padding: "0",
              color: "white",
              fontFamily: "poppins",
            }}
          >
            Let's create...
          </h4>
          <h1
            style={{
              margin: "0",
              padding: "0",
              fontSize: "4rem",
              fontFamily: "poppins",
              color: "#fff",
              textShadow:
                "0 0 10PX #21ebff, 0 0 20px #21ebff, 0 0 80px #21ebff, 0 0 120px",
            }}
          >
            C<span>oo</span>
            <span>l</span>
            <span>Snip</span>
            <span>pet</span>
            <span>s</span>
          </h1>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            background: "rgba(255,255,255,0.06)",
            boxShadow: "0 8px 32px 0 rgba(31,38,135,.37)",
            borderRadius: "30px",
            borderLeft: "1px solid rgba(255,255,255,.3)",
            borderTop: "1px solid rgba(255,255,255,.3)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "30%",
            height: "80%",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontFamily: "'Poppins', sans-serif;",
              alignContent: "center",
              textAlign: "center",
              m: "15px",
              fontWeight: "500",
              opacity: ".7",
              letterSpacing: "3px",
            }}
          >
            SIGN UP
          </Typography>
          <TextField
            sx={{
              input: {
                color: "#19334d",
                fontWeight: "300",
                bgcolor: "rgba(255,255,255,0.9)",
                borderRadius: "10px",
              },
              width: "80%",
            }}
            color="secondary"
            margin="normal"
            size="small"
            required
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            sx={{
              input: {
                color: "#19334d",
                fontWeight: "300",
                bgcolor: "rgba(255,255,255,0.9)",
                borderRadius: "10px",
              },
              width: "80%",
            }}
            color="secondary"
            size="small"
            margin="normal"
            required
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            sx={{
              input: {
                color: "#19334d",
                fontWeight: "300",
                bgcolor: "rgba(255,255,255,0.9)",
                borderRadius: "10px",
              },
              width: "80%",
            }}
            color="secondary"
            margin="normal"
            required
            size="small"
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={formik.handleChange}
            autoComplete="current-password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            sx={{
              input: {
                color: "#19334d",
                fontWeight: "300",
                bgcolor: "rgba(255,255,255,0.9)",
                borderRadius: "10px",
              },
              width: "80%",
            }}
            margin="normal"
            required
            color="secondary"
            size="small"
            name="password2"
            label="Confrim Password"
            type="password"
            id="password2"
            onChange={formik.handleChange}
            autoComplete="current-password"
            error={formik.touched.password2 && Boolean(formik.errors.password2)}
            helperText={formik.touched.password2 && formik.errors.password2}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "rgba(255,255,255,0.7)",
              width: "50%",
              opacity: ".7",
              fontWeith: "500",
              borderRadius: "20px",
              borderLeft: "2px solid rgba(33, 235, 255, 0.5)",
              borderTop: "2px solid rgba(33, 235, 255, 0.5)",
              color: "#19334d",

              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.9)",
              },
            }}
          >
            SIGN UP
          </Button>

          <Link
            href="/signin"
            variant="body2"
            sx={{ color: "white", opacity: "0.8" }}
          >
            {"Already have an account? Sign In"}
          </Link>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.15)", marginTop: "20px" }}
            align="center"
          >
            {"Copyright © "}
            <Link
              color="inherit"
              href="https://www.linkedin.com/in/alexander-garzo/"
            >
              Alexander Garzo
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </form>
      </Box>
    </ThemeProvider>
  );
}
