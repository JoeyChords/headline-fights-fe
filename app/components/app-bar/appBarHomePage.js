import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { black_ops_one } from "/app/fonts";
import { deepPurple } from "@mui/material/colors";

const pages = { Login: "/login", Signup: "/register" };
const settings = { Dashboard: "/dashboard", Settings: "/settings", Logout: "/" };

function AppBarLoggedOut() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: deepPurple["A100"], boxShadow: "none", borderRadius: "1.75rem" }}>
      <Container maxWidth="xl" sx={{ p: 0 }}>
        <Toolbar disableGutters>
          {/* Web View NavBar Typography*/}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: black_ops_one.style.fontFamily,
              fontWeight: 400,
              letterSpacing: ".1rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            Headline Fights
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {Object.entries(pages).map(([page, route]) => (
                <MenuItem key={page} component={Link} href={route} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Mobile View NavBar */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: black_ops_one.style.fontFamily,
              fontSize: 23,
              fontWeight: 400,
              letterSpacing: ".1rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            Headline Fights
          </Typography>
          {/* Web view login buttons */}
          <Box sx={{ pr: 4, flexGrow: 1, flexDirection: "row-reverse", display: { xs: "none", md: "flex" } }}>
            {Object.entries(pages).map(([page, route]) => (
              <Button
                variant="outlined"
                key={page}
                href={route}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  ml: 1,
                  color: "white",
                  display: "block",
                  textTransform: "capitalize",
                  color: "black",
                  borderRadius: "100vw",
                  p: "0.25rem 1.5rem",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {/* Avatar settings menu for both web and mobile */}
          <Box sx={{ flexGrow: 0 }}></Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppBarLoggedOut;
