import React from "react";
import { RouteComponentProps } from "react-router-dom";

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  name: string;
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
export default class RequestForm extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);

    this.state = {
      name: "書名",
      owner: "貸出者",
      img: "画像URL",
      quality: "商品の状態",
      kikan: 1, //最大貸出日数
      point: 1, //必要ポイント数
      user: { point: 2 }, //所持ポイント
      form: { kikan: 1 }, //借りる期間
    };

    //後でAPI呼び出しに置き換えます
    setTimeout(() => {
      this.setState({
        name: "小説　疾風伝説　特攻の拓３",
        owner: "やさぐれ太郎",
        quality: "ほぼ新品",
        img:
          "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
        kikan: 30,
        point: 99999,
        user: { point: 100000 },
      });
    }, 100);

    //thisを固定します　これがないとフォーム入力時にエラー
    this.onKikanChange = this.onKikanChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private onKikanChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      form: { kikan: parseInt(event.target.value) },
    });
    console.log(this.state.form);
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert(this.state.form.kikan + " was submitted!");
    //ここでリクエストAPIを呼び出す
  }

  render() {
    return (
      <main className="container-fluid">
        <h1>レンタルリクエストを送る</h1>
        <div className="row">
          <img src={this.state.img} alt="" className="col-xs-6" />
          <div className="col-xs-6">
            <h3>貸出者 {this.state.owner}</h3>
            <p>状態　{this.state.quality}</p>
            <p>消費P　{this.state.point}P</p>
            <p>期間　最大{this.state.kikan}日</p>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <h2>この本を借りる</h2>
          <p>所持ポイント {this.state.user.point}P</p>
          <p>消費ポイント {this.state.point}P</p>
          <p>残りポイント {this.state.user.point - this.state.point}P</p>
          <label htmlFor="kikan">日数</label>
          <input
            type="number"
            name="kikan"
            max={this.state.kikan}
            min="1"
            value={this.state.form.kikan}
            onChange={this.onKikanChange}
          />
          <input type="submit" value="送信" />
        </form>
      </main>
    );
  }
}
