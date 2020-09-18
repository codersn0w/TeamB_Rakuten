import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Top } from "./components/Top";
import { Profile } from "./components/Profile";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth0 } from "@auth0/auth0-react";
import SearchResult from "./components/SearchResult";
import BookDetail from "./components/BookDetail";
import Genre from "./components/Genre";
import Thread from "./components/Thread";
import RequestForm from "./components/RequestForm";
import { Footer } from "./components/Footer";

export const App = () => {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <p></p>;
  }

  return (
    <Router>
      <div>
        <Header></Header>
        <Route exact path="/" component={Top} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Route
          exact
          path="/search/:query"
          component={SearchResult}
          render={(props) => <SearchResult {...props} />}
        />
        <Route
          exact
          path="/books/:id"
          component={BookDetail}
          render={(props) => <BookDetail {...props} />}
        />
        <Route
          exact
          path="/genre/:id"
          component={Genre}
          render={(props) => <Genre {...props} />}
        />
        <Route
          exact
          path="/threads/:id"
          component={Thread}
          render={(props) => <Thread {...props} />}
        />
        <Route
          exact
          path="/request/create/:id"
          component={RequestForm}
          render={(props) => <RequestForm {...props} />}
        />
        {/*<Route exact path="/Games" component={Games} />*/}
        {/*<Route*/}
        {/*  exact*/}
        {/*  path="/Games/GameArticle/:id"*/}
        {/*  render={(props) => <GameArticle {...props} />}*/}
        {/*/>*/}
        {/*<Route path="/Blog" component={Blog} />*/}
        <Footer></Footer>
      </div>
    </Router>
  );
};
