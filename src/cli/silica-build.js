#!/usr/bin/env node

const  ClosureCompiler  =  require('google-closure-compiler').compiler;
const  csso             =  require('csso');
const  fs               =  require('fs-extra');
const  nsg              =  require('node-sprite-generator');
const  path             =  require('path');
const  program          =  require('commander');
const  spawnSync        =  require('child_process').spawnSync;
const  stylus           =  require('stylus');

program
  .option('-d --done [script]', "The path to a script to run after build")
  .option('-s --styles [path]', "Directory of additional style imports relative to the src directory")
  .parse(process.argv);

var  afterScript    =  program.done;
var  styleIncludes  =  program.styles;
var  cache_path     =  'build_cache';
var  env_regex      =  /\$\{(\w+)(?:\:=(.+?))?\}/;

console.log("Starting Build")

fs.removeSync(cache_path);
fs.removeSync('build');

fs.mkdirSync('build');
fs.mkdirSync(path.join('build', 'js'));
fs.mkdirSync(path.join('build', 'css'));
fs.mkdirSync(path.join('build', 'views'));
fs.copySync('src', path.join(cache_path, 'src'));

function walk(dir) {
  var results = []
  var list = fs.readdirSync(dir)
  list.forEach(function(file) {
    if (file[0] != '.')
    {
      file = path.join(dir, file);
      var stat = fs.statSync(file);
      if (stat && stat.isDirectory()) results = results.concat(walk(file))
      else results.push(file)
    }
  });
  return results
}

function preprocessView(readPath, writePath) {
  var content         =  fs.readFileSync(readPath, 'utf8');
  var include_regex   =  /<(\w+\b(?:.|\n)+?)data-include="'(.+?)'"(.*?)>/;
  var match;

  while ((match = include_regex.exec(content)) !== null) {

    var  to_replace   =  match[0];
    var  tag_opening  =  match[1];
    var  file_name    =  match[2];
    var  tag_closing  =  match[3];

    var  replacement  =  "<" + tag_opening + tag_closing + ">" + fs.readFileSync(path.join(cache_path, 'src', file_name), 'utf8');

    content = content.replace(to_replace, replacement);
  }

  while ((match = env_regex.exec(content)) !== null) {
    var to_replace = match[0];
    var env_name = match[1];
    var replacement = process.env[env_name] || match[2];

    if (replacement === undefined) {
      console.error("Undefined ENV variable with no default: ", env_name)
      process.exit(1);
    }

    content = content.replace(to_replace, replacement)
  }

  var dir = path.dirname(writePath);

  fs.ensureDirSync(dir);
  fs.writeFileSync(writePath, content);
}

console.log("Preprocessing views...");

// Check the index file
preprocessView(path.join(cache_path, 'src', 'index.html'), path.join('build', 'index.html'));

// Check all other views
var views = walk(path.join(cache_path, 'src', 'views'));
for (var i = 0, len = views.length; i < len; i++) {
  var writeTo = views[i].split(path.sep);
  writeTo.shift();
  writeTo.shift();
  preprocessView(views[i], path.join('build', writeTo.join(path.sep)));
}
console.log("Preprocess Finished");

var asyncLock = 0;

function afterScriptCaller() {
  asyncLock++;
  if (asyncLock == 2) {
    console.log("Compressing results")
    let compress = spawnSync('gzip', ["-k", "-r", "build"], {
      stdio: [0, 1, 2],
      cwd: process.cwd()
    });
    if (compress.error) {
      console.log("An error occurred during compression");
      console.error(compress.error);
    } else {
      console.log("Compression finished");
    }
    if (!afterScript) {
      return
    }
    console.log("Running after build script")
    afterScriptResult = spawnSync(afterScript, [], {
      stdio: [0, 1, 2],
      cwd: process.cwd()
    });
    if (afterScriptResult.error) {
      console.log("An error occurred running the after script, make sure it is executable");
      console.error(afterScriptResult.error);
    }
    console.log("Finished after build script");
  }
}
const Transform = require('stream').Transform;

// All Transform streams are also Duplex Streams
function envReplaceTransform(chunk) {
    while ((match = env_regex.exec(chunk)) !== null) {
      var to_replace = match[0];
      var env_name = match[1];
      var replacement = process.env[env_name] || match[2];

      if (replacement === undefined) {
        console.error("Undefined ENV variable with no default: ", env_name)
        process.exit(1);
      }

      chunk = chunk.replace(to_replace, replacement);
    }
  return chunk
}

