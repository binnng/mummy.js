(function() {
  var AUTHOR, NAME, Node, NodeList, TRIGGER, VERSION, createElement, document, dom, entry, noop, querySelectorAll, window;

  AUTHOR = "binnng";

  VERSION = "0.0.1";

  NAME = "mummy";

  window = this;

  document = window.document;

  TRIGGER = "trigger";

  noop = function() {};

  querySelectorAll = document.querySelectorAll.bind(document);

  createElement = document.createElement.bind(document);

  Node = window.Node || ((function() {
    function _Class() {}

    return _Class;

  })());

  NodeList = window.NodeList || ((function() {
    function _Class() {}

    return _Class;

  })());

  [Node, NodeList].forEach(function(v) {
    return v.prototype.mummy = NAME;
  });

  NodeList.prototype.forEach = [].forEach;

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

  NodeList.prototype.on = function(event, fn) {
    this.forEach(function(el) {
      return el.on(event, fn);
    });
    return this;
  };

  dom = function(s) {
    var length, r;
    r = querySelectorAll(s || "body");
    length = r.length;
    if (length === 1) {
      return r[0];
    } else {
      return r;
    }
  };

  Node.prototype.css = function(k, v) {
    var self;
    self = this;
    if (typeof k !== "object") {
      this.style[k] = v;
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

  NodeList.prototype.css = function(k, v) {
    this.forEach(function(el) {
      return el.css(k, v);
    });
    return this;
  };

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
