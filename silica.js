(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) {
          return a(o, !0);
        }
        if (i) {
          return i(o, !0);
        }
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }
      var l = n[o] = {exports:{}};
      t[o][0].call(l.exports, function(e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = typeof require == "function" && require;
  for (var o = 0;o < r.length;o++) {
    s(r[o]);
  }
  return s;
})({1:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Blur;
  function Blur() {
    var nodes = Silica.query(this, "[data-blur]");
    var node;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node._rt_live = true;
      node.onblur = function(evt) {
        Silica._call(this, evt, "blur");
      };
    }
  }
}, {}], 2:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Class;
  function Class() {
    var raw = this instanceof jQuery ? this[0] : this;
    var nodes = Silica.query(raw, "[data-class]");
    var node;
    var klass;
    if (raw.nodeType != 9 && raw.dataset.class) {
      if (raw.dataset._rt_hard_klass == null) {
        raw.dataset._rt_hard_klass = raw.className;
      }
      klass = Silica.getValue(raw, raw.dataset.class, null, null);
      if (klass) {
        raw.classList.add(klass);
      }
    }
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      if (node.dataset._rt_hard_klass == null) {
        node.dataset._rt_hard_klass = node.className.split("hidden").join(" ").trim();
      }
      klass = Silica.getValue(node, node.dataset.class, null, [node, node.dataset.parameter]);
      if (klass) {
        node.classList.add(klass);
      }
    }
  }
}, {}], 3:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Click;
  function Click() {
    var nodes = Silica.query(this, "[data-click]");
    var node;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node._rt_live = true;
      node.onclick = function(evt) {
        Silica._call(this, evt, "click");
      };
    }
  }
}, {}], 4:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  var _directives = require("./directives.js");
  var _directives2 = _interopRequireDefault(_directives);
  var _if = require("./if.js");
  var _if2 = _interopRequireDefault(_if);
  var _show = require("./show.js");
  var _show2 = _interopRequireDefault(_show);
  var _class = require("./class.js");
  var _class2 = _interopRequireDefault(_class);
  var _disabled = require("./disabled.js");
  var _disabled2 = _interopRequireDefault(_disabled);
  var _href = require("./href.js");
  var _href2 = _interopRequireDefault(_href);
  var _style = require("./style.js");
  var _style2 = _interopRequireDefault(_style);
  var _include = require("./include.js");
  var _include2 = _interopRequireDefault(_include);
  var _controller = require("./controller.js");
  var _controller2 = _interopRequireDefault(_controller);
  var _click = require("./click.js");
  var _click2 = _interopRequireDefault(_click);
  var _double_click = require("./double_click.js");
  var _double_click2 = _interopRequireDefault(_double_click);
  var _blur = require("./blur.js");
  var _blur2 = _interopRequireDefault(_blur);
  var _focus = require("./focus.js");
  var _focus2 = _interopRequireDefault(_focus);
  var _tabs = require("./tabs.js");
  var _tabs2 = _interopRequireDefault(_tabs);
  var _model = require("./model.js");
  var _model2 = _interopRequireDefault(_model);
  var _submit = require("./submit.js");
  var _submit2 = _interopRequireDefault(_submit);
  var _src = require("./src.js");
  var _src2 = _interopRequireDefault(_src);
  var _scroll = require("./scroll.js");
  var _scroll2 = _interopRequireDefault(_scroll);
  var _scroll_finished = require("./scroll_finished.js");
  var _scroll_finished2 = _interopRequireDefault(_scroll_finished);
  var _genericAttribute = require("./generic-attribute.js");
  var _genericAttribute2 = _interopRequireDefault(_genericAttribute);
  var _mousedown = require("./mousedown.js");
  var _mousedown2 = _interopRequireDefault(_mousedown);
  var _mouseenter = require("./mouseenter.js");
  var _mouseenter2 = _interopRequireDefault(_mouseenter);
  var _mouseleave = require("./mouseleave.js");
  var _mouseleave2 = _interopRequireDefault(_mouseleave);
  var _mousemove = require("./mousemove.js");
  var _mousemove2 = _interopRequireDefault(_mousemove);
  var _mouseout = require("./mouseout.js");
  var _mouseout2 = _interopRequireDefault(_mouseout);
  var _mouseover = require("./mouseover.js");
  var _mouseover2 = _interopRequireDefault(_mouseover);
  var _mouseup = require("./mouseup.js");
  var _mouseup2 = _interopRequireDefault(_mouseup);
  var _mousewheel = require("./mousewheel.js");
  var _mousewheel2 = _interopRequireDefault(_mousewheel);
  var _keydown = require("./keydown.js");
  var _keydown2 = _interopRequireDefault(_keydown);
  var _keyup = require("./keyup.js");
  var _keyup2 = _interopRequireDefault(_keyup);
  var _touchstart = require("./touch/touchstart.js");
  var _touchstart2 = _interopRequireDefault(_touchstart);
  var _touchcancel = require("./touch/touchcancel.js");
  var _touchcancel2 = _interopRequireDefault(_touchcancel);
  var _touchend = require("./touch/touchend.js");
  var _touchend2 = _interopRequireDefault(_touchend);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default:obj};
  }
  exports.default = {Directives:_directives2.default, _if:_if2.default, Show:_show2.default, Class:_class2.default, Disabled:_disabled2.default, Href:_href2.default, Style:_style2.default, Include:_include2.default, Controller:_controller2.default, Click:_click2.default, DoubleClick:_double_click2.default, Blur:_blur2.default, Focus:_focus2.default, Tabs:_tabs2.default, Model:_model2.default, Submit:_submit2.default, Src:_src2.default, Scroll:_scroll2.default, ScrollFinished:_scroll_finished2.default, 
  Generic:_genericAttribute2.default, MouseDown:_mousedown2.default, MouseUp:_mouseup2.default, MouseOut:_mouseout2.default, MouseMove:_mousemove2.default, MouseWheel:_mousewheel2.default, MouseLeave:_mouseleave2.default, MouseEnter:_mouseenter2.default, MouseOver:_mouseover2.default, KeyDown:_keydown2.default, KeyUp:_keyup2.default, TouchStart:_touchstart2.default, TouchCancel:_touchcancel2.default, TouchEnd:_touchend2.default};
}, {"./blur.js":1, "./class.js":2, "./click.js":3, "./controller.js":5, "./directives.js":6, "./disabled.js":7, "./double_click.js":8, "./focus.js":9, "./generic-attribute.js":10, "./href.js":11, "./if.js":12, "./include.js":13, "./keydown.js":14, "./keyup.js":15, "./model.js":16, "./mousedown.js":17, "./mouseenter.js":18, "./mouseleave.js":19, "./mousemove.js":20, "./mouseout.js":21, "./mouseover.js":22, "./mouseup.js":23, "./mousewheel.js":24, "./scroll.js":25, "./scroll_finished.js":26, "./show.js":27, 
"./src.js":28, "./style.js":29, "./submit.js":30, "./tabs.js":31, "./touch/touchcancel.js":32, "./touch/touchend.js":33, "./touch/touchstart.js":34}], 5:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Controller;
  function Controller(ctx) {
    var force = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var storeWatchers = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
    var nodes = Silica.query(this, "[data-controller]");
    var node, $elm, constructor, ctrl, k, v, _ref, model;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      if (!force && node._rt_ctrl !== undefined) {
        continue;
      }
      lastCtrl = node._rt_ctrl;
      delete node._rt_ctrl;
      $elm = $(node);
      constructor = $elm.data("controller");
      if (typeof(_ref = constructor.match(/((?:\w|\.)+)(?:\((\w+)\))*/))[2] !== "undefined") {
        var parent = $elm.parent()[0];
        if (parent) {
          model = Silica.getValue($elm.parent()[0], _ref[2]);
          if (model == null) {
            storeWatchers = false;
          }
        } else {
          model = Silica.getValue(node, _ref[2], node._rt_ctx);
          if (model == null) {
            storeWatchers = false;
          }
        }
      }
      constructor = _ref[1];
      constructor = eval(constructor);
      if (!constructor) {
        return console.error("Unknown Controller: " + $elm.data("controller"));
      }
      if (typeof model !== "undefined") {
        ctrl = new constructor(node, model);
      } else {
        ctrl = new constructor(node);
      }
      var watchers = constructor.watchers;
      if (lastCtrl && watchers && Object.keys(watchers).length > 0) {
        for (k in watchers) {
          v = watchers[k];
          var stored = Silica._watch[k];
          if (!stored) {
            continue;
          }
          for (var pairIdx = stored.length - 1;pairIdx >= 0;--pairIdx) {
            var pair = stored[pairIdx];
            if (lastCtrl == pair[0]) {
              stored.splice(pairIdx, 1);
            }
          }
        }
      }
      node._rt_live = true;
      node._rt_ctrl = ctrl;
      if (storeWatchers) {
        for (k in watchers) {
          v = watchers[k];
          if (!Silica._watch[k]) {
            Silica._watch[k] = [];
          }
          Silica._watch[k].push([ctrl, v]);
        }
      }
      if (typeof ctrl.onLoad === "function") {
        ctrl.onLoad();
      }
    }
  }
}, {}], 6:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = directives;
  function directives() {
    for (var k in Silica.directives) {
      if (Silica.directives.hasOwnProperty(k)) {
        var obj = Silica.directives[k];
        var nodes = Silica.queryOfType(this, k);
        var wrapper = document.createElement("div");
        for (var i = nodes.length - 1;i >= 0;--i) {
          wrapper.innerHTML = obj.template;
          var newChild = wrapper.firstChild;
          var node = nodes[i];
          if (node.hasAttributes()) {
            var attrs = node.attributes;
            for (var j = attrs.length - 1;j >= 0;j--) {
              newChild.setAttribute(attrs[i].name, attrs[i].value);
            }
          }
          for (var _j in node.dataset) {
            newChild.dataset[_j] = node.dataset[_j];
          }
          newChild._rt_ctrl = new obj.controller(newChild);
          newChild._rt_ctrl.$ctrl = Silica.getContext(node);
          Silica.cacheTemplates(newChild);
          Silica.interpolate(newChild, newChild._rt_ctrl, false);
          node.parentNode.replaceChild(newChild, node);
          var watchers = obj.controller.watchers;
          var v = undefined;
          for (w in watchers) {
            v = watchers[w];
            if (!Silica._watch[w]) {
              Silica._watch[w] = [];
            }
            Silica._watch[w].push([newChild._rt_ctrl, v]);
          }
          if (typeof newChild._rt_ctrl.onLoad === "function") {
            newChild._rt_ctrl.onLoad();
          }
        }
      }
    }
  }
}, {}], 7:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Disabled;
  function Disabled() {
    var raw = this instanceof jQuery ? this[0] : this;
    var nodes = Silica.query(raw, "[data-disabled]");
    var node;
    var property;
    var negate;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      property = node.dataset.disabled;
      negate = property[0] === "!";
      if (negate) {
        property = property.substr(1);
      }
      if (Silica._show(node, property, negate)) {
        node.setAttribute("disabled", true);
      } else {
        node.removeAttribute("disabled");
      }
    }
  }
}, {}], 8:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = DoubleClick;
  function DoubleClick() {
    var nodes = Silica.query(this, "[data-dblclick]");
    var node;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node._rt_live = true;
      node.ondblclick = function(evt) {
        Silica._call(this, evt, "dblclick");
      };
    }
  }
}, {}], 9:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Focus;
  function Focus() {
    var nodes = Silica.query(this, "[data-focus]");
    var node;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node._rt_live = true;
      node.onfocus = function(evt) {
        Silica._call(this, evt, "focus");
      };
    }
  }
}, {}], 10:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Href;
  function Href() {
    var raw = this instanceof jQuery ? this[0] : this;
    var nodes = Silica.query(raw, "[data-silica]");
    var node;
    var comps, attribute, valueKey;
    var params, paramsKeys;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      comps = node.dataset.silica.split("=");
      if (comps.length !== 2) {
        console.error("Invalid generic binding", node.dataset.silica, "for node", node);
        return;
      }
      attribute = comps[0];
      valueKey = comps[1];
      paramsKeys = valueKey.match("\\((.*)\\)");
      if (paramsKeys !== null) {
        paramsKeys.shift();
        params = [];
        for (var j = 0, length = paramsKeys.length;j < length;j++) {
          params.push(Silica.getValue(node, paramsKeys[j]));
        }
        valueKey = valueKey.substr(0, valueKey.indexOf("("));
      }
      if (attribute !== "innerHTML") {
        node.setAttribute(attribute, Silica.getValue(node, valueKey, null, params));
      } else {
        node.innerHTML = Silica.getValue(node, valueKey, null, params);
      }
    }
    Silica._capture_links(raw);
  }
}, {}], 11:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Href;
  function Href() {
    var raw = this instanceof jQuery ? this[0] : this;
    var nodes = Silica.query(raw, "[data-href]");
    var node;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node.setAttribute("href", Silica.getValue(node, node.dataset.href));
    }
    Silica._capture_links(raw);
  }
}, {}], 12:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = _if;
  function _if() {
    var _this = this;
    var nodes = Silica.queryWithComments(this, "[data-if]");
    var isVisible, negate, raw, val, node;
    var temp = document.createElement("div");
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      if (node.nodeType === 8) {
        temp.innerHTML = node.nodeValue;
        raw = val = temp.firstElementChild.dataset["if"];
      } else {
        raw = val = node.dataset["if"];
      }
      negate = val[0] === "!";
      if (negate) {
        val = val.substr(1);
      }
      if (!Silica._ifs[raw]) {
        Silica._ifs[raw] = [];
      }
      isVisible = Silica._show(node, val, negate);
      if (isVisible) {
        if (node.nodeType !== 8) {
          Silica._ifs[raw].push(node);
        } else {
          var live = temp.firstElementChild;
          Silica._ifs[raw].push(live);
          node.parentElement.insertBefore(live, node);
          node.remove();
          node = live;
        }
        if ((_ref = Silica.getContext(node)) != null) {
          if (typeof _ref.onLoad === "function" && _ref.el === node) {
            _ref.onLoad();
          }
        }
      } else {
        if (node.nodeType !== 8) {
          var subNodes = Silica.queryWithComments(node, "[data-if]");
          var subNode = undefined;
          for (var j = subNodes.length - 1;j >= 0;--j) {
            subNode = subNodes[j];
            var $e, list, prop, _ref;
            prop = subNode.dataset["if"];
            list = Silica._shws[prop];
            Silica._shws[prop] = (_ref = list != null ? list.filter(function(obj) {
              return!$(obj).is($e);
            }) : void 0) != null ? _ref : [];
          }
          subNodes = Silica.query(this, "[data-controller]");
          var _loop = function _loop(_j) {
            subNode = subNodes[_j];
            var ctrl = _this._rt_ctrl;
            var k = undefined, list = undefined, _ref = undefined;
            for (k in ctrl != null ? ctrl.watchers : void 0) {
              list = Silica._watch[k];
              Silica._watch[k] = list != null ? list.filter(function(obj) {
                return obj[0] !== ctrl;
              }) : [];
            }
          };
          for (var _j = subNodes.length - 1;_j >= 0;--_j) {
            _loop(_j);
          }
          comment = document.createComment(node.outerHTML);
          Silica._ifs[raw].push(comment);
          node.parentNode.replaceChild(comment, node);
        }
      }
    }
  }
}, {}], 13:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Include;
  function Include() {
    var raw = this instanceof jQuery ? this[0] : this;
    var nodes = Silica.query(raw, "[data-style]");
    var node, partial;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      partial = eval(node.dataset.include);
      delete node.dataset.include;
      $(node).load(partial, function() {
        Silica.compile(this);
        var ctx = Silica.getContext(this);
        if (ctx.onLoad && typeof ctx.onLoad === "function") {
          ctx.onLoad(this);
        }
      });
    }
  }
}, {}], 14:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = KeyDown;
  function KeyDown() {
    var context = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var elements = Silica.query(this, "[data-keydown]");
    for (var i = elements.length - 1;i >= 0;i--) {
      elements[i].addEventListener("keydown", function(evt) {
        Silica._call(this, evt, "keydown");
      });
    }
  }
}, {}], 15:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = KeyUp;
  function KeyUp() {
    var context = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var elements = Silica.query(this, "[data-keyup]");
    for (var i = elements.length - 1;i >= 0;i--) {
      elements[i].addEventListener("keyup", function(evt) {
        Silica._call(this, evt, "keyup");
      });
    }
  }
}, {}], 16:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Model;
  var inputTimeRegexp = /date|time/i;
  var inputTypes = ["text", "file", "number", "email", "password", "tel", "search", "url", "range", "date", "month", "week", "time", "datetime", "datetime-local", "color", "textarea", "select", "select-one"];
  function Model() {
    var context = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var elm, change, ctx, model, val;
    var elements = Silica.query(this, "input[data-model]", "select[data-model]", "textarea[data-model]", "option[data-model]");
    for (var i = elements.length - 1;i >= 0;i--) {
      elm = elements[i];
      ctx = Silica.getContext(elm);
      model = elm.dataset.model;
      var type = elm.type;
      if (inputTypes.indexOf(type) !== -1) {
        elm.value = Silica.getValue(elm, model, ctx);
      } else {
        if (type === "radio") {
          val = elm.value;
          if (val.match(/[0-9]/)) {
            val = parseInt(val);
          }
          elm.checked = Silica.getValue(elm, model, ctx) === val;
        } else {
          if (type === "checkbox") {
            elm.checked = Silica.getValue(elm, model, ctx);
          } else {
            if (elm.nodeName === "OPTION") {
              elm.value = Silica.getValue(elm, model, ctx);
            }
          }
        }
      }
      change = function change() {
        var obj, _ref, _ref1, _ref2;
        var val = this.value, ctx = Silica.getContext(this), model = this.dataset.model;
        if (this.type === "radio") {
          if (val.match(/[0-9]/)) {
            val = parseInt(val);
          }
        } else {
          if (this.type === "checkbox") {
            val = this.checked;
          }
        }
        if (Silica.isInApply) {
          obj = (_ref = this._rt_ctx) != null ? _ref : ctx;
          Silica.setPropByString(obj, model, val);
        } else {
          if ((_ref = this.dataset.trap) != null) {
            obj = (_ref1 = this._rt_ctx) != null ? _ref1 : ctx;
            var scope = undefined;
            if (_ref.toLowerCase() === "true") {
              scope = this;
            } else {
              scope = document;
              _ref1 = this;
              while (_ref1 = _ref1.parentElement) {
                if (_ref1.classList.contains(_ref)) {
                  scope = _ref1;
                  break;
                }
              }
            }
            Silica.apply(function() {
              return Silica.setPropByString(obj, model, val);
            }, scope);
          } else {
            obj = (_ref2 = this._rt_ctx) != null ? _ref2 : ctx;
            Silica.apply(function() {
              return Silica.setPropByString(obj, model, val);
            });
          }
        }
      };
      elm.onchange = change;
      elm.onkeyup = change;
      elm.onsearch = change;
      if (elm.hasAttribute("x-webkit-speech")) {
        elm.onwebkitspeechchange = change;
      }
      elm.addEventListener("focus", function() {
        Silica.__activeElement = this;
      });
      elm.addEventListener("blur", function() {
        if (Silica.__activeElement === this) {
          Silica.__activeElement = null;
        }
      });
    }
  }
}, {}], 17:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = MouseDown;
  function MouseDown() {
    var nodes = Silica.query(this, "[data-mousedown]");
    var node;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node._rt_live = true;
      node.onmousedown = function(evt) {
        Silica._call(this, evt, "mousedown");
      };
    }
  }
}, {}], 18:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = MouseEnter;
  function MouseEnter() {
    var nodes = Silica.query(this, "[data-mouseenter]");
    var node;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node._rt_live = true;
      node.onmouseenter = function(evt) {
        Silica._call(this, evt, "mouseenter");
      };
    }
  }
}, {}], 19:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = MouseLeave;
  function MouseLeave() {
    var nodes = Silica.query(this, "[data-mouseleave]");
    var node;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node._rt_live = true;
      node.onmouseleave = function(evt) {
        Silica._call(this, evt, "mouseleave");
      };
    }
  }
}, {}], 20:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = MouseMove;
  function MouseMove() {
    var nodes = Silica.query(this, "[data-mousemove]");
    var node;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node._rt_live = true;
      node.onmousemove = function(evt) {
        Silica._call(this, evt, "mousemove");
      };
    }
  }
}, {}], 21:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = MouseOut;
  function MouseOut() {
    var nodes = Silica.query(this, "[data-mouseout]");
    var node;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node._rt_live = true;
      node.onmouseout = function(evt) {
        Silica._call(this, evt, "mouseout");
      };
    }
  }
}, {}], 22:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = MouseOver;
  function MouseOver() {
    var nodes = Silica.query(this, "[data-mouseover]");
    var node;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node._rt_live = true;
      node.onmouseover = function(evt) {
        Silica._call(this, evt, "mouseover");
      };
    }
  }
}, {}], 23:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = MouseUp;
  function MouseUp() {
    var nodes = Silica.query(this, "[data-mouseup]");
    var node;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node._rt_live = true;
      node.onmouseup = function(evt) {
        Silica._call(this, evt, "mouseup");
      };
    }
  }
}, {}], 24:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = MouseWheel;
  function MouseWheel() {
    var nodes = Silica.query(this, "[data-mousewheel]");
    var node;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node._rt_live = true;
      node.onmousewheel = function(evt) {
        Silica._call(this, evt, "mousewheel");
      };
    }
  }
}, {}], 25:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Scroll;
  function Scroll() {
    var nodes = Silica.query(this, "[data-scroll]");
    var node;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node._rt_live = true;
      node.onscroll = function(evt) {
        Silica._call(this, evt, "scroll");
      };
    }
  }
}, {}], 26:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = ScrollFinished;
  function ScrollFinished() {
    var _this = this;
    var nodes = Silica.query(this, "[data-scroll-finished]");
    var node;
    var _loop = function _loop(i) {
      node = nodes[i];
      node._rt_live = true;
      var element = _this;
      onscrollfinished = Silica.debounce(function(element, evt) {
        Silica._call(element, evt, "scroll-finished");
      }, 50);
      node.onscroll = function(evt) {
        if (this.dataset.scroll) {
          Silica._call(this, evt, "scroll");
        }
        onscrollfinished(element, evt);
      };
    };
    for (var i = nodes.length - 1;i >= 0;--i) {
      var onscrollfinished;
      _loop(i);
    }
  }
}, {}], 27:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Show;
  function Show() {
    var nodes = Silica.query(this, "[data-show]");
    var node;
    var $elm, isVisible, negate, raw, val;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      $elm = $(node);
      raw = val = $elm.data("show");
      negate = val[0] === "!";
      if (negate) {
        val = val.substr(1);
      }
      if (!Silica._shws[raw]) {
        Silica._shws[raw] = [];
      }
      if (Silica._shws[raw].some(function(obj) {
        return $(obj).is($elm);
      })) {
        continue;
      }
      $elm[0].onremove = function() {
        var list, _ref = $elm[0];
        list = Silica._shws[raw];
        if (list !== undefined && list !== null) {
          Silica._shws[raw] = list.filter(function(obj) {
            return $elm[0] !== _ref;
          });
        } else {
          Silica._shws[raw] = [];
        }
      };
      isVisible = Silica._show($elm, val, negate);
      Silica._shws[raw].push(node);
      if (isVisible) {
        $elm.removeClass("hidden");
      } else {
        $elm.addClass("hidden");
      }
    }
  }
}, {}], 28:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Src;
  function Src() {
    var raw = this instanceof jQuery ? this[0] : this;
    var nodes = Silica.queryOfType(raw, "img", "[data-src]");
    var node;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node.src = Silica.getValue(node, node.dataset.src) || "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
    }
  }
}, {}], 29:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Style;
  function Style() {
    var raw = this instanceof jQuery ? this[0] : this;
    var nodes = Silica.query(raw, "[data-style]");
    var node;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node.setAttribute("style", Silica.getValue(node, node.dataset.style));
    }
  }
}, {}], 30:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Submit;
  function Submit() {
    var raw = this instanceof jQuery ? this[0] : this;
    var nodes = Silica.query(raw, "[data-submit]");
    var node;
    var handler = function handler(evt) {
      Silica._call(this, evt, "submit");
      return false;
    };
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node.onsubmit = handler;
      node._rt_live = true;
    }
  }
}, {}], 31:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Tabs;
  function Tabs() {
    var li, pane, template;
    li = '<li><a href="#" data-click="open"></a></li>';
    pane = '<div class="tab-pane"></div>';
    template = '<div class="tabbable"><ul class="nav nav-tabs"></ul><div class="tab-content"></div></div>';
    return $("*[data-tabs]", this).each(function() {
      var $elm, $target, tabCtrl;
      $elm = $(this);
      $target = $(template);
      $target.addClass($elm.attr("class"));
      tabCtrl = {open:function open(el) {
        $(".active", $target).removeClass("active");
        $(el).parent().addClass("active");
        return $(".tab-pane[title='" + $(el).parent().attr("title") + "']", $target).addClass("active");
      }};
      $target[0]._rt_ctrl = tabctrl;
      $("*[data-pane]", $elm).each(function() {
        var $link, $pane, newPane, title;
        $pane = $(this);
        $link = $(li);
        title = $pane.attr("title");
        $link.attr("title", title);
        $("a", $link).html(title);
        $("ul.nav", $target).append($link);
        newPane = $(pane).append($pane.children());
        newPane.attr("title", title);
        return $(".tab-content", $target).append(newPane);
      });
      tabCtrl.open($("li:first-child > a", $target));
      return $elm.replaceWith(Silica.compile($target));
    });
  }
}, {}], 32:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = TouchCancel;
  function TouchCancel() {
    var nodes = Silica.query(this, "[data-touchcancel]");
    var node;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node._rt_live = true;
      node.ontouchcancel = function(evt) {
        Silica._call(this, evt, "touchcancel");
      };
    }
  }
}, {}], 33:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = TouchEnd;
  function TouchEnd() {
    var nodes = Silica.query(this, "[data-touchend]");
    var node;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node._rt_live = true;
      node.ontouchend = function(evt) {
        Silica._call(this, evt, "touchend");
      };
    }
  }
}, {}], 34:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = TouchStart;
  function TouchStart() {
    var nodes = Silica.query(this, "[data-touchstart]");
    var node;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      node._rt_live = true;
      node.ontouchstart = function(evt) {
        Silica._call(this, evt, "touchstart");
      };
    }
  }
}, {}], 35:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0;i < props.length;i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
          descriptor.writable = true;
        }
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps) {
        defineProperties(Constructor.prototype, protoProps);
      }
      if (staticProps) {
        defineProperties(Constructor, staticProps);
      }
      return Constructor;
    };
  }();
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var Base = function() {
    function Base(el) {
      _classCallCheck(this, Base);
      this.el = el;
      if (el.parentElement) {
        this.$ctrl = Silica.getContext(el.parentElement);
      }
    }
    _createClass(Base, [{key:"$", value:function(_$) {
      function $(_x) {
        return _$.apply(this, arguments);
      }
      $.toString = function() {
        return _$.toString();
      };
      return $;
    }(function(selector) {
      return $(selector, this.el);
    })}]);
    return Base;
  }();
  Base.watchers = {};
  exports.default = Base;
}, {}], 36:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  var _base = require("./base");
  var _base2 = _interopRequireDefault(_base);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default:obj};
  }
  Controllers = {Base:_base2.default};
  exports.default = Controllers;
}, {"./base":35}], 37:[function(require, module, exports) {
  var _controllers = require("./controllers/controllers");
  var _controllers2 = _interopRequireDefault(_controllers);
  var _compilers = require("./compilers/compilers");
  var _compilers2 = _interopRequireDefault(_compilers);
  var _watchers = require("./watchers/watchers");
  var _watchers2 = _interopRequireDefault(_watchers);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default:obj};
  }
  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length);i < arr.length;i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    } else {
      return Array.from(arr);
    }
  }
  var Silica = {context:window, contextName:"", directives:{}, filters:{}, router:{}, _ifs:{}, _shws:{}, _klass:{}, _watch:{}, _repeat_templates:{}, _isReady:false, _appRoot:null, interpolationPattern:/\{\{(.*?)\}\}/, usePushState:true, version:"0.11.6", setContext:function setContext(contextName) {
    this.contextName = contextName;
    this.context = window[contextName];
  }, setRouter:function setRouter(router) {
    var _this = this;
    this.router = router;
    window.onhashchange = function() {
      _this.apply(function() {
        return _this.router.route(location.hash);
      });
    };
    if (Silica.usePushState) {
      window.onpopstate = function() {
        _this.apply(function() {
          return _this.router.route(Silica.usePushState ? location.pathname : location.hash);
        });
      };
    }
  }, goTo:function goTo(pathname) {
    var route;
    if (Silica.usePushState) {
      history.pushState(null, null, pathname);
      route = pathname;
    } else {
      window.location.hash = "#" + pathname;
      route = window.location.hash;
    }
    if (Silica.router) {
      Silica.apply(function() {
        Silica.router.route(route);
      });
    }
  }, compile:function compile(element) {
    var flush = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
    var context = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var onlySafe = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
    var storeWatchers = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];
    if (Silica._appRoot === null) {
      Silica._appRoot = element;
    }
    var func, k, _ref;
    if (!(element instanceof jQuery)) {
      element = $(element);
    }
    if (element[0] == document) {
      element[0] = document.body.parentElement;
      context = context || {};
    } else {
      context = context || Silica.getContext(element);
    }
    Silica.cacheTemplates(element[0]);
    Silica.interpolate(element, context, flush);
    for (var key in Silica.compilers) {
      if (!(onlySafe & key[0] === "_")) {
        if (key == "Controller") {
          Silica.compilers[key].apply(element, [context, false, storeWatchers]);
        } else {
          Silica.compilers[key].apply(element, [context]);
        }
      }
    }
    if (flush) {
      Silica.flush(element, true);
    }
    Silica._capture_links(element);
    if (element === Silica._appRoot) {
      Silica._isReady = true;
    }
    return element;
  }, cacheTemplates:function cacheTemplates(element) {
    var nodes = element.querySelectorAll("[data-repeat]");
    var node;
    var hash;
    var context;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      if (!node.dataset._rt_repeat_template) {
        hash = SparkMD5.hash(node.innerHTML);
        if (node.children.length === 1) {
          Silica._repeat_templates[hash] = node.firstElementChild;
        } else {
          var wrap = document.createElement("div");
          wrap.innerHTML = node.innerHTML;
          Silica._repeat_templates[hash] = wrap;
        }
        node.dataset._rt_repeat_template = hash;
        context = {};
        context.$ctrl = Silica.getContext(node);
        Silica._repeat_templates[hash] = Silica.compile($(Silica._repeat_templates[hash]), false, context, true, false)[0];
        node.innerHTML = "";
      }
    }
  }, debounce:function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function later() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  }, flush:function flush() {
    var element = arguments.length <= 0 || arguments[0] === undefined ? document.body.parentElement : arguments[0];
    var onlySafe = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var changed = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var skipSchedule = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
    if (Silica.isInFlush && !skipSchedule) {
      if (Silica._scheduledFlush) {
        return;
      } else {
        Silica._scheduledFlush = true;
      }
    }
    if (element == document) {
      element = document.body.parentElement;
    }
    Silica.isInFlush = !skipSchedule;
    if (changed === null && Silica._isReady) {
      var funcs = undefined;
      var _func = undefined;
      for (var key in Silica._watch) {
        if (Silica._watch.hasOwnProperty(key)) {
          funcs = Silica._watch[key];
          for (var _i2 = funcs.length - 1;_i2 >= 0;--_i2) {
            _func = funcs[_i2];
            _func[1].apply(_func[0]);
          }
        }
      }
    } else {
      var obj = undefined, _k2 = undefined, _funcs = undefined, _func2 = undefined;
      for (_k2 in changed) {
        _funcs = changed[_k2];
        if (_funcs !== true) {
          for (var i = _funcs.length - 1;i >= 0;--i) {
            _func2 = _funcs[i];
            _func2[1].apply(_func2[0]);
          }
        } else {
          _funcs = Silica._watch[_k2];
          for (var i = _funcs.length - 1;i >= 0;--i) {
            _func2 = _funcs[i];
            _func2[1].apply(_func2[0]);
          }
        }
      }
    }
    var watchers = Silica.watchers;
    var func = undefined;
    for (var _k3 in watchers) {
      if (onlySafe && _k3[0] === "_") {
        continue;
      }
      func = watchers[_k3];
      func.apply(element);
    }
    Silica.isInFlush = skipSchedule;
    if (Silica._scheduledFlush === true && !skipSchedule) {
      Silica._scheduledFlush = false;
      window.setTimeout(function() {
        Silica.flush(document, false, {});
      }, 20);
    }
    return Silica;
  }, apply:function apply(func) {
    var element = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];
    var args, assoc, changed, changes, finalChanges, funcs, k, oldVal, old_values, v, val, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    if (Silica.isInApply) {
      return func.call();
    }
    old_values = {};
    var association;
    for (var property in Silica._watch) {
      funcs = Silica._watch[property];
      old_values[property] = [];
      if (property.charCodeAt(0) >= 97) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;
        try {
          for (var _iterator = funcs[Symbol.iterator](), _step;!(_iteratorNormalCompletion = (_step = _iterator.next()).done);_iteratorNormalCompletion = true) {
            association = _step.value;
            val = Silica.getPropByString(association[0], property);
            if (Array.isArray(val)) {
              val = val.slice();
            }
            old_values[property].push([association[0], val]);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } else {
        val = Silica.getPropByString(window, property);
        if (Array.isArray(val)) {
          val = val.slice();
        }
        old_values[property] = val;
      }
    }
    Silica.isInApply = true;
    func.call();
    Silica.isInApply = false;
    changes = {};
    _ref1 = Silica._watch;
    for (k in _ref1) {
      funcs = _ref1[k];
      if (k.charCodeAt(0) >= 97) {
        changes[k] = [];
        for (_j = 0, _len1 = funcs.length;_j < _len1;_j++) {
          func = funcs[_j];
          if (k.match(/\.\*$/)) {
            changes[k].push(func);
          } else {
            val = Silica.getPropByString(func[0], k);
            _ref2 = old_values[k];
            for (_k = 0, _len2 = _ref2.length;_k < _len2;_k++) {
              args = _ref2[_k];
              if (args[0] === func[0]) {
                oldVal = args[1];
              }
            }
            changed = val !== oldVal;
            if (Array.isArray(val) && Array.isArray(oldVal)) {
              changed = oldVal && val ? oldVal.length !== val.length : true;
              if (!changed) {
                changed = oldVal.some(function(e, idx) {
                  return val[idx] !== e;
                });
              }
            }
            if (changed) {
              changes[k].push(func);
            }
          }
        }
      } else {
        val = Silica.getPropByString(window, k);
        oldVal = old_values[k];
        changed = val !== oldVal;
        if (Array.isArray(val) && Array.isArray(oldVal)) {
          changed = oldVal && val ? oldVal.length !== val.length : true;
          if (!changed) {
            changed = oldVal.some(function(e, idx) {
              return val[idx] !== e;
            });
          }
        }
        changes[k] = changed;
      }
    }
    finalChanges = {};
    for (k in changes) {
      v = changes[k];
      if (Array.isArray(v) && v.length || v === true) {
        finalChanges[k] = v;
      }
    }
    return Silica.flush(element, false, finalChanges);
  }, getPropByString:function getPropByString(obj, propString, params) {
    if (!propString) {
      return obj;
    }
    var comps = propString.split(".");
    while (obj[comps[0]] == null || obj[comps[0]] == undefined) {
      if (obj.$ctrl) {
        obj = obj.$ctrl;
      } else {
        return null;
      }
    }
    var context = undefined;
    var property_path = propString.split(".");
    var path_length = property_path.length;
    var property = undefined;
    for (var i = 0;i < path_length;++i) {
      property = property_path[i];
      context = obj;
      obj = obj[property];
      if (typeof obj === "function") {
        obj = obj.apply(context, params);
      }
      if (obj === null || obj === void 0) {
        return null;
      }
    }
    return obj;
  }, getValue:function getValue(raw, propString) {
    var context = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var params = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var ctx;
    ctx = context ? context : propString.charCodeAt(0) <= 90 ? window : Silica.getContext(raw);
    return Silica.getPropByString(ctx, propString, params);
  }, isInDOM:function isInDOM(element) {
    while (element.parentElement != null && !element._deleted) {
      if (element.parentElement == document.body) {
        return true;
      } else {
        element = element.parentElement;
      }
    }
    return false;
  }, setPropByString:function setPropByString(obj, propString, value) {
    var key, paths, prop, _i, _len, _ref, _ref1, ctx;
    if (!propString) {
      return obj;
    }
    paths = propString.split(".");
    key = paths[paths.length - 1];
    if (propString.charCodeAt(0) <= 90) {
      ctx = window;
    } else {
      if (!obj.hasOwnProperty(paths[0]) && obj.hasOwnProperty("$ctrl")) {
        ctx = obj.$ctrl;
      } else {
        ctx = obj;
      }
    }
    for (_i = 0, _len = paths.length;_i < _len;_i++) {
      prop = paths[_i];
      if (prop !== key) {
        if (typeof ctx[prop] === "function") {
          ctx = ctx[prop].call(ctx);
        } else {
          ctx = ctx[prop];
        }
      }
    }
    var old_value = ctx[prop];
    ctx[prop] = value;
    var hook = ctx[prop + "_changed"];
    if (hook) {
      hook.call(ctx, old_value, value);
    }
  }, evaluateExpression:function evaluateExpression(expr, $elm) {
    var ctx = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    var filter, filterKey, filterOptions, value;
    if (!expr) {
      return;
    }
    filter = null;
    if (expr.match("|")) {
      expr = expr.split("|");
      filter = $.trim(expr[1]);
      expr = $.trim(expr[0]);
    }
    if (!ctx.$ctrl) {
      ctx.$ctrl = Silica.getContext($elm);
    }
    if (expr.charCodeAt(0) <= 90) {
      ctx = window;
    }
    value = Silica.getPropByString(ctx, expr);
    if (filter) {
      filter = filter.split(/:(.+)/);
      filterKey = filter ? filter[0] : null;
      filterOptions = filter && filter.length > 1 ? eval(filter[1]) : null;
      filter = filterKey ? Silica.filters[filterKey] : null;
      value = filter ? filter(value, filterOptions, ctx) : value;
    }
    return value;
  }, interpolate:function interpolate($elm) {
    var context = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var flush = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
    var element = $elm instanceof jQuery ? $elm[0] : $elm;
    var elements = [];
    var children = element.childNodes;
    var text, match, expr, comps, property, fmt, filter, evald;
    var nodeIterator = document.createNodeIterator(element, NodeFilter.SHOW_TEXT, {acceptNode:function acceptNode(node) {
      if (Silica.interpolationPattern.test(node.data)) {
        return NodeFilter.FILTER_ACCEPT;
      }
    }}, false);
    var node;
    while (node = nodeIterator.nextNode()) {
      text = node.data;
      while ((match = text.match(Silica.interpolationPattern)) !== null) {
        expr = match[1];
        comps = expr.split("|");
        property = comps[0].trim();
        if (comps.length === 1) {
          fmt = "<span data-model='" + property + "'>{{val}}</span>";
        } else {
          filter = comps[1].trim();
          fmt = "<span data-model='" + property + "' data-filter='" + filter + "'>{{val}}</span>";
        }
        evald = fmt.replace("{{val}}", Silica.evaluateExpression(expr, node, context));
        text = text.replace("{{" + expr + "}}", evald);
      }
      var span = document.createElement("span");
      span.innerHTML = text;
      var parentNode = node.parentNode;
      while (span.childNodes.length > 0) {
        parentNode.insertBefore(span.firstChild, node);
      }
      parentNode.removeChild(node);
      Silica.compile(span, flush, context);
    }
  }, addFilter:function addFilter(key, func) {
    Silica.filters[key] = func;
  }, addDirective:function addDirective(key, obj) {
    Silica.directives[key] = obj;
  }, getContext:function getContext(element) {
    var $elm, constructor, ctrl, k, v, _ref, raw, ctx, model, needsModel;
    raw = element instanceof jQuery ? element[0] : element;
    while (true) {
      if (raw._rt_ctx) {
        return raw._rt_ctx;
      } else {
        if (raw._rt_ctrl) {
          return raw._rt_ctrl;
        } else {
          if (raw.nodeName === "BODY") {
            return Silica.context;
          } else {
            if (raw.nodeType !== 9 && raw.nodeType !== 3 && raw.nodeType !== 8 && raw.dataset && raw.dataset.controller) {
              constructor = raw.dataset.controller;
              if (typeof(_ref = constructor.match(/((?:\w|\.)+)(?:\((\w+)\))*/))[2] !== "undefined") {
                needsModel = true;
                model = Silica.getValue(raw.parentNode, _ref[2]);
              }
              constructor = _ref[1];
              constructor = eval(constructor);
              if (!constructor) {
                return console.error("Unknown Controller: " + raw.dataset.controller);
              }
              if (typeof model !== "undefined") {
                ctrl = new constructor(raw, model);
              } else {
                ctrl = new constructor(raw);
              }
              if (!needsModel ^ model != null) {
                var watchers = constructor.watchers;
                if (raw._rt_ctrl && watchers && Object.keys(watchers).length > 0) {
                  for (k in watchers) {
                    v = watchers[k];
                    var stored = Silica._watch[k];
                    if (!stored) {
                      continue;
                    }
                    for (var pairIdx = stored.length - 1;pairIdx >= 0;--pairIdx) {
                      var pair = stored[pairIdx];
                      if (raw._rt_ctrl == pair[0]) {
                        stored.splice(pairIdx, 1);
                        break;
                      }
                    }
                  }
                }
                raw._rt_live = true;
                raw._rt_ctrl = ctrl;
                _ref = constructor.watchers;
                for (k in _ref) {
                  v = _ref[k];
                  if (!Silica._watch[k]) {
                    Silica._watch[k] = [];
                  }
                  Silica._watch[k].push([ctrl, v]);
                }
                if (typeof ctrl.onLoad === "function") {
                  ctrl.onLoad();
                }
              }
              return ctrl;
            } else {
              if (raw.parentElement) {
                raw = raw.parentElement;
              } else {
                return Silica.context;
              }
            }
          }
        }
      }
    }
  }, _handle_href:function _handle_href(evt) {
    var path = this.getAttribute("href");
    var protocolCheckRegex = /[a-zA-Z]+\:+/g;
    if (protocolCheckRegex.exec(path) != null || path === "#" || path === "") {
      return;
    }
    evt.preventDefault();
    Silica.goTo(path);
    return false;
  }, _capture_links:function _capture_links(element) {
    var nodes = Silica.queryOfType(element, "a", "[href]", "[data-href]");
    var node = undefined;
    var externalRegexp = /:\/\//;
    for (var i = nodes.length - 1;i >= 0;--i) {
      node = nodes[i];
      if (node.hostname === location.hostname && node.target !== "_blank") {
        node.removeEventListener("click", Silica._handle_href, true);
        node.addEventListener("click", Silica._handle_href, true);
      }
    }
  }, _show:function _show(element, expr, negate) {
    var $elm, ctx, isVisible;
    isVisible = true;
    if (expr.indexOf(Silica.contextName) === 0) {
      isVisible = Silica.getPropByString(Silica.context, expr.substr(Silica.contextName.length + 1));
    } else {
      if (element.nodeType !== 8 && typeof(ctx = element._rt_ctx) !== "undefined") {
        isVisible = Silica.getPropByString(ctx, expr);
      } else {
        ctx = Silica.getContext(element);
        isVisible = Silica.getPropByString(ctx, expr);
      }
    }
    if (negate) {
      isVisible = !isVisible;
    }
    return isVisible;
  }, _call:function _call(element, evnt, act) {
    if (!Silica.isInDOM(element)) {
      return;
    }
    if (!element.dataset["nopreventdefault"]) {
      evnt.preventDefault();
    }
    if (!element.dataset["nostoppropagation"]) {
      evnt.stopPropagation();
    }
    var scope = document, trap_to, trapped_scope;
    if ((trap_to = element.dataset.trap) != null) {
      if (trap_to.toLowerCase() === "true") {
        scope = element;
      } else {
        trapped_scope = element;
        while (trapped_scope = trapped_scope.parentElement) {
          if (trapped_scope.classList.contains(trap_to)) {
            scope = trapped_scope;
            break;
          }
        }
      }
    }
    Silica.apply(function() {
      var $elm, action, ctx, objects, parameter, actionName, models = [];
      $elm = $(element);
      ctx = Silica.getContext($elm);
      action = $elm.data(act);
      var idx = action.indexOf("(");
      if (idx > 0) {
        actionName = action.substr(0, idx);
        models = action.substr(actionName.length).match(/(\w+)(?:\(?(\w+)\))?/g);
        if (models) {
          for (var i = 0;i < models.length;i++) {
            models[i] = Silica.getPropByString(ctx, models[i]);
          }
        } else {
          models = [];
        }
      } else {
        actionName = action;
      }
      while (!ctx[actionName] && ctx.hasOwnProperty("$ctrl")) {
        ctx = ctx.$ctrl;
      }
      if (element.dataset.parameter) {
        parameter = element.dataset.parameter;
      }
      if (typeof ctx[actionName] !== "undefined") {
        return ctx[actionName].apply(ctx, [$elm].concat(_toConsumableArray(models), [parameter, evnt]));
      } else {
        if (Silica.context[actionName] != null) {
          return Silica.context[actionName].apply(Silica.ctx, [$elm].concat(_toConsumableArray(models), [parameter, evnt]));
        } else {
          return console.error("Unknown action '" + actionName + "' for " + $elm[0].outerHTML + " in " + ctx.constructor.name);
        }
      }
    }, scope);
  }, _model_get_val:function _model_get_val(raw) {
    var filter, filterKey, filterOptions, value;
    filter = raw.attributes["data-filter"];
    filter = filter ? filter.value.split(/:(.+)/) : null;
    filterKey = filter ? filter[0] : null;
    if (filterKey && !Silica.filters[filterKey]) {
      throw new Error("Unknown filter: '" + filterKey + "' for element: " + raw.outerHTML);
    }
    filterOptions = filter && filter.length > 1 ? eval(filter[1]) : null;
    filter = filterKey ? Silica.filters[filterKey] : null;
    value = Silica.getValue(raw, raw.dataset.model);
    if (filter && value != null) {
      return filter(value, filterOptions);
    } else {
      return value;
    }
  }, findComments:function findComments(root) {
    var arr = [];
    var raw = root instanceof jQuery ? root[0] : root;
    for (var i = raw.childNodes.length - 1;i >= 0;--i) {
      var node = raw.childNodes[i];
      if (node.nodeType === 8) {
        arr.push(node);
      } else {
        arr.push.apply(arr, Silica.findComments(node));
      }
    }
    return arr;
  }, isInRepeat:function isInRepeat(root, node) {
    while (node.parentElement && node.parentElement !== root) {
      if (node.parentElement.hasAttribute("data-repeat")) {
        return true;
      } else {
        node = node.parentElement;
      }
    }
    return false;
  }, isDescendent:function isDescendent(ancestor, child) {
    while ((child = child.parentNode) && child !== ancestor) {
    }
    return!!child;
  }, query:function query(root) {
    var raw = root instanceof jQuery ? root[0] : root;
    if (raw == document) {
      raw = document.firstElementChild;
    }
    for (var _len3 = arguments.length, attributes = Array(_len3 > 1 ? _len3 - 1 : 0), _key = 1;_key < _len3;_key++) {
      attributes[_key - 1] = arguments[_key];
    }
    var isSingle = attributes.length == 1;
    var nodes = raw.querySelectorAll(attributes.join(","));
    var filtered = [];
    for (var i = nodes.length - 1;i >= 0;--i) {
      var node = nodes.item(i);
      if (!Silica.isInRepeat(root, node)) {
        filtered.push(node);
      }
    }
    if (!raw.rt_live) {
      var attribute = undefined;
      for (var _i3 = attributes.length - 1;_i3 >= 0;--_i3) {
        attribute = attributes[_i3];
        if (raw.hasAttribute(attribute.substring(1, attribute.length - 1))) {
          filtered.push(raw);
          break;
        }
      }
    }
    return filtered;
  }, queryWithComments:function queryWithComments(root) {
    for (var _len4 = arguments.length, attributes = Array(_len4 > 1 ? _len4 - 1 : 0), _key2 = 1;_key2 < _len4;_key2++) {
      attributes[_key2 - 1] = arguments[_key2];
    }
    var filtered = Silica.query.apply(Silica, [root].concat(attributes));
    var comments = Silica.findComments(root);
    var temp = document.createElement("div");
    for (var i = comments.length - 1;i >= 0;--i) {
      var node = comments[i];
      if (node.nodeValue.charAt(0) === "<") {
        temp.innerHTML = node.nodeValue;
        if (temp.firstElementChild.hasAttributes(attributes.join(","))) {
          filtered.push(node);
        }
      }
    }
    return filtered;
  }, querySorted:function querySorted(root) {
    for (var _len5 = arguments.length, attributes = Array(_len5 > 1 ? _len5 - 1 : 0), _key3 = 1;_key3 < _len5;_key3++) {
      attributes[_key3 - 1] = arguments[_key3];
    }
    var filtered = Silica.query.apply(Silica, [root].concat(attributes));
    for (var i = 0, list_length = filtered.length;i < list_length;i++) {
      var node = filtered[i];
      for (var j = i + 1;j < list_length;j++) {
        var other = filtered[j];
        if (other.contains(node)) {
          filtered[i] = other;
          filtered[j] = node;
        }
      }
    }
    return filtered;
  }, queryOfType:function queryOfType(root, type) {
    var raw = root instanceof jQuery ? root[0] : root;
    if (raw == document) {
      raw = document.firstElementChild;
    }
    for (var _len6 = arguments.length, attributes = Array(_len6 > 2 ? _len6 - 2 : 0), _key4 = 2;_key4 < _len6;_key4++) {
      attributes[_key4 - 2] = arguments[_key4];
    }
    var isSingle = attributes.length == 1;
    var nodes = raw.getElementsByTagName(type);
    var filtered = [];
    if (attributes.length > 0) {
      for (var i = nodes.length - 1;i >= 0;--i) {
        var node = nodes.item(i);
        if (!node._rt_live) {
          for (var j = attributes.length - 1;j >= 0;--j) {
            if (node.hasAttribute(attributes[j].replace(/\[|\]/g, ""))) {
              filtered.push(node);
              break;
            }
          }
        }
      }
      if (raw.tagName === type && !raw.rt_live) {
        var attribute = undefined;
        for (var _i4 = attributes.length - 1;_i4 >= 0;--_i4) {
          attribute = attributes[_i4];
          if (raw.hasAttribute(attribute.substring(1, attribute.length - 1))) {
            filtered.push(raw);
            break;
          }
        }
      }
    } else {
      filtered = nodes;
      if (raw.tagName === type) {
        filtered.push(raw);
      }
    }
    return filtered;
  }, removeFromDOM:function removeFromDOM(e) {
    var removeWatchers = function removeWatchers(nodes) {
      for (var _i5 = nodes.length - 1;_i5 >= 0;--_i5) {
        var node = nodes[_i5];
        if (node._rt_ctrl) {
          ctrl = node._rt_ctrl;
          for (k in ctrl.constructor.watchers) {
            list = Silica._watch[k];
            Silica._watch[k] = list != null ? list.filter(function(obj) {
              return obj[0] !== ctrl;
            }) : [];
          }
        }
      }
    };
    for (var i = e.childNodes.length - 1;i >= 0;--i) {
      var child = e.childNodes[i];
      if (typeof child.onremove == "function") {
        child.onremove();
      }
    }
    if (e.nodeType !== 3 && e.nodeType !== 8) {
      var nodesWithControllers = e.querySelectorAll("[data-controller]");
      removeWatchers(nodesWithControllers);
      removeWatchers([e]);
    }
    e._deleted = true;
    e.remove();
  }, compilers:_compilers2.default, watchers:_watchers2.default};
  Silica.Controllers = _controllers2.default;
  window.Silica = Silica;
}, {"./compilers/compilers":4, "./controllers/controllers":36, "./watchers/watchers":43}], 38:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Class;
  function updater(element) {
    var hardClass = element.dataset._rt_hard_klass;
    if (hardClass && hardClass.length > 0) {
      element.className = hardClass;
    } else {
      if (hardClass == "") {
        element.className = "";
      } else {
        element.dataset._rt_hard_klass = element.className;
      }
    }
    var klass = Silica.getValue(element, element.dataset.class, null, [element, element.dataset.parameter]);
    if (klass) {
      if (klass instanceof Array) {
        element.classList.add.apply(element.classList, klass);
      } else {
        element.classList.add(klass);
      }
    }
    if (element.dataset.show != null) {
      var key = element.dataset.show;
      var negate = key[0] == "!";
      isVisible = Silica._show($(element), key, negate);
      if (isVisible && element.classList.contains("hidden")) {
        element.classList.remove("hidden");
      } else {
        if (!isVisible && !element.classList.contains("hidden")) {
          element.classList.add("hidden");
        }
      }
    }
  }
  function Class() {
    var raw = this instanceof jQuery ? this[0] : this;
    var elements = raw.querySelectorAll("[data-class]");
    if (raw.dataset.class) {
      updater(raw);
    }
    for (var i = elements.length - 1;i >= 0;--i) {
      updater(elements[i]);
    }
  }
}, {}], 39:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = _If;
  function _If() {
    var comment, compiled, element, elements, i, isVisible, k, negate, raw, _i, _len, _ref;
    var wrapper = document.createElement("div");
    _ref = Silica._ifs;
    for (k in _ref) {
      elements = _ref[k];
      if (Silica._ifs.hasOwnProperty(k)) {
        raw = k;
        negate = k[0] === "!";
        if (negate) {
          k = k.substr(1);
        }
        for (i = _i = 0, _len = elements.length;_i < _len;i = ++_i) {
          element = elements[i];
          if (element != this && !Silica.isDescendent(this, element)) {
            continue;
          }
          isVisible = Silica._show(element, k, negate);
          if (isVisible) {
            if (element.nodeType === 8) {
              compiled = Silica.compile(element.nodeValue, false, Silica.getContext(element))[0];
              element.parentNode.insertBefore(compiled, element);
              element.remove();
              Silica._ifs[raw][i] = compiled;
              var _ref2 = undefined;
              if ((_ref2 = Silica.getContext(compiled)) != null) {
                if (typeof _ref2.onLoad === "function" && _ref2.el == compiled) {
                  _ref2.onLoad();
                }
              }
            }
          } else {
            if (element.nodeType !== 8) {
              var $e, list, prop, _ref1;
              var ctrl, list, _ref1, _results;
              (function() {
                var subNodes = Silica.queryWithComments(element, "[data-if]");
                var subNode = undefined;
                for (var j = subNodes.length - 1;j >= 0;--j) {
                  subNode = subNodes[j];
                  if (subNode.nodeType === 8 && !subNode.dataset) {
                    wrapper.innerHTML = subNode.data;
                    prop = wrapper.firstChild.dataset["if"];
                  } else {
                    prop = subNode.dataset["if"];
                  }
                  list = Silica._shws[prop];
                  Silica._shws[prop] = (_ref1 = list != null ? list.filter(function(obj) {
                    return!obj == subNode;
                  }) : void 0) != null ? _ref1 : [];
                }
                subNodes = Silica.query(element, "[data-controller]");
                for (var _j = subNodes.length - 1;_j >= 0;--_j) {
                  subNode = subNodes[_j];
                  ctrl = subNode._rt_ctrl;
                  for (k in ctrl != null ? ctrl.constructor.watchers : void 0) {
                    list = Silica._watch[k];
                    Silica._watch[k] = list != null ? list.filter(function(obj) {
                      return obj[0] !== ctrl;
                    }) : [];
                  }
                }
                comment = document.createComment(element.outerHTML);
                comment.parentElement = element.parentElement;
                Silica._ifs[raw][i] = comment;
                element.parentNode.replaceChild(comment, element);
              })();
            }
          }
        }
      }
    }
  }
}, {}], 40:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Model;
  var inputTimeRegexp = /date|time/i;
  var inputTypes = ["text", "file", "number", "email", "password", "tel", "search", "url", "range", "date", "month", "week", "time", "datetime", "datetime-local", "color", "textarea", "select", "select-one"];
  function Model() {
    var raw = this instanceof jQuery ? this[0] : this;
    var elements = raw.querySelectorAll("[data-model]");
    var element, i, type;
    var activeElement = document.activeElement || Silica.__activeElement;
    for (i = elements.length - 1;i >= 0;--i) {
      element = elements[i];
      if (element === activeElement) {
        continue;
      }
      type = element.type;
      if (inputTypes.indexOf(type) !== -1) {
        element.value = Silica._model_get_val(element);
      } else {
        if (type === "radio") {
          val = element.value;
          if (val.search(/[0-9]/) != -1) {
            val = parseInt(val);
          }
          element.checked = Silica.getValue(element, element.dataset.model) === val;
        } else {
          if (type === "checkbox") {
            element.checked = Silica.getValue(element, element.dataset.model);
          } else {
            if (element.nodeName === "SPAN" || element.nodeName === "PRE" || element.nodeName === "DIV" || element.nodeName === "P") {
              val = Silica._model_get_val(element);
              if (val && val.nodeName) {
                element.innerHTML = "";
                element.appendChild(val);
              } else {
                element.innerHTML = val;
              }
            } else {
              if (element.nodeName === "OPTION") {
                element.value = Silica._model_get_val(element);
              }
            }
          }
        }
      }
    }
  }
}, {}], 41:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Repeat;
  var _controller = require("../compilers/controller.js");
  var _controller2 = _interopRequireDefault(_controller);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default:obj};
  }
  function Repeat() {
    var $elm, changed, child, container, context, ctx, expr, html, list, model, newList, newListHash, obj, oldList, repeat, rt_model, template, _i, _len, _ref;
    var elements = Silica.querySorted(this, "[data-repeat]");
    var raw = undefined, cache_display = undefined;
    for (var i = 0, length = elements.length;i < length;++i) {
      raw = elements[i];
      repeat = raw.dataset.repeat.split(/\s+in\s+/);
      list = repeat[1];
      model = repeat[0];
      ctx = Silica.getContext(raw);
      if (typeof(_ref = list.match(/((?:\w|\.)+)(?:\((\w+)\))*/))[2] !== "undefined") {
        var funcName = _ref[1];
        var param = _ref[2];
        param = Silica.getValue(raw.parentNode, param);
        newList = Silica.getValue(raw, _ref[1], null, param);
      } else {
        newList = Silica.getValue(raw, list);
      }
      newListHash = SparkMD5.hash(JSON.stringify(newList, function(key, value) {
        if (key.constructor == String && (key == "__elm" || key == "$ctrl" || key.charCodeAt(0) === 95)) {
          return undefined;
        }
        return value;
      }));
      var existing = raw.childNodes;
      oldList = raw._rt_repeat_list;
      changed = oldList && newList ? oldList !== newListHash : true;
      if (!changed) {
        continue;
      }
      if (newList) {
        raw._rt_repeat_list = newListHash;
      } else {
        raw._rt_repeat_list = null;
      }
      if (!newList) {
        while (raw.childNodes.length > 0) {
          Silica.removeFromDOM(raw.childNodes[0]);
        }
        continue;
      }
      if (newList.constructor === Number) {
        newList = new Array(newList);
      }
      template = Silica._repeat_templates[raw.dataset._rt_repeat_template];
      if (newList.constructor == Object) {
        var keys = Object.keys(newList);
        var _obj = newList;
        newList = [];
        var key = undefined, val = undefined;
        for (var j = 0, len = keys.length, _key = keys[j];j < len;j++) {
          _key = keys[j];
          newList[j] = {key:_key, value:_obj[_key]};
        }
      }
      var count_diff = raw.childElementCount - newList.length;
      var node = undefined;
      while (count_diff > 0) {
        Silica.removeFromDOM(existing[count_diff - 1]);
        --count_diff;
      }
      var fragment = document.createDocumentFragment();
      while (count_diff < 0) {
        context = {};
        context[model] = newList[0 - count_diff - 1];
        context.$ctrl = ctx;
        child = template.cloneNode(true);
        child._rt_ctx = context;
        for (var _key2 in Silica.compilers) {
          Silica.compilers[_key2].call(child);
        }
        fragment.appendChild(child);
        ++count_diff;
      }
      if (fragment.hasChildNodes()) {
        raw.appendChild(fragment);
      }
      for (_i = 0, _len = newList.length;_i < _len;_i++) {
        obj = newList[_i];
        node = existing[_i];
        var modelChanged = model != obj;
        if (node._rt_ctx) {
          node._rt_ctx[model] = obj;
        } else {
          context = {};
          context[model] = obj;
          context.$ctrl = ctx;
          node._rt_ctx = context;
        }
        if (modelChanged) {
          _controller2.default.call(node, node._rt_ctx, true);
        }
        node._rt_ctx.index = _i;
        Silica.flush(node, false, {}, true);
      }
      if (ctx.renderedRepeat) {
        ctx.renderedRepeat(raw);
      } else {
        if (ctx.$ctrl && ctx.$ctrl.renderedRepeat) {
          ctx.$ctrl.renderedRepeat(raw);
        }
      }
    }
  }
}, {"../compilers/controller.js":5}], 42:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  exports.default = Show;
  function Show() {
    var element, elements, i, isVisible, k, negate, raw;
    raw = this instanceof jQuery ? this[0] : this;
    elements = raw.querySelectorAll("[data-show]");
    if (raw.dataset.show) {
      if (elements.length == 0) {
        elements = [raw];
      } else {
        var a = [];
        for (var _i = elements.length - 1;_i >= 0;_i--) {
          a[_i] = elements[_i];
        }
        elements = a;
      }
    }
    for (var i = elements.length - 1;i >= 0;i--) {
      element = elements[i];
      if (!Silica.isInDOM(element)) {
        continue;
      }
      k = element.dataset.show;
      negate = k[0] === "!";
      if (negate) {
        k = k.substr(1);
      }
      isVisible = Silica._show(element, k, negate);
      if (isVisible && element.classList.contains("hidden")) {
        element.classList.remove("hidden");
      } else {
        if (!isVisible && !element.classList.contains("hidden")) {
          element.classList.add("hidden");
        }
      }
    }
  }
}, {}], 43:[function(require, module, exports) {
  Object.defineProperty(exports, "__esModule", {value:true});
  var _if = require("./if.js");
  var _if2 = _interopRequireDefault(_if);
  var _repeat = require("./repeat.js");
  var _repeat2 = _interopRequireDefault(_repeat);
  var _show = require("./show.js");
  var _show2 = _interopRequireDefault(_show);
  var _class = require("./class.js");
  var _class2 = _interopRequireDefault(_class);
  var _model = require("./model.js");
  var _model2 = _interopRequireDefault(_model);
  var _disabled = require("../compilers/disabled.js");
  var _disabled2 = _interopRequireDefault(_disabled);
  var _href = require("../compilers/href.js");
  var _href2 = _interopRequireDefault(_href);
  var _style = require("../compilers/style.js");
  var _style2 = _interopRequireDefault(_style);
  var _src = require("../compilers/src.js");
  var _src2 = _interopRequireDefault(_src);
  var _genericAttribute = require("../compilers/generic-attribute.js");
  var _genericAttribute2 = _interopRequireDefault(_genericAttribute);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default:obj};
  }
  exports.default = {_If:_if2.default, Repeat:_repeat2.default, Show:_show2.default, Class:_class2.default, Model:_model2.default, Disabled:_disabled2.default, Href:_href2.default, Style:_style2.default, Src:_src2.default, Generic:_genericAttribute2.default};
}, {"../compilers/disabled.js":7, "../compilers/generic-attribute.js":10, "../compilers/href.js":11, "../compilers/src.js":28, "../compilers/style.js":29, "./class.js":38, "./if.js":39, "./model.js":40, "./repeat.js":41, "./show.js":42}]}, {}, [37]);
$.extend($.expr[":"], {containsExact:$.expr.createPseudo ? $.expr.createPseudo(function(text) {
  return function(elem) {
    return $.trim(elem.innerHTML.toLowerCase()) === text.toLowerCase();
  };
}) : function(elem, i, match) {
  return $.trim(elem.innerHTML.toLowerCase()) === match[3].toLowerCase();
}, containsExactCase:$.expr.createPseudo ? $.expr.createPseudo(function(text) {
  return function(elem) {
    return $.trim(elem.innerHTML) === text;
  };
}) : function(elem, i, match) {
  return $.trim(elem.innerHTML) === match[3];
}, containsRegex:$.expr.createPseudo ? $.expr.createPseudo(function(text) {
  var reg = /^\/((?:\\\/|[^\/])+)\/([mig]{0,3})$/.exec(text);
  return function(elem) {
    return reg ? RegExp(reg[1], reg[2]).test($.trim(elem.textContent)) : false;
  };
}) : function(elem, i, match) {
  var reg = /^\/((?:\\\/|[^\/])+)\/([mig]{0,3})$/.exec(match[3]);
  return reg ? RegExp(reg[1], reg[2]).test($.trim(elem.innerHTML)) : false;
}});
(function(factory) {
  if (typeof exports === "object") {
    module.exports = factory();
  } else {
    if (typeof define === "function" && define.amd) {
      define(factory);
    } else {
      var glob;
      try {
        glob = window;
      } catch (e) {
        glob = self;
      }
      glob.SparkMD5 = factory();
    }
  }
})(function(undefined) {
  var add32 = function(a, b) {
    return a + b & 4294967295;
  }, cmn = function(q, a, b, x, s, t) {
    a = add32(add32(a, q), add32(x, t));
    return add32(a << s | a >>> 32 - s, b);
  }, ff = function(a, b, c, d, x, s, t) {
    return cmn(b & c | ~b & d, a, b, x, s, t);
  }, gg = function(a, b, c, d, x, s, t) {
    return cmn(b & d | c & ~d, a, b, x, s, t);
  }, hh = function(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }, ii = function(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
  }, md5cycle = function(x, k) {
    var a = x[0], b = x[1], c = x[2], d = x[3];
    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);
    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);
    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);
    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);
    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);
  }, md5blk = function(s) {
    var md5blks = [], i;
    for (i = 0;i < 64;i += 4) {
      md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
  }, md5blk_array = function(a) {
    var md5blks = [], i;
    for (i = 0;i < 64;i += 4) {
      md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
    }
    return md5blks;
  }, md51 = function(s) {
    var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i, length, tail, tmp, lo, hi;
    for (i = 64;i <= n;i += 64) {
      md5cycle(state, md5blk(s.substring(i - 64, i)));
    }
    s = s.substring(i - 64);
    length = s.length;
    tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0;i < length;i += 1) {
      tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
    }
    tail[i >> 2] |= 128 << (i % 4 << 3);
    if (i > 55) {
      md5cycle(state, tail);
      for (i = 0;i < 16;i += 1) {
        tail[i] = 0;
      }
    }
    tmp = n * 8;
    tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
    lo = parseInt(tmp[2], 16);
    hi = parseInt(tmp[1], 16) || 0;
    tail[14] = lo;
    tail[15] = hi;
    md5cycle(state, tail);
    return state;
  }, md51_array = function(a) {
    var n = a.length, state = [1732584193, -271733879, -1732584194, 271733878], i, length, tail, tmp, lo, hi;
    for (i = 64;i <= n;i += 64) {
      md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
    }
    a = i - 64 < n ? a.subarray(i - 64) : new Uint8Array(0);
    length = a.length;
    tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0;i < length;i += 1) {
      tail[i >> 2] |= a[i] << (i % 4 << 3);
    }
    tail[i >> 2] |= 128 << (i % 4 << 3);
    if (i > 55) {
      md5cycle(state, tail);
      for (i = 0;i < 16;i += 1) {
        tail[i] = 0;
      }
    }
    tmp = n * 8;
    tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
    lo = parseInt(tmp[2], 16);
    hi = parseInt(tmp[1], 16) || 0;
    tail[14] = lo;
    tail[15] = hi;
    md5cycle(state, tail);
    return state;
  }, hex_chr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"], rhex = function(n) {
    var s = "", j;
    for (j = 0;j < 4;j += 1) {
      s += hex_chr[n >> j * 8 + 4 & 15] + hex_chr[n >> j * 8 & 15];
    }
    return s;
  }, hex = function(x) {
    var i;
    for (i = 0;i < x.length;i += 1) {
      x[i] = rhex(x[i]);
    }
    return x.join("");
  }, md5 = function(s) {
    return hex(md51(s));
  }, SparkMD5 = function() {
    this.reset();
  };
  if (md5("hello") !== "5d41402abc4b2a76b9719d911017c592") {
    add32 = function(x, y) {
      var lsw = (x & 65535) + (y & 65535), msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 65535;
    };
  }
  SparkMD5.prototype.append = function(str) {
    if (/[\u0080-\uFFFF]/.test(str)) {
      str = unescape(encodeURIComponent(str));
    }
    this.appendBinary(str);
    return this;
  };
  SparkMD5.prototype.appendBinary = function(contents) {
    this._buff += contents;
    this._length += contents.length;
    var length = this._buff.length, i;
    for (i = 64;i <= length;i += 64) {
      md5cycle(this._state, md5blk(this._buff.substring(i - 64, i)));
    }
    this._buff = this._buff.substr(i - 64);
    return this;
  };
  SparkMD5.prototype.end = function(raw) {
    var buff = this._buff, length = buff.length, i, tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ret;
    for (i = 0;i < length;i += 1) {
      tail[i >> 2] |= buff.charCodeAt(i) << (i % 4 << 3);
    }
    this._finish(tail, length);
    ret = !!raw ? this._state : hex(this._state);
    this.reset();
    return ret;
  };
  SparkMD5.prototype._finish = function(tail, length) {
    var i = length, tmp, lo, hi;
    tail[i >> 2] |= 128 << (i % 4 << 3);
    if (i > 55) {
      md5cycle(this._state, tail);
      for (i = 0;i < 16;i += 1) {
        tail[i] = 0;
      }
    }
    tmp = this._length * 8;
    tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
    lo = parseInt(tmp[2], 16);
    hi = parseInt(tmp[1], 16) || 0;
    tail[14] = lo;
    tail[15] = hi;
    md5cycle(this._state, tail);
  };
  SparkMD5.prototype.reset = function() {
    this._buff = "";
    this._length = 0;
    this._state = [1732584193, -271733879, -1732584194, 271733878];
    return this;
  };
  SparkMD5.prototype.destroy = function() {
    delete this._state;
    delete this._buff;
    delete this._length;
  };
  SparkMD5.hash = function(str, raw) {
    if (/[\u0080-\uFFFF]/.test(str)) {
      str = unescape(encodeURIComponent(str));
    }
    var hash = md51(str);
    return!!raw ? hash : hex(hash);
  };
  SparkMD5.hashBinary = function(content, raw) {
    var hash = md51(content);
    return!!raw ? hash : hex(hash);
  };
  SparkMD5.ArrayBuffer = function() {
    this.reset();
  };
  SparkMD5.ArrayBuffer.prototype.append = function(arr) {
    var buff = this._concatArrayBuffer(this._buff, arr), length = buff.length, i;
    this._length += arr.byteLength;
    for (i = 64;i <= length;i += 64) {
      md5cycle(this._state, md5blk_array(buff.subarray(i - 64, i)));
    }
    this._buff = i - 64 < length ? buff.subarray(i - 64) : new Uint8Array(0);
    return this;
  };
  SparkMD5.ArrayBuffer.prototype.end = function(raw) {
    var buff = this._buff, length = buff.length, tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], i, ret;
    for (i = 0;i < length;i += 1) {
      tail[i >> 2] |= buff[i] << (i % 4 << 3);
    }
    this._finish(tail, length);
    ret = !!raw ? this._state : hex(this._state);
    this.reset();
    return ret;
  };
  SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;
  SparkMD5.ArrayBuffer.prototype.reset = function() {
    this._buff = new Uint8Array(0);
    this._length = 0;
    this._state = [1732584193, -271733879, -1732584194, 271733878];
    return this;
  };
  SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;
  SparkMD5.ArrayBuffer.prototype._concatArrayBuffer = function(first, second) {
    var firstLength = first.length, result = new Uint8Array(firstLength + second.byteLength);
    result.set(first);
    result.set(new Uint8Array(second), firstLength);
    return result;
  };
  SparkMD5.ArrayBuffer.hash = function(arr, raw) {
    var hash = md51_array(new Uint8Array(arr));
    return!!raw ? hash : hex(hash);
  };
  return SparkMD5;
});

