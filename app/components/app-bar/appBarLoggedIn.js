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
import { useSearchParams } from "next/navigation";
import { black_ops_one } from "/app/fonts";
var capitalize = require("lodash/capitalize");

const pages = { Login: "/register", Signup: "/signup" };

function AppBarLoggedIn(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  //Get username from URL
  const name = useSearchParams().get("name");
  const settings = {
    Dashboard: props.name != null ? `/dashboard?name=${props.name}` : `/dashboard?name=${name}`,
    Settings: props.name != null ? `/settings?name=${props.name}` : `/settings?name=${name}`,
    Logout: props.name != null ? `/logout?name=${props.name}` : `/logout?name=${name}`,
  };

  const handleOpenUserMenu = (event) => {
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
            href={`/game?name=${useSearchParams().get("name")}`}
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
            href={`/game?name=${useSearchParams().get("name")}`}
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
                  {props.name != null ? capitalize(props.name).slice(0, 1) : capitalize(name).slice(0, 1)}
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
              <Typography class="text-center text-xs">{props.name}</Typography>
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
