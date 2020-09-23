import React from "react";
import { RouteComponentProps } from "react-router-dom";

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  name: string;
  point: number;
  days: number;
  id: number;
  list: Array<{ id: number; name: string; img: string }>;
}
export default class BookRegister extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);

    this.state = {
      name: "",
      point: 1,
      days: 2,
      id: -1,
      list: [],
    };

    //thisを固定します　これがないとフォーム入力時にエラー
    this.onNameChange = this.onNameChange.bind(this);
    this.onPointChange = this.onPointChange.bind(this);
    this.onDaysChange = this.onDaysChange.bind(this);
    this.onBookChange = this.onBookChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private onNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: event.target.value,
    });
    //ここで本名検索API呼び出し
    setTimeout(() => {
      this.setState({
        list: [
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
        ],
      });
    }, 100);
    console.log(this.state.name);
  }

  private onPointChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      point: parseInt(event.target.value),
    });
    console.log(this.state.point);
  }

  private onDaysChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      days: parseInt(event.target.value),
    });
    console.log(this.state.days);
  }

  private onBookChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({
      id: parseInt(event.target.value),
    });
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert(this.state.id + " was submitted!");
    //ここで貸出本登録APIを呼び出す
    //ここで貸出詳細画面に移動
  }

  render() {
    return (
      <main className="container-fluid">
        <h1>貸し出す本の登録</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">本の名前で検索</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onNameChange}
            className="form-control"
          />
          <div className="form-group">
            <label htmlFor="book">本の選択</label>
            <select
              className="form-control"
              name="book"
              onChange={this.onBookChange}
            >
              {this.state.list.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor="point">必要P</label>
          <input
            type="number"
            name="point"
            value={this.state.point}
            min="1"
            onChange={this.onPointChange}
            className="form-control"
          />
          <label htmlFor="days">最大貸出日数</label>
          <input
            type="number"
            name="days"
            value={this.state.days}
            min="2"
            onChange={this.onDaysChange}
            className="form-control"
          />
          <input type="submit" value="この本を貸出" />
        </form>
      </main>
    );
  }
}
