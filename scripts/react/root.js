import React from 'react';
import { Route } from 'react-router';

import Top from './top';
import Article from './article';

const Base = props => (
  <div>
    {props.childrend}
  </div>
);

export default (
  <Route path="/" component={Base}>
    <IndexRoute component={Top} />
    <Route path=":id" component={Article} />
  </Route>
);
