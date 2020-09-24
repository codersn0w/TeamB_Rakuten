import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  name: string;
  point: number;
  days: number;
  id: number;
  list: Array<{ id: number; name: string; img: string }>;
}
export const BookRegister = () => {
  const STATES = {
    name: "",
    point: 1,
    days: 2,
    id: -1,
    list: [],
  };

  const [name, setName] = useState("");
  const [point, setPoint] = useState(0);
  const [days, setDays] = useState(0);
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

  const onBookChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setId(parseInt(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(id + " was submitted!");
    //ここで貸出本登録APIを呼び出す
    //ここで貸出詳細画面に移動
  };

  return (
    <main className="container-fluid">
      <h1>貸し出す本の登録</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">本の名前で検索</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onNameChange}
          className="form-control"
        />
        <div className="form-group">
          <label htmlFor="book">本の選択</label>
          <select className="form-control" name="book" onChange={onBookChange}>
            {list.map((item, index) => (
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
          value={point}
          min="1"
          onChange={onPointChange}
          className="form-control"
        />
        <label htmlFor="days">最大貸出日数</label>
        <input
          type="number"
          name="days"
          value={days}
          min="2"
          onChange={onDaysChange}
          className="form-control"
        />
        <input type="submit" value="この本を貸出" />
      </form>
    </main>
  );
};
