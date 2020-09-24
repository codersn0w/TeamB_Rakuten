import React from "react";
import Card from "@material-ui/core/Card";
import {CardActionArea, CardContent, CardMedia, Grid, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        width: "100%",
        margin: theme.spacing(3),
    },
    actionArea: {
        // marginTop: theme.spacing(2),
    },
    cardContent: {},
    media: {
        position: "relative",
        paddingBottom: "133%"
    }
}))

type Props = {
    name: string,
    author: string,
    genre: string,
    img: string,
}

export const BookCard: React.FC<Props> = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Card className={classes.card}>
                <CardActionArea>
                    <Grid container className={classes.actionArea}>
                        {/*<Grid item xs={2}></Grid>*/}
                        <Grid item xs={12}>
                            <CardMedia className={classes.media} image={props.img} title={props.name}></CardMedia>
                        </Grid>
                    </Grid>
                    <Grid container>
                        {/*<Grid item xs={1}></Grid>*/}
                        <Grid item xs={12}>
                            <CardContent className={classes.cardContent}>
                                <Grid container direction="column" justify="center">
                                    <Typography gutterBottom variant="subtitle1">
                                        {props.name}
                                    </Typography>
                                    <Typography gutterBottom variant="body2">
                                        著者: {props.author}
                                    </Typography>
                                    <Typography gutterBottom variant="body2">
                                        ジャンル: {props.genre}
                                    </Typography>
                                </Grid>
                            </CardContent>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
        </React.Fragment>
    )
}