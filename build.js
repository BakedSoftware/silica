const  fs               =  require('fs');
const  ClosureCompiler  =  require('google-closure-compiler').compiler;
const  childProcess     =  require('child_process');

childProcess.execSync("rm -rf build_cache");
childProcess.execSync("rm -rf build");
childProcess.execSync("mkdir ./{build,build_cache}")
childProcess.execSync("cp -r src build_cache/");
childProcess.execSync("rm -rf build_cache/src/cli");
childProcess.execSync("rm -rf build_cache/src/externs.js");
childProcess.execSync("cp libs/md5.min.js build/silica.js");
childProcess.execSync("cp libs/md5.min.js build/silica.min.js");

var flags = {
  js: 'build_cache/**/*.js',
  language_in: 'ECMASCRIPT6',
  language_out: 'ECMASCRIPT5',
  compilation_level: 'ADVANCED',
  externs: 'src/externs.js'
};

console.log("Compiling production version");
var closureCompiler = new ClosureCompiler(flags);
closureCompiler.run(function(exitCode, stdOut, stdErr){
  if (stdErr.length) {
    console.error(stdErr);
  }
  fs.appendFileSync("build/silica.min.js", stdOut);
});

// Build debug version
flags['compilation_level']  =  'SIMPLE';
flags['debug']              =  true;
flags['formatting']         =  'pretty_print';

console.log("Compiling debug version");
var closureCompiler = new ClosureCompiler(flags);
closureCompiler.run(function(exitCode, stdOut, stdErr){
  if (stdErr.length) {
    console.error(stdErr);
  }
  fs.appendFileSync("build/silica.js", stdOut);
});
