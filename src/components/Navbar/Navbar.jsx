import React from "react";
import axios from "axios";
import { userActions } from "../../store/user-slice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { authActions } from "../../store/auth-slice";
import { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
// import { redirect } from "react-router-dom";

const pages = ["Playlists", "Followed Artists"];
const settings = ["Profile", "Recent Tracks"];

const ResponsiveAppBar = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const username = useSelector((state) => state.user.username);
  const profileImgUrl = useSelector((state) => state.user.profileImgUrl);
  const dispatch = useDispatch();
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

  const toggleMenu = (page) => {
    if (page === "Playlists") {
      dispatch(uiActions.togglePlaylistContainer());
    } else if (page === "Followed Artists") {
      dispatch(uiActions.toggleArtistContainer());
    } else if (page === "Recent Tracks") {
      dispatch(uiActions.toggleTracksContainer());
    }
  };

  useEffect(() => {
    const getUserProfile = async () => {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });
      // console.log(response.data.images.length);
      if (!response.data.images.length) {
        dispatch(
          userActions.setData({
            user: response.data,
            url: "",
          })
        );
      } else {
        dispatch(
          userActions.setData({
            user: response.data,
            url: response.data.images[0].url,
          })
        );
      }
      // console.log(response.data.email);
      await axios.post("https://hear-me-out-backend.vercel.app/", {
        email: response.data.email,
      });
    };

    try {
      getUserProfile();
    } catch (e) {
      console.log(e.message);
      dispatch(authActions.logout());
      logoutHandler();
    }
  }, [accessToken, dispatch]);

  const logoutHandler = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userAccess");
    localStorage.removeItem("isLoggedIn");
    dispatch(authActions.logout());
    // return redirect("/");
  }, [dispatch]);

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AudiotrackIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HEAR ME OUT
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AudiotrackIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HEAR ME OUT
          </Typography>
          {accessToken && (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={toggleMenu.bind(null, page)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={username} src={profileImgUrl} />
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
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography
                          textAlign="center"
                          onClick={toggleMenu.bind(null, setting)}
                        >
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                    <Link
                      to="/feed"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <MenuItem key="feed">
                        <Typography textAlign="center">Feed</Typography>
                      </MenuItem>
                    </Link>
                    <MenuItem key="logout" onClick={logoutHandler}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
