const request = require('request');
const express = require('express');

const app = express();

app.get('/:permalink', (req, res) => {
  console.log(req.params);

  const permalink = req.params.permalink;

  request(`http://wordpress:80/wp-json/wp/v2/posts/${permalink}`, (error, response, body) => {
    console.log(error, body);

    if (error) {
      return res.sendStatus(500);
    }

    res.send(body);
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('LISTEN');
});
