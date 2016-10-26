require('babel-register');

const request = require('request');
const express = require('express');
const handlebars = require('handlebars');
const fs = require('fs');
const React = require('react');
const renderToString = require('react-dom/server').renderToString;

const ArticlePage = require('./react/article').default;

const app = express();

const template = handlebars.compile(fs.readFileSync('./template.html', 'utf-8'));

app.get('/:permalink', (req, res) => {
  console.log(req.params);

  const permalink = req.params.permalink;

  request(`http://wordpress:80/wp-json/wp/v2/posts/${permalink}`, (error, response, body) => {
    console.log(error, body);

    if (error) {
      return res.sendStatus(500);
    }

    res.send(template({
      body: renderToString(React.createElement(ArticlePage, JSON.parse(body)))
    }));
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('LISTEN');
});
