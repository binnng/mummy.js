# Entry
# -----
# 创建实例 
# s 为选择器元素
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