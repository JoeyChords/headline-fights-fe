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
import normalizeEmail from "validator/lib/normalizeEmail";
import Footer from "@/app/components/footer/footer";
import AppBarLoggedOut from "@/app/components/app-bar/appBarLoggedOut.js";
import { deepPurple } from "@mui/material/colors";
const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;

export default function ForgotPassword() {
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
        };

        let response = await fetch(`${API_ENDPOINT}/forgotPassword`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInput),
        });
        response = await response.text();
        response = await JSON.parse(response);

        if (response.email_sent) {
          setError(false);
          setHelperText("Your email has been sent.");
        } else {
          setError(true);
          setHelperText("Something is wrong with your email address.");
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
              Forgot Password
            </Typography>
            <Typography component="p" variant="p" textAlign={"center"} mt=".75rem">
              Enter the email you signed up with and we will send instructions on how to reset your password.
            </Typography>
            <FormHelperText error={error} color={deepPurple["A100"]} sx={{ color: "green" }}>
              {helperText}
            </FormHelperText>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth name="email" label="Email" type="email" id="email" autoComplete="email" />
              <Button
                type="submit"
                size="large"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, textTransform: "capitalize", borderRadius: "100vw", fontSize: { lg: "1.25rem", xs: "1.25rem" } }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer></Footer>
    </>
  );
}
