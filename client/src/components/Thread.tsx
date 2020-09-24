import {
  Grid,
  Typography,
  Divider,
  Card,
  TextField,
  List,
  ListItem,
  Button,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(5),
  },
  outer: {
    paddingBottom: theme.spacing(10),
  },
  outer_mini: {
    marginBottom: theme.spacing(0),
  },
  chatCard: {
    paddingBottom: theme.spacing(1),
  },
  media: {
    position: "relative",
    paddingBottom: "100%",
  },
}));

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  title: string;
  posts: Array<{ author: string; content: string }>;
  content: string;
}

export const Thread = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([{ author: "", content: "" }]);

  const { id } = useParams();

  useEffect(() => {
    // const fetchData = async () => {
    //   const res = await axios.get(
    //     `http://localhost:5000/thread/${id}`
    //   );
    //   console.log(res);
    //   setThreads(res.data.items);
    // };
    // fetchData();
  }, []);

  //後でAPI呼び出しに置き換えます
  setTimeout(() => {
    setTitle("p15の表記について話し合うスレ");
    setPosts([
      {
        author: "田中太郎",
        content: "p15のエモいってどういう意味ですか？",
      },
      {
        author: "鈴木",
        content: "エモーショナルな、という意味ですよ",
      },
      {
        author: "よ",
        content: "同意見です",
      },
    ]);
  }, 100);

  //thisを固定します　これがないとフォーム入力時にエラー
  // this.onContentChange = this.onContentChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);

  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    //   console.log(this.state.form);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //   event.preventDefault();
    //   alert(this.state.form.content + " was submitted!");
    //   //ここで投稿APIを呼び出す
  };

  return (
    <React.Fragment>
      <Grid container className={classes.title}>
        <Grid item xs={3}></Grid>
        <Typography variant="h3">{title}</Typography>
        <Grid container direction="column">
          <Divider />
        </Grid>
      </Grid>
      <Grid container className={classes.outer}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          {/*<List>*/}
          <Grid container className={classes.outer_mini}>
            {posts.map((post, index) => (
              // <ListItem key={index}>
              <Grid item xs={12} key={index} className={classes.chatCard}>
                {/*<Card>*/}
                <Grid container>
                  <Grid item xs={1}>
                    ICON
                  </Grid>
                  <Grid item xs={11}>
                    <Typography variant="body2">{post.author}</Typography>
                    <Typography variant="body1">{post.content}</Typography>
                  </Grid>
                </Grid>
                {/*</Card>*/}
              </Grid>
              // </ListItem>
            ))}
          </Grid>
          {/*</List>*/}
          <form onSubmit={handleSubmit}>
            {/* <h2>投稿</h2> */}
            <Grid container>
              <Grid item xs={10}>
                <TextField
                  id="outlined-multiline-static"
                  label="投稿内容"
                  // multiline
                  // rows={4}
                  variant="outlined"
                  value={content}
                  onChange={onContentChange}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth={true}
                  color="primary"
                >
                  送信
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
