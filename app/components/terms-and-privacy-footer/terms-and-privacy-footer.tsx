"use client";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { black_ops_one } from "@/app/fonts";
import { Link } from "@mui/material";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="#ffffff" {...props}>
      {"© "}
      Headline Fights {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function TermsFooter() {
  return (
    <>
      <Box
        sx={{
          bgcolor: "#000000",
          mt: "6rem",
          p: "4rem 4rem 0",
          width: "100%",
        }}
      >
        <Grid
          container
          maxWidth={"xl"}
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            mx: "auto",
          }}
        >
          <Grid sm={12} md={6} sx={{ display: "flex" }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontFamily: black_ops_one.style.fontFamily,
                fontWeight: 400,
                letterSpacing: ".1rem",
                color: "#ffffff",
                textDecoration: "none",
                pb: { xs: ".5rem", md: 0 },
              }}
            >
              <Link href="/" underline="none" color="#ffffff">
                Headline Fights
              </Link>
            </Typography>
          </Grid>
          <Grid
            xs={12}
            sm={12}
            md={2}
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start" },
              pb: { xs: ".5rem", md: 0 },
            }}
          >
            <Link href="/privacy" underline="hover" color="#ffffff">
              Privacy
            </Link>
          </Grid>
          <Grid
            xs={12}
            sm={12}
            md={2}
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start" },
              pb: { xs: ".5rem", md: 0 },
            }}
          >
            <Link href="/terms" underline="hover" color="#ffffff">
              Terms of Service
            </Link>
          </Grid>
          <Grid
            xs={12}
            sm={12}
            md={2}
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start" },
              pb: { xs: ".5rem", md: 0 },
            }}
          >
            <Link href="/contact" underline="hover" color="#ffffff">
              Contact Us
            </Link>
          </Grid>
        </Grid>
        <Box display="flex" maxWidth="lg" mx="auto" mt="1rem" p="1rem">
          <Copyright sx={{ mx: "auto" }}></Copyright>
        </Box>
      </Box>
    </>
  );
}
