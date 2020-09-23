import React from "react";
import { RouteComponentProps } from "react-router-dom";

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  img: string;
  name: string;
  requester: string;
  kikan: number;
  date: string;
}
export default class RequestDetails extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);

    this.state = {
      img: "",
      name: "",
      requester: "string;",
      kikan: 1,
      date: "string;",
    };

    //後でAPI呼び出しに置き換えます
    setTimeout(() => {
      this.setState({
        img:
          "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
        name: "インターン伝説III",
        requester: "森泉友登",
        kikan: 10,
        date: "2020/09/18",
      });
    }, 100);
  }

  private accept() {
    //ここでリクエストAPIを呼び出す
    alert("リクエストを承認しました");
  }
  private decline() {
    //ここでリクエストAPIを呼び出す
    alert("リクエストを拒否しました");
  }

  render() {
    return (
      <main className="container-fluid">
        <h1>リクエスト詳細</h1>
        <div className="row">
          <img src={this.state.img} alt="" className="col-xs-6" />
          <div className="col-xs-6">
            <p>リクエストした人 {this.state.requester}</p>
            <p>借りたい日数 {this.state.kikan}</p>
            <p>リクエスト日 {this.state.date}</p>
          </div>
        </div>
        <div className="row">
          <button onClick={this.accept} className="btn btn-primary btn-lg">
            承認
          </button>
          <button onClick={this.decline} className="btn btn-danger btn-lg">
            拒否
          </button>
        </div>
      </main>
    );
  }
}
