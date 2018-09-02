#!/usr/bin/env node

const ghpages = require('gh-pages');

const options = {
  message: 'Auto generated commit for gh-pages deploy.',
  user: {
      email: 'cjdierkens@gmail.com',
      name: 'Christopher Dierkens'
  }
};

function callback (err) {
  if (err) {
      process.stderr.write(err.message + '\n');
      return process.exit(1);
  }
  process.stdout.write('Published\n');
}

ghpages.publish('build', options, callback);
