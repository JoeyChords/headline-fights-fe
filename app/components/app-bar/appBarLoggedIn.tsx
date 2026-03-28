"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { deepPurple } from "@mui/material/colors";
import { black_ops_one } from "@/app/fonts";

const capitalize = require("lodash/capitalize") as (s: string) => string;

const gamePath = "/game";
const settings = {
  Dashboard: "/dashboard",
  Logout: "/logout",
};

interface AppBarLoggedInProps {
  name?: string;
}

function AppBarLoggedIn({ name = "" }: AppBarLoggedInProps) {
  const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement | null>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Web View NavBar Typography*/}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={gamePath}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: black_ops_one.style.fontFamily,
              fontWeight: 400,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Headline Fights
          </Typography>

          <Box sx={{ flexGrow: 1.5, display: { xs: "flex", md: "none" } }}></Box>
          {/* Mobile View NavBar */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href={gamePath}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: black_ops_one.style.fontFamily,
              fontSize: 23,
              fontWeight: 400,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Headline Fights
          </Typography>
          {/* Web view login buttons */}
          <Box sx={{ pr: 4, flexGrow: 1, flexDirection: "row-reverse", display: { xs: "none", md: "flex" } }}></Box>
          {/* Avatar settings menu for both web and mobile */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: deepPurple["A100"] }} alt={capitalize(name)}>
                  {capitalize(name).slice(0, 1)}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Typography className="text-center text-xs">{name}</Typography>
              {Object.entries(settings).map(([setting, path]) => (
                <MenuItem component={Link} href={path} key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppBarLoggedIn;
