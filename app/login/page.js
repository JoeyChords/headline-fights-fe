"use client";
import AppBarLoginPage from "/app/components/app-bar/appBarLoginPage.js";
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
const API_ENDPOINT = require("/app/config");

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
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
          email: data.get("email").toLowerCase(),
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
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
      <Copyright sx={{ mt: 5 }} />
    </>
  );
}
