# Core
# ------

window = @
document = window.document

TRIGGER = "trigger"

noop = ->


querySelectorAll = document.querySelectorAll.bind document
createElement = document.createElement.bind document


#
# 如果不支持`Node`,`NodeList`
# 写个构造函数
#
Node = window.Node or class 
	constructor: ->

NodeList = window.NodeList or class
	constructor: ->


# 统一原型
[
  Node
  NodeList
].forEach (v) ->
  v::mummy = NAME

NodeList::forEach = [].forEach
