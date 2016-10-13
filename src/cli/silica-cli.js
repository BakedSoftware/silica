#!/usr/bin/env node

var program = require('commander');

program
  .version('0.8.15')
  .command('create [name]', 'Create a new silica project in the current directory')
  .command('build', 'Build the current project')
  .command('watch', 'Builds and serves the current project')
  .option('-p --port [value]', 'Which port to listen on')
  .parse(process.argv);
