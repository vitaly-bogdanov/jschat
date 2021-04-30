import React, { FC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as routes from './config/routes';
import { TRoute } from './config/TRoute';
import './App.css';

const routesRender = (routes: Object) => Object.values(routes).map((route, index) => (
    <Route key={index} path={route.path} exact={route.exact}>
      <route.Layout>
        <route.Page name={route.name} />
      </route.Layout>
    </Route>
  )
);

const App: FC = () => {
  return (
    <Switch>
      { routesRender(routes) }
    </Switch>
  );
}

export default App;
