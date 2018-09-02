#!/usr/bin/env node

const ghpages = require('gh-pages');
const fs = require('fs');

const options = {
  dotfiles: true,
  message: 'Auto generated commit for gh-pages deploy.',
  repo: 'git@github.com:cdierkens/resume.git',
  user: {
    email: 'cjdierkens@gmail.com',
    name: 'Christopher Dierkens'
  }
};
  
fs.mkdirSync('build/.circleci');
fs.writeFileSync('build/.circleci/config.yml', `version: 2
jobs:
build:
    machine: true
    steps:
    - run: echo "Skipping tests on gh-pages branch"
`);

function callback (err) {
  if (err) {
    process.stderr.write(err.message + '\n');
    return process.exit(1);
  }
  process.stdout.write('Published\n');
}

ghpages.publish('build', options, callback);
