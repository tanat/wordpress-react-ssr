require('babel-register');

const request = require('superagent');
const express = require('express');
const handlebars = require('handlebars');
const fs = require('fs');
const React = require('react');
const renderToString = require('react-dom/server').renderToString;

// TODO ここ直したい
const ArticlePage = require('./react/article').default;
const TopPage = require('./react/top').default;

const app = express();
const template = handlebars.compile(fs.readFileSync(`${__dirname}/template.html`, 'utf-8'));

const WP_BASE_URL = `${process.env.WP_URL}/wp-json/wp/v2`;

let favorites = [];

/* Pages */
app.get('/', (req, res) => {
  request.get(`${WP_BASE_URL}/posts`).end((error, response) => {
    if (error) {
      return res.sendStatus(500);
    }

    const data = {
      articles: response.body,
    };

    res.send(template({
      body: renderToString(React.createElement(TopPage, data)),
      initialData: JSON.stringify(data),
    }));
  });
});

app.get('/[0-9]+', (req, res) => {
  const id = +req.url.match(/\/([0-9]+)/)[1];

  request.get(`${WP_BASE_URL}/posts/${id}`).end((error, response) => {
    if (error) {
      return res.sendStatus(500);
    }

    const data = Object.assign({}, response.body, {
      favorited: !!favorites.filter(f => f === id).length,
    });

    res.send(template({
      body: renderToString(React.createElement(ArticlePage, data)),
      initialData: JSON.stringify(data),
    }));
  });
});

/* APIs */
app.post('/api/[0-9]+/favorite', (req, res) => {
  const id = +req.url.match(/\/([0-9]+)/)[1];
  console.log(`POST /favorite ${id}`);

  favorites.push(id);
  res.send(200);
});

app.delete('/api/[0-9]+/favorite', (req, res) => {
  const id = +req.url.match(/\/([0-9]+)/)[1];
  console.log(`DELETE /favorite ${id}`);

  favorites = favorites.filter(f => f !== id);
  res.send(200);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('LISTEN');
});
