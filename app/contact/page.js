"use client";
import AppBarLoggedOut from "@/app/components/app-bar/appBarLoggedOut.js";
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
import Footer from "@/app/components/footer/footer.tsx";
import isEmail from "validator/lib/isEmail";

const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;

export default function SignIn() {
  const [helperText, setHelperText] = React.useState("");
  const [error, setError] = React.useState(true);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (event) => {
      setError(false);
      setHelperText("Sending...");
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const userInput = {
        email: normalizeEmail(data.get("email")),
        message: data.get("message"),
        name: data.get("name"),
      };

      if (isEmail(userInput.email)) {
        let response = await fetch("/api/contact", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInput),
        });

        response = await response.text();
        response = await JSON.parse(response);
        const statusCode = response.emailResponse.response.slice(0, 3);
        console.log(response.emailResponse.response.slice(0, 3));

        if (statusCode === "550") {
          setHelperText("Something went wrong. Message not sent.");
        } else if (statusCode === "250") {
          setError(false);
          setHelperText("Thank you. Your message has been sent.");

          document.getElementById("contact-form").reset();
        } else {
          setHelperText("Something went wrong. Message not sent.");
        }
      } else {
        setError(true);
        setHelperText("Please enter a valid email address");
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
              height: "49rem",
            }}
          >
            <Avatar variant="square" src="/logo-icon-512x512.png" sx={{ mb: ".75rem", width: 56, height: 56 }}></Avatar>
            <Typography component="h1" variant="h4" fontWeight={500}>
              Contact Us
            </Typography>
            <FormHelperText error={error}>{helperText}</FormHelperText>
            <Box component="form" id="contact-form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="name" label="Your Name" name="name" autoComplete="name" autoFocus />
              <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
              <TextField margin="normal" required fullWidth multiline name="message" label="Message" type="message" id="message" />
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
