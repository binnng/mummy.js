(function() {
  var $, AUTHOR, NAME, Node, NodeList, TRIGGER, VERSION, camel, className, createElement, document, dom, entry, getClassNameArr, isArray, isDocument, isWindow, merge, name, nextSibling, nodeFuncs, noop, querySelectorAll, style, window, _i, _len;

  AUTHOR = "binnng";

  VERSION = "0.0.1";

  NAME = "mummy";

  window = this;

  document = window.document;

  TRIGGER = "trigger";

  noop = function() {};

  querySelectorAll = document.querySelectorAll.bind(document);

  createElement = document.createElement.bind(document);

  isWindow = function(obj) {
    return obj !== null && obj === obj.window;
  };

  isDocument = function(obj) {
    return obj !== null && obj.nodeType === obj.DOCUMENT_NODE;
  };

  isArray = function(obj) {
    return obj instanceof Array;
  };

  className = function(node, value) {
    var klass;
    klass = node.className || '';
    if (value === void 0) {
      return klass;
    } else {
      return node.className = value;
    }
  };

  getClassNameArr = function(node) {
    var r, ret;
    ret = [];
    r = ("" + (className(node))).split(/\s+/g);
    r.forEach(function(v) {
      if (v !== "") {
        return ret.push(v);
      }
    });
    return ret;
  };

  style = function(node, name, value) {
    if (value !== void 0) {
      return node.style[name] = value;
    } else {
      return (node.currentStyle || window.getComputedStyle(node, null))[name];
    }
  };

  nextSibling = function(node) {
    var next;
    next = node.nextSibling;
    if (next && next.nodeType !== 1) {
      next = arguments.callee(next);
    }
    return next;
  };

  camel = function(s) {
    return ("" + s).replace(/^-/, "").replace(/-(\w)/g, function(all, letter) {
      return letter.toUpperCase();
    });
  };

  merge = function(dest, src) {
    var name, _results;
    _results = [];
    for (name in src) {
      _results.push(dest[name] = src[name]);
    }
    return _results;
  };

  Array.prototype.has = function(v) {
    return this.indexOf(v) !== -1;
  };

  Array.prototype.remove = function(v) {
    var index;
    while (this.has(v)) {
      index = this.indexOf(v);
      this.splice(index, 1);
    }
    return v;
  };

  Node = window.Node;

  NodeList = window.NodeList;

  [Node, NodeList].forEach(function(v) {
    return v.prototype.mummy = NAME;
  });

  NodeList.prototype.forEach = NodeList.prototype.each = [].forEach;

  window[TRIGGER] = Node.prototype[TRIGGER] = function(type, data) {
    var event;
    event = document.createEvent("HTMLEvents");
    event.initEvent(type, true, true);
    event.data = data || {};
    event.eventName = type;
    event.target = this;
    this.dispatchEvent(event);
    return this;
  };

  NodeList.prototype[TRIGGER] = function(event) {
    this.forEach(function(el) {
      return el[TRIGGER](event);
    });
    return this;
  };

  window.on = Node.prototype.on = function(event, fn) {
    this.addEventListener(event, fn, false);
    return this;
  };

  $ = dom = function(s) {
    var length, r;
    r = querySelectorAll(s || "body");
    length = r.length;
    if (length === 1) {
      return r[0];
    } else {
      return r;
    }
  };

  dom.createElement = function(tag, attr) {
    var el, name;
    el = createElement(tag);
    for (name in attr) {
      if (name === "style") {
        el.style.cssText = attr[name];
      } else {
        el.setAttribute(name, attr[name]);
      }
    }
    return el;
  };

  merge(Node.prototype, {
    html: function(html) {
      var node;
      node = this;
      if (void 0 === html) {
        return node.innerHTML;
      } else if ('string' === typeof html) {
        node.innerHTML = html;
        return node;
      }
    },
    attr: function(attr, value) {
      var node;
      node = this;
      if ('string' !== typeof attr) {
        return;
      }
      if (void 0 === value) {
        return node.getAttribute(attr);
      } else if ('string' === typeof attr) {
        node.setAttribute(attr, value);
        return node;
      }
    },
    append: function(el) {
      var node;
      node = this;
      node.appendChild(el);
      return node;
    },
    height: function(height) {
      var node;
      node = this;
      if (void 0 === height) {
        if (isWindow(node)) {
          height = node['innerHeight'];
        } else {
          height = node.offsetHeight;
        }
        return height;
      } else {
        height = "" + height;
        node.style.height = height.replace('px', '') + 'px';
        return node;
      }
    },
    show: function() {
      var node;
      node = this;
      style(node, "display", "block");
      return node;
    },
    hide: function() {
      var node;
      node = this;
      style(node, "display", "none");
      return node;
    }
  });

  merge(NodeList.prototype, {
    eq: function(i) {
      var node;
      node = this;
      if (i < 0) {
        return node[node.length - i];
      } else {
        return node[i];
      }
    }
  });

  ["add", "has", "remove"].forEach(function(type) {
    return Node.prototype[type + "Class"] = (function(type) {
      return function(v) {
        var cls, conCls, delCls, flag, node;
        node = this;
        flag = false;
        if (isArray(v)) {
          return v.forEach(function(_v) {
            return flag = node[type + "Class"](_v);
          });
        }
        cls = getClassNameArr(node);
        if (!cls.has(v)) {
          conCls = cls.concat([v]);
        }
        delCls = cls.remove(v);
        flag = cls.has(v);
        if (type === "add") {
          return className(node, conCls.join(" "));
        } else if (type === "remove") {
          return className(node, delCls.join(" "));
        } else {
          return flag;
        }
      };
    })(type);
  });

  Node.prototype.css = function(k, v) {
    var self;
    self = this;
    if (typeof k !== "object") {
      style(self, camel(k), v);
    } else {
      (function(k) {
        var i, _results;
        _results = [];
        for (i in k) {
          _results.push(self.css(i, k[i]));
        }
        return _results;
      })(k);
    }
    return this;
  };

  nodeFuncs = ["on", "css", "html", "attr", "append", "hide", "show", "addClass", "removeClass"];

  for (_i = 0, _len = nodeFuncs.length; _i < _len; _i++) {
    name = nodeFuncs[_i];
    NodeList.prototype[name] = (function(name) {
      return function() {
        var args;
        args = arguments;
        console.log(name);
        return this.each(function(el) {
          return el[name].apply(el, args);
        });
      };
    })(name);
  }

  entry = dom;

  entry.author = AUTHOR;

  entry.version = VERSION;

  if (typeof exports !== "undefined" && module.exports) {
    module.exports = entry;
  } else if (typeof define === "function" && define.cmd) {
    define("mummy", function(require, exports, module) {
      return module.exports = exports = entry;
    });
  } else {
    window.$ = entry;
  }

}).call(this);
