#!/usr/bin/env node

const ClosureCompiler = require('google-closure-compiler').compiler
const csso = require('csso')
const fs = require('fs-extra')
const nsg = require('node-sprite-generator')
const path = require('path')
const program = require('commander')
const spawnSync = require('child_process').spawnSync
const stylus = require('stylus')

program
  .option('-d --done [script]', 'The path to a script to run after build')
  .option('-s --styles [path]', 'Directory of additional style imports relative to the src directory')
  .parse(process.argv)

var afterScript = program.done
var styleIncludes = program.styles
var cachePath = 'build_cache'
var envRegExp = /\$\{(\w+)(?:\:=(.+?))?\}/

console.log('Starting Build')

fs.removeSync(cachePath)
fs.removeSync('build')

fs.mkdirSync('build')
fs.mkdirSync(path.join('build', 'js'))
fs.mkdirSync(path.join('build', 'css'))
fs.mkdirSync(path.join('build', 'views'))
fs.copySync('src', path.join(cachePath, 'src'))

function walk (dir) {
  var results = []
  var list = fs.readdirSync(dir)
  list.forEach(function (file) {
    if (file[0] !== '.') {
      file = path.join(dir, file)
      var stat = fs.statSync(file)
      if (stat && stat.isDirectory()) results = results.concat(walk(file))
      else results.push(file)
    }
  })
  return results
}

function removeTests (dir) {
  var list = fs.readdirSync(dir)
  list.forEach(function (file) {
    if (file[0] !== '.') {
      file = path.join(dir, file)
      if (file.indexOf('test') !== -1) {
        fs.removeSync(path.join(dir, file))
      }
    }
  })
}

removeTests(cachePath)

function preprocessView (readPath, writePath) {
  var content = fs.readFileSync(readPath, 'utf8')
  var includeRegExp = /<(\w+\b(?:.|\n)+?)data-include="'(.+?)'"(.*?)>/
  var match

  while ((match = includeRegExp.exec(content)) !== null) {
    let toReplace = match[0]
    let tagOpening = match[1]
    let fileName = match[2]
    let tagClosing = match[3]

    var replacement = '<' + tagOpening + tagClosing + '>' + fs.readFileSync(path.join(cachePath, 'src', fileName), 'utf8')

    content = content.replace(toReplace, replacement)
  }

  while ((match = envRegExp.exec(content)) !== null) {
    let toReplace = match[0]
    let envName = match[1]
    let replacement = process.env[envName] || match[2]

    if (replacement === undefined) {
      console.error('Undefined ENV variable with no default: ', envName)
      process.exit(1)
    }

    content = content.replace(toReplace, replacement)
  }

  var dir = path.dirname(writePath)

  fs.ensureDirSync(dir)
  fs.writeFileSync(writePath, content)
}

console.log('Preprocessing views...')

// Check the index file
preprocessView(path.join(cachePath, 'src', 'index.html'), path.join('build', 'index.html'))

// Check all other views
var views = walk(path.join(cachePath, 'src', 'views'))
for (var i = 0, len = views.length; i < len; i++) {
  var writeTo = views[i].split(path.sep)
  writeTo.shift()
  writeTo.shift()
  preprocessView(views[i], path.join('build', writeTo.join(path.sep)))
}
console.log('Preprocess Finished')

var asyncLock = 0

function afterScriptCaller () {
  asyncLock++
  if (asyncLock === 2) {
    console.log('Compressing results')
    let compress = spawnSync('gzip', ['-k', '-r', 'build'], {
      stdio: [0, 1, 2],
      cwd: process.cwd()
    })
    if (compress.error) {
      console.log('An error occurred during compression')
      console.error(compress.error)
    } else {
      console.log('Compression finished')
    }
    if (!afterScript) {
      return
    }
    console.log('Running after build script')
    let afterScriptResult = spawnSync(afterScript, [], {
      stdio: [0, 1, 2],
      cwd: process.cwd()
    })
    if (afterScriptResult.error) {
      console.log('An error occurred running the after script, make sure it is executable')
      console.error(afterScriptResult.error)
    }
    console.log('Finished after build script')
  }
}

// All Transform streams are also Duplex Streams
function envReplaceTransform (chunk) {
  let match
  while ((match = envRegExp.exec(chunk)) !== null) {
    var toReplace = match[0]
    var envName = match[1]
    var replacement = process.env[envName] || match[2]

    if (replacement === undefined) {
      console.error('Undefined ENV variable with no default: ', envName)
      process.exit(1)
    }

    chunk = chunk.replace(toReplace, replacement)
  }
  return chunk
}

