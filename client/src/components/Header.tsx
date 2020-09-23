import React from "react";
import {Link} from "react-router-dom";

import {AppBar, Toolbar, Grid, Typography, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {MuiThemeProvider} from "@material-ui/core/styles";
import {theme} from "../theme";
import {LoginButton} from "./LoginButton";
import {LogoutButton} from "./LogoutButton";
import {SearchBox} from "./SearchBox";
import {useAuth0} from "@auth0/auth0-react";
import {NotificationIcon} from "./NotificationIcon";

const useStyles = makeStyles((theme) => ({
    header: {
        height: 80,
        backgroundColor:"transparent",
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
    const {isAuthenticated, isLoading} = useAuth0();

    return (
        <div>
            <MuiThemeProvider theme={theme}>
                <AppBar position="relative">
                    <Toolbar className={classes.header}>
                        <Grid container justify={"flex-start"}>
                            <Grid item xs={2}>
                                <Grid container justify="center">
                                    <Typography variant="h5" component={Link} to="/">
                                        BOOKSKO
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid container alignItems="flex-start">
                                    <SearchBox placeholder="Search..." ></SearchBox>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container justify="flex-end">

                                    {!(isAuthenticated || isLoading) &&
                                    <Grid item xs={2}>
                                        <LoginButton></LoginButton>
                                    </Grid>
                                    }
                                    {(isAuthenticated || isLoading) &&
                                    <React.Fragment>
                                        <Grid item xs={2}>
                                            <Link to="/profile">
                                                <NotificationIcon />
                                            </Link>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Link to="/profile">
                                                <Button>マイページ</Button>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <LogoutButton></LogoutButton>
                                        </Grid>
                                    </React.Fragment>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </MuiThemeProvider>
        </div>
    );
};