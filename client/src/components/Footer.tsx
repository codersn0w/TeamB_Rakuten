import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {theme} from "../theme";
import {MuiThemeProvider} from "@material-ui/core/styles";
import {Toolbar,AppBar,Grid,Button,Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "static",
        backgroundColor: "#696969"
    },
    footerLinks: {
        padding: theme.spacing(1),
    },
    community: {
        height: 48,
    },
    blog: {
        height: 48,
    },
    contact: {
        height: 48,
    },
    copyright: {
        padding: theme.spacing(1),
    },
    logo:{
        marginTop:theme.spacing(5)
    }
}));

export const Footer = () => {
    const classes = useStyles();

    return (
        <div>
            <MuiThemeProvider theme={theme}>
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.footerLinks}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Grid container>
                                    <Grid item xs={4}></Grid>
                                    <Grid item xs={4} className={classes.logo}>
                                        <Grid container>
                                            <Typography variant="h5" color="inherit" component={Link} to="/">
                                                BOOKSKO
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4}></Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container>
                                    <Grid item xs={4}></Grid>
                                    <Grid item xs={5}>
                                        <Grid container direction="column">
                                            <Button color="inherit" className={classes.community}>
                                                コミュニティ一覧
                                            </Button>
                                            <Button color="inherit" className={classes.contact}>
                                                お問い合わせ
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={3}></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Toolbar>
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                        className={classes.copyright}
                    >
                        <Typography variant="subtitle2">2020 二子玉川 夏の陣</Typography>
                    </Grid>
                </AppBar>
            </MuiThemeProvider>
        </div>
    );
};