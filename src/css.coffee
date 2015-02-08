#封装node style属性
Node::css = (k, v) ->
  self = @
  (if typeof k isnt "object" then @style[k] = v else ((k) ->
    for i of k
      self.css i, k[i]
  )(k))
  @


#同理递归实现
NodeList::css = (k, v) ->
  @forEach (el) ->
    el.css k, v

  @