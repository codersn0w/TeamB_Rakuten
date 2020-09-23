import React from "react";
import { RouteComponentProps } from "react-router-dom";

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
export default class NotificationComponent extends React.Component<
  Props,
  States
> {
  constructor(props: any) {
    super(props);

    this.state = {
      items: [],
    };

    //後でAPI呼び出しに置き換えます
    setTimeout(() => {
      this.setState({
        items: [
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
        ],
      });
    }, 100);
  }

  render() {
    return (
      <main className="container-fluid">
        <h1>通知</h1>
        {this.state.items.map((item, index) => (
          <li className="list-group-item" key={index}>
            <a className="row" href={"request/view/" + item.id}>
              <img src={item.img} alt="" className="col-xs-1" />
              <p className="col-xs-10">{item.desc}</p>
              <p className="col-xs-3">{item.date}</p>
            </a>
          </li>
        ))}
      </main>
    );
  }
}
