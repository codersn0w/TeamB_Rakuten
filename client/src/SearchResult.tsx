import React from "react";

export const SearchResult = () => {
  return (
    <div>
      <header>
        <p>ヘッダコンポーネントがここに入ります</p>
        <h1>Search Result</h1>
        <input type="text" name="検索バー" id="" />
        <input type="submit" value="検索" />
      </header>
      <p>「小説　太郎」の検索結果</p>
      <ul>
        <li>
          <img src="" alt="" />
          <div>
            <p>小説　盗作</p>
            <p>著者　やば太郎</p>
            <p>ジャンル　小説</p>
          </div>
        </li>
      </ul>
      <table>
        <tr>
          <th>本のタイトル</th>
          <th>写真</th>
        </tr>
        <tr>
          <td>小説　盗作</td>
          <td>写真</td>
        </tr>
        <tr>
          <td>小説　やば日記</td>
          <td>写真</td>
        </tr>
      </table>
    </div>
  );
};
