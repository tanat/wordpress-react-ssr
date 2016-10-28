require('babel-register');

const request = require('request');
const express = require('express');
const handlebars = require('handlebars');
const fs = require('fs');
const React = require('react');
const renderToString = require('react-dom/server').renderToString;

const ArticlePage = require('./react/article').default;
const TopPage = require('./react/top').default;

const app = express();

const template = handlebars.compile(fs.readFileSync('./template.html', 'utf-8'));

const WP_BASE_URL = `${process.env.WP_URL}/wp-json/wp/v2`;

app.get('/', (req, res) => {
  request(`${WP_BASE_URL}/posts`, (error, response, body) => {
    if (error) {
      return res.sendStatus(500);
    }

    const data = { articles: JSON.parse(body) };

    res.send(template({
      body: renderToString(React.createElement(TopPage, data)),
      initialData: JSON.stringify(data)
    }));
  });
});

app.get('/[0-9]+', (req, res) => {
  const permalink = +req.url.match(/\/([0-9]+)/)[1];

  request(`${WP_BASE_URL}/posts/${permalink}`, (error, response, body) => {
    if (error) {
      return res.sendStatus(500);
    }

    res.send(template({
      body: renderToString(React.createElement(ArticlePage, JSON.parse(body))),
      initialData: body
    }));
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('LISTEN');
});
