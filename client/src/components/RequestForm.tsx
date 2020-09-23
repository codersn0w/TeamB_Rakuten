import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  name: string;
  id: number;
  owner: string;
  img: string;
  kikan: number;
  point: number;
  quality: string;
  user: {
    point: number;
  };
  form: { kikan: number };
}
export const RequestForm = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [owner, setOwner] = useState("");
  const [img, setImg] = useState("");
  const [kikan, setKikan] = useState(0);
  const [point, setPoint] = useState(0);
  const [quality, setQuality] = useState("");
  const [user, setUser] = useState({ point: 0 });
  const [form, setForm] = useState({ kikan: 0 });

  //後でAPI呼び出しに置き換えます
  setTimeout(() => {
    setName("小説　疾風伝説　特攻の拓３");
    setId(1);
    setOwner("やさぐれ太郎");
    setQuality("ほぼ新品");
    setImg(
      "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg"
    );
    setKikan(30);
    setPoint(9999);
    setUser({ point: 100000 });
  }, 100);

  //thisを固定します　これがないとフォーム入力時にエラー
  // this.onKikanChange = this.onKikanChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);

  const onKikanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ kikan: parseInt(event.target.value) });
    // console.log(this.state.form);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(form.kikan + " was submitted!");
    //ここでリクエストAPIを呼び出す
  };

  return (
    <main className="container-fluid">
      <h1>レンタルリクエストを送る</h1>
      <h2>
        <a href={"../../books/" + id}>{name}</a>
      </h2>
      <div className="row">
        <img src={img} alt="" className="col-xs-6" />
        <div className="col-xs-6">
          <h3>貸出者 {owner}</h3>
          <p>状態　{quality}</p>
          <p>消費P　{point}P</p>
          <p>期間　最大{kikan}日</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <h2>この本を借りる</h2>
        <p>所持ポイント {user.point}P</p>
        <p>消費ポイント {point}P</p>
        <p>残りポイント {user.point - point}P</p>
        <label htmlFor="kikan">日数</label>
        <input
          type="number"
          name="kikan"
          max={kikan}
          min="1"
          value={form.kikan}
          onChange={onKikanChange}
        />
        <input type="submit" value="送信" />
      </form>
    </main>
  );
};
