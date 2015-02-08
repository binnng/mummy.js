# Dom
# ---
# 选择器，DOM操作

# 选择器
# s 为选择器元素
$ = dom = (s) ->
  
  r = querySelectorAll(s or "body")
  length = r.length

  # 单个元素直接返回
  # 多个元素返回nodeList
  (if length is 1 then r[0] else r)

# 创建dom元素
# tag：标签名
# attr: 属性
# $.createElement("div", {"class": "a"})
dom.createElement = (tag, attr) ->
  el = createElement(tag)

  for name of attr
    # 如果为内联样式则调用style.cssText;      
    if name is "style"
      el.style.cssText = attr[name]
    else
      el.setAttribute(name, attr[name])

  el

merge Node::, 

  html: (html) ->
    node = @
    if undefined is html
      node.innerHTML
    else if 'string' is typeof html
      node.innerHTML = html
      node

  attr: (attr, value) ->
    node = @
    return if 'string' isnt typeof attr
    if undefined is value
      node.getAttribute(attr)
    else if 'string' is typeof attr
      node.setAttribute attr, value
      node

  append: (el) ->
    node = @
    node.appendChild(el)
    node

  height: (height) ->
    node = @
    if undefined is height
      if isWindow(node)
        height = node['innerHeight']
      else
        height = node.offsetHeight
      height
    else
      height = "#{height}"
      node.style.height = height.replace('px', '') + 'px'
      node

  show: ->
    node = @
    style(node, "display", "block")
    node

  hide: ->
    node = @
    style(node, "display", "none")
    node



merge NodeList::, 
  eq: (i) ->
    node = @
    if i < 0 then node[node.length - i] else node[i]

# 对class的操作
# 支持传入单个class，也可以传入空格分割的字符串
# hasClass中只有数组中class全部都有时才会返回true
# ```
# el.hasClass("a b")
# el.hasClass("a")
# el.addClass("a b");
# ...
# ```
[
  "add"
  "has"
  "remove"
].forEach (type) ->
  Node::["#{type}Class"] = ((type) ->
    (v) ->
      node = @
      flag = no

      if isArray v
        return v.forEach (_v) ->
          flag = node["#{type}Class"] _v

      cls = getClassNameArr node
      conCls = cls.concat [v] unless cls.has v
      delCls = cls.remove v
      flag = cls.has v

      if type is "add"
        className node, conCls.join " "
      else if type is "remove"
        className node, delCls.join " "
      else
        flag
  ) type

