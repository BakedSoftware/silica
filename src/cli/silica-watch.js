#!/usr/bin/env node

// Node Provided modules
const exec = require('child_process').exec
const path = require('path')

// Third party dependencies
const livereload = require('livereload')
const serveStatic = require('node-static')
const watch = require('watch')
const program = require('commander')

var fileServer = new serveStatic.Server('./build', {gzip: true})

program
  .option('-p --port [value]', 'The port to listen on')
  .option('-s --styles [path]', 'Directory of additional style imports relative to the src directory')
  .option('-z --nolivereload', "Don't turn on livereload")
  .option('-d --done [script]', 'Path to a script to run after build')
  .option('-i --ignore [patteern]', 'RegExp pattern of files/folders to ignore')
  .option('-a --additional [path]', 'Directory of additional JS imports relative to the src directory')
  .option('-m --source-map [bool]', 'Create a source map (default = false)')
  .option('-o --optimization-level [int]', 'Optimization level (0 = debug+simple, 1=simple, 2=advanced)')
  .option('-n --node <modules>', 'Comma separated list of node modules package.json paths to include')
  .option('-c --compression-level [int]', 'Compression level (0 = none, 1 = gzip, 2 = brotli (default))')
  .parse(process.argv)

var afterScript = program.done
var styleIncludes = program.styles

var childCallback = function (error, stdout, stderr) {
  console.log(stdout)
  console.error(stderr)

  if (error !== null) {
    console.error('exec error: ' + error)
  } else {
    console.log('Done!')
  }
}

var wait = false

var rebuild = function () {
  if (wait) {
    return
  }
  wait = true
  setTimeout(function () {
    wait = false
  }, 1000)
  console.log('Rebuilding...')
  var cmd = 'silica build'
  if (styleIncludes && styleIncludes.length > 0) {
    cmd += ' -s ' + styleIncludes
  }
  if (afterScript && afterScript.length > 0) {
    cmd += ' -d ' + afterScript
  }
  if (program.ignore && program.ignore.length > 0) {
    cmd += ' -i ' + program.ignore
  }
  if (program.additional && program.additional.length > 0) {
    cmd += ' -a ' + program.additional
  }
  if (program.sourceMap) {
    cmd += ' -m ' + program.sourceMap
  }
  if (program.optimizationLevel) {
    cmd += ' -o ' + program.optimizationLevel
  }
  if (program.node) {
    cmd += ' -n ' + program.node
  }

  cmd += ' -c ' + (program.compressionLevel  || 0 )

  exec(cmd, childCallback)
}

watch.createMonitor('./src', { 'ignoreDotFiles': true }, function (monitor) {
  monitor.on('created', rebuild)
  monitor.on('changed', rebuild)
  monitor.on('removed', rebuild)
})

var colors = require('colors');

var log = function(request, response, statusCode) {
  var d = new Date();
  var seconds = d.getSeconds() < 10? '0'+d.getSeconds() : d.getSeconds(),
    datestr = d.getHours() + ':' + d.getMinutes() + ':' + seconds,
    line = datestr + ' [' + response.statusCode + ']: ' + request.url,
    colorized = (response.statusCode >= 500) ? line.red.bold :
      (response.statusCode >= 400) ? line.red :
      line;
  console.log(colorized);
};

function handler (request, response) {
  request.addListener('end', function () {
    var callback = function(e, rsp) {
      if (e && e.status === 404) {
        response.writeHead(e.status, e.headers);
        response.end("Not Found");
        log(request, response);
      } else {
        log(request, response);
      }
    };

    if (request.url.indexOf(".") == -1) {
      fileServer.serveFile('/index.html', 200, {}, request, response);
    } else {
      fileServer.serve(request, response, callback);
    }
  }).resume();
}

require('http').createServer(handler).listen(program.port || 8080)

rebuild()

if (!program.nolivereload) {
  var server = livereload.createServer()
  server.watch(path.join(process.cwd(), '/build'))
}