var flags = {
  js: 'build_cache/**/*.js',
  compilation_level: 'ADVANCED',
  externs: 'src/externs.js'
}

// Build debug version
flags['compilation_level'] = 'SIMPLE'
flags['debug'] = true
flags['formatting'] = 'pretty_print'
flags['create_source_map'] = path.join('build', 'js', 'app.js.map')

console.log('Compiling js')
const closureCompiler = new ClosureCompiler(flags)
closureCompiler.run(function (exitCode, stdOut, stdErr) {
  if (stdErr.length) {
    console.error(stdErr)
    if (stdErr.indexOf('ERROR') !== -1) {
      process.exit(1)
    }
  }
  let out = path.join('build', 'js', 'app.js')
  let output = envReplaceTransform(stdOut)

  fs.appendFileSync(out, '(function(window){\n"use strict";\n' + output + '}.call(window, window));\n//# sourceMappingURL=/js/app.js.map')
  spawnSync('cp', ['-R', cachePath, 'build/js/build_cache'], { stdio: [0, 1, 2], cwd: process.cwd() })
  // let sourceMapMod = spawnSync('sed', ['-i.bak', 's/build_cache/..\\\/..\\\/build_cache/g', flags['create_source_map']], {
  //  stdio: [0, 1, 2],
  //  cwd: process.cwd()
  // });
  // if (sourceMapMod.error) {
  //  console.error("Failed running sed");
  //  console.error(sourceMapMod.error);
  // }
  afterScriptCaller()
})

// Generate sprite styles
var spriteCSSPath = path.join(cachePath, 'src', 'styles', 'sprite.css')
var totalCSS = ''

function stylusCallback (err, css) {
  if (err) {
    console.log(err)
    process.exit(1)
  } else {
    totalCSS += css
  }
}

try {
  fs.statSync(path.join('src', 'images')).isDirectory()
  fs.copySync(path.join('src', 'images'), path.join('build', 'images'))
} catch (err) {
}

var spriteSrc = path.join('src', 'images', 'sprites')

function stylusRender () {
  var styles = walk(path.join(cachePath, 'src', 'styles')).filter(function (name) {
    return name[0] !== '.' && name !== 'base.styl' && name !== 'fonts.styl' && name.endsWith('.styl')
  })

  var stylContent

  for (var len = styles.length, i = 0; i < len; ++i) {
    stylContent = fs.readFileSync(styles[i], 'utf8')
    var s = stylus(stylContent)
      .set('filename', styles[i])
      .use(require('nib')())
      .include(path.join(cachePath, 'src', 'styles'))

    if (styleIncludes && styleIncludes.length > 0) {
      s = s.include(path.join(cachePath, 'src', styleIncludes))
    }

    s.render(stylusCallback)
  }
}

function writeStyles () {
  let hasVar = totalCSS.indexOf('$')
  if (hasVar !== 0) {
    console.warn('There may be a fault in the css near: ', totalCSS.substr(hasVar, 10))
  }
  fs.writeFileSync(path.join('build', 'css', 'styles.css'), csso.minify(totalCSS).css)
  console.log('Built Style sheet')

  try {
    var fontDirPath = path.join(cachePath, 'src', 'fonts')
    if (fs.statSync(fontDirPath).isDirectory()) {
      fs.copySync(fontDirPath, path.join('build', 'css', 'fonts'))
    }
  } catch (err) {}

  fs.ensureDirSync(path.join('build', 'node_modules', 'silica'))
  fs.copySync(path.join('node_modules', 'silica', 'dist'), path.join('build', 'node_modules', 'silica', 'dist'))
  afterScriptCaller()
}

try {
  fs.statSync(spriteSrc)
  if (fs.readdirSync(spriteSrc).length > 0) {
    nsg({
      src: [
        path.join(spriteSrc, '*.png')
      ],
      spritePath: path.join('build', 'images', 'sprite.png'),
      stylesheetPath: spriteCSSPath,
      stylesheet: 'css',
      stylesheetOptions: {
        prefix: 'icon-',
        pixelRatio: 2,
        spritePath: '../images/sprite.png'
      },
      compositor: require('node-sprite-generator-jimp')
    }, function (err) {
      if (err) {
        if (fs.readdirSync(spriteSrc).length > 0) {
          console.log('Error Generating Sprites', err)
        }
      } else {
        console.log('Sprite Generated')
      }

      stylusRender()
      totalCSS += fs.readFileSync(spriteCSSPath, 'utf8')
      writeStyles()
    })
  } else {
    stylusRender()
    writeStyles()
  }
} catch (err) {
  stylusRender()
  writeStyles()
}
