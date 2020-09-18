import React from "react";
import { RouteComponentProps } from "react-router-dom";

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  name: string;
  news: Array<{ date: string; desc: string }>;
  threads: Array<{
    title: string;
    author: string;
    posts: string;
  }>;
  form: { title: string; content: string };
}
export default class Genre extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);

    this.state = {
      name: "",
      news: [],
      form: { title: "スレッド名", content: "HOGE" },
      threads: [],
    };

    //後でAPI呼び出しに置き換えます
    setTimeout(() => {
      this.setState({
        name: "小説",
        news: [
          { date: "2019-10-10", desc: "小説「わおわお」が売り上げ一位に" },
        ],
        threads: [
          {
            author: "山田太郎",
            title: "p15の表記について話し合うスレ",
            posts: "15",
          },
        ],
      });
    }, 100);

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
        <h1>{this.state.name} コミュニティ</h1>
        <h2>ニュース</h2>
        <ul>
          {this.state.news.map((item, index) => (
            <li className="list-group-item" key={index}>
              {item.date} {item.desc}
            </li>
          ))}
        </ul>
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
        <form onSubmit={this.handleSubmit}>
          <h3>新規スレッド</h3>
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
