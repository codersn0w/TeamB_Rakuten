import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Header} from "./components/Header";
import {Top} from "./components/Top";
import {Profile} from "./components/Profile";
import {ProtectedRoute} from "./components/ProtectedRoute";
import {useAuth0} from "@auth0/auth0-react";


export const App = () => {
    const {isLoading} = useAuth0();
    if (isLoading) {
        return <p></p>;
    }

    return (
        <Router>
            <div>
                <Header></Header>
                <Route path="/" component={Top}/>
                <ProtectedRoute exact path="/profile" component={Profile}/>
                {/*<Route exact path="/Games" component={Games} />*/}
                {/*<Route*/}
                {/*  exact*/}
                {/*  path="/Games/GameArticle/:id"*/}
                {/*  render={(props) => <GameArticle {...props} />}*/}
                {/*/>*/}
                {/*<Route path="/Blog" component={Blog} />*/}
                {/*<Footer></Footer>*/}
            </div>
        </Router>
    );
};