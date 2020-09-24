import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import { Top } from "./components/Top";
import { Profile } from "./components/Profile";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth0 } from "@auth0/auth0-react";
import { SearchResult } from "./components/SearchResult";
import BookDetail from "./components/BookDetail";
import Genre from "./components/Genre";
import { Thread } from "./components/Thread";
import { RequestForm } from "./components/RequestForm";
import { Footer } from "./components/Footer";
import { NotificationComponent } from "./components/Notification";
import { RequestDetails } from "./components/RequestDetails";
import { Typography } from "@material-ui/core";
import { LendingList } from "./components/LendingList";
import { LendingDetails } from "./components/LendingDetails";
import { Followers } from "./components/Followers";
import { BookRegister } from "./components/BookRegister";

const NotFound = () => <Typography>404.. This page is not found!</Typography>;

export const App = () => {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <p></p>;
  }

  return (
    <Router>
      <div>
        <Switch>
          {/*<Route exact path="/" component={HeaderForTop}/>*/}
          <Route component={Header}></Route>
        </Switch>
        <Switch>
          <Route exact path="/" component={Top} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <Route
            exact
            path="/search/:query"
            component={SearchResult}
            // render={(props) => <SearchResult {...props} />}
          />
          <Route exact path="/books/register" component={BookRegister} />
          {/* <Route
            exact
            path="/books/register"
            component={BookRegister}
            render={(props) => <BookRegister {...props} />}
          /> */}
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
          <Route exact path="/threads/:id" component={Thread} />
          {/* <Route
            exact
            path="/threads/:id"
            component={Thread}
            render={(props) => <Thread {...props} />}
          /> */}
          <Route exact path="/notification" component={NotificationComponent} />
          {/* <Route
            // exact
            path="/notification"
            component={NotificationComponent}
            render={(props) => <NotificationComponent {...props} />}
          /> */}
          <Route exact path="/request/create/:id" component={RequestForm} />
          {/* <Route
            exact
            path="/request/create/:id"
            component={RequestForm}
            render={(props) => <RequestForm {...props} />}
          /> */}
          <Route exact path="/request/view/:id" component={RequestDetails} />
          {/* <Route
            exact
            path="/request/view/:id"
            component={RequestDetails}
            render={(props) => <RequestDetails {...props} />}
          /> */}
          <Route exact path="/lending" component={LendingList} />
          {/* <Route
            exact
            path="/lending"
            component={LendingList}
            render={(props) => <LendingList {...props} />}
          /> */}
          <Route exact path="/lending/:id" component={LendingDetails} />
          {/* <Route
            exact
            path="/lending/:id"
            component={LendingDetails}
            render={(props) => <LendingDetails {...props} />}
          /> */}
          <Route exact path="/followers" component={Followers} />
          {/* <Route
            exact
            path="/followers"
            component={Followers}
            render={(props) => <Followers {...props} />}
          /> */}
          <Route component={NotFound}></Route>
        </Switch>
        <Footer></Footer>
      </div>
    </Router>
  );
};
