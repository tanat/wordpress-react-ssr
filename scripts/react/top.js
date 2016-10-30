import React from 'react';

const Article = article => (
  <a href={`/${article.id}`}>
    <li>
      <h2>{article.title.rendered}</h2>
      <p>{article.date}</p>
    </li>
  </a>
);

export default props => (
  <div>
    {props.articles.map(a => <Article key={a.id} {...a} />)}
  </div>
);
