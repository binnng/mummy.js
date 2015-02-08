# 封装node style属性
# 支持设置单个值
# el.css("display", "none");
# 支持设置多个值
# el.css({"display":"none","opacity":"0.2"})
Node::css = (k, v) ->
  self = @
  (if typeof k isnt "object" then style(self, camel(k), v) else ((k) ->
    for i of k
      self.css i, k[i]
  )(k))
  @



