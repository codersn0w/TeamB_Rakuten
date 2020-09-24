import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  img: string;
  name: string;
  requester: string;
  kikan: number;
  date: string;
}
export const RequestDetails = () => {
  //   this.state = {
  //     img: "",
  //     name: "",
  //     requester: "string;",
  //     kikan: 1,
  //     date: "string;",
  // };

  const [img, setImage] = useState("");
  const [name, setName] = useState("");
  const [requester, setRequester] = useState("");
  const [date, setDate] = useState("");
  const [kikan, setKikan] = useState(1);

  //後でAPI呼び出しに置き換えます
  setTimeout(() => {
    setImage(
      "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg"
    );
    setName("インターン伝説III");
    setRequester("森泉友登");
    setKikan(10);
    setDate("2020/09/18");
    // this.setState({
    //   img:
    //     "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
    //   name: "インターン伝説III",
    //   requester: "森泉友登",
    //   kikan: 10,
    //   date: "2020/09/18",
    // });
  }, 100);

  const accept = () => {
    //ここでリクエストAPIを呼び出す
    alert("リクエストを承認しました");
  };
  const decline = () => {
    //ここでリクエストAPIを呼び出す
    alert("リクエストを拒否しました");
  };

  return (
    <main className="container-fluid">
      <h1>リクエスト詳細</h1>
      <div className="row">
        <img src={img} alt="" className="col-xs-6" />
        <div className="col-xs-6">
          <p>リクエストした人 {requester}</p>
          <p>借りたい日数 {kikan}</p>
          <p>リクエスト日 {date}</p>
        </div>
      </div>
      <div className="row">
        <button onClick={accept} className="btn btn-primary btn-lg">
          承認
        </button>
        <button onClick={decline} className="btn btn-danger btn-lg">
          拒否
        </button>
      </div>
    </main>
  );
};
