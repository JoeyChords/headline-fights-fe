"use client";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import isStrongPassword from "validator/lib/isStrongPassword";
import Footer from "@/app/components/footer/footer";
import { useSearchParams } from "next/navigation";
import AppBarLoggedOut from "@/app/components/app-bar/appBarLoggedOut.js";
const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;

export default function SignIn() {
  const email = useSearchParams().get("email");
  const token = useSearchParams().get("token");

  const [helperText, setHelperText] = React.useState("");
  const [error, setError] = React.useState(true);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (event) => {
      try {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userInput = {
          email: email,
          token: token,
          password: data.get("password"),
        };
        if (isStrongPassword(userInput.password)) {
          let response = await fetch(`${API_ENDPOINT}/resetPassword`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInput),
          });
          response = await response.text();
          response = await JSON.parse(response);

          if (response.submitted_in_time) {
            router.push("/login");
          } else if (!response.submitted_in_time && user_exists) {
            setError(true);
            setHelperText("The link has expired.");
          } else {
            setError(true);
            setHelperText("Something went wrong");
          }
        } else {
          setError(true);
          setHelperText(
            "Password must be at least 8 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
          );
        }
      } catch (err) {
        setError(true);
        setHelperText("Something went wrong");
      }
    },
    [router]
  );

  return (
    <>
      <style>{"body { background-color: #f5f5f5; }"}</style>
      <AppBarLoggedOut></AppBarLoggedOut>
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
              Reset Password
            </Typography>
            <Typography component="p" variant="p" textAlign={"center"} mt=".75rem">
              Enter a new strong password.
            </Typography>
            <FormHelperText error={error}>{helperText}</FormHelperText>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
              <Button
                type="submit"
                size="large"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, textTransform: "capitalize", borderRadius: "100vw", fontSize: { lg: "1.25rem", xs: "1.25rem" } }}
              >
                Set Password
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer></Footer>
    </>
  );
}
