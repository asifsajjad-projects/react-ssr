require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react']
});

const express = require('express');
const path = require('path');
const fs = require('fs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');
const App = require('../src/App').default;
const api = require("./api");

const app = express();

app.use(express.static('public'));

app.use("/api", api);

app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'favicon.ico')));


app.get('*', (req, res) => {
  const context = {};
  // Handle root URL redirect
  if (req.url === '/') {
    res.redirect('/home');
    return;
  }

  const appMarkup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );


  const indexFile = path.resolve('./src/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${appMarkup}</div>`)
    );
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