var flags = {
  js: 'build_cache/**/*.js',
  language_in: 'ECMASCRIPT6',
  language_out: 'ECMASCRIPT5',
  compilation_level: 'ADVANCED',
  externs: 'src/externs.js'
};

// Build debug version
flags['compilation_level']  =  'SIMPLE';
flags['debug']              =  true;
flags['formatting']         =  'pretty_print';
flags['create_source_map']  =  path.join('build', 'js', 'app.js.map');

console.log("Compiling js");
closureCompiler = new ClosureCompiler(flags);
closureCompiler.run(function(exitCode, stdOut, stdErr){
  if (stdErr.length) {
    console.error(stdErr);
    if (stdErr.indexOf("ERROR") !== -1)
    {
      process.exit(1);
    }
  }
  let  out     =  path.join('build', 'js', 'app.js');
  let  output  =  envReplaceTransform(stdOut);

  fs.appendFileSync(out, "(function(window){\n\"use strict\";\n"+output+"}.call(window, window));\n//# sourceMappingURL=/js/app.js.map");
  spawnSync('cp', ['-R', cache_path, 'build/js/build_cache'], { stdio: [0, 1, 2], cwd: process.cwd() });
  //let sourceMapMod = spawnSync('sed', ['-i.bak', 's/build_cache/..\\\/..\\\/build_cache/g', flags['create_source_map']], {
  //  stdio: [0, 1, 2],
  //  cwd: process.cwd()
  //});
  //if (sourceMapMod.error) {
  //  console.error("Failed running sed");
  //  console.error(sourceMapMod.error);
  //}
  afterScriptCaller();
});


//Generate sprite styles
var  sprite_css_path  =  path.join(cache_path, 'src', 'styles', 'sprite.css');
var  total_css        =  "";

function stylus_callback(err, css) {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    total_css += css;
  }
}

try {
  fs.statSync(path.join('src', 'images')).isDirectory()
  fs.copySync(path.join('src', 'images'), path.join('build', 'images'));
} catch(err) {
}

var sprite_src = path.join('src', 'images', 'sprites');


function stylus_render() {
  var  styles   =  walk(path.join(cache_path, 'src', 'styles')).filter(function(name) {
    return name[0] !== '.' && name !== 'base.styl' && name !== 'fonts.styl' && name.endsWith(".styl");
  });


  var styl_path, styl_content;

  for (var len = styles.length, i = 0; i < len; ++i) {
    styl_content = fs.readFileSync(styles[i], 'utf8');
    var s = stylus(styl_content)
              .set('filename', styles[i])
              .use(require('nib')())
              .include(path.join(cache_path, 'src', 'styles'))

    if (styleIncludes && styleIncludes.length > 0) {
      s = s.include(path.join(cache_path, 'src', styleIncludes));
    }

    s.render(stylus_callback);
  }
}

function writeStyles() {
  let has_var = total_css.indexOf("$")
  if (has_var != 0) {
    console.warn("There may be a fault in the css near: ", total_css.substr(has_var, 10));
  }
  fs.writeFileSync(path.join('build', 'css', 'styles.css'), csso.minify(total_css).css);
  console.log("Built Style sheet");

  try {
    var font_dir_path = path.join(cache_path, 'src', 'fonts');
    if (fs.statSync(font_dir_path).isDirectory())
    {
      fs.copySync(font_dir_path, path.join('build', 'css', 'fonts'));
    }
  } catch(err){}

  fs.ensureDirSync(path.join('build', 'node_modules', 'silica'));
  fs.copySync(path.join('node_modules', 'silica', 'dist'), path.join('build', 'node_modules', 'silica', 'dist'));
  afterScriptCaller();
}

try {
  fs.statSync(sprite_src)
  if (fs.readdirSync(sprite_src).length > 0) {
    nsg({
      src: [
        path.join(sprite_src, '*.png')
      ],
      spritePath: path.join('build', 'images', 'sprite.png'),
      stylesheetPath: sprite_css_path,
      stylesheet: 'css',
      stylesheetOptions: {
        prefix: 'icon-',
        pixelRatio: 2,
        spritePath: '../images/sprite.png'
      },
      compositor: require('node-sprite-generator-jimp')
    }, function(err) {
      if (err) {
        if (fs.readdirSync(sprite_src).length > 0)
        {
          console.log("Error Generating Sprites", err);
        }
      }
      else
      {
        console.log("Sprite Generated");
      }

      stylus_render();
      total_css += fs.readFileSync(sprite_css_path, 'utf8');
      writeStyles();
    });
  } else {
  stylus_render();
  writeStyles();
  }
} catch(err){
  stylus_render();
  writeStyles();
}
