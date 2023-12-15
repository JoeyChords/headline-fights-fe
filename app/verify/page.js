"use client";
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
import { useSearchParams } from "next/navigation";
import AppBarLoggedOut from "@/app/components/app-bar/appBarLoggedOut.js";
import { getMaxListeners } from "events";
const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;

export default function SignIn() {
  const email = useSearchParams().get("email");

  const [helperText, setHelperText] = React.useState("");
  const [error, setError] = React.useState(true);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (event) => {
      try {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userInput = {
          email: normalizeEmail(email),
          code: data.get("code"),
        };

        let response = await fetch(`${API_ENDPOINT}/verify`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInput),
        });
        response = await response.text();
        response = await JSON.parse(response);

        if (response.submitted_in_time) {
          if (response.email_verified) {
            router.push(`/game?name=${response.name}`);
          } else {
            setError(false);
            setHelperText("Something is wrong with the code.");
          }
        } else {
          setHelperText("The code has expired. Please try logging in again to receive a new one.");
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
              Verify Email
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
                autoComplete="current-password"
              />
              <Button
                type="submit"
                size="large"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, textTransform: "capitalize", borderRadius: "100vw", fontSize: { lg: "1.25rem", xs: "1.25rem" } }}
              >
                Submit
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer></Footer>
    </>
  );
}
