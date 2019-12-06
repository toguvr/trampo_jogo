import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import Home from "../HomePage";

const routes = {
  home: "/",
  lobby: "/lobby",
  // Outras rotas aqui
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route path={routes.lobby} component={LoginPage} />
        <Route path={routes.home} component={Home} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
