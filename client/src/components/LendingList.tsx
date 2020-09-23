import React from "react";
import { RouteComponentProps } from "react-router-dom";

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  lending: Array<{
    name: string;
    img: string;
    requester: string;
    max_days: number;
    current_days: number;
    start_date: string;
    deadline_date: string;
  }>;
  borrowing: Array<{
    name: string;
    img: string;
    owner: string;
    max_days: number;
    current_days: number;
    start_date: string;
    deadline_date: string;
  }>;
}
export default class LendingList extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);

    this.state = {
      lending: [],
      borrowing: [],
    };

    //後でAPI呼び出しに置き換えます
    setTimeout(() => {
      this.setState({
        lending: [
          {
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
      });
    }, 100);
  }

  render() {
    return (
      <main className="container-fluid">
        <h1>貸出一覧</h1>
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
            </div>
          </div>
        ))}
      </main>
    );
  }
}
