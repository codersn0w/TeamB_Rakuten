import {
  Grid,
  Typography,
  Divider,
  TextField,
  MenuItem,
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
    paddingBottom: theme.spacing(3),
  },
  media: {
    position: "relative",
    paddingBottom: "100%",
  },
}));

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  name: string;
  point: number;
  days: number;
  id: number;
  list: Array<{ id: number; name: string; img: string }>;
}
export const BookRegister = () => {
  const classes = useStyles();
  const STATES = {
    name: "",
    point: 1,
    days: 2,
    id: -1,
    list: [],
  };

  const [name, setName] = useState("");
  const [point, setPoint] = useState(2);
  const [days, setDays] = useState(2);
  const [id, setId] = useState(0);
  const [list, setList] = useState([{ id: 0, name: "", img: "" }]);

  //thisを固定します　これがないとフォーム入力時にエラー
  // this.onNameChange = this.onNameChange.bind(this);
  // this.onPointChange = this.onPointChange.bind(this);
  // this.onDaysChange = this.onDaysChange.bind(this);
  // this.onBookChange = this.onBookChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    //ここで本名検索API呼び出し
    setTimeout(() => {
      setList([
        {
          name: "タオル",
          id: 11111,
          img:
            "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
        },
        {
          name: "タオル2",
          id: 22222,
          img:
            "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
        },
      ]);
    }, 100);
  };

  const onPointChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPoint(parseInt(event.target.value));
    console.log(point);
  };

  const onDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDays(parseInt(event.target.value));
    console.log(days);
  };

  const onBookChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(parseInt(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(id + " was submitted!");
    //ここで貸出本登録APIを呼び出す
    //ここで貸出詳細画面に移動
  };

  return (
    <React.Fragment>
      <Grid container className={classes.title}>
        <Grid item xs={3}></Grid>
        <Typography variant="h3">貸し出す本の登録</Typography>
        <Grid container direction="column">
          <Divider />
        </Grid>
      </Grid>
      <Grid container className={classes.outer}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12} className={classes.outer_mini}>
                <TextField
                  type="text"
                  name="name"
                  value={name}
                  onChange={onNameChange}
                  fullWidth={true}
                  label="本の名前で検索"
                />
              </Grid>
              <Grid item xs={12} className={classes.outer_mini}>
                <TextField
                  label="本の選択"
                  select
                  name="book"
                  onChange={onBookChange}
                  fullWidth={true}
                >
                  {list.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} className={classes.outer_mini}>
                <TextField
                  type="number"
                  name="point"
                  label="必要P"
                  value={point}
                  inputProps={{ min: "1", step: "1" }}
                  onChange={onPointChange}
                  fullWidth={true}
                />
              </Grid>

              <Grid item xs={12} className={classes.outer_mini}>
                <TextField
                  type="number"
                  name="days"
                  label="最大貸出日数"
                  value={days}
                  inputProps={{ min: "1", step: "1" }}
                  onChange={onDaysChange}
                  fullWidth={true}
                />
              </Grid>

              <Button type="submit" variant="contained" fullWidth={true}>
                この本を貸出
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
