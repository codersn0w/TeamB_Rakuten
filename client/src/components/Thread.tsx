import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

type Props = {} & RouteComponentProps<{ id: string }>;
interface States {
  title: string;
  posts: Array<{ author: string; content: string }>;
  content: string;
}
export const Thread = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([{ author: "", content: "" }]);

  //後でAPI呼び出しに置き換えます
  setTimeout(() => {
    setTitle("p15の表記について話し合うスレ");
    setPosts([
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
    ]);
  }, 100);

  //thisを固定します　これがないとフォーム入力時にエラー
  // this.onContentChange = this.onContentChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);

  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //   this.setState({
    //     form: { content: event.target.value },
    //   });
    //   console.log(this.state.form);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //   event.preventDefault();
    //   alert(this.state.form.content + " was submitted!");
    //   //ここで投稿APIを呼び出す
  };

  return (
    <main className="container-fluid">
      <h1>{title}</h1>
      {posts.map((post, index) => (
        <li className="list-group-item" key={index}>
          <h2>{post.author}</h2>
          <p>{post.content}</p>
        </li>
      ))}
      <form onSubmit={handleSubmit}>
        <h2>投稿</h2>
        <label htmlFor="content">投稿内容</label>
        <textarea
          name="content"
          value={content}
          onChange={onContentChange}
        ></textarea>
        <input type="submit" value="投稿" />
      </form>
    </main>
  );
};
