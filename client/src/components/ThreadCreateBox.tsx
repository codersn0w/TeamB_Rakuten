import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme, Typography, TextField, Button, Grid} from "@material-ui/core";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme: Theme) => ({
    threadName:{
        padding:theme.spacing(4)
    },
    createButton:{
        marginTop:theme.spacing(3)
    }
}))

export const ThreadCreateBox = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Typography variant="h5">
                新規スレッド作成
            </Typography>
            <form className={classes.threadName}>
                <TextField id="thread-name" label="スレッド名" fullWidth variant="outlined"/>
                <TextField
                    id="message"
                    label="投稿内容"
                    multiline
                    rows="6"
                    variant="outlined"
                    fullWidth/>
                    <Grid container justify="center">
                <Button variant="contained" color="primary" component="span" className={classes.createButton}>
                    作成
                </Button>
                        </Grid>
            </form>
        </React.Fragment>
    )
}