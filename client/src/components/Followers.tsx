import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  items: Array<{ name: string; desc: string; direction: string; id: number }>;
}
export const Followers = () => {
  const STATE = [{}];
  const [items, setItems] = useState(STATE);

  //後でAPI呼び出しに置き換えます
  setTimeout(() => {
    setItems([
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
    ]);
  }, 100);

  const follow = (id: number) => {
    alert(id + "をふぉろー");
  };
  const unfollow = (id: number) => {
    alert(id + "をふぉろー解除");
  };

  return (
    <main className="container-fluid">
      <h1>友人関係</h1>
      {items.map((item: any, index: number) => (
        <li className="list-group-item" key={index}>
          <div className="row">
            <p className="col">{item.name}</p>
            <p className="col">{item.desc}</p>
            <p className="col">{item.direction}</p>
            <div className="col">
              {item.direction === "フォロワ" ? (
                <button
                  onClick={() => {
                    follow(item.id);
                  }}
                  className="btn btn-primary"
                >
                  フォロー
                </button>
              ) : (
                <button
                  onClick={() => {
                    unfollow(item.id);
                  }}
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
};
