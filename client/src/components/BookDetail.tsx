import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { ThreadCreateBox } from "./ThreadCreateBox";
import axios from "axios";
import { useParams } from "react-router-dom";

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  name: string;
  img: string;
  author: string;
  genre: string;
  genre_id: number;
  star: string;
  rentals: Array<{
    owner: string;
    quality: string;
    kikan: string;
    point: string;
    img: string;
    id: number;
  }>;
  reviews: Array<{
    author: string;
    star: string;
    title: string;
    content: string;
  }>;
  threads: Array<{
    title: string;
    author: string;
    posts: string;
    id: number;
  }>;
  form: { title: string; content: string };
}

const useStyles = makeStyles((theme) => ({
  title: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
  outer: {
    paddingBottom: theme.spacing(20),
  },
  outer_mini: {
    marginBottom: theme.spacing(4),
  },
  media: {
    position: "relative",
    paddingBottom: "130%",
  },
  card: {
    padding: theme.spacing(2),
  },
  wideLine: {
    lineHeight: theme.spacing(0.5),
  },
}));
export const BookDetail = () => {
  const classes = useStyles();
  // this.state = {
  //   name: "タイトル",
  //   img: "",
  //   author: "",
  //   genre: "",
  //   genre_id: -1,
  //   star: "",
  //   rentals: [],
  //   reviews: [],
  //   threads: [],
  //   form: { title: "スレッド名", content: "HOGE" },
  // };

  // const [params, setParams] = useState({ form: {} });
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [genre_id, setGenreId] = useState("");
  const [star, setStar] = useState("");
  const [rentals, setRentals] = useState([
    { owner: "", quality: "", kikan: "", point: "", img: "", id: 0 },
  ]);
  const [reviews, setReviews] = useState([
    {
      author: "",
      star: "",
      title: "",
      content: "",
    },
  ]);
  const [threads, setThreads] = useState([
    {
      title: "",
      author: "",
      posts: "",
      id: 0,
    },
  ]);
  const [form, setForm] = useState({ title: "", content: "" });
  const { id } = useParams();
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5000/threads/book_id/` + id
      );
      console.log(res);
      setThreads(res.data.items);
    };
    fetchData();
  }, []);

  //後でAPI呼び出しに置き換えます
  setTimeout(() => {
    setName("すごい大冒険");
    setImg(
      "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg"
    );
    setAuthor("すごい太郎");
    setGenre("小説");
    setGenreId("001001");
    setStar("2.5");
  }, 100);

  setTimeout(() => {
    setRentals([
      {
        owner: "田中太郎",
        quality: "ほぼ新品",
        kikan: "最大10日",
        point: "300",
        img:
          "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
        id: 1,
      },
    ]);
  }, 200);

  setTimeout(() => {
    setReviews([
      {
        author: "山田太郎",
        star: "5",
        title: "やばい",
        content: "やばい本です　絶対買うべきです",
      },
    ]);
  }, 300);

  setTimeout(() => {
    setThreads([
      {
        author: "山田太郎",
        title: "p15の表記について話し合うスレ",
        posts: "15",
        id: 0,
      },
    ]);
  }, 400);

  //thisを固定します　これがないとフォーム入力時にエラー
  // this.onTitleChange = this.onTitleChange.bind(this);
  // this.onContentChange = this.onContentChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ title: event.target.value, content: form.content });
    // console.log(this.state.form);
  };

  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ title: form.title, content: event.target.value });
    // console.log(this.state.form);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(form.title + " was submitted!");
    //ここでスレッド作成APIを呼び出す
    //ここで新規作成スレッドに移動する
  };

  return (
    <React.Fragment>
      <Grid container className={classes.title}>
        <Grid item xs={3}></Grid>
        <Typography variant="h2">{name}</Typography>
        <Grid container direction="column">
          <Divider />
        </Grid>
      </Grid>
      <Grid container className={classes.outer}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Grid container className={classes.outer_mini}>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <CardMedia className={classes.media} image={img} />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
              <Typography variant="h5" className={classes.wideLine}>
                著者 {author}
              </Typography>
              <Typography variant="h5" className={classes.wideLine}>
                ジャンル{"   "}
                <Link to={"../genres/" + genre_id}>
                  <Button variant="contained" color="primary">
                    {genre}
                  </Button>
                </Link>
              </Typography>
              <Typography variant="h5" className={classes.wideLine}>
                ★ {star}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h4" className={classes.outer_mini}>
            この本の貸出
          </Typography>
          <Grid container className={classes.outer_mini}>
            {rentals.map((book, index) => (
              <Grid item xs={6}>
                <Card key={index} className={classes.card}>
                  <Grid container>
                    <Grid item xs={3}>
                      <CardMedia className={classes.media} image={img} />
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={8}>
                      <h3>貸出者 {book.owner}</h3>
                      <p>状態　{book.quality}</p>
                      <p>消費P　{book.point}P</p>
                      <p>期間　{book.kikan}</p>

                      <Link to={"../request/create/" + book.id}>
                        <Button variant="contained" color="primary">
                          詳細
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h4" className={classes.outer_mini}>
            レビュー
          </Typography>
          <Grid className={classes.outer_mini}>
            {reviews.map((review, index) => (
              <Card key={index} className={classes.card}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      投稿者：{review.author}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="h6">★{review.star}</Typography>
                  </Grid>
                  <Grid item xs={11}>
                    <Typography variant="h6">{review.title}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">{review.content}</Typography>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Grid>

          <Typography variant="h4" className={classes.outer_mini}>
            スレッド
          </Typography>
          <Grid className={classes.outer_mini}>
            {threads.map((thread, index) => (
              <Card key={index}>
                <CardActionArea className={classes.card}>
                  <Link to={"../threads/" + thread.id}>
                    <Grid container>
                      <Grid item xs={10}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography variant="h4">{thread.title}</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="h6">
                              投稿者：{thread.author}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h6">
                          投稿：{thread.posts}件
                        </Typography>
                      </Grid>
                    </Grid>
                  </Link>
                </CardActionArea>
              </Card>
            ))}
          </Grid>
          <ThreadCreateBox genreId={genre_id} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
