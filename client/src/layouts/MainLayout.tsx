import React, { FC, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import * as routes from '../config/routes';

interface Props {};

const navLinkRender = (routes: Object) => Object.values(routes).map((route, index) => <NavLink key={index} to={route.path} exact={route.exact}>{route.name}</NavLink>);

const MainLayout: FC<PropsWithChildren<Props>> = ({ children }) => (
  <>
    <header>
      <nav>{navLinkRender(routes)}</nav>
    </header>
    <main>{children}</main>
    <footer>
      <p>HOHOHOHOH</p>
    </footer>
  </>
);

export default MainLayout;