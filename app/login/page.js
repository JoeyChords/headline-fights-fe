"use client";
import AppBarLoginPage from "/app/components/app-bar/appBarLoginPage.js";
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
import { grey } from "@mui/material/colors";
import { deepPurple } from "@mui/material/colors";
const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;

function Copyright(props) {
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

        let response = await fetch(`${API_ENDPOINT}/login`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInput),
        });
        response = await response.text();

        if (response == "Unauthorized") {
          setHelperText("Something is wrong with your email or password");
        } else {
          response = await JSON.parse(response);
          if (response.isSignedIn == "True") {
            setError(false);
            setHelperText("Loading...");
            router.push(`/game?name=${response.user}`);
          }
        }
      } catch (err) {
        setHelperText("Something went wrong");
      }
    },
    [router]
  );

  return (
    <>
      <AppBarLoginPage></AppBarLoginPage>
      <Box
        component="main"
        sx={{
          bgcolor: grey[100],
          display: "flex",
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar variant="square" src="/logo-icon-512x512.png" sx={{ mb: ".75rem", width: 56, height: 56 }}></Avatar>
            <Typography component="h1" variant="h5">
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
    </>
  );
}
