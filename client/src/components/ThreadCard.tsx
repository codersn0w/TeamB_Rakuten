import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {CardActionArea, CardContent, Grid, Theme, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme:Theme) => ({
    card:{
        width:"100%",
        margin:theme.spacing(2),
    },
    cardContent:{
        padding:theme.spacing(5),
    }
}))

type Props = {
    name:string
}

export const ThreadCard: React.FC<Props> = (props:Props) => {
    const classes = useStyles();
    return(
        <Card className={classes.card}>
            <CardActionArea>
                    <CardContent className={classes.cardContent}>
                        <Grid container>
                            <Grid item xs={1}></Grid>
                            <Typography gutterBottom variant="h5">
                                {props.name}
                            </Typography>
                        </Grid>
                    </CardContent>
            </CardActionArea>
        </Card>
    )
}