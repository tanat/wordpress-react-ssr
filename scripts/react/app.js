import React from 'react';
import { render } from 'react-dom';

import ArticlePage from './article';
import TopPage from './top';

import '../styles/index.styl';

const initialData = JSON.parse(
  document.getElementById('initial-data').getAttribute('data-json')
) || {};

const routes = [
  {
    path: /\/[0-9]+/,
    component: ArticlePage,
  },
  {
    path: /\//,
    component: TopPage,
  },
];

const path = window.location.pathname;
const Component = routes.reduce((memo, route) =>
  memo || (path.match(route.path) ? route.component : null), null);

render(<Component {...initialData} />, document.getElementById('app'));
