# Footer
# -----
# 一些收尾工作

# Node一些自定义的方法
# 供NodeList遍历调用
nodeFuncs = [
	"on"
	"css"
	"html"
	"attr"
	"append"
	"hide"
	"show"
	"addClass"
	"removeClass"
]

# NodeList的原型添加Node自定义的方法
# 以实现NodeList遍历调用
for name in nodeFuncs
	NodeList::[name] = ((name) ->
		->
			args = arguments

			console.log name

			@each (el) ->
				el[name].apply el, args
	) name

entry = dom

entry.author = AUTHOR
entry.version = VERSION


#模块化
if typeof exports isnt "undefined" and module.exports
  module.exports = entry
else if typeof define is "function" and define.cmd
  define "mummy", (require, exports, module) ->
    module.exports = exports = entry
else
  window.$ = entry