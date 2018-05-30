#!/usr/bin/env node

// Node Provided modules
const spawn = require('child_process').spawn
const path = require('path')

// Third party dependencies
const program = require('commander')
const fs = require('fs-extra')

program
  .option('-c --cmd [value]', 'The test command to run')
  .parse(process.argv)

var cachePath = '.test_cache'
fs.removeSync(cachePath)
fs.copySync('src', path.join(cachePath, 'src'))
fs.copySync('closure-transform.js', path.join(cachePath, 'closure-transform.js'))

var cmd = program.cmd || 'jest'
var args = cmd === 'jest' ? ['--rootDir', '.'] : []

console.info('Running test command:', cmd, 'in', cachePath)

let child = spawn(cmd, args, {
  cwd: cachePath,
  env: process.env,
  detached: true
})

child.on('error', function (e) { console.log(e) })
child.stdout.pipe(process.stdout)
child.stderr.pipe(process.stderr)
console.log('STARTED with PID:', child.pid)
