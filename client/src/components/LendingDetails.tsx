import {
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
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
  outer_mini: {
    paddingBottom: theme.spacing(3),
  },
  userName: {
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(3),
  },
}));

type Props = {} & RouteComponentProps<{ id: string }>;
// interface States {
//   name: string;
//   img: string;
//   owner_name: string;
//   owner_id: number;
//   owner_address: string;
//   requester_name: string;
//   requester_id: number;
//   requester_address: string;
//   max_days: number;
//   current_days: number;
//   start_date: string;
//   deadline_date: string;
//   state: string;
//   button: React.DetailedHTMLProps<
//     React.ButtonHTMLAttributes<HTMLButtonElement>,
//     HTMLButtonElement
//   >;
// }
export const LendingDetails = () => {
  const classes = useStyles();
  // const state = {
  //   name: "",
  //   img: "",
  //   owner_name: "",
  //   owner_id: -1,
  //   owner_address: "",
  //   requester_name: "",
  //   requester_id: -1,
  //   requester_address: "",
  //   max_days: 0,
  //   current_days: 0,
  //   start_date: "",
  //   deadline_date: "",
  //   state: "",
  //   button: <button></button>,
  // };
  // const [params, setParams] = useState(state);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [owner_name, setOwnerName] = useState("");
  const [owner_id, setOwnerId] = useState(0);
  const [owner_address, setOwnerAddress] = useState("");
  const [requester_name, setRequesterName] = useState("");
  const [requester_id, setRequesterId] = useState(0);
  const [requester_address, setRequesterAddress] = useState("");
  const [max_days, setMaxDays] = useState(0);
  const [current_days, setCurrentDays] = useState(0);
  const [start_date, setStartDate] = useState("");
  const [deadline_date, setDeadlineDate] = useState("");
  const [STATE, setSTATE] = useState("");
  const [button, setButton] = useState(<Button></Button>);

  //後でAPI呼び出しに置き換えます
  setTimeout(() => {
    setName("小説　疾風伝説　特攻の拓３");
    setImg(
      "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg"
    );
    setOwnerName("田中太郎");
    setOwnerId(1);
    setOwnerAddress("〒158-0094 東京都世田谷区玉川１丁目１４−１");
    setRequesterName("鈴木");
    setRequesterId(2);
    setRequesterAddress("〒158-0094 東京都世田谷区玉川１丁目１４−１");
    setMaxDays(10);
    setCurrentDays(3);
    setStartDate("2020/09/15");
    setDeadlineDate("2020/09/25");
    setSTATE("発送待");
    setButton(createButton());
    // setParams({
    //   name: "小説　疾風伝説　特攻の拓３",
    //   img:
    //     "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
    //   owner_name: "田中太郎",
    //   owner_id: 1,
    //   owner_address: "〒158-0094 東京都世田谷区玉川１丁目１４−１",
    //   requester_name: "鈴木",
    //   requester_id: 2,
    //   requester_address: "〒158-0094 東京都世田谷区玉川１丁目１４−１",
    //   max_days: 10,
    //   current_days: 3,
    //   start_date: "2020/09/15",
    //   deadline_date: "2020/09/25",
    //   state: "発送待",
    //   button: createButton(),
    // });
  }, 100);

  const requesterReceive = () => {
    alert("(借りた人が)受取を通知しました");
  };

  const return_notify = () => {
    alert("返送を通知しました");
  };
  const sending = () => {
    alert("発送を通知しました");
  };
  const ownerReceive = () => {
    alert("(所有者が)受取を通知しました");
  };

  const createButton = () => {
    const USER_ID = 1;
    if (requester_id === 1234) {
      //ログインしている人が借りている側だったら
      if (STATE === "発送中")
        return (
          <Button
            onClick={requesterReceive}
            color="primary"
            variant="contained"
          >
            受取通知
          </Button>
        );
      if (STATE === "貸出中")
        return (
          <Button onClick={return_notify} color="primary" variant="contained">
            返送通知
          </Button>
        );
    } else if (owner_id === USER_ID) {
      //ログインしている人が貸している側だったら
      if (STATE === "発送待") {
        return (
          <Button onClick={sending} color="primary" variant="contained">
            発送通知
          </Button>
        );
      }
      if (STATE === "返送中") {
        return (
          <Button onClick={ownerReceive} color="primary" variant="contained">
            受取通知
          </Button>
        );
      }
    }
    return <p></p>;
  };

  return (
    <React.Fragment>
      <Grid container className={classes.title}>
        <Grid item xs={3}></Grid>
        <Typography variant="h3">貸出一覧</Typography>
        <Grid container direction="column">
          <Divider />
        </Grid>
      </Grid>
      <Grid container className={classes.outer}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Card className={classes.cardPadding}>
            <Grid container>
              <Grid item xs={3}>
                <CardMedia className={classes.media} image={img} />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={8}>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="h6">貸す人 {owner_name}</Typography>
                <Typography variant="h6">借りる人 {requester_name}</Typography>
                <Typography variant="h6">
                  借りる日数 {current_days}/{max_days}
                </Typography>
                <Typography variant="h6">状態 {STATE}</Typography>
                <Typography variant="h6">貸出開始 {start_date}</Typography>
                <Typography variant="h6">貸出期限 {deadline_date}</Typography>
              </Grid>
            </Grid>
          </Card>
          <Typography variant="h6">
            {STATE === "発送待" ? "発送先:" + requester_address : ""}
            {STATE === "貸出中" ? "返送先:" + owner_address : ""}
          </Typography>
          {button}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
