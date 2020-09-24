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
  const [items, setItems] = useState([
    { id: 0, img: "", desc: "", date: "", type: "" },
  ]);
  //後でAPI呼び出しに置き換えます
  setTimeout(() => {
    setItems([
      {
        img:
          "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
        desc: "鈴木さんが、「小説 疾風…」の貸出をリクエストしています",
        date: "2020/10/10",
        type: "request",
        id: 1,
      },
      {
        img:
          "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
        desc: "鈴木さんが、「盗作」の貸出をリクエストしています",
        date: "2020/10/09",
        type: "request",
        id: 2,
      },
      {
        img:
          "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
        desc: "鈴木さんが、「盗作」の貸出をリクエストしています",
        date: "2020/10/09",
        type: "request",
        id: 2,
      },
    ]);
    // this.setState({
    //   items: [
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
    //   ],
    // });
  }, 100);
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={3}></Grid>
        <Typography variant="h2">通知</Typography>
        <Grid container direction="column">
          <Divider />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <List component="nav">
            {items.map((item, index) => (
              <ListItem button key={index}>
                <Card>
                  <a href={"request/view/" + item.id}>
                    <Grid container>
                      <Grid item xs={2}>
                        <CardMedia src={item.img} component="img" />
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
