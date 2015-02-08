# Core
# ------

window = @
document = window.document

TRIGGER = "trigger"

noop = ->


querySelectorAll = document.querySelectorAll.bind document
createElement = document.createElement.bind document

isWindow = (obj) ->
  obj isnt null and obj is obj.window

isDocument = (obj) ->
  obj isnt null and obj.nodeType is obj.DOCUMENT_NODE

isArray = (obj) -> obj instanceof Array

# 获取或者设置元素的className
className = (node, value) ->
  klass = node.className or ''
  if value == undefined
    klass
  else
    node.className = value

# 获取元素className数组
getClassNameArr = (node) ->
  ret = []
  r = "#{className(node)}".split(/\s+/g)

  r.forEach (v) ->
    if v isnt ""
      ret.push v

  ret

# 获取或设置元素的样式
style = (node, name, value) ->
  if value isnt undefined
    node.style[name] = value
  else
    (node.currentStyle or window.getComputedStyle(node, null))[name]

# 获取元素下一个dom元素
nextSibling = (node) ->
  next = node.nextSibling
  if next and next.nodeType != 1
    next = arguments.callee(next)
  next

# 连字符转换为驼峰
# 首字母小写
# camel("-webkit-transform") // webkitTransform
camel = (s) ->
  "#{s}".replace(/^-/, "").replace(/-(\w)/g, (all, letter) ->
    letter.toUpperCase()
  )

merge = (dest, src) ->
  for name of src
    dest[name] = src[name]

# 数组中是否有这个元素
Array::has = (v) ->
  @.indexOf(v) isnt -1

Array::remove = (v) ->
  while @has v
    index = @.indexOf(v)
    @splice(index, 1)

  v

#
# 原生的`Node`,`NodeList`对象
# 
# [document](http://www.w3school.com.cn/xmldom/dom_nodelist.asp)
# > 兼容性
# - IE: Internet Explorer
# - F: Firefox
# - O: Opera
# - W3C: 万维网联盟 (因特网标准)
Node = window.Node 

NodeList = window.NodeList

# 统一原型
[
  Node
  NodeList
].forEach (v) ->
  v::mummy = NAME

NodeList::forEach = NodeList::each = [].forEach
