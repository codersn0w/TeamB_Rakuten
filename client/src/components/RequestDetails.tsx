import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  img: string;
  name: string;
  requester: string;
  kikan: number;
  date: string;
}

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
export const RequestDetails = () => {
  const classes = useStyles();
  //   this.state = {
  //     img: "",
  //     name: "",
  //     requester: "string;",
  //     kikan: 1,
  //     date: "string;",
  // };

  const [img, setImage] = useState("");
  const [name, setName] = useState("");
  const [requester, setRequester] = useState("");
  const [date, setDate] = useState("");
  const [kikan, setKikan] = useState(1);

  //後でAPI呼び出しに置き換えます
  setTimeout(() => {
    setImage(
      "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg"
    );
    setName("インターン伝説III");
    setRequester("森泉友登");
    setKikan(10);
    setDate("2020/09/18");
    // this.setState({
    //   img:
    //     "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
    //   name: "インターン伝説III",
    //   requester: "森泉友登",
    //   kikan: 10,
    //   date: "2020/09/18",
    // });
  }, 100);

  const accept = () => {
    //ここでリクエストAPIを呼び出す
    alert("リクエストを承認しました");
  };
  const decline = () => {
    //ここでリクエストAPIを呼び出す
    alert("リクエストを拒否しました");
  };

  return (
    <React.Fragment>
      <Grid container className={classes.title}>
        <Grid item xs={3}></Grid>
        <Typography variant="h3">リクエスト詳細</Typography>
        <Grid container direction="column">
          <Divider />
        </Grid>
      </Grid>
      <Grid container className={classes.outer}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={3}>
              <img src={img} alt="" className="media" />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={8}>
              <Typography variant="h6">リクエストした人 {requester}</Typography>
              <Typography variant="h6">借りたい日数 {kikan}</Typography>
              <Typography variant="h6">リクエスト日 {date}</Typography>
              <Grid container>
                <Button onClick={accept} color="primary" variant="contained">
                  承認
                </Button>
                <Button onClick={decline} color="secondary" variant="contained">
                  拒否
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
