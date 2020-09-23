import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import {MuiThemeProvider} from "@material-ui/core/styles";

import {theme} from "../theme";
import bookImage from "../assets/bookHero2.jpeg";

const useStyles = makeStyles((theme) => ({
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    hero: {
        paddingTop: 0,
        paddingBottom: theme.spacing(4),
        backgroundSize: 'cover',
        backgroundImage: `url(${bookImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height:"600px",
        marginBottom: theme.spacing(6),
    },
    screen: {
        maxHeight: 500,
    },
    messageTop: {
        paddingBottom: theme.spacing(4),
    },
    button: {
        width: 240,
        height: 56,
        borderRadius: 40,
        marginTop: theme.spacing(2),
        color: "#ffffff",
        backgroundColor: "#1dcd00",
        "&:hover": {
            backgroundColor: "#1dcd00",
        },
    },
}));

export const Hero = () => {
    const classes = useStyles();

    return (

        <MuiThemeProvider theme={theme}>
            <Grid container alignItems="center" className={classes.hero}>
                <Grid item xs={8}/>
                <Grid item xs={4}>

                    <Typography variant="h4" className={classes.messageTop}>
                        本を語ろう
                    </Typography>

                    <Typography variant="body1">
                        コミュニティを通して本の理解を深めませんか
                    </Typography>
                    <Typography variant="body1">
                        新しい解釈や知識に出会えるかもしれません
                    </Typography>

                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
};