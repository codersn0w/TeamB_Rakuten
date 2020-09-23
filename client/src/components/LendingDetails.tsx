import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  name: string;
  img: string;
  owner_name: string;
  owner_id: number;
  owner_address: string;
  requester_name: string;
  requester_id: number;
  requester_address: string;
  max_days: number;
  current_days: number;
  start_date: string;
  deadline_date: string;
  state: string;
  button: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
}
export const LendingDetails = () => {
  const state = {
    name: "",
    img: "",
    owner_name: "",
    owner_id: -1,
    owner_address: "",
    requester_name: "",
    requester_id: -1,
    requester_address: "",
    max_days: 0,
    current_days: 0,
    start_date: "",
    deadline_date: "",
    state: "",
    button: <button></button>,
  };
  const [params, setParams] = useState(state);

  //後でAPI呼び出しに置き換えます
  setTimeout(() => {
    setParams({
      name: "小説　疾風伝説　特攻の拓３",
      img:
        "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
      owner_name: "田中太郎",
      owner_id: 1,
      owner_address: "〒158-0094 東京都世田谷区玉川１丁目１４−１",
      requester_name: "鈴木",
      requester_id: 2,
      requester_address: "〒158-0094 東京都世田谷区玉川１丁目１４−１",
      max_days: 10,
      current_days: 3,
      start_date: "2020/09/15",
      deadline_date: "2020/09/25",
      state: "発送待",
      button: createButton(),
    });
  }, 100);

  const requesterReceive = () => {
    alert("(借りた人が)受取を通知しました");
  };

  const return_notify = () => {
    alert("返送を通知しました");
  };
  const sending = () => {
    alert("発送を通知しました");
  };
  const ownerReceive = () => {
    alert("(所有者が)受取を通知しました");
  };

  const createButton = () => {
    const USER_ID = 1;
    if (params.requester_id === 1234) {
      //ログインしている人が借りている側だったら
      if (params.state === "発送中")
        return (
          <button onClick={requesterReceive} className="btn btn-primary btn-lg">
            受取通知
          </button>
        );
      if (params.state === "貸出中")
        return (
          <button onClick={return_notify} className="btn btn-primary btn-lg">
            返送通知
          </button>
        );
    } else if (params.owner_id === USER_ID) {
      //ログインしている人が貸している側だったら
      if (params.state === "発送待") {
        return (
          <button onClick={sending} className="btn btn-primary btn-lg">
            発送通知
          </button>
        );
      }
      if (params.state === "返送中") {
        return (
          <button onClick={ownerReceive} className="btn btn-primary btn-lg">
            受取通知
          </button>
        );
      }
    }
    return <p></p>;
  };

  return (
    <main className="container-fluid">
      <h1>貸出一覧</h1>
      <div className="row">
        <img src={params.img} alt="" className="col-xs-6" />
        <div className="col-xs-6">
          <p>{params.name}</p>
          <p>貸す人 {params.owner_name}</p>
          <p>借りる人 {params.requester_name}</p>
          <p>
            借りる日数 {params.current_days}/{params.max_days}
          </p>
          <p>状態 {state}</p>
          <p>貸出開始 {params.start_date}</p>
          <p>貸出期限 {params.deadline_date}</p>
        </div>
      </div>
      <p>
        {params.state === "発送待" ? "発送先:" + params.requester_address : ""}
        {params.state === "貸出中" ? "返送先:" + params.owner_address : ""}
      </p>
      {params.button}
    </main>
  );
};
