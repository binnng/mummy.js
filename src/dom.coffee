# Dom
# ---
# 选择器，DOM操作

dom = (s) ->
  
  r = querySelectorAll(s or "body")
  length = r.length

  #单个元素直接返回
  # 多个元素返回nodeList
  (if length is 1 then r[0] else r)