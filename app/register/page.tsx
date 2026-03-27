"use client";
import AppBarRegisterPage from "../components/app-bar/appBarRegisterPage";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { useRouter } from "next/navigation";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import normalizeEmail from "validator/lib/normalizeEmail";
import Footer from "@/app/components/footer/footer";

import config from "@/app/config";
const API_ENDPOINT = config.API_ENDPOINT;

function Copyright(props: any) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="/">
        Headline Fights
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const [helperText, setHelperText] = React.useState("");
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError(false);

    const data: any = new FormData(event.currentTarget);

    const userInput: any = {
      name: data.get("name"),
      email: normalizeEmail(data.get("email")),
      password: data.get("password"),
    };

    if (!isEmail(userInput.email)) {
      setError(true);
      setHelperText("Please enter a valid email address");
      return;
    }
    if (!isStrongPassword(userInput.password)) {
      setError(true);
      setHelperText(
        "Password must be at least 8 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
      );
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`${API_ENDPOINT}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInput),
      });
      if (!res.ok) {
        setError(true);
        setHelperText("Something went wrong");
        setIsLoading(false);
        return;
      }
      const response = await res.json();
      //Check to see if the email address is available
      if (response.available == "True") {
        sessionStorage.setItem("pendingVerifyEmail", userInput.email);
        router.push("/verify");
      } else if (response.validEmail == "False") {
        setError(true);
        setHelperText("Please enter a valid email address");
        setIsLoading(false);
      } else {
        setError(true);
        setHelperText("The email address you entered is already in use");
        setIsLoading(false);
      }
    } catch {
      setError(true);
      setHelperText("Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBarRegisterPage></AppBarRegisterPage>
        <Box component="main">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                variant="square"
                src="/logo-icon-512x512.png"
                sx={{ mb: ".75rem", width: 56, height: 56 }}
              ></Avatar>

              <Typography component="h1" variant="h4" fontWeight={500}>
                Sign Up
              </Typography>
              <FormHelperText error={error}>{helperText}</FormHelperText>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField required fullWidth id="name" label="Name" name="name" autoComplete="name" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      type="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  size="large"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    textTransform: "capitalize",
                    borderRadius: "100vw",
                    fontSize: { lg: "1.25rem", xs: "1.25rem" },
                  }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
        <Footer></Footer>
      </ThemeProvider>
    </>
  );
}
