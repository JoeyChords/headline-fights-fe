"use client";
import { useState } from "react";
import AppBarRegisterPage from "/app/components/app-bar/appBarRegisterPage.js";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import theme from "app/theme.js";

function Copyright(props) {
  return (
    <Typography variant="body2" color="theme.primary" align="center" {...props}>
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userInput = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };

    fetch("/api/register", {
      method: "POST",
      withCredentials: true,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInput),
    }).then((res) => {
      res.json().then((response) => {
        //Check to see if the email address is available
        if (response.data[0].available == "True") {
          window.location.href = "http://localhost:3001/login";
        } else {
          setHelperText("The email address you entered is already in use");
        }
      });
    });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBarRegisterPage></AppBarRegisterPage>
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
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <FormHelperText error={true}>{helperText}</FormHelperText>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField required fullWidth id="name" label="Name" name="name" autoComplete="name" />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth id="email" type="email" label="Email Address" name="email" autoComplete="email" />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
