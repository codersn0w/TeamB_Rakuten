import React from "react";
import { RouteComponentProps } from "react-router-dom";
type PageProps = {} & RouteComponentProps<{ query: string }>;
interface PageStates {
  books: Array<{ name: string; author: string; genre: string; img: string }>;
}
export default class SearchResult extends React.Component<
  PageProps,
  PageStates
> {
  constructor(props: any) {
    super(props);

    this.state = {
      books: [
        {
          name: "小説　盗作",
          author: "やば太郎",
          genre: "小説",
          img:
            "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
        },
      ],
    };

    //後でAPI呼び出しに置き換えます
    setTimeout(() => {
      const books = this.state.books;
      books.push({
        name: "やば太郎大冒険",
        author: "やば太郎",
        genre: "小説",
        img:
          "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
      });
      this.setState({ books: books });
    }, 1000);
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>「{this.props.match.params.query}」の検索結果</h1>
        <ul className="list-group">{this.renderList()}</ul>
      </div>
    );
  }

  //配列からliノードのリストを返します
  private renderList() {
    const rows = this.state.books.map((book, index) => (
      <li className="list-group-item" key={index}>
        <div className="row">
          <img src={book.img} alt="" className="col-xs-6" />
          <div className="col-xs-6">
            <p>{book.name}</p>
            <p>著者　{book.author}</p>
            <p>ジャンル　{book.genre}</p>
          </div>
        </div>
      </li>
    ));

    return rows;
  }
}
