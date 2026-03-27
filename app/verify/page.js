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
import { useCallback, useEffect } from "react";
import normalizeEmail from "validator/lib/normalizeEmail";
import Footer from "@/app/components/footer/footer";
import AppBarLoggedOut from "@/app/components/app-bar/appBarLoggedOut.js";
import config from "@/app/config";
const API_ENDPOINT = config.API_ENDPOINT;

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [helperText, setHelperText] = React.useState("");
  const [error, setError] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    const pendingEmail = sessionStorage.getItem("pendingVerifyEmail") ?? "";
    setEmail(pendingEmail);
    sessionStorage.removeItem("pendingVerifyEmail");
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      try {
        event.preventDefault();
        setIsLoading(true);
        const data = new FormData(event.currentTarget);

        const userInput = {
          email: normalizeEmail(email),
          code: data.get("code"),
        };

        const rawResponse = await fetch(`${API_ENDPOINT}/verify`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInput),
        });
        if (rawResponse.status === 429) {
          setHelperText("Too many attempts. Please try again later.");
          setIsLoading(false);
          return;
        }
        if (!rawResponse.ok) {
          setHelperText("Something went wrong");
          setIsLoading(false);
          return;
        }
        const response = await rawResponse.json();

        if (response.submitted_in_time) {
          if (response.email_verified) {
            sessionStorage.setItem("userName", response.name);
            router.push("/game");
          } else {
            setError(false);
            setHelperText("Something is wrong with the code.");
            setIsLoading(false);
          }
        } else {
          setHelperText("The code has expired. Please try logging in again to receive a new one.");
          setIsLoading(false);
        }
      } catch (err) {
        setHelperText("Something went wrong");
        setIsLoading(false);
      }
    },
    [email, router]
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
              Verify Your Email
            </Typography>
            <Typography component="p" variant="p" textAlign={"center"} mt=".75rem">
              A code has been sent to your email address. Enter the code to finish signing up.
            </Typography>
            <FormHelperText error={error}>{helperText}</FormHelperText>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="code"
                label="Verification Code"
                type="text"
                id="code"
              />
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
