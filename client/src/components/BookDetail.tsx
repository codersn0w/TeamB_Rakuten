import React from "react";
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
export default class BookDetail extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);

    this.state = {
      name: "タイトル",
      img: "",
      author: "",
      genre: "",
      genre_id: -1,
      star: "",
      rentals: [],
      reviews: [],
      threads: [],
      form: { title: "スレッド名", content: "HOGE" },
    };

    //後でAPI呼び出しに置き換えます
    setTimeout(() => {
      this.setState({
        name: "すごい大冒険",
        img:
          "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
        author: "すごい太郎",
        genre: "小説",
        genre_id: 1,
        star: "2.5",
      });
    }, 100);

    setTimeout(() => {
      this.setState({
        rentals: [
          {
            owner: "田中太郎",
            quality: "ほぼ新品",
            kikan: "最大10日",
            point: "300",
            img:
              "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
            id: 1,
          },
        ],
      });
    }, 200);

    setTimeout(() => {
      this.setState({
        reviews: [
          {
            author: "山田太郎",
            star: "5",
            title: "やばい",
            content: "やばい本です　絶対買うべきです",
          },
        ],
      });
    }, 300);

    setTimeout(() => {
      this.setState({
        threads: [
          {
            author: "山田太郎",
            title: "p15の表記について話し合うスレ",
            posts: "15",
          },
        ],
      });
    }, 400);

    //thisを固定します　これがないとフォーム入力時にエラー
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private onTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      form: { title: event.target.value, content: this.state.form.content },
    });
    console.log(this.state.form);
  }

  private onContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      form: { title: this.state.form.title, content: event.target.value },
    });
    console.log(this.state.form);
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert(this.state.form.title + " was submitted!");
    //ここでスレッド作成APIを呼び出す
    //ここで新規作成スレッドに移動する
  }

  render() {
    return (
      <main className="container-fluid">
        <div className="row">
          <img className="col-xs-4" src={this.state.img} alt="" />
          <div className="col-xs-8">
            <h1 className="h1">{this.state.name}</h1>
            <p>著者 {this.state.author}</p>
            <p>
              ジャンル
              <a
                href={"../genre/" + this.state.genre_id}
                className="btn btn-primary"
              >
                {this.state.genre}
              </a>
            </p>
            <p>★ {this.state.star}</p>
          </div>
        </div>
        <h2>この本の貸出</h2>
        <div className="row">
          {this.state.rentals.map((book, index) => (
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
        {this.state.reviews.map((review, index) => (
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
        {this.state.threads.map((thread, index) => (
          <li className="list-group-item" key={index}>
            <h3>{thread.title}</h3>
            <div className="row">
              <p>投稿者：{thread.author}</p>
              <p>投稿：{thread.posts}件</p>
            </div>
          </li>
        ))}
        <h3>新規スレッド</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">スレッド名</label>
          <input
            type="text"
            name="title"
            value={this.state.form.title}
            onChange={this.onTitleChange}
          />
          <label htmlFor="content">投稿内容</label>
          <textarea
            name="content"
            value={this.state.form.content}
            onChange={this.onContentChange}
          ></textarea>
          <input type="submit" value="スレッド作成" />
        </form>
      </main>
    );
  }
}
