require 'bundler/setup'

%w(coffee-script closure-compiler pathname).each do |lib|
  require lib
end


directory 'build'
directory File.join('build', 'js')

@keep_cache = false
@production = false

desc "Remove previous build"
task :clean do
  print "cleaning build dir...."
  FileUtils.rm_rf 'build'
  FileUtils.rm_rf 'compiled'
  puts "done"
end

desc "Build app"
task :default => [:clean, :coffee] do
end


desc "Compile coffee files to js and run through Closure Compiler"
task :coffee, [:cf] => ["build", "build/js"] do |t, args|
  js_path = 'src'
  cache_path = File.join("build", "coffee_cache")
  FileUtils.mkdir cache_path unless File.exists? cache_path
  coffee_files = []
  if args[:cf]
    coffee_files = args[:cf].map { |f| 'src' + File.absolute_path(f).split('src')[1] }
  else
    coffee_files = Dir.glob(File.join(js_path, '**', '*.coffee'))
  end
  print "compiling #{coffee_files.count} coffee files"
  coffee_files.each do |c|
    path = Pathname.new(c)
    print "."
    target = path.relative_path_from(Pathname.new(js_path)).to_s.gsub! '.coffee', '.js'
    folder = File.join(cache_path, File.dirname(target))
    FileUtils.mkdir_p folder unless File.exists? folder
    File.open(File.join(folder, File.basename(target)), 'w') do |f|
      f.write CoffeeScript.compile(File.read(c), bare: true)
    end
  end
  puts "done"

  print "Running Closure Compiler...."
  js_files = Dir.glob(File.join(cache_path, '**', '*.js'))
  js_files += Dir.glob(File.join(js_path, '**', '*.js'))
  app_path = bust_cache(:silica, File.join('build', 'js', 'silica.js'))
  flags = { :compilation_level => 'SIMPLE_OPTIMIZATIONS' }
  flags.merge!({ :debug => true, :formatting => 'pretty_print' }) unless @production
  File.open(app_path, 'w') do |f|
    f.write Closure::Compiler.new(flags).compile_files(js_files)
  end
  puts "done"

  unless @keep_cache
    print "removing temp files...."
    FileUtils.rm_rf cache_path
    puts "done"
  end

end

desc "ES6 Closure Compiler"
task :es6 => [:clean, "build", "build/js"] do
  cache_path = File.join("build", "es6_cache")
  FileUtils.mkdir cache_path unless File.exists? cache_path
  system("babel src --out-dir compiled")
  system("cp src/spark-md5.js #{cache_path}/spark-md5.js")
  system("cp src/containsRegex.jquery.js #{cache_path}/containsRegex.jquery.js")
  system("browserify ./compiled/silica.js -o #{cache_path}/bundle.js")
  js_files = Dir.glob(File.join(cache_path, '**', '*.js'))
  app_path = bust_cache(:silica, File.join('build', 'js', 'silica.js'))
  flags = { :compilation_level => 'SIMPLE_OPTIMIZATIONS' }
  flags.merge!({ :debug => true, :formatting => 'pretty_print', :compilation_level => 'WHITESPACE_ONLY' }) unless @production
  File.open(app_path, 'w') do |f|
    f.write Closure::Compiler.new(flags).compile_files(js_files)
  end
  unless @keep_cache
    print "removing temp files...."
    FileUtils.rm_rf cache_path
    puts "done"
  end
end

def bust_cache(key, file = nil)
  @cache ||= {}
  @cache.delete key if @force_cache_change && file
  @cache[key] ||= begin
    extension = File.extname(file)
    base = File.basename(file, extension)
    base += "_#{Time.now.to_i}" + extension
    File.join(File.dirname(file), base)
  end
end
