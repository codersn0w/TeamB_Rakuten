import React from "react";
import { RouteComponentProps } from "react-router-dom";

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
export default class LendingList extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);

    this.state = {
      lending: [],
      borrowing: [],
      requests_sent: [],
    };

    //後でAPI呼び出しに置き換えます
    setTimeout(() => {
      this.setState({
        lending: [
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
        ],
        borrowing: [
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
        ],
        requests_sent: [
          {
            id: 3,
            name: "小説　疾風伝説　特攻の拓2",
            img:
              "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
            owner: "山本",
            days: 10,
            date: "2020-09-15",
          },
        ],
      });
    }, 100);
  }

  private cancel(id: number): void {
    alert(id + "をキャンセル");
    //ここでリクエスト削除APIを呼び出し
    setTimeout(() => {
      this.setState({ requests_sent: [] });
    }, 500);
  }

  render() {
    return (
      <main className="container-fluid">
        <h1>やりとり中の本</h1>
        <h2>貸出した本</h2>
        {this.state.lending.map((book, index) => (
          <div className="row">
            <img src={book.img} alt="" className="col-xs-6" />
            <div className="col-xs-6">
              <p>{book.name}</p>
              <p>借りる人 {book.requester}</p>
              <p>
                借りる日数 {book.current_days}/{book.max_days}
              </p>
              <p>貸出開始 {book.start_date}</p>
              <p>貸出期限 {book.deadline_date}</p>
              <a href={"/lending/" + book.id} className="btn btn-primary">
                詳細
              </a>
            </div>
          </div>
        ))}
        <h2>借りた本</h2>
        {this.state.borrowing.map((book, index) => (
          <div className="row">
            <img src={book.img} alt="" className="col-xs-6" />
            <div className="col-xs-6">
              <p>{book.name}</p>
              <p>所有者 {book.owner}</p>
              <p>
                借りる日数 {book.current_days}/{book.max_days}
              </p>
              <p>貸出開始 {book.start_date}</p>
              <p>貸出期限 {book.deadline_date}</p>
              <a href={"/lending/" + book.id} className="btn btn-primary">
                詳細
              </a>
            </div>
          </div>
        ))}
        <h2>承認待ちの本</h2>
        {this.state.requests_sent.map((book, index) => (
          <div className="row">
            <img src={book.img} alt="" className="col-xs-6" />
            <div className="col-xs-6">
              <p>{book.name}</p>
              <p>所有者 {book.owner}</p>
              <p>借りる日数 {book.days}</p>
              <p>リクエスト日 {book.date}</p>
              <button
                onClick={this.cancel.bind(this, book.id)}
                className="btn btn-danger"
              >
                キャンセル
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }
}
