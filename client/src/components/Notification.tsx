import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import useAuth0 from "@auth0/auth0-react/dist/use-auth0";
import axios from "axios";

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
  userName: {
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(3),
  },
}));

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  items: Array<{
    img: string;
    desc: string;
    date: string;
    type: string; //通知の種類 レンタルリクエストの承認の場合はリクエストエンティティのIDをidに指定
    id: number;
  }>;
}

export const NotificationComponent = () => {
  const classes = useStyles();
  const [items, setItems] = useState([
    { id: 0, img: "", desc: "", date: "", type: "" },
  ]);

  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-0hguzgvk.us.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(metadataResponse.body);

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
    console.log(userMetadata);

    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5000/notification/` + user.sub
      );
      console.log(res);
      setItems(res.data.items);
    };
    fetchData();
  }, [getAccessTokenSilently, user, userMetadata]);
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  //後でAPI呼び出しに置き換えます
  // setTimeout(() => {
  //   //user.sub
  //   //
  //   setItems([
  //     {
  //       img:
  //         "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
  //       desc: "鈴木さんが、「小説 疾風…」の貸出をリクエストしています",
  //       date: "2020/10/10",
  //       type: "request",
  //       id: 1,
  //     },
  //     {
  //       img:
  //         "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
  //       desc: "鈴木さんが、「盗作」の貸出をリクエストしています",
  //       date: "2020/10/09",
  //       type: "request",
  //       id: 2,
  //     },
  //     {
  //       img:
  //         "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
  //       desc: "鈴木さんが、「盗作」の貸出をリクエストしています",
  //       date: "2020/10/09",
  //       type: "request",
  //       id: 2,
  //     },
  //   ]);
  //   // this.setState({
  //   //   items: [
  //   //     {
  //   //       img:
  //   //         "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
  //   //       desc: "鈴木さんが、「小説 疾風…」の貸出をリクエストしています",
  //   //       date: "2020/10/10",
  //   //       type: "request",
  //   //       id: 1,
  //   //     },
  //   //     {
  //   //       img:
  //   //         "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
  //   //       desc: "鈴木さんが、「盗作」の貸出をリクエストしています",
  //   //       date: "2020/10/09",
  //   //       type: "request",
  //   //       id: 2,
  //   //     },
  //   //   ],
  //   // });
  // }, 100);
  return (
    <React.Fragment>
      <Grid container className={classes.title}>
        <Grid item xs={3}></Grid>
        <Typography variant="h2">通知</Typography>
        <Grid container direction="column">
          <Divider />
        </Grid>
      </Grid>
      <Grid container className={classes.outer}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <List component="nav">
            {items.map((item, index) => (
              <ListItem button key={index}>
                <Card>
                  <a href={"request/view/" + item.id}>
                    <Grid container>
                      <Grid item xs={2}>
                        <CardMedia
                          image={item.img}
                          component="img"
                          className="media"
                        />
                        {/* <img src={item.img} alt="" /> */}
                      </Grid>
                      <Grid item xs={10}>
                        <CardContent>
                          <Grid container>
                            <Grid item xs={10}>
                              <Typography variant="h6">{item.desc}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography variant="h6">{item.date}</Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </a>
                </Card>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
// export default class NotificationComponent extends React.Component<
//   Props,
//   States
// > {
//   constructor(props: any) {
//     super(props);

//     this.state = {
//       items: [],
//     };

//     //後でAPI呼び出しに置き換えます
//     setTimeout(() => {
//       this.setState({
//         items: [
//           {
//             img:
//               "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
//             desc: "鈴木さんが、「小説 疾風…」の貸出をリクエストしています",
//             date: "2020/10/10",
//             type: "request",
//             id: 1,
//           },
//           {
//             img:
//               "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
//             desc: "鈴木さんが、「盗作」の貸出をリクエストしています",
//             date: "2020/10/09",
//             type: "request",
//             id: 2,
//           },
//         ],
//       });
//     }, 100);
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <Grid container>
//           <Grid item xs={3}></Grid>
//           <Typography variant="h1">通知</Typography>
//           <Grid container direction="column">
//             <Divider />
//           </Grid>
//         </Grid>
//         <List component="nav">
//           {this.state.items.map((item, index) => (
//             <ListItem button key={index}>
//               <a className="row" href={"request/view/" + item.id}>
//                 <img src={item.img} alt="" className="col-xs-1" />
//                 <p className="col-xs-10">{item.desc}</p>
//                 <p className="col-xs-3">{item.date}</p>
//               </a>
//             </ListItem>
//           ))}
//         </List>
//       </React.Fragment>
//     );
//   }
// }
