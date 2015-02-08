exec = require("child_process").exec
gulp = require("gulp")
$ = require("gulp-load-plugins")()
read = require "read-json-sync"

paths =
	root: ""
	tmp: "tmp"
	src: "src"
	watch: [
		"src/*.coffee"
		"bower.json"
	]
	docco: "tmp/mummy.coffee"
	dist: "dist"

pkg = read "bower.json"

getSrc = ->
	pkg = read "bower.json"
	("#{paths.src}/#{file}.coffee" for file in pkg.src)

gulp.task "coffee", ->
	gulp.src(getSrc())
		.pipe $.concat("mummy.coffee")
		.pipe gulp.dest(paths.tmp)
		.pipe $.coffee()
		.pipe gulp.dest(paths.root)

gulp.task "build", ->
  gulp.src("mummy.js")
  	.pipe $.uglify()
  	.pipe gulp.dest(paths.dist)

gulp.task "docco", ->
	# exec "npm run-script doc"
	gulp.src(paths.docco)
		.pipe($.docco())
		.pipe gulp.dest('./docs')

gulp.task "size", ->
	gulp.src("#{paths.dist}/mummy.js")
		.pipe($.size(
			gzip: no
			showFiles: yes
		))
		.pipe gulp.dest(paths.dist)

gulp.task "default", ->
  gulp.watch paths.watch, [
  	"coffee"
  	"build"
  	"size"
  	"docco"
  ]

