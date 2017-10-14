#!/usr/bin/env node

// Node Provided modules
const  exec  =  require('child_process').exec;
const  path  =  require('path');
const  fs    =  require('fs');
const  net   =  require('net');

// Third party dependencies
const  livereload    =  require('livereload');
const  finalhandler  =  require('finalhandler');
const  serveStatic   =  require('node-static');
const  watch         =  require('watch');
const  program       =  require('commander');

var  fileServer    =  new serveStatic.Server('./build', {gzip: true});

program
  .option('-p --port [value]', "The port to listen on")
  .option('-s --styles [path]', "Directory of additional style imports relative to the src directory")
  .option('-z --nolivereload', "Don't turn on livereload")
  .option('-d --done [script]', "Path to a script to run after build")
  .option('-2 --http2', "Enable http2 support. Make sure localhost.daplie.me resolves to 127.0.0.1")
  .parse(process.argv);

var  afterScript    =  program.done;
var  styleIncludes  =  program.styles;

var child_callback = function (error, stdout, stderr) {
  console.log(stdout);
  console.error(stderr);

  if (error !== null) {
    console.error('exec error: ' + error);
  } else {
    console.log("Done!");
  }

};

var wait = false;

var rebuild = function() {
  if (wait) {
    return;
  }
  wait = true;
  setTimeout(function () {
    wait = false;
  }, 1000);
  console.log("Rebuilding...");
  var cmd = 'silica build';
  if (styleIncludes && styleIncludes.length > 0) {
    cmd += " -s " + styleIncludes
  }
  if (afterScript && afterScript.length > 0) {
    cmd += " -d " + afterScript
  }
  exec(cmd, child_callback);
};

watch.createMonitor('./src', { 'ignoreDotFiles': true}, function (monitor) {
  monitor.on("created", rebuild);
  monitor.on("changed", rebuild);
  monitor.on("removed", rebuild);
});

function handler(request, response)
{
  request.addListener('end', function () {
    fileServer.serve(request, response, function (e, res) {
      if (e && (e.status === 404)) {
        // If the file wasn't found
        fileServer.serveFile('/index.html', 404, {}, request, response);
      }
    });
  }).resume();
}

function tcpConnection(conn) {
    conn.once('data', function (buf) {
        // A TLS handshake record starts with byte 22.
        var address = (buf[0] === 22) ? httpsAddress : redirectAddress;
        var proxy = net.createConnection(address, function () {
            proxy.write(buf);
            conn.pipe(proxy).pipe(conn);
        });
    });
}

function httpConnection(req, res) {
    var host = req.headers['host'];
    res.writeHead(301, { "Location": "https://" + host + req.url });
    res.end();
}

if (program.http2)
{
  var  baseAddress      =  program.port || 8080;
  var  redirectAddress  =  baseAddress + 1;
  var  httpsAddress     =  baseAddress + 2;
  var  httpsOptions     =  require('localhost.daplie.me-certificates').merge({});

  net.createServer(tcpConnection).listen(baseAddress);
  require('http').createServer(httpConnection).listen(redirectAddress);
  require('http2').createServer(httpsOptions, handler).listen(httpsAddress);

  console.log("HTTPS server is listening on: ", baseAddress);
  console.log("For a secure certificate use localhost.daplie.me and make sure it resolves to 127.0.0.1");
  console.log("On Mac OS X -> Edit /etc/hosts and add '127.0.0.1 localhost.daplie.me'");
}
else
{
  require('http').createServer(handler).listen(program.port || 8080);
}

rebuild();

if (!program.nolivereload) {
  var server = livereload.createServer();
  server.watch(path.join(process.cwd(), "/build"));
}
