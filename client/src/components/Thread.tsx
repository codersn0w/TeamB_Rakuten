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
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
  outer: {
    paddingBottom: theme.spacing(20),
  },
  outer_mini: {
    paddingBottom: theme.spacing(5),
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
    //   this.setState({
    //     form: { content: event.target.value },
    //   });
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
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <List>
            <Grid container className={classes.outer_mini}>
              {posts.map((post, index) => (
                <ListItem>
                  <Grid item xs={12}>
                    <Card>
                      <h2>{post.author}</h2>
                      <p>{post.content}</p>
                    </Card>
                  </Grid>
                </ListItem>
              ))}
            </Grid>
          </List>
          <form onSubmit={handleSubmit}>
            <h2>投稿</h2>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="投稿内容"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={content}
                  onChange={onContentChange}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={10}></Grid>
                  <Grid item xs={2}>
                    <Button type="submit" variant="contained" fullWidth={true}>
                      この本を貸出
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
