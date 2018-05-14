const fs = require('fs')
const ClosureCompiler = require('google-closure-compiler').compiler
const childProcess = require('child_process')
const spawnSync = require('child_process').spawnSync

childProcess.execSync('rm -rf build_cache')
childProcess.execSync('rm -rf dist')
childProcess.execSync('mkdir ./dist')
childProcess.execSync('mkdir ./build_cache')
childProcess.execSync('cp -r src build_cache/')
childProcess.execSync('rm -rf build_cache/src/cli')
childProcess.execSync('rm -rf build_cache/src/externs.js')

// childProcess.execSync("cp ./node_modules/xxhashjs/build/xxhash.min.js dist/silica.js");
// childProcess.execSync("cp ./node_modules/xxhashjs/build/xxhash.min.js dist/silica.min.js");
childProcess.execSync('cat libs/md5.min.js >> dist/silica.js')
childProcess.execSync('cat libs/md5.min.js >> dist/silica.min.js')

var flags = {
  js: 'build_cache/**/*.js',
  language_in: 'ECMASCRIPT6',
  language_out: 'ECMASCRIPT5',
  compilation_level: 'ADVANCED',
  externs: 'src/externs.js',
  generate_exports: 'true'
}

console.log('Compiling production version')
var closureCompiler = new ClosureCompiler(flags)
closureCompiler.run(function (exitCode, stdOut, stdErr) {
  if (stdErr.length) {
    console.error(stdErr)
  }
  fs.appendFileSync('dist/silica.min.js', '!function(){\n"use strict";\n' + stdOut + '}.call(window);')
  let compress = spawnSync('gzip', ['-k', 'dist/silica.min.js'], {
    stdio: [0, 1, 2],
    cwd: process.cwd()
  })
  if (compress.error) {
    console.log('An error occurred during compression')
    console.error(compress.error)
  } else {
    console.log('Compression finished')
  }
})

// Build debug version
flags['compilation_level'] = 'SIMPLE'
flags['debug'] = true
flags['formatting'] = 'pretty_print'

console.log('Compiling debug version')
closureCompiler = new ClosureCompiler(flags)
closureCompiler.run(function (exitCode, stdOut, stdErr) {
  if (stdErr.length) {
    console.error(stdErr)
  }
  fs.appendFileSync('dist/silica.js', '!function(){\n"use strict";\n' + stdOut + '}.call(window);')
  console.log('Compressing results')
  let compress = spawnSync('gzip', ['-k', 'dist/silica.js'], {
    stdio: [0, 1, 2],
    cwd: process.cwd()
  })
  if (compress.error) {
    console.log('An error occurred during compression')
    console.error(compress.error)
  } else {
    console.log('Compression finished')
  }
})
