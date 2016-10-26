import React from 'react';
import { render } from 'react-dom';

import ArticlePage from './article';

const initialData = JSON.parse(
  document.getElementById('initial-data').getAttribute('data-json')
) || {};

render(<ArticlePage {...initialData} />, document.getElementById('app'));
