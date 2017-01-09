const  fs       =  require('fs');

function walk(dir) {
  var results = []
  var list = fs.readdirSync(dir)
  list.forEach(function(file) {
    if (file !== "cli") {
    file = dir + '/' + file
    var stat = fs.statSync(file)
    if (stat && stat.isDirectory()) results = results.concat(walk(file))
    else if (file.endsWith("js")) results.push(file)
    }
  })
  return results
}

var allJs = walk("./src");

if (false) {
const  compile  =  require('google-closure-compiler-js').compile;

const production = false;

var files = [];
for (var i = allJs.length - 1; i >= 0; i--) {
 files[i] = {path: allJs[i], src: fs.readFileSync(allJs[i]).toString()}
}

fs.readFile('./src/silica.js', function(err, data){
  if (err) {
    console.error(err);
    return;
  }

  files.push({path: 'src/silica.js', src: data.toString()});

  const flags = {
    compilationLevel: production ? 'SIMPLE' : 'WHITESPACE_ONLY',
    jsCode: files
  };

  const out = compile(flags);

  if (out.errors.length) {
    console.error(out.errors);
  }
  if (out.warnings.length) {
    console.info(out.warnings);
  }
  console.log(out.compiledCode);
});
} else {

const ClosureCompiler = require('google-closure-compiler').compiler;
const childProcess = require('child_process');

childProcess.execSync("rm -rf build_cache");
childProcess.execSync("cp -R src build_cache");
childProcess.execSync("rm -rf build_cache/cli");

var closureCompiler = new ClosureCompiler({
  js: 'build_cache/**/*.js',
  language_in: 'ECMASCRIPT6',
  language_out: 'ECMASCRIPT5',
  compilation_level: 'WHITESPACE_ONLY'
});

var compilerProcess = closureCompiler.run(function(exitCode, stdOut, stdErr) {
  console.error(stdErr)
  console.log(stdOut)
})
}
