import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  name: string;
  img: string;
  author: string;
  genre: string;
  genre_id: number;
  star: string;
  rentals: Array<{
    owner: string;
    quality: string;
    kikan: string;
    point: string;
    img: string;
    id: number;
  }>;
  reviews: Array<{
    author: string;
    star: string;
    title: string;
    content: string;
  }>;
  threads: Array<{
    title: string;
    author: string;
    posts: string;
  }>;
  form: { title: string; content: string };
}
export const BookDetail = () => {
  // this.state = {
  //   name: "タイトル",
  //   img: "",
  //   author: "",
  //   genre: "",
  //   genre_id: -1,
  //   star: "",
  //   rentals: [],
  //   reviews: [],
  //   threads: [],
  //   form: { title: "スレッド名", content: "HOGE" },
  // };

  // const [params, setParams] = useState({ form: {} });
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [genre_id, setGenreId] = useState(0);
  const [star, setStar] = useState("");
  const [rentals, setRentals] = useState([
    { owner: "", quality: "", kikan: "", point: "", img: "", id: 0 },
  ]);
  const [reviews, setReviews] = useState([
    {
      author: "",
      star: "",
      title: "",
      content: "",
    },
  ]);
  const [threads, setThreads] = useState([
    {
      title: "",
      author: "",
      posts: "",
    },
  ]);
  const [form, setForm] = useState({ title: "", content: "" });

  //後でAPI呼び出しに置き換えます
  setTimeout(() => {
    setName("すごい大冒険");
    setImg(
      "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg"
    );
    setAuthor("すごい太郎");
    setGenre("小説");
    setGenreId(1);
    setStar("2.5");
  }, 100);

  setTimeout(() => {
    setRentals([
      {
        owner: "田中太郎",
        quality: "ほぼ新品",
        kikan: "最大10日",
        point: "300",
        img:
          "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
        id: 1,
      },
    ]);
  }, 200);

  setTimeout(() => {
    setReviews([
      {
        author: "山田太郎",
        star: "5",
        title: "やばい",
        content: "やばい本です　絶対買うべきです",
      },
    ]);
  }, 300);

  setTimeout(() => {
    setThreads([
      {
        author: "山田太郎",
        title: "p15の表記について話し合うスレ",
        posts: "15",
      },
    ]);
  }, 400);

  //thisを固定します　これがないとフォーム入力時にエラー
  // this.onTitleChange = this.onTitleChange.bind(this);
  // this.onContentChange = this.onContentChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ title: event.target.value, content: form.content });
    // console.log(this.state.form);
  };

  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ title: form.title, content: event.target.value });
    // console.log(this.state.form);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(form.title + " was submitted!");
    //ここでスレッド作成APIを呼び出す
    //ここで新規作成スレッドに移動する
  };

  return (
    <main className="container-fluid">
      <div className="row">
        <img className="col-xs-4" src={img} alt="" />
        <div className="col-xs-8">
          <h1 className="h1">{name}</h1>
          <p>著者 {author}</p>
          <p>
            ジャンル
            <a href={"../genre/" + genre_id} className="btn btn-primary">
              {genre}
            </a>
          </p>
          <p>★ {star}</p>
        </div>
      </div>
      <h2>この本の貸出</h2>
      <div className="row">
        {rentals.map((book, index) => (
          <li className="list-group-item" key={index}>
            <div className="row">
              <img src={book.img} alt="" className="col-xs-6" />
              <div className="col-xs-6">
                <h3>貸出者 {book.owner}</h3>
                <p>状態　{book.quality}</p>
                <p>消費P　{book.point}P</p>
                <p>期間　{book.kikan}</p>
                <a
                  className="btn btn-primary btn-lg"
                  href={"../request/create/" + book.id}
                >
                  詳細
                </a>
              </div>
            </div>
          </li>
        ))}
      </div>
      <h2>レビュー</h2>
      {reviews.map((review, index) => (
        <li className="list-group-item" key={index}>
          <p>投稿者：{review.author}</p>
          <div className="row">
            <p>★{review.star}</p>
            <h3>{review.title}</h3>
          </div>
          <p>{review.content}</p>
        </li>
      ))}
      <h2>スレッド</h2>
      {threads.map((thread, index) => (
        <li className="list-group-item" key={index}>
          <h3>{thread.title}</h3>
          <div className="row">
            <p>投稿者：{thread.author}</p>
            <p>投稿：{thread.posts}件</p>
          </div>
        </li>
      ))}
      <h3>新規スレッド</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">スレッド名</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={onTitleChange}
        />
        <label htmlFor="content">投稿内容</label>
        <textarea
          name="content"
          value={form.content}
          onChange={onContentChange}
        ></textarea>
        <input type="submit" value="スレッド作成" />
      </form>
    </main>
  );
};
