"use client";
import AppBarLoginPage from "@/app/components/app-bar/appBarLoginPage.js";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import normalizeEmail from "validator/lib/normalizeEmail";
import Footer from "@/app/components/footer/footer";
import Stack from "@mui/material/Stack";

import config from "@/app/config";
const API_ENDPOINT = config.API_ENDPOINT;

export default function SignIn() {
  const [helperText, setHelperText] = React.useState("");
  const [error, setError] = React.useState(true);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (event) => {
      try {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userInput = {
          email: normalizeEmail(data.get("email")),
          password: data.get("password"),
        };

        const rawResponse = await fetch(`${API_ENDPOINT}/login`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInput),
        });
        if (rawResponse.status === 429) {
          setHelperText("Too many login attempts. Please try again later.");
          return;
        }
        if (rawResponse.status === 401) {
          setHelperText("Something is wrong with your email or password");
          return;
        }
        if (!rawResponse.ok) {
          setHelperText("Something went wrong");
          return;
        }
        const response = await rawResponse.json();
        if (response.email_verified) {
          if (response.isSignedIn === "True") {
            setError(false);
            setHelperText("Loading...");
            sessionStorage.setItem("userName", response.user);
            router.push("/game");
          }
        } else {
          sessionStorage.setItem("pendingVerifyEmail", userInput.email);
          router.push("/verify");
        }
      } catch (err) {
        setHelperText("Something went wrong");
      }
    },
    [router]
  );

  return (
    <>
      <style>{"body { background-color: #f5f5f5; }"}</style>
      <AppBarLoginPage></AppBarLoginPage>
      <Box component="main">
        <Container maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar variant="square" src="/logo-icon-512x512.png" sx={{ mb: ".75rem", width: 56, height: 56 }}></Avatar>
            <Typography component="h1" variant="h4" fontWeight={500}>
              Sign In
            </Typography>
            <FormHelperText error={error}>{helperText}</FormHelperText>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                size="large"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, textTransform: "capitalize", borderRadius: "100vw", fontSize: { lg: "1.25rem", xs: "1.25rem" } }}
              >
                Sign In
              </Button>
              <Stack>
                <Link href="/register" variant="body2" mx={"auto"} mb=".5rem">
                  {"Don't have an account? Sign Up"}
                </Link>

                <Link href="/forgotPassword" variant="body2" mx={"auto"}>
                  {"I forgot my password"}
                </Link>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer></Footer>
    </>
  );
}
