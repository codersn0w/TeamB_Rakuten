import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme, Typography, TextField, Button, Grid} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import axios from "axios";
import useReactRouter from "use-react-router";

const useStyles = makeStyles((theme: Theme) => ({
    threadName:{
        padding:theme.spacing(4)
    },
    createButton:{
        marginTop:theme.spacing(3)
    }
}))

type Props = {
    genreId:string;
}

export const ThreadCreateBox:React.FC<Props> = (props:Props) => {
    const classes = useStyles();
    const {history} = useReactRouter();
    const [threadName,setThreadName] = useState("");
    const [content, setContent] = useState("");

    return (
        <React.Fragment>
            <Typography variant="h5">
                新規スレッド作成
            </Typography>
            <form className={classes.threadName}
            onSubmit={(e)=>{
                e.preventDefault();
                const data = {
                    name:threadName,
                    genre_id:props.genreId,
                }
                // fetch("http://localhost:5000/thread",{
                //     method:"POST",
                //     body:JSON.stringify(data),
                // }).then(res => {
                //
                // })
                axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
                axios.post("http://localhost:5000/threads",data)
                    .then((res) => {
                        console.log(res);
                        history.push(`/threads/${res.data.id}`);
                    })
                    .catch((err) => console.log(err));
            }}>
                <TextField
                    id="thread-name"
                    label="スレッド名"
                    fullWidth variant="outlined"
                onChange={(event) => setThreadName(event.target.value)}/>
                <TextField
                    id="message"
                    label="投稿内容"
                    multiline
                    rows="6"
                    variant="outlined"
                    fullWidth
                onChange={(event)=>setContent(event.target.value)}/>
                    <Grid container justify="center">
                <Button type="submit" variant="contained" color="primary" className={classes.createButton}>
                    作成
                </Button>
                        </Grid>
            </form>
        </React.Fragment>
    )
}