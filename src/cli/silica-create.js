#!/usr/bin/env node

// Node provided modules
const fs = require('fs')
const path = require('path')
const spawnSync = require('child_process').spawnSync

// Third party dependencies
const program = require('commander')

program
  .option('-s --short [name]', 'A custom top level global name')
  .parse(process.argv)

if (program.args.length !== 1) {
  console.error('A single project name is required')
  process.exit(1)
}

var projectName = program.args[0]
var projectAbbreviation = program.shortName || (projectName.charAt(0).toUpperCase() + projectName.slice(1))

const structure = [
  ['src'],
  ['src', 'controllers'],
  ['src', 'fonts'],
  ['src', 'images'],
  ['src', 'images', 'sprites'],
  ['src', 'models'],
  ['src', 'styles'],
  ['src', 'views']
]

const indexTemplate = `
<!DOCTYPE html>
<html data-controller="${projectAbbreviation}.AppCntrl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>${projectName}</title>
    <link rel="stylesheet" href="css/styles.css" type="text/css" media="all">
  </head>
  <body class="${projectName}">
    {{name}} - {{version}}
    <script src="node_modules/silica/dist/silica.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/app.js" type="text/javascript" charset="utf-8"></script>
  </body>
</html>
`

const appCntrlTemplate = `
goog.module("controllers.app");
// ${projectName}
// AppCntrl is the root controller of ${projectName}
//
class AppCntrl extends Silica.Controllers.Base {
  // Constructor receives the element which specified this controller
  constructor(element) {
    super(element)
    this.name = "${projectName}";
    this.version = "1.0.0";
  }
}

exports = AppCntrl;
`

const appTemplate = `
goog.module("${projectName}");

const AppCntrl = goog.require("controllers.app");

window["${projectAbbreviation}"] = {
  AppCntrl: AppCntrl
}

Silica.setContext("${projectAbbreviation}");
Silica.compile(document);
Silica.apply(() => {});
`

const styleTemplate = `
  global-reset()

  .${projectName}
    color: orange
`

// Create the directory structure
fs.mkdirSync(projectName)

for (var tree of structure) {
  fs.mkdirSync(path.join(projectName, ...tree))
}

// Create the template files
fs.writeFileSync(path.join(projectName, 'src', 'index.html'), indexTemplate)
fs.writeFileSync(path.join(projectName, 'src', 'controllers', 'app_cntrl.js'), appCntrlTemplate)
fs.writeFileSync(path.join(projectName, 'src', 'app.js'), appTemplate)
fs.writeFileSync(path.join(projectName, 'src', 'styles', 'app.styl'), styleTemplate)
fs.writeFileSync(path.join(projectName, 'src', 'externs.js'), '//See closure compiler docs for usage of this file')

// Setup yarn

console.log('Set up yarn (Choose any values)')

var yarn = spawnSync('yarn',
  ['init'],
  {
    stdio: [0, 1, 2],
    cwd: projectName
  })

var yarnAdd = spawnSync('yarn',
  ['add', 'silica'],
  { 'cwd': projectName })
