import React from "react";
import { Link } from "react-router-dom";

import { AppBar, Toolbar, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {theme} from "../theme";
import {LoginButton} from "./LoginButton";
import {Profile} from "./Profile";
import {LogoutButton} from "./LogoutButton";

const useStyles = makeStyles((theme) => ({
  header: {
    height: 80,
  },
  logo: {
    maxWidth: 60,
  },
  games: {
    padding: theme.spacing(2),
    fontWeight: "bold",
  },
  blog: {
    padding: theme.spacing(2),
    fontWeight: "bold",
  },
  contact: {
    padding: theme.spacing(2),
    fontWeight: "bold",
  },
}));

export const Header = () => {
  const classes = useStyles();

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar className={classes.header}>
            <Grid item xs={6}>
              <Link to="/">
                Logo
              </Link>
            </Grid>
            <Grid item xs={2}>
              <LoginButton></LoginButton>
            </Grid>
            <Grid item xs={2}>
              <Link to="/profile">
                profile
              </Link>
            </Grid>
            <Grid item xs={2}>
              <LogoutButton></LogoutButton>
            </Grid>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    </div>
  );
};