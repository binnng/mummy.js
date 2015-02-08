# Event
# -----
# 添加自定义事件支持

window[TRIGGER] = Node::[TRIGGER] = (type, data) ->
  
  event = document.createEvent("HTMLEvents")
  event.initEvent type, true, true
  event.data = data or {}
  event.eventName = type
  event.target = @
  
  @dispatchEvent event
  
  @

NodeList::[TRIGGER] = (event) ->
  @forEach (el) ->
    el[TRIGGER] event

  @


#为node对象添加on方法 
window.on = Node::on = (event, fn) ->
  @addEventListener event, fn, false
  
  @


#nodeList遍历添加
NodeList::on = (event, fn) ->
  @forEach (el) ->
    el.on event, fn

  @