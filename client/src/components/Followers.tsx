import React from "react";
import { RouteComponentProps } from "react-router-dom";

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  items: Array<{ name: string; desc: string; direction: string; id: number }>;
}
export default class Followers extends React.Component<Props, States> {
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
            name: "吉田",
            desc: "小説に興味があります。",
            direction: "相互",
            id: 4,
          },
          {
            name: "田村",
            desc: "マンガを読みたい",
            direction: "フォロワ",
            id: 5,
          },
          {
            name: "鈴木",
            desc: "ナウい本が好き",
            direction: "フォロー",
            id: 6,
          },
        ],
      });
    }, 100);
  }

  private follow(id: number) {
    alert(id + "をふぉろー");
  }
  private unfollow(id: number) {
    alert(id + "をふぉろー解除");
  }

  render() {
    return (
      <main className="container-fluid">
        <h1>友人関係</h1>
        {this.state.items.map((item, index) => (
          <li className="list-group-item" key={index}>
            <div className="row">
              <p className="col">{item.name}</p>
              <p className="col">{item.desc}</p>
              <p className="col">{item.direction}</p>
              <div className="col">
                {item.direction === "フォロワ" ? (
                  <button
                    onClick={this.follow.bind(this, item.id)}
                    className="btn btn-primary"
                  >
                    フォロー
                  </button>
                ) : (
                  <button
                    onClick={this.unfollow.bind(this, item.id)}
                    className="btn btn-secondary"
                  >
                    フォロー解除
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </main>
    );
  }
}
