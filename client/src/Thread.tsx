import React from "react";
import { RouteComponentProps } from "react-router-dom";

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  title: string;
  posts: Array<{ author: string; content: string }>;
  form: { content: string };
}
export default class Thread extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);

    this.state = {
      title: "スレッドタイトル",
      posts: [],
      form: { content: "HOGE" },
    };

    //後でAPI呼び出しに置き換えます
    setTimeout(() => {
      this.setState({
        title: "p15の表記について話し合うスレ",
        posts: [
          {
            author: "田中太郎",
            content: "p15のエモいってどういう意味ですか？",
          },
          {
            author: "鈴木",
            content: "エモーショナルな、という意味ですよ",
          },
          {
            author: "よ",
            content: "同意見です",
          },
        ],
      });
    }, 100);

    //thisを固定します　これがないとフォーム入力時にエラー
    this.onContentChange = this.onContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private onContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      form: { content: event.target.value },
    });
    console.log(this.state.form);
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert(this.state.form.content + " was submitted!");
    //ここで投稿APIを呼び出す
  }

  render() {
    return (
      <main className="container-fluid">
        <h1>{this.state.title}</h1>
        {this.state.posts.map((post, index) => (
          <li className="list-group-item" key={index}>
            <h2>{post.author}</h2>
            <p>{post.content}</p>
          </li>
        ))}
        <form onSubmit={this.handleSubmit}>
          <h2>投稿</h2>
          <label htmlFor="content">投稿内容</label>
          <textarea
            name="content"
            value={this.state.form.content}
            onChange={this.onContentChange}
          ></textarea>
          <input type="submit" value="投稿" />
        </form>
      </main>
    );
  }
}
