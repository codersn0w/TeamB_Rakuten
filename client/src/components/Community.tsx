import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {CardActionArea, CardContent, Grid, Theme, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme:Theme) => ({
    card:{
        width:"100%",
        margin:theme.spacing(2),
    }
}))

type Props = {
    name:string
}

export const Community:React.FC<Props> = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardContent>
                        <Grid container justify="center">
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.name}
                        </Typography>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </React.Fragment>
    )
}