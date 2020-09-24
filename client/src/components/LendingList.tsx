import {
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  Link,
  makeStyles,
  Typography,
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
  media: {
    position: "relative",
    paddingBottom: "100%",
  },
  cardPadding: {
    padding: theme.spacing(2),
  },
  space: {
    marginTop: theme.spacing(5),
  },
  outer_mini: {
    paddingBottom: theme.spacing(3),
  },
  userName: {
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(3),
  },
}));

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  lending: Array<{
    id: number; //貸す本エンティティのIDのことです
    name: string;
    img: string;
    requester: string;
    max_days: number;
    current_days: number;
    start_date: string;
    deadline_date: string;
  }>;
  borrowing: Array<{
    id: number; //貸す本エンティティのIDのことです
    name: string;
    img: string;
    owner: string;
    max_days: number;
    current_days: number;
    start_date: string;
    deadline_date: string;
  }>;
  requests_sent: Array<{
    id: number; //RequestエンティティのIDのことです
    name: string;
    img: string;
    owner: string;
    days: number;
    date: string;
  }>;
}
export const LendingList = () => {
  const classes = useStyles();
  const [lending, setLending] = useState([
    {
      id: 0,
      name: "",
      img: "",
      requester: "",
      max_days: 0,
      current_days: 0,
      start_date: "",
      deadline_date: "",
    },
  ]);
  const [borrowing, setBorrowing] = useState([
    {
      id: 0,
      name: "",
      img: "",
      owner: "",
      max_days: 0,
      current_days: 0,
      start_date: "",
      deadline_date: "",
    },
  ]);
  const [requests_sent, setRequestsSent] = useState([
    {
      id: 0,
      name: "",
      img: "",
      owner: "",
      days: 0,
      date: "",
    },
  ]);

  //後でAPI呼び出しに置き換えます
  setTimeout(() => {
    setLending([
      {
        id: 0,
        name: "小説　疾風伝説　特攻の拓３",
        img:
          "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
        requester: "鈴木",
        max_days: 10,
        current_days: 3,
        start_date: "2020-09-15",
        deadline_date: "2020-09-25",
      },
    ]);
    setBorrowing([
      {
        id: 1,
        name: "小説　疾風伝説　特攻の拓2",
        img:
          "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
        owner: "鈴木",
        max_days: 10,
        current_days: 3,
        start_date: "2020-09-15",
        deadline_date: "2020-09-25",
      },
    ]);
    setRequestsSent([
      {
        id: 3,
        name: "小説　疾風伝説　特攻の拓2",
        img:
          "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
        owner: "山本",
        days: 10,
        date: "2020-09-15",
      },
    ]);
  }, 100);

  const cancel = (id: number) => {
    alert(id + "をキャンセル");
    //ここでリクエスト削除APIを呼び出し
    setTimeout(() => {
      setRequestsSent([]);
    }, 500);
  };

  return (
    <React.Fragment>
      <Grid container className={classes.title}>
        <Grid item xs={3}></Grid>
        <Typography variant="h3">やりとり中の本</Typography>
        <Grid container direction="column">
          <Divider />
        </Grid>
      </Grid>
      <Grid container className={classes.outer}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Typography variant="h4" className={classes.space}>
            貸出した本
          </Typography>
          {lending.map((book, index) => (
            <Card>
              <Grid container>
                <Grid item xs={3}>
                  <CardMedia className={classes.media} image={book.img} />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={8}>
                  <p>{book.name}</p>
                  <p>借りる人 {book.requester}</p>
                  <p>
                    借りる日数 {book.current_days}/{book.max_days}
                  </p>
                  <p>貸出開始 {book.start_date}</p>
                  <p>貸出期限 {book.deadline_date}</p>
                  <Link
                    href={"/lending/" + book.id}
                    onClick={(e: any) => {
                      e.preventDefault();
                    }}
                  >
                    <Button variant="contained" color="primary">
                      詳細
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Card>
          ))}
          <Typography variant="h4" className={classes.space}>
            借りた本
          </Typography>
          {borrowing.map((book, index) => (
            <Card>
              <Grid container>
                <Grid item xs={3}>
                  <CardMedia className={classes.media} image={book.img} />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={8}>
                  <p>{book.name}</p>
                  <p>所有者 {book.owner}</p>
                  <p>
                    借りる日数 {book.current_days}/{book.max_days}
                  </p>
                  <p>貸出開始 {book.start_date}</p>
                  <p>貸出期限 {book.deadline_date}</p>
                  <Link
                    href={"/lending/" + book.id}
                    onClick={(e: any) => {
                      e.preventDefault();
                    }}
                  >
                    <Button variant="contained" color="primary">
                      詳細
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Card>
          ))}
          <Typography variant="h4" className={classes.space}>
            承認待ちの本
          </Typography>
          {requests_sent.map((book, index) => (
            <Card>
              <Grid container>
                <Grid item xs={3}>
                  <CardMedia className={classes.media} image={book.img} />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={8}>
                  <p>{book.name}</p>
                  <p>所有者 {book.owner}</p>
                  <p>借りる日数 {book.days}</p>
                  <p>リクエスト日 {book.date}</p>
                  <Link
                    href={"/lending/" + book.id}
                    onClick={(e: any) => {
                      e.preventDefault();
                    }}
                  >
                    <Button variant="contained" color="primary">
                      詳細
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Card>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
