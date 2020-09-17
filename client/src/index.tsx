import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { SearchResult } from "./SearchResult";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-0hguzgvk.us.auth0.com"
    clientId="cwgCxkwDG8r5Qga9lX0cYS7if2pJgeLc"
    redirectUri={window.location.origin}
  >
    <SearchResult></SearchResult>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
