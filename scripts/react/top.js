import React from 'react';
import moment from 'moment';

const Article = article => (
  <a href={`/${article.id}`}>
    <li className="card">
      <h2>{article.title.rendered}</h2>
      <p>{moment(article.date).format('YYYY/MM/DD')}</p>
    </li>
  </a>
);

export default props => (
  <div id="top">
    {props.articles.map(a => <Article key={a.id} {...a} />)}
  </div>
);
