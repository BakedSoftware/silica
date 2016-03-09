#!/usr/bin/env node

// Node provided modules
const  fs         =  require('fs');
const  path       =  require('path');
const  spawn      =  require('child_process').spawn;
const  spawnSync  =  require('child_process').spawnSync;

// Third party dependencies
const program = require('commander');

program
  .option('-s --short [name]', "A custom top level global name")
  .parse(process.argv);

if (program.args.length !== 1)
{
  console.error("A single project name is required");
  process.exit(1);
}

var projectName = program.args[0];
var projectAbbreviation = program.shortName || projectName.toUpperCase().charAt(0);

const structure = [
  ['src'],
  ['src', 'controllers'],
  ['src', 'fonts'],
  ['src', 'images'],
  ['src', 'images', 'sprites'],
  ['src', 'models'],
  ['src', 'styles'],
  ['src', 'views']
];

const indexTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>${projectName}</title>
    <link rel="stylesheet" href="css/styles.css" type="text/css" media="all">
  </head>
  <body>
    <div class="${projectName}" data-controller="${projectAbbreviation}.AppCntrl">
      {{name}} - {{version}}
    </div>
    <script src="bower_components/jquery/dist/jquery.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="bower_components/silica/silica.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/app.js" type="text/javascript" charset="utf-8"></script>
  </body>
</html>
`

const appCntrlTemplate = `
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

export default AppCntrl;
`

const appTemplate = `
import AppCntrl from './controllers/app_cntrl.js';

window.${projectAbbreviation} = {
  AppCntrl
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
fs.mkdirSync(projectName);

for (var tree of structure)
{
  fs.mkdirSync(path.join(projectName, ...tree));
}

// Create the template files
fs.writeFileSync(path.join(projectName, 'src', 'index.html'), indexTemplate);
fs.writeFileSync(path.join(projectName, 'src', 'controllers', 'app_cntrl.js'), appCntrlTemplate);
fs.writeFileSync(path.join(projectName, 'src', 'app.js'), appTemplate);
fs.writeFileSync(path.join(projectName, 'src', 'styles', 'app.styl'), styleTemplate);

// Setup bower

console.log("Set up bower (Choose any values)");

var bower = spawnSync('bower',
                  ['init'],
                  {
                    stdio: [0, 1, 2],
                    cwd: projectName
                  });

var bower_install = spawnSync('bower',
                              ['install', 'jquery', 'silica'],
                              { 'cwd': projectName });

// Setup npm
spawnSync('npm',
          ['install', '--save', 'babel-preset-es2015'],
          { 'cwd': projectName});
