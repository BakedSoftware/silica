#!/usr/bin/env node

// Node Provided modules
const spawn = require('child_process').spawn
const path = require('path')

// Third party dependencies
const program = require('commander')
const fs = require('fs-extra')

program
  .option('-c --cmd [value]', 'The test command to run')
  .option('-i --ignore [pattern]', 'RegExp pattern of files/folders to ignore. (Tests are ignored by default)')
  .option('-a --additional [path]', 'Directory of additional JS imports relative to the src directory')
  .parse(process.argv)

var cachePath = '.test_cache'
fs.removeSync(cachePath)
fs.copySync('src', path.join(cachePath, 'src'))
fs.copySync('closure-transform.js', path.join(cachePath, 'closure-transform.js'))

if (program.additional && program.additional !== '') {
  fs.copySync(path.join('src', program.additional), path.join(cachePath, '__additional_sources__'))
}

function removeIgnored (dir, pattern) {
  var list = fs.readdirSync(dir)
  list.forEach(function (file) {
    if (file[0] !== '.') {
      file = path.join(dir, file)
      if (pattern.test(file)) {
        try {
          fs.removeSync(file)
        } catch (e) {
          console.error('Failed removing file/folder:', file)
        }
      } else {
        var stat = fs.statSync(file)
        if (stat && stat.isDirectory()) {
          removeIgnored(file, pattern)
        }
      }
    }
  })
}

if (program.ignore && program.ignore !== '') {
  console.log('Removing Ignored...')
  removeIgnored(cachePath, new RegExp(program.ignore))
  console.log('Done Removing Ignored')
}

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
