import MainLayout from '../layouts/MainLayout';

import LongpullingPage from '../pages/LongpullingPage';
import HomePage from '../pages/HomePage';
import EventsourcePage from '../pages/EventsourcePage';
import WebsocketPage from '../pages/WebsocketPage';

export const HomeRoute = {
  name: 'Home',
  path: '/',
  exact: true,
  Page: HomePage,
  Layout: MainLayout
}

export const LongpullingRoute = {
  name: "Longpulling",
  path: '/longpulling',
  exact: false,
  Page: LongpullingPage,
  Layout: MainLayout
}

export const EventsourceRoute = {
  name: 'Eventsource',
  path: '/eventsource',
  exact: false,
  Page: EventsourcePage,
  Layout: MainLayout
}

export const WebsocketRoute = {
  name: 'Websocket',
  path: '/websocket',
  exact: false,
  Page: WebsocketPage,
  Layout: MainLayout
}