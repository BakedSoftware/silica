#!/usr/bin/env node

var program = require('commander')

program
  .version('0.40.0')
  .command('create [name]', 'Create a new silica project in the current directory')
  .command('build', 'Build the current project')
  .command('watch', 'Builds and serves the current project')
  .parse(process.argv)
