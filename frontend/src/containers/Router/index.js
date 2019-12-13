import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import Home from "../HomePage";
import SignUpPage from "../SignUpPage";
import {PrivateRoute} from "../../style/constants";
import ProfilePage from "../ProfilePage";
import GamePage from "../GamePage";

import LobbyPage from "../LobbyPage";


export const routes = {
  home: "/",
  lobby: `/lobby/:id`,
  game: "/game/:id",
  login: "/login",
  signup: "/signup",
  profile: "/profile",
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <PrivateRoute path={routes.lobby} component={LobbyPage} />
        <PrivateRoute path={routes.profile} component={ProfilePage} />
        <Route path={routes.login} component={LoginPage} />
        <Route path={routes.game} component={GamePage} />
        <Route path={routes.signup} component={SignUpPage} />
        <PrivateRoute path={routes.home} component={Home} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
