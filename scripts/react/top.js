import React, { Component } from 'react';

const Article = article => (
  <a key={article.id} href={`/${article.id}`}>
    <li>
      <h2>{article.title.rendered}</h2>
      <p>{article.date}</p>
    </li>
   </a>
);

export default (props) => (
  <div>
    <h1>TOP</h1>
    {props.articles.map(a => <Article {...a} />)}
  </div>
);