import {
  Button,
  Divider,
  Grid,
  makeStyles,
  TextField,
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
  outer_mini: {
    marginBottom: theme.spacing(3),
  },
  media: {
    position: "relative",
    paddingBottom: "100%",
  },
}));

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  name: string;
  id: number;
  owner: string;
  img: string;
  kikan: number;
  point: number;
  quality: string;
  user: {
    point: number;
  };
  form: { kikan: number };
}
export const RequestForm = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [owner, setOwner] = useState("");
  const [img, setImg] = useState("");
  const [kikan, setKikan] = useState(0);
  const [point, setPoint] = useState(0);
  const [quality, setQuality] = useState("");
  const [user, setUser] = useState({ point: 0 });
  const [form, setForm] = useState({ kikan: 0 });

  //後でAPI呼び出しに置き換えます
  setTimeout(() => {
    setName("小説　疾風伝説　特攻の拓３");
    setId(1);
    setOwner("やさぐれ太郎");
    setQuality("ほぼ新品");
    setImg(
      "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg"
    );
    setKikan(30);
    setPoint(9999);
    setUser({ point: 100000 });
  }, 100);

  //thisを固定します　これがないとフォーム入力時にエラー
  // this.onKikanChange = this.onKikanChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);

  const onKikanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ kikan: parseInt(event.target.value) });
    // console.log(this.state.form);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(form.kikan + " was submitted!");
    //ここでリクエストAPIを呼び出す
  };

  return (
    <React.Fragment>
      <Grid container className={classes.title}>
        <Grid item xs={3}></Grid>
        <Typography variant="h2">レンタルリクエストを送る</Typography>
        <Grid container direction="column">
          <Divider />
        </Grid>
      </Grid>
      <Grid container className={classes.outer}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Typography variant="h3" className="outer_mini">
            <a href={"../../books/" + id}>{name}</a>
          </Typography>
          <Grid container className={classes.outer_mini}>
            <Grid item xs={3}>
              <img src={img} alt="" />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Typography variant="h4">貸出者 {owner}</Typography>
              <Typography variant="h6">状態　{quality}</Typography>
              <Typography variant="h6">消費P　{point}P</Typography>
              <Typography variant="h6">期間　最大{kikan}日</Typography>
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={3}></Grid>
              <Grid item xs={6}>
                <Typography variant="h5">この本を借りる</Typography>
                <Typography variant="h6">所持ポイント {user.point}P</Typography>
                <Typography variant="h6">消費ポイント {point}P</Typography>
                <Typography variant="h6">
                  残りポイント {user.point - point}P
                </Typography>
                <TextField
                  type="number"
                  name="kikan"
                  label="日数"
                  inputProps={{ max: kikan, step: "1", min: "1" }}
                  value={form.kikan}
                  onChange={onKikanChange}
                  fullWidth={true}
                />
                <Button type="submit" variant="contained" color="primary">
                  送信
                </Button>
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
