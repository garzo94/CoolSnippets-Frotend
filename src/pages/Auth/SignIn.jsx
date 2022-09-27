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
import "../../styles/Animate.css";

require("react-dom");

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

  // eslint-disable-next-line no-unused-vars
  const { login, register, loading } = useRequestAuth();
  const handleSubmit = (values) => {
    login(values, () => {
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
        <Avatar sx={{ m: 1, bgcolor: "primary.dark" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Box
          component="div"
          className="div"
          sx={{
            left: { lg: "6rem", md: "3rem", sm: "2rem", xs: "1rem" },
            top: "8.4rem",
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
          <Typography
            component="h1"
            className="h1"
            sx={{
              margin: "0",
              padding: "0",
              fontSize: { lg: "4rem", md: "3rem", sm: "2rem", xs: "1rem" },
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
          </Typography>
        </Box>
        <Box
          onSubmit={formik.handleSubmit}
          component="form"
          sx={{
            background: "rgba(255,255,255,0.06)",
            boxShadow: "0 8px 32px 0 rgba(31,38,135,.37)",
            borderRadius: "30px",
            borderLeft: "1px solid rgba(255,255,255,.3)",
            borderTop: "1px solid rgba(255,255,255,.3)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: { lg: "30%", md: "40%", sm: "55%", xs: "75%" },
            height: "61%",
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
            LOGIN
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
            required
            id="username"
            label="Email/Username"
            name="username"
            size="small"
            autoComplete="email"
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            sx={{
              input: {
                color: "#19334d",
                bgcolor: "rgba(255,255,255,0.9)",
                borderRadius: "10px",
              },
              width: "80%",
            }}
            margin="normal"
            required
            color="secondary"
            name="password"
            label="Password"
            size="small"
            type="password"
            id="password"
            onChange={formik.handleChange}
            autoComplete="current-password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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

              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.9)",
              },
            }}
          >
            LOGIN
          </Button>

          <Link
            href="/signup"
            variant="body2"
            sx={{ color: "white", opacity: "0.8" }}
          >
            {"Don't have an account? Sign Up"}
          </Link>

          {/* <Link
            href="/password-reset"
            variant="body1"
            sx={{ color: "white", opacity: "0.8" }}
          >
            {"Forgot password?"}
          </Link> */}

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
        </Box>
      </Box>
    </ThemeProvider>
  );
}
