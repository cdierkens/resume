#!/usr/bin/env node

const showdown  = require('showdown');
const fs = require('fs-extra')

const catchError = err => { 
  console.error(err);
  process.exit(1);
};

const converter = new showdown.Converter();
converter.setFlavor('github');

const pre = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Christopher Dierkens: Resume</title>
    <link href="https://fonts.googleapis.com/css?family=Fira+Sans:300,300i,400,400i,500,500i,700,700i&subset=latin-ext" rel="stylesheet" type="txt/css">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:300,400&subset=latin-ext" rel="stylesheet" type="text/css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/4.2.0/normalize.min.css" rel="stylesheet" type="text/css">
    <link href="style.css" rel="stylesheet" type="text/css">
  </head>
  <body>
`

const post = `
</body>
</html>
`

const path = 'build/index.html';

fs.copy('static', 'build').catch(catchError)

fs.writeFile(path, pre)
  .then(() => fs.readFile('README.md', 'utf8'))
  .then(md => Promise.resolve(converter.makeHtml(md)))
  .then(html => fs.appendFile(path, html))
  .then(() => fs.appendFile(path, post))
  .catch(catchError);
