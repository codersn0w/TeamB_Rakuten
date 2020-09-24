import {
  Divider,
  Grid,
  makeStyles,
  Typography,
  List,
  ListItem,
  Card,
  Button,
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
  items: Array<{ name: string; desc: string; direction: string; id: number }>;
}
export const Followers = () => {
  const classes = useStyles();
  const STATE = [{}];
  const [items, setItems] = useState(STATE);

  //後でAPI呼び出しに置き換えます
  setTimeout(() => {
    setItems([
      {
        name: "吉田",
        desc: "小説に興味があります。",
        direction: "相互",
        id: 4,
      },
      {
        name: "田村",
        desc: "マンガを読みたい",
        direction: "フォロワ",
        id: 5,
      },
      {
        name: "鈴木",
        desc: "ナウい本が好き",
        direction: "フォロー",
        id: 6,
      },
    ]);
  }, 100);

  const follow = (id: number) => {
    alert(id + "をふぉろー");
  };
  const unfollow = (id: number) => {
    alert(id + "をふぉろー解除");
  };

  return (
    <React.Fragment>
      <Grid container className={classes.title}>
        <Grid item xs={3}></Grid>
        <Typography variant="h3">友人関係</Typography>
        <Grid container direction="column">
          <Divider />
        </Grid>
      </Grid>
      <Grid container className={classes.outer}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <List>
            <Grid container>
              {items.map((item: any, index: number) => (
                <ListItem key={index} className={classes.outer_mini}>
                  <Grid item xs={12}>
                    <Card>
                      <Grid container>
                        <Grid item xs={2}>
                          {item.name}
                        </Grid>
                        <Grid item xs={5}>
                          {item.desc}
                        </Grid>
                        <Grid item xs={2}>
                          {item.direction}
                        </Grid>
                        <Grid item xs={3}>
                          {item.direction === "フォロワ" ? (
                            <Button
                              onClick={() => {
                                follow(item.id);
                              }}
                              fullWidth={true}
                              variant="contained"
                              color="primary"
                            >
                              フォロー
                            </Button>
                          ) : (
                            <Button
                              onClick={() => {
                                unfollow(item.id);
                              }}
                              fullWidth={true}
                              variant="contained"
                              color="secondary"
                            >
                              フォロー解除
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </ListItem>
              ))}
            </Grid>
          </List>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
