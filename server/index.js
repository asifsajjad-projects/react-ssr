// server/index.js
require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react']
  });
  
  const express = require('express');
  const path = require('path');
  const fs = require('fs');
  const React = require('react');
  const ReactDOMServer = require('react-dom/server');
  const App = require('../src/App').default;
  
  const app = express();
  
  app.use(express.static('public'));
  
  app.get('*', (req, res) => {
    const app = ReactDOMServer.renderToString(React.createElement(App));
    const indexFile = path.resolve('./public/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
      }
  
      return res.send(
        data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
      );
    });
  });
  
  app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });
  